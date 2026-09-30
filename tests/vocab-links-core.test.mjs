import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import core from '../vocab-links-core.js';

const fixedNow = () => new Date('2026-09-30T12:00:00');
function fixture() {
    const words = ['das Homeoffice', 'die Bewerbung', 'arbeiten', 'die Pflege', 'verlegen (Adj.)', 'verlegen (Verb)', 'arbeiten mit + Dat.', 'sich beschäftigen mit', 'Ressourcen schonen', 'den Überblick behalten']
        .map(de => ({ de, vi: `meaning of ${de}` }));
    const groups = { arbeit: { titel: 'Arbeit', woerter: words } };
    const index = core.createIndex(groups);
    const data = new Map([['kapi_missed_vokabeln', '[{"de":"old","vi":"unchanged"}]']]);
    const storage = { getItem: key => data.get(key) || null, setItem: (key, value) => data.set(key, String(value)) };
    const ledger = core.createLedger(index, storage, fixedNow);
    return { words, groups, index, data, storage, ledger };
}

test('source references stay intact, duplicate source labels share one ID, IDs survive reordering', () => {
    const context = vm.createContext({});
    vm.runInContext(readFileSync(new URL('../vokabel-data.js', import.meta.url), 'utf8'), context);
    const groups = vm.runInContext('vokabelGruppen', context);
    const before = JSON.stringify(groups);
    const index = core.createIndex(groups);
    assert.equal(index.entries.size, 1135);
    assert.equal([...index.entries.values()].reduce((sum, entry) => sum + entry.locations.length, 0), 1137);
    for (const entry of index.entries.values()) {
        const first = entry.locations[0];
        assert.equal(entry.word, groups[first.groupKey].woerter[first.position - 1]);
        assert.equal('id' in entry.word, false);
    }
    assert.equal(JSON.stringify(groups), before);
    const reordered = Object.fromEntries(Object.entries(groups).reverse().map(([key, group]) => [key, { ...group, woerter: [...group.woerter].reverse() }]));
    assert.deepEqual([...core.createIndex(reordered).entries.keys()].sort(), [...index.entries.keys()].sort());
});

test('matching respects Unicode word boundaries, articles, annotations and conservative inflections', () => {
    const { index } = fixture();
    const matched = index.matchText('Im Homeoffice arbeite ich. Die Bewerbungen liegen bereit. Ich arbeite mit meinem Team.').map(entry => entry.word.de);
    assert.ok(matched.includes('das Homeoffice'));
    assert.ok(matched.includes('die Bewerbung'));
    assert.ok(matched.includes('arbeiten'));
    assert.ok(matched.includes('arbeiten mit + Dat.'));
    const collocations = index.matchText('Ich beschäftige mich mit Musik. Wir schonen Ressourcen. Sie behält den Überblick.').map(entry => entry.word.de);
    assert.ok(collocations.includes('sich beschäftigen mit'));
    assert.ok(collocations.includes('Ressourcen schonen'));
    assert.ok(collocations.includes('den Überblick behalten'));
    assert.deepEqual(index.matchText('Homeofficepflicht und Bewerbungsunterlagen.').map(entry => entry.word.de), []);
    assert.equal(index.matchText('Wir pflegen den Garten.').some(entry => entry.word.de === 'die Pflege'), false);
    assert.equal(index.matchText('Die Pflege ist wichtig.').some(entry => entry.word.de === 'die Pflege'), true);
    assert.equal(index.resolve('Homeoffice').word.de, 'das Homeoffice');
    assert.equal(index.resolve('verlegen'), null);
    assert.equal(index.matchText('Ich bin verlegen.').some(entry => entry.word.de.startsWith('verlegen')), false);
    assert.equal(index.resolve('a completely new word'), null);
});

test('the bridge ignores runtime views and never imports a new listening word into the source', () => {
    const { groups } = fixture();
    groups.hoerenAktiv = { woerter: [{ de: 'brand new', vi: 'not in source' }] };
    groups.lesenHeute = { woerter: [{ de: 'das Homeoffice', vi: 'copied view' }] };
    const index = core.createIndex(groups);
    assert.equal(index.resolve('brand new'), null);
    assert.equal(index.resolve('das Homeoffice').locations.length, 1);
    assert.equal(index.resolve('das Homeoffice').word, groups.arbeit.woerter[0]);
});

test('encounters, production and learned state are separate; rerenders cannot add counts', () => {
    const { index, ledger, data } = fixture();
    const home = index.resolve('Homeoffice').id;
    const apply = () => ledger.record({ skill: 'hoeren', sourceKey: 'hoeren:1:0', seen: [home, home, 'unknown'] });
    apply(); apply();
    assert.deepEqual(ledger.stats(home).skills.hoeren, { seen: 1, used: 0 });
    assert.equal(ledger.stats(home).learned, false);
    ledger.record({ skill: 'sprechen', sourceKey: 'sprechen:1:0', used: [home] });
    ledger.record({ skill: 'sprechen', sourceKey: 'sprechen:1:0', used: [home] });
    assert.deepEqual(ledger.stats(home).skills.sprechen, { seen: 1, used: 1 });
    ledger.markLearned([index.resolve('Homeoffice').word]);
    assert.equal(ledger.stats(home).learned, true);
    assert.equal(data.get('kapi_missed_vokabeln'), '[{"de":"old","vi":"unchanged"}]');
    const persisted = data.get(core.STORAGE_KEY);
    assert.equal(persisted.includes('meaning of'), false);
    assert.equal(persisted.includes('"de"'), false);
    assert.equal(persisted.includes('"vi"'), false);
});

test('a saved source may gain another recognized word or production without duplicating earlier encounters', () => {
    const { index, ledger } = fixture();
    const home = index.resolve('Homeoffice').id, application = index.resolve('die Bewerbung').id;
    ledger.record({ skill: 'sprechen', sourceKey: 'session1', seen: [home] });
    ledger.record({ skill: 'sprechen', sourceKey: 'session1', seen: [home, application], used: [home] });
    assert.deepEqual(ledger.stats(home).skills.sprechen, { seen: 1, used: 1 });
    assert.deepEqual(ledger.stats(application).skills.sprechen, { seen: 1, used: 0 });
    ledger.record({ skill: 'sprechen', sourceKey: 'session1', at: '2026-10-01', used: [home] });
    assert.deepEqual(ledger.stats(home).skills.sprechen, { seen: 2, used: 2 });
});

test('weekly appearances use lesson dates, keep lifetime totals and do not replace old score stats', () => {
    const { index, ledger } = fixture();
    const home = index.resolve('Homeoffice').id;
    for (const date of ['2026-06-01', '2026-09-27', '2026-09-28', '2026-09-30', '2026-10-05']) {
        ledger.record({ skill: 'lesen', sourceKey: 'article', at: date, seen: [home] });
    }
    assert.equal(ledger.stats(home).skills.lesen.seen, 5);
    assert.equal(ledger.stats(home).days['2026-06-01'], undefined);
    assert.equal(ledger.weeklyCounts('2026-09-28').lesen.seen, 2);
    assert.equal(ledger.weeklyCounts('2026-09-28').schreiben.used, 0);
});

test('old histories import once and unavailable add-on storage does not throw', () => {
    const { ledger, index, storage } = fixture();
    let imported = 0;
    const importer = () => { imported++; ledger.markLearned(['das Homeoffice']); };
    ledger.importOnce(importer); ledger.importOnce(importer);
    assert.equal(imported, 1);
    assert.equal(ledger.stats('das Homeoffice').learned, true);
    storage.setItem(core.STORAGE_KEY, '{bad json');
    assert.equal(ledger.stats('das Homeoffice'), null);
    const unavailable = core.createLedger(index, { getItem() { throw Error('unavailable'); }, setItem() { throw Error('full'); } }, fixedNow);
    assert.doesNotThrow(() => unavailable.record({ skill: 'lesen', sourceKey: 'article', seen: ['das Homeoffice'] }));
});

test('game draws stay in the chosen pool, mix recently encountered and older words, preserve original references', () => {
    const words = Array.from({ length: 30 }, (_, i) => ({ de: `das Wort${i}`, vi: String(i) }));
    const index = core.createIndex({ group: { woerter: words } });
    const history = Object.fromEntries(words.slice(0, 10).map(word => [index.resolve(word).id,
        { lastSeen: '2026-09-30', skills: { lesen: { seen: 1, used: 0 } } }]));
    for (const count of [5, 10, 12]) {
        const result = core.prioritize(words, index, history, count, () => .3, fixedNow());
        assert.equal(result.length, words.length);
        assert.equal(new Set(result).size, words.length);
        assert.ok(result.every(word => words.includes(word)));
        assert.ok(result.slice(0, count).some(word => words.indexOf(word) < 10));
        assert.ok(result.slice(0, count).some(word => words.indexOf(word) >= 10));
    }
    const subset = words.slice(10);
    assert.equal(core.prioritize(subset, index, history, 10), null);
    assert.equal(core.priorityScore(index.resolve(words[0]), history, fixedNow(), true), 0);
});

test('related activities refer only to existing tasks and writing suggestions honor the existing common tag', () => {
    const { index } = fixture();
    const home = index.resolve('Homeoffice').id, application = index.resolve('die Bewerbung').id;
    const catalog = core.buildCatalog(index, [
        { key: 'reading1', skill: 'lesen', text: 'Arbeit im Homeoffice' },
        { key: 'writing1', skill: 'schreiben', text: 'Die Bewerbung' },
        { key: 'writing2', skill: 'schreiben', text: 'Im Homeoffice' },
        { key: 'listening1', skill: 'hoeren', text: 'Unrelated.' }
    ]);
    const related = core.relatedTasks([home, application], catalog, id => id === home);
    assert.deepEqual(related.map(item => item.task.key), ['reading1', 'writing2']);
    assert.ok(related.every(item => catalog.includes(item.task)));
    assert.deepEqual(core.relatedTasks([], catalog), []);
});
