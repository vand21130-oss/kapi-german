// Presentation helpers only: no grading, vocabulary migration or storage changes.
function lesenSplitSentences(text) {
    return (String(text).replace(/\s+/g, ' ').trim().match(/.*?(?:[.!?]+[”"»“]?(?=\s|$)|$)/g) || []).map(s => s.trim()).filter(Boolean);
}

function lesenReviewMeta(task = lesenCurrent?.task) {
    return typeof LESEN_REVIEW_DATA !== 'undefined' ? LESEN_REVIEW_DATA[task?.id] : null;
}

function lesenReviewSource(task, key) {
    if (key === 'example') return task.example?.text || '';
    const [field, id] = key.split('.');
    if (field === 'article' || field === 'segments') return task[field]?.[Number(id)] || '';
    const entry = (task[field] || []).find(item => String(item.id ?? item.number) === id);
    return entry?.text || '';
}

function lesenEvidenceMarkup(text, proofs) {
    const ranges = [];
    for (const proof of proofs) for (const keyword of proof.keywords) {
        let at = text.indexOf(keyword);
        while (at >= 0) {
            ranges.push({ start:at, end:at + keyword.length, numbers:new Set([proof.number]) });
            at = text.indexOf(keyword, at + keyword.length);
        }
    }
    ranges.sort((a,b) => a.start - b.start || b.end - a.end);
    const merged = [];
    for (const range of ranges) {
        const last = merged[merged.length - 1];
        if (last && range.start < last.end) {
            last.end = Math.max(last.end, range.end);
            range.numbers.forEach(number => last.numbers.add(number));
        } else merged.push(range);
    }
    let html = '', position = 0;
    for (const range of merged) {
        const numbers = [...range.numbers].sort((a,b) => a-b).join(' ');
        html += escapeVocabHtml(text.slice(position, range.start));
        html += `<u class="lesen-evidence" data-lesen-proof="${numbers}" title="Dẫn chứng câu ${numbers.replaceAll(' ', ', ')}">${escapeVocabHtml(text.slice(range.start, range.end))}</u>`;
        position = range.end;
    }
    return html + escapeVocabHtml(text.slice(position));
}

function lesenReviewPassage(text, key) {
    if (!lesenCurrent?.submitted) return escapeVocabHtml(text);
    const meta = lesenReviewMeta();
    const translations = meta?.passages[key];
    if (!translations) return escapeVocabHtml(text);
    return lesenSplitSentences(text).map((sentence, index) => {
        const proofs = [];
        for (const [number, question] of Object.entries(meta.questions)) {
            for (const [passage, line, keywords] of question.evidence) {
                if (passage === key && line === index) proofs.push({ number:Number(number), keywords });
            }
        }
        return `<span class="lesen-sentence"><span class="lesen-de-sentence" lang="de">${lesenEvidenceMarkup(sentence, proofs)}</span>${translations[index] ? `<span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(translations[index])}</span>` : ''}</span>`;
    }).join(' ');
}

function lesenReviewQuestionText(question) {
    const vi = lesenCurrent?.submitted && lesenReviewMeta()?.questions[question.number]?.vi;
    return `${escapeVocabHtml(question.text)}${vi ? `<span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(vi)}</span>` : ''}`;
}

function lesenReviewOptionText(text, question, id) {
    const vi = lesenCurrent?.submitted && lesenReviewMeta()?.questions[question.number]?.options?.[id];
    return `${escapeVocabHtml(text)}${vi ? `<span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(vi)}</span>` : ''}`;
}

function lesenReviewEvidence(question) {
    if (!lesenCurrent?.submitted) return '';
    const meta = lesenReviewMeta();
    const review = meta?.questions[question.number];
    if (!review) return '';
    const quotes = review.evidence.map(([key, index, keywords]) => {
        const sentence = lesenSplitSentences(lesenReviewSource(lesenCurrent.task, key))[index];
        if (!sentence) return '';
        const vi = meta.passages[key]?.[index];
        return `<blockquote><span lang="de">${lesenEvidenceMarkup(sentence, [{ number:question.number, keywords }])}</span>${vi ? `<span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(vi)}</span>` : ''}</blockquote>`;
    }).join('');
    return `<div class="lesen-proof"><b>🔎 Dẫn chứng trong bài</b>${quotes}<p>${escapeVocabHtml(review.link)}</p><button type="button" class="lesen-proof-link" onclick="lesenFocusEvidence(${question.number})">↗ Tìm keyword trong bài</button></div>`;
}

function lesenFocusEvidence(number) {
    document.querySelectorAll('.lesen-evidence-focused').forEach(node => node.classList.remove('lesen-evidence-focused'));
    const nodes = [...document.querySelectorAll('.lesen-readable-text [data-lesen-proof]')].filter(node => !node.closest('.lesen-proof') && node.dataset.lesenProof.split(' ').includes(String(number)));
    nodes.forEach(node => node.classList.add('lesen-evidence-focused'));
    nodes[0]?.scrollIntoView({ behavior:'smooth', block:'center' });
}

function lesenReviewWordSummary(result) {
    const words = result.reviewWords || [];
    return `<details class="lesen-word-summary"><summary>🧺 ${words.length} từ trong kho được giữ để ôn lại</summary>
        <p>Từ vẫn nằm ở nhóm gốc. Bôi hồng được giữ theo bài; sau khi nộp, từ khớp kho được ghi vào lịch sử Lesen và nhật ký từ vựng.</p>
        <p>${words.length >= 3 ? 'Trước bài đọc mới vào ngày sau, Vali chọn ngẫu nhiên 3 từ từ bài gần nhất có đủ từ. Vé qua cửa 24 giờ vẫn giữ nguyên.' : 'Bài này chưa có đủ 3 từ khớp kho cho lượt kiểm tra trước bài mới. Những từ dưới đây vẫn được giữ để ôn.'}</p>
        <p>Cậu có thể luyện ngay bằng nút game bên dưới. Game Vokabeln cũng có thể ưu tiên một phần từ vừa gặp. Gặp lại trong bài chưa có nghĩa là đã nhớ: lượt trả lời đúng/sai vẫn được ghi riêng.</p>
        <div class="lesen-review-words">${words.map(word => {
            const group = lesenFindVocabEntry(word.de)?.group;
            return `<button type="button" class="lesen-proof-link" onclick="lesenOpenReviewWord('${encodeURIComponent(word.de).replaceAll("'", '%27')}')">${escapeVocabHtml(word.de)}${group ? `<small>${escapeVocabHtml(group.title)}</small>` : ''}</button>`;
        }).join('')}</div>
        <p>Từ chưa có trong kho chỉ vào khay chờ khi cậu bấm “+ Đưa vào khay chờ”; không tự thêm.</p>
    </details>`;
}

function lesenOpenReviewWord(encoded) {
    const de = decodeURIComponent(encoded);
    if (window.KapiVocabBridge && window.KapiVocabLinks) return window.KapiVocabBridge.openWord(window.KapiVocabLinks.idFor(de));
    const entry = lesenFindVocabEntry(de);
    if (entry?.group) showLernenScreen(entry.group.key);
}

let dailyStorySpeech = null;
let dailyStoryVoiceWait = null;
let dailyStorySpeechToken = 0;

function dailyKofferStoryIndex() {
    return [...getTodayStudyMission().date].reduce((n,c) => n + c.charCodeAt(0), 0) % DAILY_KOFFER_STORIES.length;
}

function dailyStoryPlainText(story) {
    const box = document.createElement('div');
    box.innerHTML = story.text;
    return box.textContent || '';
}

function setDailyStoryAudioStatus(message) {
    const status = document.getElementById('daily-story-audio-status');
    if (status) status.textContent = message;
}

function stopDailyStoryAudio() {
    if (!dailyStorySpeech && !dailyStoryVoiceWait) return;
    dailyStorySpeechToken++;
    if (dailyStoryVoiceWait) {
        window.speechSynthesis?.removeEventListener?.('voiceschanged', dailyStoryVoiceWait.changed);
        clearTimeout(dailyStoryVoiceWait.timer);
        dailyStoryVoiceWait = null;
    }
    if (dailyStorySpeech) window.speechSynthesis?.cancel();
    dailyStorySpeech = null;
    const face = document.querySelector('#focus-mascot-slot .koffer-mascot');
    face?.classList.remove('talking');
    const pause = document.getElementById('daily-story-pause');
    if (pause) { pause.disabled = true; pause.textContent = '⏸ Tạm dừng'; }
    setDailyStoryAudioStatus('Đã dừng. Bấm nghe để đọc lại từ đầu.');
}

function playDailyKofferStory() {
    if (!getTodayStudyMission().completed || !document.getElementById('daily-story-audio-status')) return;
    stopDailyStoryAudio();
    if (!window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') {
        setDailyStoryAudioStatus('Trình duyệt này chưa hỗ trợ giọng đọc. Hãy mở bằng Chrome/Edge có giọng tiếng Đức.');
        return;
    }
    const token = ++dailyStorySpeechToken;
    const synth = window.speechSynthesis;
    const begin = () => {
        if (token !== dailyStorySpeechToken) return;
        const voice = synth.getVoices().find(item => /^de(?:-|_)/i.test(item.lang));
        if (!voice) {
            setDailyStoryAudioStatus('Chưa tìm thấy giọng tiếng Đức. Bật/cài giọng Đức của trình duyệt hoặc hệ điều hành rồi bấm nghe lại.');
            return;
        }
        const lines = lesenSplitSentences(dailyStoryPlainText(DAILY_KOFFER_STORIES[dailyKofferStoryIndex()]));
        let index = 0;
        const readNext = () => {
            if (token !== dailyStorySpeechToken) return;
            if (index >= lines.length) {
                dailyStorySpeech = null;
                document.getElementById('daily-story-pause').disabled = true;
                document.querySelector('#focus-mascot-slot .koffer-mascot')?.classList.remove('talking');
                setDailyStoryAudioStatus('Đã nghe hết truyện. Có thể nghe lại.');
                return;
            }
            const utterance = new SpeechSynthesisUtterance(lines[index++]);
            utterance.voice = voice; utterance.lang = voice.lang; utterance.rate = .82;
            utterance.onstart = () => {
                if (token !== dailyStorySpeechToken) return;
                document.getElementById('daily-story-pause').disabled = false;
                document.querySelector('#focus-mascot-slot .koffer-mascot')?.classList.add('talking');
                setDailyStoryAudioStatus(`Đang đọc · câu ${index}/${lines.length}`);
            };
            utterance.onend = readNext;
            utterance.onerror = event => {
                if (token !== dailyStorySpeechToken || event.error === 'canceled' || event.error === 'interrupted') return;
                stopDailyStoryAudio();
                setDailyStoryAudioStatus('Giọng đọc chưa phát được. Kiểm tra âm lượng/quyền âm thanh và thử nghe lại.');
            };
            dailyStorySpeech = utterance; synth.speak(utterance);
        };
        synth.cancel(); readNext();
    };
    if (synth.getVoices().some(item => /^de(?:-|_)/i.test(item.lang))) return begin();
    setDailyStoryAudioStatus('Đang tải giọng tiếng Đức…');
    const finish = () => {
        if (dailyStoryVoiceWait) {
            synth.removeEventListener?.('voiceschanged', dailyStoryVoiceWait.changed);
            clearTimeout(dailyStoryVoiceWait.timer);
            dailyStoryVoiceWait = null;
        }
        begin();
    };
    const changed = () => { if (synth.getVoices().some(item => /^de(?:-|_)/i.test(item.lang))) finish(); };
    dailyStoryVoiceWait = { changed, timer:setTimeout(finish, 1800) };
    synth.addEventListener?.('voiceschanged', changed);
}

function pauseDailyKofferStory() {
    if (!dailyStorySpeech) return;
    const synth = window.speechSynthesis;
    const button = document.getElementById('daily-story-pause');
    if (synth.paused) { synth.resume(); button.textContent = '⏸ Tạm dừng'; setDailyStoryAudioStatus('Đang đọc tiếp…'); }
    else { synth.pause(); button.textContent = '▶ Đọc tiếp'; setDailyStoryAudioStatus('Đã tạm dừng.'); }
}

function dailyStoryReviewHtml(story, index) {
    const review = DAILY_STORY_REVIEW_DATA[index];
    const sentences = lesenSplitSentences(dailyStoryPlainText(story));
    return `<div class="daily-story-player"><button type="button" class="lesen-proof-link" onclick="playDailyKofferStory()">🔊 Nghe truyện</button><button type="button" id="daily-story-pause" class="lesen-proof-link" onclick="pauseDailyKofferStory()" disabled>⏸ Tạm dừng</button><button type="button" class="lesen-proof-link" onclick="stopDailyStoryAudio()">⏹ Dừng</button><div id="daily-story-audio-status" role="status" aria-live="polite">Giọng tiếng Đức của trình duyệt · đọc chậm. Bấm nghe để bắt đầu.</div></div>
        <details class="daily-story-translation"><summary>🇩🇪 🇻🇳 Đọc song ngữ</summary>${sentences.map((de,i) => `<p><span lang="de">${escapeVocabHtml(de)}</span><span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(review.vi[i] || '')}</span></p>`).join('')}</details>
        <div id="daily-story-meaning" class="daily-story-meaning" role="status">Chạm từ in đậm để xem nghĩa trong câu, cách dùng và ví dụ.</div>
        <details class="daily-story-glossary"><summary>📎 Những cụm đáng hiểu trong truyện</summary>${review.glossary.map(item => `<p><b>${escapeVocabHtml(item.de)}</b> — ${escapeVocabHtml(item.vi)}<br><small>${escapeVocabHtml(item.note)}</small><br><span lang="de">${escapeVocabHtml(item.example)}</span><span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(item.exampleVi)}</span></p>`).join('')}</details>`;
}

function showDailyStoryMeaning(word) {
    const review = DAILY_STORY_REVIEW_DATA[dailyKofferStoryIndex()];
    const entry = review.glossary.find(item => item.de.includes(word.textContent.trim()));
    const box = document.getElementById('daily-story-meaning');
    if (!box) return;
    box.innerHTML = entry ? `<b>${escapeVocabHtml(entry.de)}</b> — ${escapeVocabHtml(entry.vi)}<p>${escapeVocabHtml(entry.note)}</p><span lang="de">${escapeVocabHtml(entry.example)}</span><span class="lesen-vi-sentence" lang="vi">${escapeVocabHtml(entry.exampleVi)}</span>` : `<b>${escapeVocabHtml(word.textContent)}</b> — ${escapeVocabHtml(word.dataset.vi || '')}`;
    box.scrollIntoView({ behavior:'smooth', block:'nearest' });
}
