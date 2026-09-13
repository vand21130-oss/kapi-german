let currentLevel = "B2";
let countdown;
let currentPruefungIndex = 0;
let currentTeilIndex = 0;
let userAnswers = [];

// Quiz (Nhập text)
let quizWords = [];
let currentQuizIndex = 0;
let quizScore = 0;
let currentMissedWords = [];

// Game (Trắc nghiệm ABC)
let currentGameIndex = 0;
let gameScore = 0;

// 1. ĐIỀU HƯỚNG CƠ BẢN
function sayHallo() {
    document.getElementById("message").innerText = "Hallo! Wie geht's dir? 😊";
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi btn-green" onclick="goodAnswer()">😊 Mir geht's gut!</button>
        <button class="btn-kapi btn-red" onclick="badAnswer()">😢 Nicht so gut.</button>
        <button class="btn-kapi btn-home" onclick="goHome()">🏠 Zurück</button>
    `;
}

function goodAnswer() { document.getElementById("message").innerText = "Das freut mich! 🌟"; showLevels(); }
function badAnswer() { document.getElementById("message").innerText = "Oh nein! Hoffentlich wird dein Tag besser. 💛"; showLevels(); }

function goHome() {
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("timer").innerText = "";
    clearInterval(countdown);
    document.getElementById("message").innerText = "Guten Morgen! Schön, dich kennenzulernen! 🌟";
    document.getElementById("buttons").innerHTML = `
        <div style="position:relative;display:inline-block;margin:10px;">
            <div style="position:absolute;left:-45px;top:50%;transform:translateY(-50%);width:20px;height:40px;pointer-events:none;">
                <div style="position:absolute;top:0;left:0;width:12px;height:4px;background:#689f38;border-radius:4px;transform:rotate(35deg);"></div>
                <div style="position:absolute;top:18px;left:-4px;width:14px;height:4px;background:#689f38;border-radius:4px;"></div>
                <div style="position:absolute;bottom:0;left:0;width:12px;height:4px;background:#689f38;border-radius:4px;transform:rotate(-35deg);"></div>
            </div>

            <button class="btn-kapi" style="background:#4CAF50;color:white;margin:0;" onclick="sayHallo()">👋 Hallo Kapi →</button>

            <div style="position:absolute;right:-45px;top:50%;transform:translateY(-50%);width:20px;height:40px;pointer-events:none;">
                <div style="position:absolute;top:0;right:0;width:12px;height:4px;background:#689f38;border-radius:4px;transform:rotate(-35deg);"></div>
                <div style="position:absolute;top:18px;right:-4px;width:14px;height:4px;background:#689f38;border-radius:4px;"></div>
                <div style="position:absolute;bottom:0;right:0;width:12px;height:4px;background:#689f38;border-radius:4px;transform:rotate(35deg);"></div>
            </div>
        </div>
    `;
}

function showLevels() {
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("message").innerText = "Welches Niveau möchtest du heute üben? 📚";
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi btn-a1" onclick="chooseLevel('A1')">📗 A1</button>
        <button class="btn-kapi btn-a2" onclick="chooseLevel('A2')">📘 A2</button>
        <button class="btn-kapi btn-b1" onclick="chooseLevel('B1')">📒 B1</button>
        <button class="btn-kapi btn-b2" onclick="chooseLevel('B2')">📙 B2</button>
        <button class="btn-kapi btn-home" onclick="sayHallo()">⬅️ Zurück</button>
    `;
}

function chooseLevel(level) {
    if (level === 'A1' || level === 'A2' || level === 'B1') {
        document.getElementById("message").innerHTML = `<b>🐹 Ôi, Kapi chưa gặm tới phần ${level} này, Vịt đợi nhé!</b>`;
        document.getElementById("buttons").innerHTML = `<button class="btn-kapi btn-home" onclick="showLevels()">⬅️ Quay lại chọn B2 đi!</button>`;
        return; 
    }
    currentLevel = level;
    document.getElementById("message").innerText = "Super! Heute üben wir Deutsch auf Niveau " + level + " 🇩🇪";
    showLessons();
}

function showLessons() {
    document.getElementById("feedback-area").style.display = "none";
    clearInterval(countdown);
    document.getElementById("timer").innerText = "";
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi btn-lesson-1" onclick="chooseLesson('Hören')">🎧 Hören</button>
        <button class="btn-kapi btn-lesson-2" onclick="chooseLesson('Sprechen')">🗣️ Sprechen</button>
        <button class="btn-kapi btn-lesson-3" onclick="chooseLesson('Schreiben')">✍️ Schreiben</button>
        <button class="btn-kapi btn-lesson-5" onclick="chooseLesson('Vokabeln')">📝 Vokabeln & Spiele</button>
        <button class="btn-kapi" style="background-color: #ff9800; color: white;" onclick="showKapiStory('B2')">📖 Geschichten</button>
        <br><button class="btn-kapi btn-home" onclick="showLevels()">⬅️ Zurück</button>
    `;
}

function chooseLesson(lesson) {
    if (lesson === "Sprechen") {
        document.getElementById("message").innerHTML = "Welchen Teil möchtest du üben?";
        document.getElementById("buttons").innerHTML = `
            <button class="btn-kapi btn-lesson-2" onclick="showTeil1()">🎤 Teil 1</button>
            <button class="btn-kapi" style="background:#b3e5fc;" onclick="showTeil2()">🎤 Teil 2</button>
            <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>
        `;
    } else if (lesson === "Schreiben") {
        showSchreibenMenu();
    } else if (lesson === "Hören") {
        showHoerenMenu();
    } else if (lesson === "Vokabeln") {
        showVokabelHauptmenu();
    }
}

function startTimer() {
    clearInterval(countdown);
    let time = 180; 
    countdown = setInterval(function() {
        let m = Math.floor(time / 60);
        let s = time % 60;
        document.getElementById("timer").innerText = m + ":" + s.toString().padStart(2, "0");
        time--;
        if (time < 0) { clearInterval(countdown); document.getElementById("timer").innerText = "⏰ Zeit ist um!"; }
    }, 1000);
}

// ==========================================
// 2. VOKABELN MENU (HỌC TỪ & TRẮC NGHIỆM)
// ==========================================
function getSavedMissed() { return JSON.parse(localStorage.getItem('kapi_missed_vokabeln')) || []; }
function saveMissed(arr) { localStorage.setItem('kapi_missed_vokabeln', JSON.stringify(arr)); }

// ==========================================
// NHẬT KÝ TỪ VỰNG THEO TUẦN (CHẠY LOCAL, KHÔNG GỌI API)
// ==========================================
const VOCAB_JOURNAL_KEY = 'kapi_vocab_weekly_journal_v1';

function getLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentWeekStart() {
    const date = new Date();
    const day = date.getDay() || 7;
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - day + 1);
    return getLocalDateKey(date);
}

function createEmptyVocabWeek(weekStart = getCurrentWeekStart()) {
    return {
        weekStart,
        learnedWords: [],
        correctAnswers: 0,
        wrongAnswers: 0,
        groups: {},
        wordStats: {},
        note: ''
    };
}

function loadVocabJournal() {
    let journal;
    try {
        journal = JSON.parse(localStorage.getItem(VOCAB_JOURNAL_KEY));
    } catch (_) {
        journal = null;
    }

    if (!journal || !journal.current) {
        journal = { current: createEmptyVocabWeek(), history: [] };
    }

    journal.history = journal.history || [];
    journal.current.learnedWords = journal.current.learnedWords || [];
    journal.current.correctAnswers = journal.current.correctAnswers || 0;
    journal.current.wrongAnswers = journal.current.wrongAnswers || 0;
    journal.current.groups = journal.current.groups || {};
    journal.current.wordStats = journal.current.wordStats || {};
    journal.current.note = journal.current.note || '';

    const thisWeek = getCurrentWeekStart();
    if (journal.current.weekStart !== thisWeek) {
        const oldWeekHasData = journal.current.learnedWords.length ||
            journal.current.correctAnswers || journal.current.wrongAnswers || journal.current.note;

        if (oldWeekHasData) {
            journal.history = journal.history || [];
            journal.history.unshift({ ...journal.current, closedAt: getLocalDateKey(new Date()) });
            journal.history = journal.history.slice(0, 12);
        }
        journal.current = createEmptyVocabWeek(thisWeek);
        localStorage.setItem(VOCAB_JOURNAL_KEY, JSON.stringify(journal));
    }

    return journal;
}

function saveVocabJournal(journal) {
    localStorage.setItem(VOCAB_JOURNAL_KEY, JSON.stringify(journal));
}

function findWordGroup(word) {
    if (currentFlashcardGroup && currentFlashcardGroup !== 'review') return currentFlashcardGroup;
    for (const [groupName, group] of Object.entries(vokabelGruppen)) {
        if (group.woerter.some(item => item.de === word.de)) return groupName;
    }
    return 'khac';
}

function recordLearnedWord(word) {
    if (!word || !word.de) return;
    const journal = loadVocabJournal();
    const week = journal.current;
    const alreadyLearned = week.learnedWords.some(item => item.de === word.de);

    if (!alreadyLearned) {
        const group = findWordGroup(word);
        week.learnedWords.push({ de: word.de, vi: word.vi || '', group });
        week.groups[group] = (week.groups[group] || 0) + 1;
    }
    saveVocabJournal(journal);
}

function recordVocabAnswer(word, isCorrect) {
    if (!word || !word.de) return;
    recordLearnedWord(word);
    const journal = loadVocabJournal();
    const week = journal.current;
    const key = word.de.toLocaleLowerCase('de-DE');

    if (!week.wordStats[key]) {
        week.wordStats[key] = { de: word.de, vi: word.vi || '', correct: 0, wrong: 0 };
    }

    if (isCorrect) {
        week.correctAnswers++;
        week.wordStats[key].correct++;
    } else {
        week.wrongAnswers++;
        week.wordStats[key].wrong++;
    }
    saveVocabJournal(journal);
}

function saveVocabWeeklyNote() {
    const noteInput = document.getElementById('vocab-weekly-note');
    if (!noteInput) return;
    const journal = loadVocabJournal();
    journal.current.note = noteInput.value;
    saveVocabJournal(journal);

    const savedHint = document.getElementById('vocab-note-saved');
    if (savedHint) {
        savedHint.textContent = '✅ Đã lưu tự động';
        clearTimeout(window.kapiNoteSavedTimer);
        window.kapiNoteSavedTimer = setTimeout(() => savedHint.textContent = '', 1400);
    }
}

function getWeakVocabWords(week, limit = 6) {
    return Object.values(week.wordStats || {})
        .filter(item => item.wrong > 0)
        .sort((a, b) => (b.wrong - b.correct) - (a.wrong - a.correct) || b.wrong - a.wrong)
        .slice(0, limit);
}

function escapeVocabHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function showVocabWeeklyJournal() {
    const journal = loadVocabJournal();
    const week = journal.current;
    const attempts = week.correctAnswers + week.wrongAnswers;
    const accuracy = attempts ? Math.round(week.correctAnswers / attempts * 100) : 0;
    const weakWords = getWeakVocabWords(week);
    const topGroups = Object.entries(week.groups || {}).sort((a, b) => b[1] - a[1]);
    const lastWeek = (journal.history || [])[0];
    const recentLearned = week.learnedWords.slice(-12).reverse();

    const weakHtml = weakWords.length
        ? weakWords.map(item => `<li><b>${escapeVocabHtml(item.de)}</b> — sai ${item.wrong} lần</li>`).join('')
        : '<li>Chưa có từ nào bị ghi vào sổ truy nã 😸</li>';
    const groupsHtml = topGroups.length
        ? topGroups.slice(0, 4).map(([name, count]) => `<span style="display:inline-block;margin:3px;padding:5px 9px;border-radius:999px;background:#e8f5e9;color:#47733c;font-size:13px;">${name}: ${count}</span>`).join('')
        : '<span style="color:#9e9e9e;">Chưa bắt đầu học tuần này.</span>';
    const learnedHtml = recentLearned.length
        ? recentLearned.map(item => `<span title="${escapeVocabHtml(item.vi)}" style="display:inline-block;margin:3px;padding:6px 10px;border-radius:10px;background:#fff7e8;border:1px solid #ffe0b2;font-size:13px;"><b>${escapeVocabHtml(item.de)}</b></span>`).join('')
        : '<span style="color:#9e9e9e;">Lật flashcard sang mặt tiếng Đức để bắt đầu ghi nhật ký.</span>';
    const lastWeekHtml = lastWeek
        ? `<div style="margin-top:16px;padding:12px;background:#f7f3ff;border-radius:12px;color:#665c78;"><b>📦 Tuần trước (${lastWeek.weekStart})</b><br><small>${lastWeek.learnedWords.length} từ · ${lastWeek.correctAnswers} đúng · ${lastWeek.wrongAnswers} sai${lastWeek.note ? ' · Có ghi chú' : ''}</small></div>`
        : '';

    document.getElementById('message').innerHTML = `📒 Wochenbuch der Wörter`;
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('buttons').innerHTML = `
        <div style="max-width:680px;margin:0 auto;padding:22px;background:rgba(255,255,255,.92);border:2px solid #ffcc80;border-radius:22px;box-shadow:0 8px 20px rgba(211,84,0,.1);text-align:left;">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;text-align:center;">
                <div style="padding:12px;background:#fff3e0;border-radius:14px;"><b style="font-size:24px;color:#e67e22;">${week.learnedWords.length}</b><br><small>Từ đã học</small></div>
                <div style="padding:12px;background:#e8f5e9;border-radius:14px;"><b style="font-size:24px;color:#43a047;">${week.correctAnswers}</b><br><small>Trả lời đúng</small></div>
                <div style="padding:12px;background:#ffebee;border-radius:14px;"><b style="font-size:24px;color:#e57373;">${week.wrongAnswers}</b><br><small>Trả lời sai</small></div>
                <div style="padding:12px;background:#e3f2fd;border-radius:14px;"><b style="font-size:24px;color:#4285a8;">${accuracy}%</b><br><small>Chính xác</small></div>
            </div>
            <h3 style="margin:20px 0 8px;color:#5d7b50;">🌿 Nhóm đã gặm</h3>
            <div>${groupsHtml}</div>
            <h3 style="margin:18px 0 8px;color:#b07a3f;">🧺 Từ vừa học</h3>
            <div>${learnedHtml}</div>
            <h3 style="margin:18px 0 6px;color:#b75d69;">🔎 Cần chú ý</h3>
            <ul style="margin-top:6px;line-height:1.7;">${weakHtml}</ul>
            <h3 style="margin:18px 0 8px;color:#8d6e63;">✏️ Note của Vịt</h3>
            <textarea id="vocab-weekly-note" oninput="saveVocabWeeklyNote()" placeholder="Ví dụ: Nhớ Dativ sau mit; ôn lại nhóm Arbeit…" style="width:100%;min-height:120px;margin:0;resize:vertical;background:#fffdf7;border:2px dashed #ffcc80;"></textarea>
            <div id="vocab-note-saved" style="height:20px;margin-top:5px;text-align:right;color:#66a05a;font-size:13px;"></div>
            ${lastWeekHtml}
        </div>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu Từ Vựng</button>
    `;
    document.getElementById('vocab-weekly-note').value = week.note || '';
}

// Phân loại cách dùng hoàn toàn ở trình duyệt: không gọi API, không sửa kho từ.
// Thứ tự ưu tiên: chuyên ngành/hiếm -> văn viết/trang trọng -> đời sống.
function classifyGermanUsage(word, group = '') {
    const text = `${word.de || ''} ${word.vi || ''}`.toLocaleLowerCase('de-DE');

    const rareGroups = new Set(['diagnostik', 'verbandmaterial']);
    const rareSignals = [
        /kardiolog|orthopäd|stethoskop|blutdruckmessgerät|kanüle|infarkt|karies|mittelohrentzündung/,
        /herz-kreislauf|infektionskrank|vorsorge-untersuchung|heilfasten|erbgut|nährstoffmängel/,
        /feinstaubbelastung|treibhausgas|schwermetall|konjunkturell|geringqualifiziert/,
        /publikumsumfrage|beziehungskette|wegwerfgesellschaft|alleinernährer|vervielfachung/
    ];

    const formalSignals = [
        /bundestag|bundesagentur|geschäftsleitung|arbeitserlaubnis|lohnfortzahlung|probezeit/,
        /maßnahme|befürworter|opposition|wahlbeteiligung|menschenrechtsverletzung|steuerzahler/,
        /prüfungsamt|privatuniversität|hochschulabsolvent|erhebung|auswertung|kompetenzen/,
        /(?:^|\s)(anhand|angesichts|hinsichtlich|lediglich|ausschließlich|insbesondere|zudem|stets)(?:\s|$)/,
        /aus der studie geht hervor|dabei stellte sich heraus|in diesem zusammenhang|zur verfügung stehen/,
        /die kosten belaufen sich|vorgesehen sein|bezeichnet werden|reibungslos|sicherstellen/,
        /(?:ung|keit|heit|tion|tät|nis|schaft|enz|anz)(?:en)?(?:\s|$)/
    ];

    const dailySignals = [
        /hallo|pustekuchen|unfassbar|nervig|peinlich|dummerweise|aus versehen|das macht nichts/,
        /wie sieht.s mit|nicht so ganz|vor ein paar tagen|zum ersten mal|bald|unterwegs sein/,
        /einschlafen|herumlaufen|nachschauen|stöbern|jammern|büffeln|schnäppchen|rabatte/,
        /sich sorgen machen|heimweh|fernweh|blumenstrauß|rückflug|abflug|ankunft|einkauf/,
        /erkältung|grippe|schnupfen|müdigkeit|schwindel|durchfall|juckreiz|herzklopfen/
    ];

    let type = 'daily';
    if (rareGroups.has(group) || rareSignals.some(pattern => pattern.test(text))) type = 'rare';
    else if (dailySignals.some(pattern => pattern.test(text))) type = 'daily';
    else if (formalSignals.some(pattern => pattern.test(text))) type = 'formal';

    const labels = {
        daily:  { icon: '😸', text: 'Hay dùng trong đời sống', color: '#2e7d32', bg: '#e8f5e9' },
        formal: { icon: '😺', text: 'Hay gặp trong văn viết / trang trọng', color: '#8d6e00', bg: '#fff8d6' },
        rare:   { icon: '😿', text: 'Hiếm trong hội thoại / chuyên ngành', color: '#8e4b61', bg: '#fce4ec' }
    };
    return labels[type];
}

function renderUsageBadge(word) {
    const usage = classifyGermanUsage(word, currentFlashcardGroup);
    return `<div title="Ước lượng tự động, chạy local và không dùng API" style="margin-top:14px;padding:7px 12px;border-radius:999px;background:${usage.bg};color:${usage.color};font-size:14px;font-weight:700;line-height:1.35;text-align:center;">${usage.icon} ${usage.text}</div>`;
}

function showVokabelHauptmenu() {
    document.getElementById("feedback-area").style.display = "none";
    let missed = getSavedMissed();
    let weeklyJournal = loadVocabJournal().current;
    let warningHtml = missed.length > 0 ? `<button class="btn-grid btn-full" style="background:#ffb74d; color:white; justify-content:center; display:flex;" onclick="showLernenScreen('review')">⚠️ Sổ tay từ khó: Ôn ${missed.length} từ!</button>` : '';
    
    document.getElementById("message").innerText = "Was möchtest du im Alltag üben?";
    document.getElementById("buttons").innerHTML = `
        <div class="grid-container">
            ${warningHtml}
            <button class="btn-grid btn-full" style="background:linear-gradient(135deg,#fff8e1,#fce4ec);border:2px solid #ffcc80;text-align:center;color:#8d6e63;font-weight:bold;" onclick="showVocabWeeklyJournal()">📒 Nhật ký tuần này · ${weeklyJournal.learnedWords.length} từ · ${weeklyJournal.correctAnswers} đúng</button>
            <button class="btn-grid" onclick="showLernenScreen('arbeit')">💼 Arbeit</button>
            <button class="btn-grid" style="background:#e8f5e9;" onclick="showLernenScreen('umwelt')">🌍 Umwelt</button>
            <button class="btn-grid" style="background:#fff8e1;" onclick="showLernenScreen('kulinarik')">🍽️ Kulinarik</button>
            <button class="btn-grid" style="background:#fce4ec;" onclick="showLernenScreen('gesundheit')">💊 Gesundheit</button>
            <button class="btn-grid" style="background:#f3e5f5;" onclick="showLernenScreen('technologie')">💻 Technologie</button>
            <button class="btn-grid" style="background:#e8eaf6;" onclick="showLernenScreen('gesellschaft')">🏘️ Gesellschaft</button>
            <button class="btn-grid" style="background:#fff3e0;" onclick="showLernenScreen('studium')">🎓 Studium</button>
            <button class="btn-grid" style="background:#e0f7fa;" onclick="showLernenScreen('saetze')">💬 Sätze</button>
            
            <div style="grid-column: span 2; border-top: 1px solid #eee; margin-top: 10px; padding-top: 10px;">
                <p style="font-size:18px; color:#666; margin:0 0 10px 0; text-align:left;">🏥 Y Khoa</p>
            </div>
            <button class="btn-grid" style="background:#ffebee;" onclick="showLernenScreen('krankheiten')">🦠 Krankheiten</button>
            <button class="btn-grid" style="background:#e3f2fd;" onclick="showLernenScreen('diagnostik')">🩺 Diagnostik</button>
            <button class="btn-grid btn-full" style="background:#fce4ec; text-align:center;" onclick="showLernenScreen('verbandmaterial')">🩹 Verbandmaterial</button>
            
            <div style="grid-column: span 2; border-top: 1px solid #eee; margin-top: 10px; padding-top: 10px;">
                <p style="font-size:18px; color:#666; margin:0 0 10px 0; text-align:left;">🎮 Minigames</p>
            </div>
            <button class="btn-grid btn-full" style="background:#fff9c4; text-align:center; color:#f39c12; font-weight:bold;" onclick="startMultipleChoiceGame()">🎯 Game: Điền Từ Trắc Nghiệm</button>
            <button class="btn-grid btn-full" style="background:#dcedc8; text-align:center; color:#27ae60; font-weight:bold;" onclick="showSentenceGame()">✍️ Game: Đặt câu với từ ngẫu nhiên</button>
            <button class="btn-grid btn-full" style="background:#e8eaf6; text-align:center; color:#3f51b5; font-weight:bold;" onclick="startTornadoGame()">🌪️ Game: Lốc Xoáy Từ Vựng (Trộn Ngẫu Nhiên)</button>
        </div>
        <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>
    `;
}

// ==========================================
// 3. MÀN HÌNH HỌC TỪ (FLASHCARD) & QUIZ GÕ TỪ
// ==========================================
let flashcardWords = [];
let currentFlashcardIndex = 0;
let currentFlashcardGroup = '';
let isFlipped = false;

// Hàm trộn ngẫu nhiên mảng từ vựng (Xào bài)
function shuffleArray(array) {
    let shuffled = array.slice(); 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showLernenScreen(gruppe) {
    currentFlashcardGroup = gruppe;
    
    if (gruppe === 'review') {
        let missedWords = getSavedMissed();
        if(missedWords.length === 0) { alert("Sổ tay từ khó đang trống! Vịt giỏi quá!"); return; }
        // Xào bài từ khó và lấy tối đa 20 từ để ôn
        flashcardWords = shuffleArray(missedWords).slice(0, 20);
    } else {
        let allWords = vokabelGruppen[gruppe].woerter;
        if(allWords.length === 0) { alert("Chưa có từ vựng!"); return; }
        // XÀO BÀI VÀ CẮT LẤY 20 TỪ ĐỂ CHỐNG NGỘP! 
        flashcardWords = shuffleArray(allWords).slice(0, 20);
    }

    currentFlashcardIndex = 0;
    isFlipped = false;
    renderFlashcard();
}

// Hàm Ghim/Gỡ Ghim từ khó
function togglePinWord() {
    let w = flashcardWords[currentFlashcardIndex];
    let savedMissed = getSavedMissed();
    let isPinned = savedMissed.some(item => item.de === w.de);

    if (isPinned) {
        // Nếu đã ghim thì gỡ ra
        savedMissed = savedMissed.filter(item => item.de !== w.de);
    } else {
        // Chưa ghim thì lưu vào sổ tay
        savedMissed.push(w);
    }
    saveMissed(savedMissed);
    renderFlashcard(); // Vẽ lại thẻ để đổi màu nút
}

function renderFlashcard() {
    document.getElementById("feedback-area").style.display = "none";
    let w = flashcardWords[currentFlashcardIndex];
    
    // Kiểm tra xem từ này có trong sổ tay từ khó chưa
    let savedMissed = getSavedMissed();
    let isPinned = savedMissed.some(item => item.de === w.de);
    
    // Code giao diện Nút Ghim 📌
    let pinBtnHtml = `
        <button onclick="togglePinWord()" style="background: ${isPinned ? '#e74c3c' : '#ecf0f1'}; color: ${isPinned ? 'white' : '#7f8c8d'}; border: none; padding: 8px 15px; border-radius: 20px; font-weight: bold; cursor: pointer; transition: 0.2s; margin-bottom: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            ${isPinned ? '📌 Đã ghim vào Sổ tay' : '🤍 Ghim từ này lại'}
        </button>
    `;
    
    let cardContent = "";
    if (!isFlipped) {
        let bildHtml = w.bild ? `<img src="${w.bild}" style="width:120px;height:120px;object-fit:contain;margin-bottom:10px;"><br>` : '';
        cardContent = `
            ${bildHtml}
            <b style="font-size:28px; color:#2c3e50; text-align:center;">${w.vi}</b>
            <p style="font-size:15px; color:#95a5a6; margin-top:20px; font-style:italic;">👆 Chạm để lật xem tiếng Đức</p>
        `;
    } else {
        let bildHtml = w.bild ? `<img src="${w.bild}" style="width:120px;height:120px;object-fit:contain;margin-bottom:10px; opacity:0.5;"><br>` : '';
        cardContent = `
            ${bildHtml}
            <b style="font-size:32px; color:#2980b9; text-align:center;">${w.de}</b>
            ${renderUsageBadge(w)}
            <p style="font-size:15px; color:#95a5a6; margin-top:20px; font-style:italic;">👆 Chạm để lật lại</p>
        `;
    }

    document.getElementById("message").innerHTML = `
        <span style="font-size:16px;color:#7f8c8d; font-weight:bold;">Flashcard | Thẻ ${currentFlashcardIndex + 1}/${flashcardWords.length}</span><br><br>
        <div style="background: #fff; border: 2px solid #bdc3c7; border-radius: 20px; padding: 15px 20px; box-shadow: 0 8px 16px rgba(0,0,0,0.08); max-width: 350px; margin: 0 auto; min-height: 250px; display: flex; flex-direction: column; align-items: center; user-select: none; transition: 0.2s;">
            ${pinBtnHtml}
            <div onclick="flipCard()" style="cursor:pointer; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 10px;">
                ${cardContent}
            </div>
        </div>
    `;
    
    let btnHtml = `<div style="display:flex; justify-content: center; gap: 15px; max-width: 350px; margin: 0 auto; margin-top: 25px;">`;
    
    if (currentFlashcardIndex > 0) {
        btnHtml += `<button class="btn-kapi btn-home" style="margin:0; flex:1;" onclick="prevFlashcard()">⬅️ Trước</button>`;
    } else {
        btnHtml += `<div style="flex:1;"></div>`;
    }
    
    if (currentFlashcardIndex < flashcardWords.length - 1) {
        btnHtml += `<button class="btn-kapi btn-green" style="margin:0; flex:1;" onclick="nextFlashcard()">Tiếp ➡️</button>`;
    } else {
        btnHtml += `<button class="btn-kapi" style="margin:0; flex:1; background:#f39c12; color:white; font-weight:bold;" onclick="startSpecificQuiz('${currentFlashcardGroup}')">🎯 Làm Quiz</button>`;
    }
    
    btnHtml += `</div><br><button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Thoát</button>`;
    document.getElementById("buttons").innerHTML = btnHtml;
}

function flipCard() {
    isFlipped = !isFlipped;
    if (isFlipped) recordLearnedWord(flashcardWords[currentFlashcardIndex]);
    renderFlashcard();
}
function nextFlashcard() { currentFlashcardIndex++; isFlipped = false; renderFlashcard(); }
function prevFlashcard() { currentFlashcardIndex--; isFlipped = false; renderFlashcard(); }

function startSpecificQuiz(gruppe) {
    if (gruppe === 'review') {
        quizWords = [...flashcardWords];
    } else {
        quizWords = [...flashcardWords];
    }
    quizWords.sort(() => Math.random() - 0.5);
    currentQuizIndex = 0;
    quizScore = 0;
    currentMissedWords = [];
    showQuizQuestion();
}

function showQuizQuestion() {
    if (currentQuizIndex >= quizWords.length) { finishQuiz(); return; }
    let w = quizWords[currentQuizIndex];
    document.getElementById("feedback-area").style.display = "none";
    let bildHtml = w.bild ? `<img src="${w.bild}" style="width:150px;height:150px;object-fit:contain;border-radius:12px;margin-bottom:15px;"><br>` : '';

    document.getElementById("message").innerHTML = `
        <span style="font-size:16px;color:#7f8c8d;">Quiz | Câu ${currentQuizIndex + 1}/${quizWords.length}</span><br><br>
        ${bildHtml}
        <b style="font-size:28px; color:#2980b9;">${w.vi}</b>
        <p style="font-size:16px; color:#7f8c8d;">Gõ từ tiếng Đức tương ứng (kèm mạo từ der/die/das/sich):</p>
    `;
    
    document.getElementById("buttons").innerHTML = `
        <div style="max-width:500px; margin:0 auto;">
            <input type="text" id="vokabelInput" placeholder="Ví dụ: das Asthma" autocomplete="off" onkeypress="if(event.key === 'Enter') checkVokabelAnswer()">
            <button class="btn-kapi btn-green" style="width:100%; margin:0;" onclick="checkVokabelAnswer()">Kiểm tra</button>
        </div>
        <button class="btn-kapi btn-home" style="margin-top:20px;" onclick="showVokabelHauptmenu()">🚪 Thoát Quiz</button>
    `;
    setTimeout(() => document.getElementById("vokabelInput").focus(), 100);
}

function checkVokabelAnswer() {
    let input = document.getElementById("vokabelInput").value.trim().toLowerCase();
    let w = quizWords[currentQuizIndex];
    let correctAns = w.de.toLowerCase();
    let isCorrect = (input === correctAns);
    let savedMissed = getSavedMissed();
    let resultHtml = "";
    recordVocabAnswer(w, isCorrect);
    
    if (isCorrect) {
        quizScore++;
        // KHÔNG XÓA GHIM TỰ ĐỘNG - ĐỂ QUAY LỐC XOÁY!
        resultHtml = `
            <h3 style="color:#27ae60; margin:0;">✅ Chính xác!</h3>
            <p style="font-size:18px;"><b>${w.de}</b> = ${w.vi}</p>
            <p style="font-size:14px; color:#7f8c8d;"><i>(Từ này vẫn nằm trong Sổ tay để Kapi "quay lốc xoáy" hỏi lại vào hôm khác nhé! 🌪️)</i></p>
        `;
    } else {
        currentMissedWords.push(w);
        // Tự động ghim vào sổ tay nếu gõ sai (và nếu chưa có)
        if (!savedMissed.find(item => item.de === w.de)) savedMissed.push(w);
        resultHtml = `<h3 style="color:#c0392b; margin:0;">❌ Sai rồi Vịt ơi!</h3><p style="font-size:16px;">Cậu gõ: <s>${input || "(trống)"}</s></p><p style="font-size:20px; color:#27ae60;">Phải là: <b>${w.de}</b></p>`;
    }
    saveMissed(savedMissed);
    
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = resultHtml + `<button class="btn-kapi" style="background:#f39c12; color:white; width:100%; margin-left:0; margin-right:0;" onclick="nextVokabelQuestion()">➡️ Tiếp tục</button>`;
    document.getElementById("buttons").style.display = "none";
}

function nextVokabelQuestion() {
    document.getElementById("buttons").style.display = "block";
    currentQuizIndex++;
    showQuizQuestion();
}

function finishQuiz() {
    let percent = Math.round((quizScore / quizWords.length) * 100);
    document.getElementById("message").innerHTML = `<b>Kết quả Quiz! 🎉</b><br><br>${quizScore}/${quizWords.length} (${percent}%)`;
    let html = ``;
    if (currentMissedWords.length > 0) {
        html += `<h3 style="color:#e74c3c;">Các từ Vịt gõ sai (đã được lưu vào Sổ tay):</h3><ul style="text-align:left;">`;
        currentMissedWords.forEach(w => { html += `<li><b>${w.de}</b> (${w.vi})</li>`; });
        html += `</ul>`;
    } else { html += `<h3 style="color:#2ecc71;">Tuyệt vời! Không sai từ nào!</h3>`; }
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = html;
    document.getElementById("buttons").innerHTML = `<button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu Từ Vựng</button>`;
}

// ==========================================
// GAME 3: LỐC XOÁY TỪ VỰNG (ÔN TẬP TỔNG HỢP)
// ==========================================
function startTornadoGame() {
    let allWords = [];
    
    // Lôi TOÀN BỘ từ vựng ở tất cả các chủ đề ra
    for(let key in vokabelGruppen) { 
        allWords = allWords.concat(vokabelGruppen[key].woerter); 
    }
    
    // Lôi các từ trong "Sổ tay từ khó" ra và NHÂN ĐÔI chúng lên 
    let missedWords = getSavedMissed();
    if (missedWords.length > 0) {
        allWords = allWords.concat(missedWords).concat(missedWords); 
    }
    
    // Xóc đĩa toàn bộ và bốc ra đúng 20 từ
    quizWords = shuffleArray(allWords).slice(0, 20);
    
    // Khởi động Game!
    currentQuizIndex = 0;
    quizScore = 0;
    currentMissedWords = [];
    showQuizQuestion();
}

// ==========================================
// 4. GAME TRẮC NGHIỆM ĐIỀN TỪ
// ==========================================
function startMultipleChoiceGame() {
    currentGameIndex = 0;
    gameScore = 0;
    quizGameData.sort(() => Math.random() - 0.5);
    showMCQuestion();
}

function showMCQuestion() {
    if (currentGameIndex >= quizGameData.length) {
        document.getElementById("message").innerHTML = `<b>Chúc mừng! Cậu đã hoàn thành Game Điền Từ! 🎮</b><br><br>Điểm: ${gameScore}/${quizGameData.length}`;
        document.getElementById("feedback-area").style.display = "none";
        document.getElementById("buttons").innerHTML = `<button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu</button>`;
        return;
    }
    
    let q = quizGameData[currentGameIndex];
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("message").innerHTML = `
        <span style="font-size:16px;color:#7f8c8d;">Game Điền Từ | Câu ${currentGameIndex + 1}/${quizGameData.length}</span><br><br>
        <p style="font-size:22px; color:#2c3e50; font-weight:bold;">${q.question}</p>
    `;
    
    let html = `<div style="display:flex; flex-direction:column; gap:10px; max-width:500px; margin:0 auto;">`;
    q.options.forEach((opt, index) => {
        html += `<button class="btn-grid" style="text-align:center; background:#e3f2fd;" onclick="checkMCAnswer(${index})">${opt}</button>`;
    });
    html += `</div><br><button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Thoát Game</button>`;
    document.getElementById("buttons").innerHTML = html;
}

function checkMCAnswer(selectedIndex) {
    let q = quizGameData[currentGameIndex];
    let isCorrect = (selectedIndex === q.answer);
    
    let resultHtml = "";
    if (isCorrect) {
        gameScore++;
        resultHtml = `<h3 style="color:#27ae60; margin:0;">✅ Chính xác!</h3>`;
    } else {
        resultHtml = `<h3 style="color:#c0392b; margin:0;">❌ Tiếc quá Vịt ơi!</h3><p>Đáp án đúng là: <b>${q.options[q.answer]}</b></p>`;
    }
    
    resultHtml += `<div style="margin-top:10px; background:#e8f4f8; padding:10px; border-radius:5px; border-left: 4px solid #3498db;">
                    <span style="color:#2980b9; font-weight:bold;">💡 Giải thích:</span><br>
                    <span style="color:#34495e; font-size:15px;">${q.explanation}</span>
                   </div>`;
                   
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = resultHtml + `<button class="btn-kapi" style="background:#f39c12; color:white; width:100%; margin-left:0; margin-right:0;" onclick="nextMCQuestion()">➡️ Câu tiếp theo</button>`;
    document.getElementById("buttons").style.display = "none";
}
function nextMCQuestion() {
    currentGameIndex++;
    document.getElementById("buttons").style.display = "block";
    showMCQuestion();
}
// 5. GAME ĐẶT CÂU VỚI TỪ NGẪU NHIÊN
function showSentenceGame() {
    let allWords = [];
    for(let key in vokabelGruppen) { allWords = allWords.concat(vokabelGruppen[key].woerter); }
    let randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    
    document.getElementById("message").innerHTML = `
        <span style="font-size:18px; color:#e67e22;">Game: Hãy đặt 1 câu với từ này nhé!</span><br><br>
        <b style="font-size:30px; color:#2980b9;">${randomWord.de}</b> <br>
        <i style="font-size:16px; color:#7f8c8d;">(${randomWord.vi})</i>
    `;
    
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = `
        <textarea id="schreibenInput" rows="4" placeholder="Gõ câu của cậu vào đây, có chứa từ '${randomWord.de}' nhé..."></textarea>
        <div id="ai-correction" style="display:none; margin-top:10px; border-top:1px solid #eee; padding-top:15px;"></div>
    `;
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi btn-green" onclick="checkGrammar('schreibenInput')">🔍 Check Lỗi Câu Này</button>
        <button class="btn-kapi btn-home" onclick="showSentenceGame()">🔄 Đổi Từ Khác</button>
        <br><button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu</button>
    `;
}

// 6. SPRECHEN & SCHREIBEN
function showTeil1() {
    let thema = teil1[Math.floor(Math.random() * teil1.length)];
    setupSprechenUI("<b>🗣️ B2 Teil 1</b><br><br>" + thema.thema + "<br><br>• " + thema.punkte.join("<br>• "));
}

function showTeil2() {
    let thema = teil2[Math.floor(Math.random() * teil2.length)];
    setupSprechenUI("<b>🗣️ B2 Teil 2</b><br><br>" + thema);
}

function setupSprechenUI(titleHtml) {
    document.getElementById("message").innerHTML = titleHtml;
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = `
        <div id="transcript-text" class="transcript-box" contenteditable="true">
            <i>Click chuột vào đây, nhấn <b>Windows + H</b> und bắt đầu nói tiếng Đức...</i>
        </div>
        <div id="ai-correction" style="display:none; margin-top:15px; border-top:1px solid #ccc; padding-top:15px;"></div>
    `;
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi btn-green" onclick="checkGrammar('transcript-text')">🔍 Kiểm tra ngữ pháp</button>
        <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>
    `;
    startTimer();
}

function showSchreibenMenu() {
    document.getElementById("message").innerHTML = "✍️ Nhập đoạn văn của cậu vào đây:";
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = `
        <textarea id="schreibenInput" rows="6" placeholder="Gõ tiếng Đức vào đây Vịt nhé..."></textarea>
        <div id="ai-correction" style="display:none; margin-top:10px; border-top:1px solid #eee; padding-top:15px;"></div>
    `;
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi btn-green" onclick="checkGrammar('schreibenInput')">🔍 Soi lỗi ngay!</button>
        <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>
    `;
}

// ==========================================
// HÀM CHẤM ĐIỂM SCHREIBEN BẰNG AI XỊN (OPENROUTER)
// ==========================================
async function checkGrammar(inputId) {
    let element = document.getElementById(inputId);
    let text = element.tagName === "DIV" ? element.innerText.trim() : element.value.trim();
    
    if(!text || text.includes("Windows + H")) {
        return alert("Vịt chưa gõ hay đọc gì cả kìa!");
    }
    
    let aiCorrection = document.getElementById("ai-correction");
    aiCorrection.style.display = "block";
    aiCorrection.innerHTML = "<p style='color:#e67e22;'><i>Kapi đang vận công gọi Gemma 3 soi lỗi ngữ pháp... 🦫🔍</i></p>";
    
    try {
        const response = await fetch('/api/check', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
                cauVidu: text, 
                tuDuc: "Schreiben Übung" // Gửi bùa để qua cổng kiểm duyệt flashcard
            }) 
        });
        
        const data = await response.json();
        
        if (data.result) {
            aiCorrection.innerHTML = `
                <div style="background:#e8f4f8; padding:20px; border-radius:12px; border-left:5px solid #3498db; line-height: 1.7; font-size: 16px; color: #2c3e50; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color:#2980b9; margin-top:0; border-bottom: 1px dashed #bdc3c7; padding-bottom: 10px;">📝 Nhận xét của Kapi:</h3>
                    ${data.result}
                </div>`;
        } else {
            aiCorrection.innerHTML = `<p style="color:#e74c3c; font-weight:bold;">Lỗi AI: ${data.error}</p>`;
        }
    } catch(e) { 
        aiCorrection.innerHTML = `<p style="color:red; font-weight:bold;">Lỗi kết nối máy chủ API của Vịt rồi! (Check lại Vercel nha)</p>`; 
    }
}

// 7. HÖREN LOGIC
function showHoerenMenu() {
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("message").innerHTML = `🎧 Hôm nay Vịt muốn nghe gì?`;
    document.getElementById("buttons").innerHTML = `
        <div style="max-width:760px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:18px;">
            <button onclick="showGoetheHoerenMenu()" style="flex:1 1 280px;max-width:350px;min-height:220px;padding:24px;border:2px solid #9ccc65;border-radius:24px;background:linear-gradient(145deg,#f1f8e9,#dcedc8);box-shadow:0 8px 18px rgba(85,139,47,.14);cursor:pointer;text-align:left;color:#2c3e50;transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size:48px;margin-bottom:12px;">📝🎧</div>
                <div style="font-size:23px;font-weight:800;color:#558b2f;">Goethe B2 Hörtraining</div>
                <div style="font-size:15px;line-height:1.55;margin-top:9px;color:#607d5a;">Làm đề nghe theo từng Teil, chọn đáp án và xem giải thích chi tiết.</div>
                <div style="display:inline-block;margin-top:15px;padding:7px 13px;border-radius:999px;background:#7cb342;color:white;font-size:13px;font-weight:bold;">Vào kho đề ➜</div>
            </button>
            <a href="https://www.youtube.com/channel/UCfrNpDqhsl7sA4ZpI_ldUPg" target="_blank" rel="noopener noreferrer" style="box-sizing:border-box;flex:1 1 280px;max-width:350px;min-height:220px;padding:24px;border:2px solid #ffb74d;border-radius:24px;background:linear-gradient(145deg,#fff8e1,#fce4ec);box-shadow:0 8px 18px rgba(230,126,34,.14);cursor:pointer;text-align:left;color:#2c3e50;text-decoration:none;transition:transform .2s,box-shadow .2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                <div style="font-size:48px;margin-bottom:12px;">☕🐦</div>
                <div style="font-size:23px;font-weight:800;color:#d35400;">Kapi Café Podcast</div>
                <div style="font-size:15px;line-height:1.55;margin-top:9px;color:#795548;">Nghe hội thoại tiếng Đức B1+/B2 tự nhiên cùng Kapi trên YouTube.</div>
                <div style="display:inline-block;margin-top:15px;padding:7px 13px;border-radius:999px;background:#ff0000;color:white;font-size:13px;font-weight:bold;">▶ Mở YouTube</div>
            </a>
        </div>
        <button class="btn-kapi btn-home" style="margin-top:24px;" onclick="showLessons()">⬅️ Zurück</button>
    `;
}

function showGoetheHoerenMenu() {
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("message").innerHTML = `📝 Kho đề Hören - Trình độ ${currentLevel}`;
    let html = `<div style="max-width:600px;margin:0 auto;display:flex;flex-direction:column;gap:10px;">`;
    let hasExams = false;
    
    if (typeof alleHoerenPruefungen !== 'undefined') {
        alleHoerenPruefungen.forEach((pruefung, index) => {
            if (pruefung.niveau === currentLevel) {
                hasExams = true;
                html += `<button class="btn-grid" style="background:#dcedc8;" onclick="showHoerenTeile(${index})">📚 ${pruefung.name}</button>`;
            }
        });
    }

    if (!hasExams) html += `<p style="color:#e74c3c; font-size:18px;">Chưa có đề nghe nào cho trình độ này.</p>`;
    html += `</div>`;
    document.getElementById("buttons").innerHTML = html + `<button class="btn-kapi btn-home" onclick="showHoerenMenu()">⬅️ Hai lựa chọn Hören</button>`;
}

function showHoerenTeile(pruefungIndex) {
    currentPruefungIndex = pruefungIndex;
    let pruefung = alleHoerenPruefungen[pruefungIndex];
    document.getElementById("message").innerHTML = `🎧 ${pruefung.name}`;
    let html = `<div style="max-width:600px; margin:0 auto; display:flex; flex-direction:column; gap:10px;">`;
    pruefung.teile.forEach((teil, index) => {
        html += `<button class="btn-grid" style="background:#e1f5fe;" onclick="startHoerenTeil(${index})">▶️ ${teil.teilName}</button>`;
    });
    html += `</div>`;
    document.getElementById("buttons").innerHTML = html + `<button class="btn-kapi btn-home" onclick="showGoetheHoerenMenu()">⬅️ Chọn đề khác</button>`;
}

function startHoerenTeil(teilIndex) {
    currentTeilIndex = teilIndex;
    let teil = alleHoerenPruefungen[currentPruefungIndex].teile[teilIndex];
    userAnswers = new Array(teil.fragen.length).fill(null);
    document.getElementById("message").innerHTML = `<b>${teil.teilName}</b>`;
    document.getElementById("feedback-area").style.display = "block";
    
    let html = `
        <div style="background:#fff; padding:15px; border-bottom:2px solid #ddd; text-align:center;">
            <p style="color:#e67e22; font-weight:bold; margin-top:0;">Vừa nghe vừa chọn đáp án bên dưới nhé Vịt!</p>
            <audio controls style="width: 100%; outline: none;">
                <source src="${teil.audioSrc}" type="audio/mpeg">
            </audio>
        </div>
        <div style="padding:20px;">
    `;
    
    teil.fragen.forEach((q, qIndex) => {
        html += `<div style="margin-bottom:20px; border-bottom:1px dashed #ccc; padding-bottom:15px;">
                    <p style="font-weight:bold; font-size:18px; color:#2c3e50;">${q.frage}</p>
                    <div style="display:flex; flex-direction:column; gap:8px;">`;
        q.antworten.forEach((ans, aIndex) => {
            html += `<label style="cursor:pointer; display:flex; align-items:center; gap:10px; background:#f9f9f9; padding:10px; border-radius:8px; border:1px solid #ddd;">
                        <input type="radio" name="q_${qIndex}" value="${aIndex}" onchange="selectAnswer(${qIndex}, ${aIndex})" style="width:18px;height:18px;">
                        <span style="font-size:17px;">${ans}</span>
                     </label>`;
        });
        html += `</div></div>`;
    });
    
    html += `<button class="btn-kapi" style="background:#f39c12; color:white; width:100%; margin:0;" onclick="submitHoeren()">📝 Nộp bài & Xem giải thích</button></div>`;
    document.getElementById("feedback-area").innerHTML = html;
    document.getElementById("buttons").innerHTML = `<button class="btn-kapi btn-home" onclick="showHoerenTeile(${currentPruefungIndex})">⬅️ Quay lại</button>`;
}

function selectAnswer(qIndex, aIndex) { userAnswers[qIndex] = aIndex; }

function submitHoeren() {
    let teil = alleHoerenPruefungen[currentPruefungIndex].teile[currentTeilIndex];
    let score = 0;
    let resultHtml = `<div style="padding:20px;"><h2 style="text-align:center; color:#2c3e50;">Kết quả bài làm</h2>`;
    
    teil.fragen.forEach((q, qIndex) => {
        let isCorrect = (userAnswers[qIndex] === q.richtig);
        if (isCorrect) score++;
        let color = isCorrect ? "#2ecc71" : "#e74c3c";
        let icon = isCorrect ? "✅" : "❌";
        
        resultHtml += `<div style="margin-bottom:15px; padding:15px; border-radius:8px; border-left:5px solid ${color}; background:#fcfcfc;">`;
        resultHtml += `<h4 style="margin:0 0 10px 0;">${icon} ${q.frage}</h4>`;
        
        if (!isCorrect) {
            let userAnswerText = userAnswers[qIndex] !== null ? q.antworten[userAnswers[qIndex]] : "Chưa làm";
            resultHtml += `<p style="color:#e74c3c; margin:5px 0;">Cậu chọn: <s>${userAnswerText}</s></p>`;
        }
        resultHtml += `<p style="color:#27ae60; font-weight:bold; margin:5px 0;">Đáp án đúng: ${q.antworten[q.richtig]}</p>`;
        
        if (q.begruendung) {
            resultHtml += `<div style="margin-top:10px; background:#e8f4f8; padding:10px; border-radius:5px; border-left: 4px solid #3498db;">
                            <span style="color:#2980b9; font-weight:bold;">💡 Giải thích / Transcript:</span><br>
                            <span style="color:#34495e; font-size:15px;">${q.begruendung}</span>
                           </div>`;
        }
        resultHtml += `</div>`;
    });
    
    resultHtml += `
        <div style="text-align:center; margin-top:20px;">
            <h3 style="font-size:24px;">Điểm của cậu: <span style="color:#e67e22;">${score} / ${teil.fragen.length}</span></h3>
            <div style="display: flex; flex-direction: column; align-items: center; gap: 15px; margin-top: 15px;">
            <button class="btn-kapi btn-green" onclick="startHoerenTeil(${currentTeilIndex})"> 🔄 Nghe lại phần này </button>
            <button onclick="openTranscriptPage()" style="background: #fdf2f8; border: 2px dashed #fbcfe8; padding: 10px 25px; border-radius: 12px; color: #db2777; font-weight: bold; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.05); font-size: 16px; transition: 0.2s;">
                📖 Sang trang đọc Transkript
            </button>
        </div>
        </div></div>
    `;
    document.getElementById("feedback-area").innerHTML = resultHtml;
}

// =========================================================
// 8. TRUYỆN CỦA KAPI
// =========================================================
const storyLanguageTreasures = {
    1: {
        words: [
            { badge:'😸', phrase:'etwas erst einmal sacken lassen', meaning:'cần thời gian để tiếp nhận hoặc “tiêu hóa” một thông tin', tone:'Thân mật, rất tự nhiên', story:'Ich muss das Ganze erst mal sacken lassen.', native:'Ich muss das erst einmal verdauen.' },
            { badge:'😺', phrase:'eine Zusage bekommen / erhalten', meaning:'nhận được lời đồng ý hoặc thông báo trúng tuyển', tone:'Trung tính, thường gặp trong học tập và công việc', story:'Kapi hat die Zusage für sein Praktikum bekommen.', native:'Ich habe endlich eine Zusage erhalten.' },
            { badge:'😿', phrase:'das Wachssiegel', meaning:'con dấu bằng sáp', tone:'Khá hiếm; thường gặp trong truyện lịch sử hoặc thư trang trọng', story:'Der Brief trägt ein echtes Wachssiegel.', native:'Der Umschlag war sogar versiegelt.' }
        ],
        quiz:'Kapi kann die gute Nachricht noch kaum glauben. Er muss sie erst einmal ____ lassen.', options:['sacken','sinken','liegen'], answer:0
    },
    2: {
        words: [
            { badge:'😸', phrase:'das A und O sein', meaning:'là điều quan trọng cốt lõi nhất', tone:'Tự nhiên trong cả văn nói và văn viết', story:'Hygiene ist im Krankenhaus das A und O.', native:'Gute Vorbereitung ist das A und O.' },
            { badge:'😸', phrase:'wie angegossen sitzen', meaning:'vừa vặn hoàn hảo, thường nói về quần áo', tone:'Thân mật, giàu hình ảnh', story:'Der Kittel sitzt wie angegossen.', native:'Die Jacke passt wie angegossen.' },
            { badge:'😺', phrase:'makellos aussehen', meaning:'trông hoàn hảo, không có khuyết điểm', tone:'Trung tính đến trang trọng', story:'Kapi möchte am ersten Tag makellos aussehen.', native:'Du siehst richtig gepflegt aus.' }
        ],
        quiz:'Der neue Kittel passt Kapi perfekt. Er sitzt wie ____.', options:['angegossen','gegossen','gewachsen'], answer:0
    },
    3: {
        words: [
            { badge:'😺', phrase:'den Blutdruck messen', meaning:'đo huyết áp', tone:'Cụm chuyên môn nhưng rất thông dụng trong bệnh viện', story:'Kapi misst bei einem Patienten den Blutdruck.', native:'Ich messe kurz Ihren Blutdruck.' },
            { badge:'😸', phrase:'aufgeregt sein', meaning:'hồi hộp hoặc phấn khích', tone:'Rất thường dùng trong đời sống', story:'Am ersten Tag ist Kapi etwas aufgeregt.', native:'Ich bin ein bisschen nervös.' },
            { badge:'😺', phrase:'professionell auftreten', meaning:'thể hiện tác phong chuyên nghiệp', tone:'Công việc và văn viết', story:'Trotz seiner Nervosität tritt Kapi professionell auf.', native:'Er wirkt sehr professionell.' }
        ],
        quiz:'Vor einer Untersuchung sagt Kapi: „Ich ____ kurz Ihren Blutdruck.“', options:['messe','zähle','wiege'], answer:0
    },
    4: {
        words: [
            { badge:'😸', phrase:'sich mit jemandem austauschen', meaning:'trao đổi ý kiến hoặc thông tin với ai', tone:'Rất hữu ích trong đời sống và công việc', story:'Kapi tauscht sich mit seinem Kollegen aus.', native:'Wir sollten uns kurz dazu austauschen.' },
            { badge:'😺', phrase:'einen Rat befolgen', meaning:'làm theo một lời khuyên', tone:'Trung tính; collocation đáng học', story:'Kapi möchte den Rat seines Kollegen befolgen.', native:'Ich nehme mir deinen Rat zu Herzen.' },
            { badge:'😸', phrase:'hilfsbereit sein', meaning:'sẵn lòng giúp đỡ người khác', tone:'Thông dụng, tích cực', story:'Sein Kollege ist sehr hilfsbereit.', native:'Er hilft immer, wenn man ihn braucht.' }
        ],
        quiz:'Kapi und sein Kollege sprechen über ihre Erfahrungen. Sie tauschen sich ____.', options:['aus','ein','um'], answer:0
    },
    5: {
        words: [
            { badge:'😺', phrase:'die Vorräte aufstocken', meaning:'bổ sung thêm đồ dự trữ', tone:'Trung tính, thường gặp trong đời sống', story:'Kapi muss nach der Schicht seine Vorräte aufstocken.', native:'Ich muss wieder Lebensmittel einkaufen.' },
            { badge:'😿', phrase:'das Mindesthaltbarkeitsdatum', meaning:'hạn dùng tốt nhất; không nhất thiết là ngày thực phẩm lập tức hỏng', tone:'Từ dài đặc thù trên bao bì thực phẩm', story:'Kapi prüft das Mindesthaltbarkeitsdatum.', native:'Ist das noch haltbar?' },
            { badge:'😸', phrase:'auf etwas verzichten', meaning:'tự nguyện không dùng hoặc từ bỏ điều gì', tone:'Rất hay gặp ở B1–B2', story:'Kapi verzichtet heute auf Limonade.', native:'Ich lasse die Limo heute lieber weg.' }
        ],
        quiz:'Kapi mua thêm thực phẩm để dự trữ. Er möchte seine Vorräte ____.', options:['aufstocken','aufstellen','aufgeben'], answer:0
    },
    6: {
        words: [
            { badge:'😸', phrase:'völlig fertig sein', meaning:'mệt rã rời hoặc kiệt sức', tone:'Khẩu ngữ, người Đức dùng rất thường xuyên', story:'Biber ist völlig fertig.', native:'Ich bin total erledigt.' },
            { badge:'😿', phrase:'der Schüttelfrost', meaning:'cơn rét run / rét run toàn thân', tone:'Thuật ngữ y khoa và triệu chứng cụ thể', story:'Biber hat Fieber und Schüttelfrost.', native:'Ich zittere am ganzen Körper.' },
            { badge:'😺', phrase:'sich nicht überanstrengen', meaning:'không cố gắng quá sức', tone:'Trung tính, thường dùng khi khuyên về sức khỏe', story:'Du solltest dich nicht überanstrengen.', native:'Mach lieber langsam und ruh dich aus.' }
        ],
        quiz:'Biber nên nghỉ ngơi và không được cố quá sức: Er soll sich nicht ____.', options:['überanstrengen','überzeugen','unterhalten'], answer:0
    },
    7: {
        words: [
            { badge:'😿', phrase:'die Übergabe machen', meaning:'thực hiện bàn giao ca', tone:'Ngôn ngữ chuyên ngành điều dưỡng', story:'Am Morgen macht Kapi die Übergabe.', native:'Ich übergebe Ihnen jetzt die Patienten.' },
            { badge:'😺', phrase:'etwas meistern', meaning:'vượt qua hoặc xử lý thành công một thử thách', tone:'Tự nhiên trong văn nói và viết', story:'Kapi hat seine erste Nachtschicht gemeistert.', native:'Du hast das richtig gut geschafft.' },
            { badge:'😿', phrase:'die Vitalwerte kontrollieren', meaning:'kiểm tra các chỉ số sinh tồn', tone:'Ngôn ngữ chuyên môn bệnh viện', story:'Beim Rundgang kontrolliert Kapi die Vitalwerte.', native:'Ich kontrolliere kurz Ihre Vitalzeichen.' }
        ],
        quiz:'Kapi đã xử lý thành công ca đêm đầu tiên: Er hat sie ____.', options:['gemeistert','gemessen','gemischt'], answer:0
    }
};

function renderStoryLanguageBox(chapter) {
    const data = storyLanguageTreasures[chapter];
    if (!data) return '';

    const cards = data.words.map(word => `
        <div style="background:#fff;border:1px solid #dceee8;border-radius:14px;padding:15px;box-shadow:0 4px 10px rgba(44,98,80,.06);">
            <div style="font-size:18px;font-weight:800;color:#287c67;">${word.badge} ${word.phrase}</div>
            <div style="margin-top:6px;color:#455a64;">${word.meaning}</div>
            <div style="margin-top:8px;font-size:13px;color:#8d6e63;"><b>Sắc thái:</b> ${word.tone}</div>
            <div style="margin-top:10px;padding:9px 11px;background:#f5fbf9;border-radius:9px;"><b>📖 Trong truyện:</b><br><i>${word.story}</i></div>
            <div style="margin-top:7px;padding:9px 11px;background:#fff8e8;border-radius:9px;"><b>🇩🇪 Người Đức còn nói:</b><br><i>${word.native}</i></div>
        </div>
    `).join('');

    const options = data.options.map((option, index) => `
        <button onclick="checkStoryMiniQuiz(${chapter},${index},this)" style="padding:9px 14px;border:1px solid #ffcc80;border-radius:10px;background:#fff;cursor:pointer;font-weight:bold;">${option}</button>
    `).join('');

    return `
        <div style="background:linear-gradient(145deg,#e8f6f3,#fffaf0);padding:20px;border-radius:18px;text-align:left;max-width:900px;margin:0 auto;line-height:1.6;border:2px solid #cfe8df;">
            <h3 style="margin:0;color:#287c67;">💡 Sprachschätze aus dieser Folge</h3>
            <p style="margin:5px 0 16px;color:#6f7f79;font-size:14px;">Ít nhưng chất: cụm đáng học, sắc thái và cách người Đức thật sự nói.</p>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px;">${cards}</div>
            <div style="margin-top:16px;padding:15px;background:#fff;border:2px dashed #ffcc80;border-radius:13px;">
                <b>🎯 Mini-Quiz</b>
                <p style="margin:7px 0 10px;">${data.quiz}</p>
                <div style="display:flex;flex-wrap:wrap;gap:8px;">${options}</div>
                <div id="story-quiz-feedback-${chapter}" style="min-height:22px;margin-top:8px;font-weight:bold;"></div>
            </div>
        </div>
    `;
}

function checkStoryMiniQuiz(chapter, selectedIndex, button) {
    const data = storyLanguageTreasures[chapter];
    const feedback = document.getElementById(`story-quiz-feedback-${chapter}`);
    if (!data || !feedback) return;

    const buttons = button.parentElement.querySelectorAll('button');
    buttons.forEach((item, index) => {
        item.disabled = true;
        item.style.background = index === data.answer ? '#dcedc8' : '#fff';
        item.style.borderColor = index === data.answer ? '#7cb342' : '#ffcc80';
    });

    feedback.style.color = selectedIndex === data.answer ? '#388e3c' : '#c75b68';
    feedback.textContent = selectedIndex === data.answer
        ? '✅ Richtig! Kapi trao cậu một chiếc lá 🌿'
        : `❌ Suýt đúng rồi :vvvv Đáp án là “${data.options[data.answer]}”.`;
}

function showKapiStory(level, chapter = 1) {
    document.getElementById("feedback-area").style.display = "block";
    let resultHtml = "";
    let buttonContent = "";

    if (level === "A1" || level === "A2" || level === "B1") {
        resultHtml = `
            <div style="padding: 20px; background-color: #f8d7da; color: #721c24; border-radius: 10px; margin-top: 20px; text-align: center;">
                <h3 style="margin: 0;">Ôi, Kapi chưa gặm tới truyện của ${level}, Vịt đợi nhé! 🦫💦</h3>
            </div>
        `;
        buttonContent = `<button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>`;

    } else if (level === "B2") {

        // ================= TẬP 1 =================
        if (chapter === 1) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <div style="background-color: #fff3e0; padding: 15px; border-radius: 12px; margin-bottom: 20px; border: 2px dashed #ffb74d; display: inline-block;">
                        <p style="font-size: 18px; color: #d35400; font-weight: bold; margin: 0 0 5px 0;">
                            "Hallo zusammen! Ich bin Kapi. Möchtest du mich auf meiner Reise begleiten?"
                        </p>
                        <p style="font-size: 16px; color: #555; font-style: italic; margin: 0;">
                            (Xin chào! Tớ là Kapi. Cậu có muốn tham gia hành trình của tớ không? 🦫🎒)
                        </p>
                    </div>

                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 1: Kapis erster Tag im Krankenhaus</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap1.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(1)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>Kapi hat heute einen Brief mit einem echten <span class="vocab-highlight" data-vi="Ấn sáp">Wachssiegel</span> bekommen. Was für eine <span class="vocab-highlight" data-vi="Sự bất ngờ">Überraschung</span>! Es ist die <span class="vocab-highlight" data-vi="Thư xác nhận / Lời đồng ý">Zusage</span> für sein <span class="vocab-highlight" data-vi="Kỳ thực tập">Praktikum</span>. Die Freude ist so groß, Kapi muss das Ganze erst mal <span class="vocab-highlight" data-vi="Bình tĩnh lại để tiêu hóa thông tin (Idiom B2)">sacken lassen</span>.</p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>
                <button class="btn-kapi btn-green" onclick="showKapiStory('B2', 2)">Tập 2 ➡️</button>
            `;

        // ================= TẬP 2 =================
        } else if (chapter === 2) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 2: Vorbereitung auf das Praktikum</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap2.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(2)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>Kapi bereitet sich vor! Hygiene ist <span class="vocab-highlight" data-vi="Điều quan trọng nhất (Idiom)">das A und O</span>. Er kauft <span class="vocab-highlight" data-vi="Đồ ăn vặt giảm stress">Nervennahrung</span> und bügelt seinen Arztkittel, damit er <span class="vocab-highlight" data-vi="Hoàn hảo, không tì vết">makellos</span> aussieht. Der Kittel <span class="vocab-highlight" data-vi="Vừa in, vừa vặn hoàn hảo (Idiom)">sitzt wie angegossen</span>! Zum Schluss stellt er den Wecker, denn <span class="vocab-highlight" data-vi="Sự đúng giờ">Pünktlichkeit</span> ist das halbe Leben.</p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showKapiStory('B2', 1)">⬅️ Tập 1</button>
                <button class="btn-kapi btn-home" onclick="showLessons()">🏠 Menu</button>
                <button class="btn-kapi btn-green" onclick="showKapiStory('B2', 3)">Tập 3 ➡️</button>
            `;

        // ================= TẬP 3 =================
        } else if (chapter === 3) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 3: Kapi's First Day at the Hospital</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap3.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(3)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>
                            Kapi fühlt sich am ersten Tag etwas <span class="vocab-highlight" data-vi="hồi hộp, phấn khích">aufgeregt</span>. 
                            Im Krankenhaus ist <span class="vocab-highlight" data-vi="vệ sinh">Hygiene</span> das A und O. 
                            Kapi muss den <span class="vocab-highlight" data-vi="huyết áp">Blutdruck</span> bei Patienten <span class="vocab-highlight" data-vi="đo lường">messen</span>. 
                            Die Arbeit ist sehr <span class="vocab-highlight" data-vi="vất vả, căng thẳng">anstrengend</span>, 
                            aber Kapi arbeitet sehr <span class="vocab-highlight" data-vi="chuyên nghiệp">professionell</span>.
                        </p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showKapiStory('B2', 2)">⬅️ Tập 2</button>
                <button class="btn-kapi btn-home" onclick="showLessons()">🏠 Menu</button>
                <button class="btn-kapi btn-green" onclick="showKapiStory('B2', 4)">Tập 4 ➡️</button>
            `;
            
        // ================= TẬP 4 =================
        } else if (chapter === 4) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 4: Gespräche mit Kollegen</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap4.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(4)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>
                            Kapi und sein Kollege schauen sich den <span class="vocab-highlight" data-vi="Lịch trực">Dienstplan</span> an und <span class="vocab-highlight" data-vi="Trao đổi thông tin với nhau">tauschen sich aus</span>. 
                            Der Kollege ist sehr <span class="vocab-highlight" data-vi="Hay giúp đỡ, nhiệt tình">hilfsbereit</span> und teilt seine <span class="vocab-highlight" data-vi="Kinh nghiệm">Erfahrung</span>. 
                            Kapi ist sehr dankbar für diesen guten <span class="vocab-highlight" data-vi="Lời khuyên">Rat</span>.
                        </p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showKapiStory('B2', 3)">⬅️ Tập 3</button>
                <button class="btn-kapi btn-home" onclick="showLessons()">🏠 Menu</button>
                <button class="btn-kapi btn-green" onclick="showKapiStory('B2', 5)">Tập 5 ➡️</button>
            `;

        // ================= TẬP 5 =================
        } else if (chapter === 5) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 5: Einkauf im Supermarkt</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap5.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(5)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>
                            Nach der Schicht muss Kapi unbedingt seine <span class="vocab-highlight" data-vi="tích trữ thêm đồ">Vorräte aufstocken</span>. 
                            Er achtet auf seine Hautpflege und Gesundheit, weshalb er entscheidet, auf Limonade zu <span class="vocab-highlight" data-vi="tránh/từ bỏ">verzichten</span>. 
                            Bevor er etwas in den Korb legt, überprüft er genau das <span class="vocab-highlight" data-vi="hạn sử dụng">Mindesthaltbarkeitsdatum</span>. 
                            An der Kasse ist es <span class="vocab-highlight" data-vi="đông nghịt">völlig überfüllt</span>, sodass er ewig in der <span class="vocab-highlight" data-vi="xếp hàng">Schlange stehen</span> muss. 
                            Am Ende freut er sich nur noch auf seinen <span class="vocab-highlight" data-vi="hoàn toàn xứng đáng">wohlverdienten</span> Feierabend in der Wohnung.
                        </p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showKapiStory('B2', 4)">⬅️ Tập 4</button>
                <button class="btn-kapi btn-home" onclick="showLessons()">🏠 Menu</button>
                <button class="btn-kapi btn-green" onclick="showKapiStory('B2', 6)">Tập 6 ➡️</button>
            `;

        // ================= TẬP 6 =================
        } else if (chapter === 6) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 6: Kapi als Telefon-Arzt</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap6.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(6)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>
                            Biber ist <span class="vocab-highlight" data-vi="hoàn toàn kiệt sức">völlig fertig</span> und hat <span class="vocab-highlight" data-vi="ớn lạnh">Schüttelfrost</span>. 
                            Kapi empfiehlt <span class="vocab-highlight" data-vi="nghỉ ngơi tại giường">Bettruhe</span>, viel <span class="vocab-highlight" data-vi="chất lỏng">Flüssigkeit</span> und <span class="vocab-highlight" data-vi="mẹo dân gian">Hausmittel</span>. 
                            Das Wichtigste ist, <span class="vocab-highlight" data-vi="cố quá sức/lao lực">sich nicht zu überanstrengen</span>.
                        </p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showKapiStory('B2', 5)">⬅️ Tập 5</button>
                <button class="btn-kapi btn-home" onclick="showLessons()">🏠 Menu</button>
                <button class="btn-kapi btn-green" onclick="showKapiStory('B2', 7)">Tập 7 ➡️</button>
            `;

        // ================= TẬP 7 =================
        } else if (chapter === 7) {
            resultHtml = `
                <div style="text-align: center; animation: fadeIn 0.5s;">
                    <h3 style="color: #2980b9; margin-top: 10px; margin-bottom: 5px;">Tập 7: Die erste Nachtschicht</h3>
                    <p style="font-size: 15px; color: #e67e22; font-style: italic; margin-top: 0; margin-bottom: 15px;">
                        <b>P.S:</b> Vergiss nicht, das Bild zu vergrößern, um es besser lesen zu können! <br>
                        <span style="color: #7f8c8d;">(Nhớ phóng to ảnh lên để đọc cho dễ nha khum! 🦫🔍)</span>
                    </p>
                    
                    <img src="stories/tap7.jpg" style="width: 100%; max-width: 900px; height: auto; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); margin: 0 auto 20px auto; display: block;">
                    ${renderStoryLanguageBox(7)}
                    
                    <div style="background-color: #e8f6f3; padding: 20px; border-radius: 15px; text-align: left; max-width: 900px; margin: 0 auto; line-height: 1.8;">
                        <p style="margin-top: 0;"><b>💡 Từ vựng B2 đáng chú ý trong tập này (Di chuột vào từ in đậm nhé):</b></p>
                        <p>
                            Während der <span class="vocab-highlight" data-vi="ca trực đêm">Nachtschicht</span> muss Kapi <span class="vocab-highlight" data-vi="tỉnh táo">wach bleiben</span>. 
                            Beim <span class="vocab-highlight" data-vi="đi tuần / đi vòng kiểm tra">Rundgang</span> kontrolliert er die <span class="vocab-highlight" data-vi="chỉ số sinh tồn">Vitalwerte</span> der Patienten. 
                            Manchmal gibt es <span class="vocab-highlight" data-vi="không thể lường trước">unvorhersehbare</span> Notfälle. 
                            Am Morgen macht er die <span class="vocab-highlight" data-vi="sự bàn giao ca">Übergabe</span>. 
                            Danach ist er <span class="vocab-highlight" data-vi="thiếu ngủ / quá mệt mỏi">übermüdet</span>, aber er hat alles <span class="vocab-highlight" data-vi="hoàn thành xuất sắc">gemeistert</span>.
                        </p>
                    </div>
                </div>
            `;
            buttonContent = `
                <button class="btn-kapi btn-home" onclick="showKapiStory('B2', 6)">⬅️ Tập 6</button>
                <button class="btn-kapi btn-home" onclick="showLessons()">🏠 Menu</button>
                <button class="btn-kapi btn-green" onclick="alert('Mùa 1 khép lại ở đây! Cùng chờ đón Mùa 2 nhé Vịt! 🦫🎬')">Hết Tập 7 🔚</button>
            `;
        }
    }

    document.getElementById("feedback-area").innerHTML = resultHtml;
    // Ẩn khối chú thích đơn giản cũ; giữ nguyên trong code để không mất dữ liệu truyện.
    document.querySelectorAll('#feedback-area p').forEach(paragraph => {
        if (paragraph.textContent.trim().startsWith('💡 Từ vựng B2 đáng chú ý')) {
            paragraph.parentElement.style.display = 'none';
        }
    });
    document.getElementById("buttons").innerHTML = buttonContent;
}

// ==========================================
// 9. BÚT NHỚ HIGHLIGHT (HỖ TRỢ CẢ PC & MOBILE) 🍑✨
// ==========================================

let highlighterUI = document.createElement('div');
highlighterUI.style.position = 'fixed';
highlighterUI.style.bottom = '20px';
highlighterUI.style.right = '20px';
highlighterUI.style.zIndex = '9999';
highlighterUI.style.background = 'rgba(255, 255, 255, 0.95)';
highlighterUI.style.padding = '10px';
highlighterUI.style.borderRadius = '12px';
highlighterUI.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
highlighterUI.style.border = '2px solid #FFD1DC';
highlighterUI.style.textAlign = 'center';
highlighterUI.style.fontFamily = 'sans-serif';

highlighterUI.innerHTML = `
    <div style="font-size: 12px; color: #7f8c8d; margin-bottom: 8px; line-height: 1.5;">
        <i>💡 Highlighter Tip:</i><br>
        <b>💻 PC:</b> Hold Alt + select text<br>
        <b>📱 Mobile/iPad:</b> Select text then click button
    </div>
    <button onclick="applyPinkHighlight()" style="background:#FFD1DC; border:none; padding:8px 15px; border-radius:8px; cursor:pointer; font-weight:bold; color:#2c3e50; font-size:14px; box-shadow: 0 2px 4px rgba(255, 209, 220, 0.8);">
        🖍️ Highlight!
    </button>
`;
document.body.appendChild(highlighterUI);

window.applyPinkHighlight = function() {
    let selection = window.getSelection();
    let selectedText = selection.toString().trim();
    
    if (selectedText.length > 0) {
        try {
            let range = selection.getRangeAt(0);
            let span = document.createElement('span');
            
            span.style.backgroundColor = '#FFD1DC'; 
            span.style.color = '#2c3e50'; 
            span.style.borderRadius = '4px';
            span.style.padding = '2px 4px';
            
            range.surroundContents(span);
            selection.removeAllRanges(); 
        } catch (err) {
            alert("Kapi nhắc nhẹ: Cậu highlight từng đoạn thôi nhé, bôi đen vắt ngang qua 2 dòng hoặc 2 thẻ là bút nhớ bị kẹt đó! 🦫💦");
        }
    }
};

document.addEventListener('mouseup', function(e) {
    if (e.altKey) {
        applyPinkHighlight();
    }
});

// ==========================================
// 10. HÀM CHUYỂN TRANG TRANSCRIPT & LƯU GHI CHÚ
// ==========================================

window.openTranscriptPage = function() {
    document.getElementById("container").style.display = "none"; 
    document.getElementById("transcript-page").style.display = "block";

    let teil = alleHoerenPruefungen[currentPruefungIndex].teile[currentTeilIndex];
    document.getElementById("transcript-title").innerText = teil.teilName;
    document.getElementById("transcript-audio").src = teil.audioSrc;
    document.getElementById("transcript-text").innerHTML = teil.transcript || "<i>Kein Transkript verfügbar (Chưa có Transkript).</i>";

    // KAPI TỰ ĐỘNG TÌM LẠI GHI CHÚ CŨ (Nếu có)
    let noteKey = `kapi_note_exam_${currentPruefungIndex}_teil_${currentTeilIndex}`;
    let savedNote = localStorage.getItem(noteKey);
    let noteInput = document.getElementById("transcript-note");
    if(noteInput) noteInput.value = savedNote ? savedNote : "";
};

window.closeTranscriptPage = function() {
    let audioEl = document.getElementById("transcript-audio");
    if(audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0; 
    }
    
    document.getElementById("transcript-page").style.display = "none";
    document.getElementById("container").style.display = "block"; 
};

// HÀM TỰ ĐỘNG LƯU KHI VỊT GÕ CHỮ
window.saveTranscriptNote = function() {
    let noteKey = `kapi_note_exam_${currentPruefungIndex}_teil_${currentTeilIndex}`;
    let noteInput = document.getElementById("transcript-note");
    if(noteInput) {
        let currentNote = noteInput.value;
        localStorage.setItem(noteKey, currentNote);
    }
};
