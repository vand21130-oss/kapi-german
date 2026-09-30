import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { parseHTML } from 'linkedom';
import core from '../vocab-links-core.js';

const source = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
class FixedDate extends Date {
    constructor(...args) { super(...(args.length ? args : ['2026-09-30T12:00:00Z'])); }
    static now() { return new Date('2026-09-30T12:00:00Z').getTime(); }
}

function app(initial = {}, withBridge = true) {
    const { document, window, Event, HTMLElement } = parseHTML(source('index.html'));
    // DOM test library shims for browser APIs outside the integration's responsibility.
    Object.defineProperty(HTMLElement.prototype, 'innerText', {
        get() { return this.textContent; }, set(value) { this.textContent = value; }, configurable: true
    });
    HTMLElement.prototype.scrollIntoView = function () {};
    HTMLElement.prototype.pause = function () {};
    const data = new Map(Object.entries(initial));
    const alerts = [];
    const sandbox = {
        document, console, Date: FixedDate, URL,
        localStorage: { getItem: key => data.get(key) || null, setItem: (key, value) => data.set(key, String(value)), removeItem: key => data.delete(key) },
        setInterval: () => 1, clearInterval() {}, setTimeout: () => 1, clearTimeout() {}, queueMicrotask() {},
        postMessage() {}, addEventListener: window.addEventListener.bind(window), scrollTo() {},
        navigator: {}, location: { href: 'https://kapi.test/', pathname: '/' },
        alert: value => alerts.push(value), confirm: () => true,
        fetch: async () => ({ ok: true, json: async () => ({ suggestions: [] }) }),
        speechSynthesis: { cancel() {}, getVoices: () => [], speak() {} },
        SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } }
    };
    sandbox.window = sandbox;
    const context = vm.createContext(sandbox);
    const run = code => vm.runInContext(code, context);
    for (const name of ['vokabel-data.js', 'horen-data.js', 'lesen-data.js']) vm.runInContext(source(name), context, { filename: name });
    const snapshot = run('JSON.stringify(vokabelGruppen)');
    const sourceKeys = run('Object.keys(vokabelGruppen)');
    run('for (const g of Object.values(vokabelGruppen)) { g.woerter.forEach(Object.freeze); Object.freeze(g.woerter); Object.freeze(g); }');
    if (withBridge) for (const name of ['vocab-links-core.js', 'vocab-links.js']) vm.runInContext(source(name), context, { filename: name });
    vm.runInContext(source('kapi-logic.js'), context, { filename: 'kapi-logic.js' });
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const state = () => JSON.parse(data.get(core.STORAGE_KEY) || '{"words":{}}');
    return { run, document, sandbox, data, state, alerts, snapshot, sourceKeys };
}

test('existing saved words, notes and progress survive installation and a reload byte for byte', () => {
    const old = {
        kapi_missed_vokabeln: JSON.stringify(Array.from({ length: 39 }, (_, i) => ({ de: `my word ${i}`, vi: `note ${i}` }))),
        kapi_hoer_words_v1: '[{"de":"brand new","vi":"my listening note","active":false,"status":"listening","streak":2}]',
        kapi_hoer_daily_v1: '{"date":"2026-09-30","keys":["brand new"]}',
        kapi_lesen_highlights_v1: '[{"text":"my pink highlight","context":"keep all of this"}]',
        kapi_lesen_pending_words_v1: '[{"text":"waiting word","vi":"personal note"}]',
        kapi_livetalk_diary_v1: '{"sessions":[{"id":"mine","date":"2026-09-29","title":"my notes","rows":[{"target":"das Homeoffice","said":"Ich arbeite im Homeoffice.","native":"another suggestion","source":"sprechen"}]}]}',
        kapi_vocab_weekly_journal_v1: '{"current":{"weekStart":"2026-09-28","learnedWords":[{"de":"das Homeoffice","vi":"my meaning"}],"note":"keep my week note","correctAnswers":3,"wrongAnswers":1},"history":[]}',
        kapi_lesen_gate_v1: '{"permitUntil":1790812800000,"pityPass":true}',
        kapi_livetalk_gate_v1: '{"permitUntil":1790812800000,"pityPass":true}',
        kapi_schreiben_draft_v2: '{"mytask":{"text":"my unfinished essay"}}',
        kapi_vocab_game_rewards_v1: '{"a":"paid"}'
    };
    const a = app(old);
    assert.ok(a.sandbox.KapiVocabBridge);
    for (const [key, value] of Object.entries(old)) assert.equal(a.data.get(key), value, key);
    assert.equal(a.state().words[core.idFor('das Homeoffice')].learned, true);
    assert.equal(a.state().words[core.idFor('brand new')], undefined);
    const reloaded = app(Object.fromEntries(a.data));
    assert.deepEqual(reloaded.state(), a.state());
    assert.equal(reloaded.run(`JSON.stringify(Object.fromEntries(${JSON.stringify(a.sourceKeys)}.map(key => [key, vokabelGruppen[key]])))`), a.snapshot);
});

test('targeted word links keep the original batch size/reference and never expose the recall answer', () => {
    const a = app({ kapi_livetalk_diary_v1: '{"sessions":[{"id":"one","date":"2026-09-30","rows":[{"target":"Homeoffice","said":"Im Homeoffice","source":"hoeren"}]}]}' });
    a.sandbox.KapiVocabBridge.openWord(core.idFor('das Homeoffice'));
    assert.equal(a.run('flashcardWords.length'), 20);
    assert.equal(a.run('isFlipped'), false);
    assert.equal(a.run('flashcardWords[currentFlashcardIndex] === vokabelGruppen.arbeit.woerter.find(w => w.de === "das Homeoffice")'), true);
    assert.equal(a.document.getElementById('message').textContent.includes('das Homeoffice'), false);
    assert.equal(a.document.querySelector('[data-vocab-links="history"]'), null);
    a.run('flipCard()');
    assert.ok(a.document.getElementById('message').textContent.includes('das Homeoffice'));
    assert.ok(a.document.querySelector('[data-vocab-links="history"]').textContent.includes('Hören ×1'));
    assert.equal(a.state().words[core.idFor('das Homeoffice')].learned, true);
    a.run('flipCard()');
    assert.equal(a.document.querySelector('[data-vocab-links="history"]'), null);
});

test('Sprechen and Schreiben record actual production after the original save, without changing those histories', () => {
    const a = app();
    a.run('setupSprechenUI({teil:1,thema:teil1[0].thema,punkte:teil1[0].punkte}); showSprechenFallback(); sprechenSession.durationSeconds=60; sprechenSession.transcript="Ich arbeite im Homeoffice."; saveSprechenHistory();');
    const spoken = JSON.parse(a.data.get('kapi_sprechen_history_v1'))[0];
    assert.equal(spoken.transcript, 'Ich arbeite im Homeoffice.');
    assert.equal(Object.keys(spoken).length, 6);
    assert.ok(a.document.querySelector('[data-vocab-links="spoken"]'));
    a.run('startSchreibenTask(2); beginSchreiben("practice"); saveSchreibenHistory("Im Homeoffice bin ich zufrieden.", 6, "original correction");');
    const written = JSON.parse(a.data.get('kapi_schreiben_history_v2'))[0];
    assert.equal(written.feedback, 'original correction');
    assert.equal(Object.keys(written).length, 6);
    const home = a.state().words[core.idFor('das Homeoffice')];
    assert.deepEqual(home.skills.sprechen, { seen: 1, used: 1 });
    assert.deepEqual(home.skills.schreiben, { seen: 1, used: 1 });
    assert.equal(home.learned, false); // Text recognition is not a new grading/mastery rule.
    assert.ok(a.document.querySelector('[data-vocab-links="written"]'));
});

test('Hören links point into the warehouse, repeat views are deduplicated, listening collection stays independent', () => {
    const stored = '[{"de":"something new","vi":"my audio word","active":false,"status":"new"}]';
    const a = app({ kapi_hoer_words_v1: stored });
    a.run('openTranscriptPage(); openTranscriptPage();');
    const panel = a.document.querySelector('[data-vocab-links="transcript"]');
    assert.ok(panel);
    assert.equal(panel.hasAttribute('open'), false);
    const firstButton = panel.querySelector('button');
    assert.ok(firstButton);
    assert.match(firstButton.textContent, / · .+ · #\d+/);
    assert.ok(Object.values(a.state().words).some(word => word.skills.hoeren?.seen === 1));
    assert.ok(Object.values(a.state().words).every(word => !word.skills.hoeren || word.skills.hoeren.seen === 1));
    assert.equal(a.data.get('kapi_hoer_words_v1'), stored);
    firstButton.click();
    assert.equal(a.document.getElementById('transcript-page').style.display, 'none');
    assert.equal(a.run('isFlipped'), false);
    assert.equal(a.run('flashcardWords.includes(vokabelGruppen[currentFlashcardGroup].woerter.find(w => w === flashcardWords[currentFlashcardIndex]))'), true);
    assert.equal(a.data.get('kapi_hoer_words_v1'), stored);
});

test('Clipchamp context recognition only adds references after revealing the dialogue', () => {
    const stored = '[{"de":"das Homeoffice","vi":"my meaning","active":false,"status":"new","context":{"dialogue":"A: Arbeitest du im Homeoffice? B: Ja.","audio":"audio/clipchamp.mp3"}}]';
    const a = app({ kapi_hoer_words_v1: stored });
    a.run('hoerContextSession = {keys:[hoerKey("das Homeoffice")],index:0,revealed:false}; renderHoerContextPractice();');
    assert.equal(a.state().words[core.idFor('das Homeoffice')], undefined);
    a.run('hoerRevealContext(); hoerRevealContext();');
    assert.equal(a.state().words[core.idFor('das Homeoffice')].skills.hoeren.seen, 1);
    assert.equal(a.data.get('kapi_hoer_words_v1'), stored);
});

test('Lesen recommendations still run the existing yesterday-review gate and preserve the 24-hour permit', () => {
    const old = '[{"taskId":"lesen_t1_hybridarbeit","date":"2026-09-29","reviewWords":[{"de":"das Homeoffice","vi":"one"},{"de":"die Bewerbung","vi":"two"},{"de":"das Gehalt","vi":"three"}]}]';
    const a = app({ kapi_lesen_history_v1: old });
    const task = { skill: 'lesen', taskId: 'lesen_t1_konsum' };
    a.sandbox.KapiVocabBridge.openTask(task);
    assert.equal(a.run('lesenCurrent'), null);
    assert.equal(a.run('lesenReviewGate.questions.length'), 3);
    assert.ok(a.document.getElementById('message').textContent.includes('Vali'));
    assert.equal(a.data.get('kapi_lesen_history_v1'), old);
    a.run('lesenGrantGate(true)');
    assert.equal(a.run('lesenCurrent.task.id'), 'lesen_t1_konsum');
    const permit = JSON.parse(a.data.get('kapi_lesen_gate_v1'));
    assert.equal(permit.permitUntil - permit.grantedAt, 24 * 60 * 60 * 1000);
    assert.equal(permit.pityPass, true);
});

test('submitting Lesen adds source IDs once and preserves the existing result, review words and highlights', () => {
    const pink = '[{"taskId":"lesen_t1_konsum","text":"my selected phrase","context":"personal selection"}]';
    const a = app({ kapi_lesen_highlights_v1: pink });
    a.run('startLesenTask("lesen_t1_konsum"); for (const q of lesenCurrent.task.questions) lesenSaveAnswer(q.number,q.answer); submitLesenTask(); submitLesenTask();');
    assert.equal(a.run('lesenCurrent.submitted'), true);
    assert.equal(a.run('lesenCurrent.result.score === lesenCurrent.result.total'), true);
    const history = JSON.parse(a.data.get('kapi_lesen_history_v1'));
    assert.equal(history.length, 1);
    assert.ok(history[0].reviewWords.length > 0);
    assert.ok(history[0].reviewWords.every(word => word.de && word.vi && !word.id));
    assert.equal(a.state().words[core.idFor('die Wegwerfgesellschaft')].skills.lesen.seen, 1);
    assert.equal(a.data.get('kapi_lesen_highlights_v1'), pink);
});

test('weekly journal gains only a small appearance line and keeps existing notes and scores', () => {
    const journal = '{"current":{"weekStart":"2026-09-28","learnedWords":[],"correctAnswers":5,"wrongAnswers":2,"groups":{},"wordStats":{},"note":"my preserved week note"},"history":[]}';
    const a = app({
        kapi_vocab_weekly_journal_v1: journal,
        kapi_livetalk_diary_v1: '{"sessions":[{"id":"one","date":"2026-09-30","rows":[{"target":"Homeoffice","said":"Im Homeoffice","source":"sprechen"}]}]}'
    });
    a.run('showVocabWeeklyJournal()');
    assert.equal(a.document.getElementById('vocab-weekly-note').value, 'my preserved week note');
    assert.ok(a.document.querySelector('[data-vocab-links="week"]').textContent.includes('Sprechen ×1'));
    const current = JSON.parse(a.data.get('kapi_vocab_weekly_journal_v1')).current;
    assert.equal(current.correctAnswers, 5);
    assert.equal(current.wrongAnswers, 2);
    assert.equal(current.note, 'my preserved week note');
});

test('all game sizes and distractor shuffles stay intact; priority never changes the daily mission', () => {
    const a = app({ kapi_livetalk_diary_v1: '{"sessions":[{"id":"one","date":"2026-09-30","rows":[{"target":"Homeoffice","said":"Im Homeoffice","source":"hoeren"},{"target":"Homeoffice","said":"Im Homeoffice","source":"sprechen"}]}]}' });
    for (const [type, size] of [['mc', 10], ['tornado', 12], ['sentence', 5]]) {
        a.run(`miniGame.type = ${JSON.stringify(type)}; miniGame.words = [...vokabelGruppen.arbeit.woerter]; ${type === 'sentence' ? 'startSentenceGame()' : 'startChoiceMiniGame()'}`);
        assert.equal(a.run('miniGame.questions.length'), size);
        assert.equal(a.run('miniGame.questions.some(q => (q.word || q).de === "das Homeoffice")'), true);
        if (type !== 'sentence') assert.equal(a.run('miniGame.questions.every(q => q.options.length === 4 && new Set(q.options).size === 4)'), true);
    }
    assert.equal(a.run('getKofferReviewWords(getAllUniqueVocabWords(),2).some(w => w.de === "das Homeoffice")'), true);
    const baseline = app(Object.fromEntries(a.data), false);
    for (const target of [a, baseline]) {
        target.run('let randomSeed = 42; Math.random = () => { randomSeed = (randomSeed * 1664525 + 1013904223) >>> 0; return randomSeed / 4294967296; }; startDailyVocabMission();');
    }
    assert.equal(a.run('JSON.stringify(flashcardWords)'), baseline.run('JSON.stringify(flashcardWords)'));
    assert.equal(a.run('flashcardWords.length'), 8);
    assert.equal(a.run('dailyMissionActive'), true);
});
