/* Additive UI adapter. kapi-logic.js and every existing storage format stay intact. */
(function () {
    'use strict';
    if (!window.KapiVocabLinks || typeof vokabelGruppen === 'undefined') return;
    const core = window.KapiVocabLinks;
    // Runs before kapi-logic.js adds the old Hören/Lesen runtime views.
    const index = core.createIndex(vokabelGruppen);
    let ledger;
    try { ledger = core.createLedger(index, window.localStorage); } catch (_) { return; }
    const labels = { lesen: '📖 Lesen', hoeren: '🎧 Hören', sprechen: '🗣️ Sprechen', schreiben: '✍️ Schreiben' };
    let catalog = [];

    function safely(action) {
        try { return action(); } catch (_) { /* Connections cannot interrupt the original lesson. */ }
    }
    function tap(name, after) {
        const original = window[name];
        if (typeof original !== 'function') return;
        window[name] = function (...args) {
            const result = original.apply(this, args);
            safely(() => after(args, result));
            return result;
        };
    }
    function readJson(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; }
    }
    const idsIn = text => index.matchText(text).map(entry => entry.id);
    const entriesFor = words => [...new Map((words || []).map(word => index.resolve(word)).filter(Boolean).map(entry => [entry.id, entry])).values()];
    function readingText(task) {
        return [task.article || '', ...(task.segments || []), ...(task.people || []).map(person => person.text),
            ...(task.opinions || []).map(person => person.text), ...(task.sections || []).map(section => section.text),
            ...(task.options || []).map(option => option.text)].filter(Boolean).join('\n');
    }
    function makeCatalog() {
        const tasks = [];
        for (const task of LESEN_B2_TASKS) tasks.push({ key: `lesen:${task.id}`, skill: 'lesen', title: task.title,
            text: readingText(task), targetWords: task.targetWords, taskId: task.id });
        alleHoerenPruefungen.forEach((exam, examIndex) => exam.teile.forEach((part, partIndex) => tasks.push({
            key: `hoeren:${exam.id}:${partIndex}`, skill: 'hoeren', title: `${exam.name} · ${part.teilName}`,
            text: part.transcript || '', examIndex, partIndex
        })));
        teil1.forEach((task, taskIndex) => tasks.push({ key: `sprechen:1:${taskIndex}`, skill: 'sprechen',
            title: task.thema, text: [task.thema, ...(task.punkte || [])].join('\n'), teil: 1, taskIndex }));
        teil2.forEach((title, taskIndex) => tasks.push({ key: `sprechen:2:${taskIndex}`, skill: 'sprechen',
            title: String(title), text: String(title), teil: 2, taskIndex }));
        [schreibenTeil1, schreibenTeil2].forEach((pool, part) => pool.forEach((task, taskIndex) => tasks.push({
            key: `schreiben:${part + 1}:${taskIndex}`, skill: 'schreiben', title: task.title,
            text: [task.title, ...task.points].join('\n'), teil: part + 1, taskIndex
        })));
        return core.buildCatalog(index, tasks);
    }
    function sourceFor(skill, title, part) {
        return catalog.find(task => task.skill === skill && task.teil === part && task.title === title)?.key
            || `${skill}:saved:${encodeURIComponent(core.normalize(title))}`;
    }
    function sourceTitle(key, skill) {
        return catalog.find(task => task.key === key)?.title
            || (key.startsWith('livetalk:') ? 'Kịch bản luyện hằng ngày' : key.startsWith('hoer-word:') || key.startsWith('hoer-context:')
                ? 'Hör-Wortschatz' : labels[skill]);
    }
    function common(id) {
        const entry = index.entries.get(id);
        return entry && classifyGermanUsage(entry.word, entry.locations[0].groupKey).icon === '😸';
    }

    function openTask(task) {
        if (task.skill === 'lesen') return startLesenTask(task.taskId); // All existing review gates still run.
        if (task.skill === 'hoeren') { showHoerenTeile(task.examIndex); return startHoerenTeil(task.partIndex); }
        if (task.skill === 'sprechen') {
            setLearningFocus(true);
            const item = task.teil === 1 ? teil1[task.taskIndex] : teil2[task.taskIndex];
            return setupSprechenUI({ teil: task.teil, thema: task.teil === 1 ? item.thema : String(item), punkte: item.punkte || [] });
        }
        if (task.skill === 'schreiben') {
            startSchreibenTask(task.teil);
            // Select the recommended existing task before a mode, timer or draft is started.
            schreibenSession.task = (task.teil === 1 ? schreibenTeil1 : schreibenTeil2)[task.taskIndex];
            document.getElementById('message').innerHTML = renderSchreibenTaskCard();
        }
    }
    function openWord(id) {
        const entry = index.entries.get(id);
        if (!entry) return;
        const transcript = document.getElementById('transcript-page');
        if (transcript?.style.display === 'block') closeTranscriptPage();
        showLernenScreen(entry.locations[0].groupKey);
        let position = flashcardWords.findIndex(word => index.resolve(word)?.id === id);
        if (position < 0) {
            // Targeted navigation keeps the existing batch size and original word object.
            position = Math.max(0, flashcardWords.length - 1);
            flashcardWords[position] = entry.word;
        }
        currentFlashcardIndex = position;
        isFlipped = false;
        renderFlashcard();
    }
    function node(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }
    function button(text, action, title) {
        const element = node('button', 'vocab-links-button', text);
        element.type = 'button';
        if (title) element.title = title;
        element.addEventListener('click', event => { event.stopPropagation(); safely(action); });
        return element;
    }
    function replaceAddon(parent, name, element) {
        if (!parent) return;
        parent.querySelector(`[data-vocab-links="${name}"]`)?.remove();
        if (element) { element.dataset.vocabLinks = name; parent.appendChild(element); }
    }
    function wordsStrip(parent, entries, name, writing = false) {
        if (!entries.length) return replaceAddon(parent, name, null);
        const details = node('details', 'vocab-links-strip');
        details.appendChild(node('summary', '', `${entries.length} từ có sẵn trong Vokabeln · xem nhóm gốc`));
        if (writing) details.appendChild(node('small', 'vocab-links-muted', '😸 Được ưu tiên trong danh sách để cậu chọn từ dùng chủ động.'));
        const list = node('div', 'vocab-links-word-list');
        const sorted = writing ? [...entries].sort((a, b) => Number(common(b.id)) - Number(common(a.id))) : entries;
        for (const entry of sorted) {
            const location = entry.locations[0];
            const learned = ledger.stats(entry.id)?.learned;
            const tag = writing ? `${classifyGermanUsage(entry.word, location.groupKey).icon} ` : '';
            list.appendChild(button(`${tag}${entry.word.de} · ${location.title} · #${location.position}${learned ? ' · đã học' : ''}`, () => openWord(entry.id),
                `${location.title} · từ #${location.position}${learned ? ' · Cậu đã học từ này' : ' · Đã có trong kho'}`));
        }
        details.appendChild(list);
        replaceAddon(parent, name, details);
    }
    function cardHistory() {
        // Do not reveal German labels, examples or source titles on the recall side.
        if (!isFlipped) return;
        const entry = index.resolve(flashcardWords[currentFlashcardIndex]);
        const stats = entry && ledger.stats(entry.id);
        if (!stats || !Object.values(stats.skills).some(value => value.seen)) return;
        const card = document.getElementById('message')?.querySelector('div');
        const details = node('details', 'vocab-links-history');
        const counters = core.SKILLS.filter(skill => stats.skills[skill]?.seen).map(skill => `${labels[skill]} ×${stats.skills[skill].seen}`);
        const used = Object.values(stats.skills).reduce((sum, value) => sum + value.used, 0);
        details.appendChild(node('summary', '', `${counters.join(' · ')}${used ? ` · Đã tự dùng ×${used}` : ''}`));
        for (const skill of core.SKILLS) for (const source of stats.sources[skill] || []) {
            const task = catalog.find(item => item.key === source.key);
            const text = `${labels[skill]} · ${sourceTitle(source.key, skill)}`;
            if (task) details.appendChild(button(text, () => openTask(task), `Gặp ngày ${source.day}`));
            else details.appendChild(node('small', 'vocab-links-source', `${text} · ${source.day}`));
        }
        replaceAddon(card, 'history', details);
    }
    function relatedStrip(words, name, daily = false) {
        if (dailyMissionActive || daily) return; // The 7-minute mission remains exactly as before.
        const suggestions = core.relatedTasks(entriesFor(words).map(entry => entry.id), catalog, common);
        if (!suggestions.length) return;
        const details = node('details', 'vocab-links-strip');
        details.appendChild(node('summary', '', 'Gặp lại những từ này trong bài có sẵn'));
        for (const suggestion of suggestions) {
            const task = suggestion.task;
            details.appendChild(button(`${labels[task.skill]} · ${task.title}`, () => openTask(task),
                suggestion.shared.map(id => index.entries.get(id).word.de).join(' · ')));
        }
        replaceAddon(document.getElementById('feedback-area'), name, details);
    }
    function weeklyStrip() {
        const week = readJson('kapi_vocab_weekly_journal_v1', {}).current;
        if (!week?.weekStart) return;
        const counts = ledger.weeklyCounts(week.weekStart);
        const text = core.SKILLS.filter(skill => counts[skill].seen).map(skill => `${labels[skill]} ×${counts[skill].seen}`);
        if (!text.length) return;
        const element = node('div', 'vocab-links-week', `Từ trong kho xuất hiện tuần này: ${text.join(' · ')}`);
        const used = Object.values(counts).reduce((sum, value) => sum + value.used, 0);
        if (used) element.appendChild(node('small', 'vocab-links-source', `Đã tự dùng ×${used} trong bài nói/viết · lượt nhận diện, không thay số điểm cũ.`));
        replaceAddon(document.getElementById('buttons')?.querySelector('div'), 'week', element);
    }

    function recordReading(completion) {
        const task = LESEN_B2_TASKS.find(item => item.id === completion.taskId);
        const ids = [...(task ? idsIn(readingText(task)) : []), ...entriesFor(completion.reviewWords).map(entry => entry.id)];
        return ledger.record({ skill: 'lesen', sourceKey: `lesen:${completion.taskId}`, at: completion.date, seen: ids });
    }
    function recordSpeaking(item) {
        const ids = idsIn([item.transcript, item.replyTranscript].filter(Boolean).join('\n'));
        ledger.record({ skill: 'sprechen', sourceKey: sourceFor('sprechen', item.thema, item.teil), at: item.date, used: ids });
        return ids.map(id => index.entries.get(id));
    }
    function recordWriting(item) {
        const ids = idsIn(item.text);
        ledger.record({ skill: 'schreiben', sourceKey: sourceFor('schreiben', item.title, item.teil), at: item.date, used: ids });
        return ids.map(id => index.entries.get(id));
    }
    function recordLiveTalk(session) {
        for (const [rowIndex, row] of (session.rows || []).entries()) {
            const skill = row.source === 'hoeren' ? 'hoeren' : 'sprechen';
            ledger.record({ skill, sourceKey: `livetalk:${session.id}:${rowIndex}`, at: session.updatedAt || session.date,
                seen: idsIn([row.target, row.said, row.correction, row.native].filter(Boolean).join('\n')),
                used: skill === 'sprechen' ? idsIn(row.said) : [] });
        }
    }
    function currentHearing() {
        const exam = alleHoerenPruefungen[currentPruefungIndex];
        const part = exam?.teile[currentTeilIndex];
        return part && { key: `hoeren:${exam.id}:${currentTeilIndex}`, part };
    }
    function hearingEncounter() {
        const hearing = currentHearing();
        if (hearing) ledger.record({ skill: 'hoeren', sourceKey: hearing.key, seen: idsIn(hearing.part.transcript) });
    }
    function hearingTranscript() {
        hearingEncounter();
        const text = document.getElementById('transcript-text');
        // Sibling panel leaves the original transcript selection/highlight mechanism untouched.
        if (text) {
            let holder = document.getElementById('vocab-links-transcript');
            if (!holder) { holder = node('div', 'vocab-links-transcript'); holder.id = 'vocab-links-transcript'; text.after(holder); }
            wordsStrip(holder, index.matchText(currentHearing()?.part.transcript), 'transcript');
        }
    }
    function importExisting() {
        ledger.importOnce(() => {
            const journal = readJson('kapi_vocab_weekly_journal_v1', {});
            ledger.markLearned([journal.current, ...(journal.history || [])].filter(Boolean).flatMap(week => week.learnedWords || []));
            readJson('kapi_lesen_history_v1', []).forEach(recordReading);
            readJson('kapi_sprechen_history_v1', []).forEach(recordSpeaking);
            readJson('kapi_schreiben_history_v2', []).forEach(recordWriting);
            (readJson('kapi_livetalk_diary_v1', {}).sessions || []).forEach(recordLiveTalk);
        });
    }

    function prioritizeGame(name, count) {
        const original = window[name];
        if (typeof original !== 'function') return;
        window[name] = function (...args) {
            if (dailyMissionActive || !miniGame.words?.length) return original.apply(this, args);
            const priority = safely(() => core.prioritize(miniGame.words, index, ledger.read().words,
                typeof count === 'function' ? count() : count));
            if (!priority) return original.apply(this, args);
            const originalShuffle = window.shuffleArray;
            const target = miniGame.words;
            // Only the original draw of this pool changes, never answers/distractors or other games.
            window.shuffleArray = pool => pool === target ? [...priority] : originalShuffle(pool);
            try { return original.apply(this, args); }
            finally { window.shuffleArray = originalShuffle; }
        };
    }
    function install() {
        catalog = makeCatalog();
        importExisting();
        tap('recordLearnedWord', args => ledger.markLearned([args[0]]));
        tap('renderFlashcard', cardHistory);
        tap('finishQuiz', () => relatedStrip(quizWords, 'related', currentFlashcardGroup === 'daily'));
        tap('finishMiniGame', () => relatedStrip(miniGame.questions.map(item => item.word || item), 'related'));
        tap('showVocabWeeklyJournal', weeklyStrip);
        tap('submitLesenTask', () => { if (lesenCurrent?.submitted) recordReading(lesenCurrent.result); });
        tap('saveSprechenHistory', () => {
            const item = readJson('kapi_sprechen_history_v1', [])[0];
            if (item) wordsStrip(document.getElementById('ai-correction'), recordSpeaking(item), 'spoken');
        });
        tap('saveSchreibenHistory', () => {
            const item = readJson('kapi_schreiben_history_v2', [])[0];
            if (item) wordsStrip(document.getElementById('ai-correction'), recordWriting(item), 'written', true);
        });
        tap('showLiveTalkSaved', args => recordLiveTalk(args[0]));
        tap('submitHoeren', hearingEncounter);
        tap('startHoerenTeil', () => {
            const hearing = currentHearing();
            const audio = document.getElementById('feedback-area')?.querySelector('audio');
            if (audio && hearing) audio.addEventListener('ended', () => safely(() => ledger.record({
                skill: 'hoeren', sourceKey: hearing.key, seen: idsIn(hearing.part.transcript)
            })));
        });
        tap('openTranscriptPage', hearingTranscript);
        tap('hoerReveal', () => {
            const word = hoerReadWords().find(item => hoerKey(item.de) === hoerSession?.keys[hoerSession.index]);
            if (word) ledger.record({ skill: 'hoeren', sourceKey: `hoer-word:${hoerKey(word.de)}`, seen: entriesFor([word]).map(entry => entry.id) });
        });
        tap('hoerRevealContext', () => {
            const word = hoerReadWords().find(item => hoerKey(item.de) === hoerContextSession?.keys[hoerContextSession.index]);
            if (word) ledger.record({ skill: 'hoeren', sourceKey: `hoer-context:${hoerKey(word.de)}`, seen: idsIn(word.context?.dialogue) });
        });
        prioritizeGame('startChoiceMiniGame', () => miniGame.type === 'tornado' ? 12 : 10);
        prioritizeGame('startSentenceGame', 5);
        const originalReview = window.getKofferReviewWords;
        if (typeof originalReview === 'function') window.getKofferReviewWords = function (words, count = 2) {
            const oldReview = originalReview(words, count);
            return safely(() => {
                if (count <= 0) return oldReview;
                const history = ledger.read().words;
                const candidates = words.filter(word => core.priorityScore(index.resolve(word), history, new Date(), true) > 0);
                if (!candidates.length) return oldReview;
                const candidate = candidates[Math.floor(Math.random() * candidates.length)];
                return [candidate, ...oldReview.filter(word => core.normalize(word.de) !== core.normalize(candidate.de))].slice(0, count);
            }) || oldReview;
        };
        window.KapiVocabBridge = Object.freeze({ openWord, openTask });
    }
    document.addEventListener('DOMContentLoaded', () => safely(install), { once: true });
})();
