/* Optional references to the original Vokabeln, never a second vocabulary database. */
(function (root, factory) {
    const api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.KapiVocabLinks = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';
    const SKILLS = ['lesen', 'hoeren', 'sprechen', 'schreiben'];
    const STORAGE_KEY = 'kapi_vocab_links_v1';
    const normalize = value => String(value || '').normalize('NFC').trim().toLocaleLowerCase('de-DE').replace(/\s+/g, ' ');
    const idFor = de => `v1:${encodeURIComponent(normalize(de))}`;
    const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const plainText = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').normalize('NFC');
    const pronouns = '(?:sich|mich|dich|uns|euch)';
    function verbPattern(token) {
        const stem = token.slice(0, -2);
        const ending = /[dt]$/.test(stem) ? '(?:e|est|et|ete|eten)' : '(?:e|st|t|te|ten)';
        const irregular = token === 'behalten' ? '|behält|behältst|behalten|behielt|behielten' : '';
        return `(?:${escapeRegex(token)}|${escapeRegex(stem)}${ending}${irregular})`;
    }
    function canInflect(token, source) {
        return token.length >= 5 && /^[a-zäöüß]+en$/.test(token)
            && !['einen', 'einem', 'seinen', 'ihren', 'unseren', 'deren', 'diesen', 'jenen', 'denen', 'gegen', 'zwischen', 'wegen'].includes(token)
            && new RegExp(`(?<![\\p{L}])${escapeRegex(token)}(?![\\p{L}])`, 'u').test(source);
    }

    function aliasesFor(de) {
        // Grammar annotations are not spoken words. Slash alternatives remain explicit.
        const clean = String(de).replace(/\([^)]*\)/g, '').replace(/\+\s*(?:Dat\w*|Akk\w*|Gen\w*|V)\.?/gi, '').trim();
        const aliases = clean.split(/\s+\/\s+/).map(part => normalize(part)
            .replace(/^(?:der|die|das|den|dem|des|ein|eine|einen|einem|einer|eines)\s+/, '').trim());
        return [...new Set(aliases.filter(alias => alias && alias.length >= 4))];
    }

    function createIndex(groups) {
        const entries = new Map();
        const byAlias = new Map();
        for (const [groupKey, group] of Object.entries(groups || {})) {
            // These are old runtime views, not new sources of truth.
            if (['hoerenAktiv', 'lesenHeute', 'review'].includes(groupKey)) continue;
            (group.woerter || []).forEach((word, position) => {
                if (!word || typeof word.de !== 'string') return;
                const id = idFor(word.de);
                let entry = entries.get(id);
                if (!entry) {
                    entry = { id, word, locations: [], aliases: aliasesFor(word.de), patterns: [] };
                    entries.set(id, entry);
                    for (const alias of entry.aliases) {
                        const ids = byAlias.get(alias) || [];
                        ids.push(id);
                        byAlias.set(alias, ids);
                        const tokens = alias.split(/\s+/);
                        const parts = tokens.map(escapeRegex);
                        // Articles inside a collocation can change case; no loose substring matching.
                        const pattern = parts.map(part => /^(der|die|das|den|dem|des)$/.test(part)
                            ? '(?:der|die|das|den|dem|des)' : part).join('\\s+');
                        entry.patterns.push(new RegExp(`(?<![\\p{L}\\p{N}_])${pattern}(?![\\p{L}\\p{N}_])`, 'iu'));
                        if (tokens.some(token => canInflect(token, word.de))) {
                            const flexible = tokens.map(token => token === 'sich' ? pronouns : canInflect(token, word.de)
                                ? verbPattern(token) : escapeRegex(token));
                            const bounded = body => new RegExp(`(?<![\\p{L}\\p{N}_])${body}(?![\\p{L}\\p{N}_])`, 'iu');
                            entry.patterns.push(bounded(flexible.join('\\s+')));
                            if (tokens[0] === 'sich' && canInflect(tokens[1] || '', word.de)) {
                                entry.patterns.push(bounded([flexible[1], flexible[0], ...flexible.slice(2)].join('\\s+')));
                            }
                            // A simple noun + verb collocation also appears as "wir schonen Ressourcen".
                            if (tokens.length === 2 && canInflect(tokens[1], word.de) && !canInflect(tokens[0], word.de)) {
                                entry.patterns.push(bounded(`${flexible[1]}\\s+(?:(?:der|die|das|den|dem|des|einen|einem|einer|eine|ein)\\s+)?${flexible[0]}`));
                            }
                        }
                        // Capitalized noun plurals/case endings only; do not turn "Pflege" into the verb "pflegen".
                        if (/^(?:der|die|das)\s/.test(normalize(word.de)) && parts.length === 1 && alias.length >= 5) {
                            const capital = alias[0].toLocaleUpperCase('de-DE') + alias.slice(1);
                            const suffix = alias.endsWith('e') ? 'n' : '(?:en|e|n|s)';
                            entry.patterns.push(new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegex(capital)}${suffix}(?![\\p{L}\\p{N}_])`, 'u'));
                        }
                    }
                }
                entry.locations.push({ groupKey, title: group.titel || groupKey, position: position + 1 });
            });
        }
        function resolve(value) {
            const de = typeof value === 'string' ? value : value?.de;
            const exact = entries.get(idFor(de));
            if (exact) return exact;
            const ids = byAlias.get(normalize(de));
            // Ambiguous lemmas need their full original label, not a guessed meaning.
            return ids?.length === 1 ? entries.get(ids[0]) : null;
        }
        function matchText(value) {
            const text = plainText(value);
            return [...entries.values()].filter(entry => entry.aliases.every(alias => byAlias.get(alias).length === 1)
                && entry.patterns.some(pattern => pattern.test(text)));
        }
        return { entries, resolve, matchText };
    }

    function dateKey(value = new Date()) {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
        const date = new Date(value);
        if (!Number.isFinite(date.getTime())) return '';
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    const emptyState = () => ({ version: 1, words: {}, receipts: {}, imported: false });
    const emptyWord = () => ({ skills: {}, sources: {}, days: {}, learned: false, lastSeen: '' });

    function createLedger(index, storage, now = () => new Date()) {
        function read() {
            try {
                const state = JSON.parse(storage.getItem(STORAGE_KEY));
                if (state?.version === 1 && state.words && state.receipts) return state;
            } catch (_) { /* An unavailable add-on must not block a lesson. */ }
            return emptyState();
        }
        function write(state) {
            try { storage.setItem(STORAGE_KEY, JSON.stringify(state)); return true; }
            catch (_) { return false; }
        }
        const validIds = values => [...new Set((values || []).map(value => typeof value === 'string' && index.entries.has(value)
            ? value : index.resolve(value)?.id).filter(Boolean))];

        function record({ skill, sourceKey, at = now(), seen = [], used = [] }) {
            const day = dateKey(at);
            if (!SKILLS.includes(skill) || !sourceKey || !day) return [];
            const usedIds = validIds(used);
            const seenIds = validIds([...seen, ...usedIds]);
            if (!seenIds.length) return [];
            const state = read();
            // One encounter per word/source/day. Reopening a transcript or re-saving cannot farm counts.
            const receiptKey = `${skill}|${sourceKey}|${day}`;
            const receipt = state.receipts[receiptKey] || { seen: [], used: [] };
            let changed = false;
            for (const id of seenIds) {
                const word = state.words[id] || emptyWord();
                const counters = word.skills[skill] || { seen: 0, used: 0 };
                const daily = word.days[day] || {};
                const count = daily[skill] || { seen: 0, used: 0 };
                if (!receipt.seen.includes(id)) {
                    counters.seen++; count.seen++; receipt.seen.push(id); changed = true;
                }
                if (usedIds.includes(id) && !receipt.used.includes(id)) {
                    counters.used++; count.used++; receipt.used.push(id); changed = true;
                }
                word.skills[skill] = counters;
                daily[skill] = count;
                word.days[day] = daily;
                word.lastSeen = word.lastSeen > day ? word.lastSeen : day;
                const sources = word.sources[skill] || [];
                const previous = sources.find(source => source.key === sourceKey);
                if (!previous || previous.day < day) {
                    word.sources[skill] = [{ key: sourceKey, day }, ...sources.filter(source => source.key !== sourceKey)]
                        .sort((a, b) => b.day.localeCompare(a.day)).slice(0, 4);
                }
                // Lifetime counters stay; only daily detail has a 90-day window.
                const cutoff = new Date(now()); cutoff.setDate(cutoff.getDate() - 90);
                const cutoffKey = dateKey(cutoff);
                for (const oldDay of Object.keys(word.days)) if (oldDay < cutoffKey) delete word.days[oldDay];
                state.words[id] = word;
            }
            state.receipts[receiptKey] = receipt;
            if (changed) write(state);
            return seenIds;
        }
        function markLearned(values) {
            const state = read(); let changed = false;
            for (const id of validIds(values)) {
                const word = state.words[id] || emptyWord();
                if (!word.learned) { word.learned = true; state.words[id] = word; changed = true; }
            }
            if (changed) write(state);
        }
        function weeklyCounts(start) {
            const counts = Object.fromEntries(SKILLS.map(skill => [skill, { seen: 0, used: 0 }]));
            const endDate = new Date(`${start}T12:00:00`); endDate.setDate(endDate.getDate() + 7);
            const end = dateKey(endDate);
            for (const word of Object.values(read().words)) for (const [day, daily] of Object.entries(word.days || {})) {
                if (day >= start && day < end) for (const skill of SKILLS) {
                    counts[skill].seen += daily[skill]?.seen || 0;
                    counts[skill].used += daily[skill]?.used || 0;
                }
            }
            return counts;
        }
        return {
            read, record, markLearned, weeklyCounts,
            stats: value => read().words[index.entries.has(value) ? value : index.resolve(value)?.id] || null,
            importOnce(importer) {
                if (read().imported) return;
                importer();
                const state = read(); state.imported = true; write(state);
            }
        };
    }

    function priorityScore(entry, history, now = new Date(), multiOnly = false) {
        const stats = history[entry?.id];
        const skills = Object.values(stats?.skills || {}).filter(value => value.seen > 0).length;
        if (!stats?.lastSeen || !skills || (multiOnly && skills < 2)) return 0;
        const age = (new Date(`${dateKey(now)}T12:00:00`) - new Date(`${stats.lastSeen}T12:00:00`)) / 86400000;
        if (age < 0 || age > 14) return 0;
        return (15 - age) + skills * 5;
    }
    function shuffled(values, random) {
        const result = [...values];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
    function prioritize(pool, index, history, count, random = Math.random, now = new Date()) {
        const ranked = pool.map(word => ({ word, score: priorityScore(index.resolve(word), history, now) }));
        if (!ranked.some(item => item.score > 0)) return null;
        // At most 40% priority draws; the rest is the original pool, including older vocabulary.
        const priority = shuffled(ranked.filter(item => item.score > 0), random)
            .sort((a, b) => b.score - a.score).slice(0, Math.ceil(Math.min(count, pool.length) * .4)).map(item => item.word);
        const prioritySet = new Set(priority);
        const rest = [
            ...shuffled(ranked.filter(item => !prioritySet.has(item.word) && item.score === 0).map(item => item.word), random),
            ...shuffled(ranked.filter(item => !prioritySet.has(item.word) && item.score > 0).map(item => item.word), random)
        ];
        const head = shuffled([...priority, ...rest.slice(0, Math.max(0, count - priority.length))], random);
        return [...head, ...rest.slice(Math.max(0, count - priority.length))];
    }

    function buildCatalog(index, tasks) {
        return tasks.map(task => ({ ...task, ids: [...new Set([
            ...index.matchText(task.text || '').map(entry => entry.id),
            ...(task.targetWords || []).map(word => index.resolve(word)?.id).filter(Boolean)
        ])] }));
    }
    function relatedTasks(ids, catalog, isCommon = () => true) {
        const wanted = new Set(ids);
        const documentFrequency = new Map();
        for (const task of catalog) for (const id of task.ids) documentFrequency.set(id, (documentFrequency.get(id) || 0) + 1);
        const suggestions = [];
        for (const skill of SKILLS) {
            const matches = catalog.filter(task => task.skill === skill).map(task => {
                const shared = task.ids.filter(id => wanted.has(id) && (skill !== 'schreiben' || isCommon(id)));
                return { task, shared, score: shared.reduce((sum, id) => sum + 1 / documentFrequency.get(id), 0) };
            }).filter(item => item.shared.length).sort((a, b) => b.score - a.score);
            if (matches.length) suggestions.push(matches[0]);
        }
        return suggestions;
    }
    return { SKILLS, STORAGE_KEY, normalize, idFor, plainText, createIndex, createLedger, dateKey, priorityScore, prioritize, buildCatalog, relatedTasks };
});
