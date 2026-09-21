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
function setLearningFocus(enabled, mascot = '') {
    document.body.classList.toggle('learning-focus', Boolean(enabled));
    let slot = document.getElementById('focus-mascot-slot');
    const message = document.getElementById('message');
    if (!slot && message) {
        slot = document.createElement('div');
        slot.id = 'focus-mascot-slot';
        message.parentNode.insertBefore(slot, message);
    }
    if (slot) {
        slot.innerHTML = enabled && mascot === 'koffer' ? renderKofferMascot('calm') : '';
        slot.style.display = enabled && mascot === 'koffer' ? 'block' : 'none';
    }
}

function sayHallo() {
    setLearningFocus(false);
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
    setLearningFocus(false);
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
    setLearningFocus(false);
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
    setLearningFocus(false);
    document.getElementById("feedback-area").style.display = "none";
    clearInterval(countdown);
    document.getElementById("timer").innerText = "";
    const todayMission = getTodayStudyMission();
    document.getElementById("message").innerHTML = renderTodayMissionCard(todayMission);
    document.getElementById("buttons").innerHTML = `
        <button class="btn-kapi" style="background:linear-gradient(135deg,#6f9d63,#9bbb72);color:white;border:3px solid #eef6df;box-shadow:0 8px 18px rgba(77,112,63,.22);" onclick="showTodayMission()">🎲 Hôm nay học gì?</button>
        <button class="btn-kapi btn-lesson-1" onclick="chooseLesson('Hören')">🎧 Hören</button>
        <button class="btn-kapi btn-lesson-2" onclick="chooseLesson('Sprechen')">🗣️ Sprechen</button>
        <button class="btn-kapi btn-lesson-3" onclick="chooseLesson('Schreiben')">✍️ Schreiben</button>
        <button class="btn-kapi btn-lesson-5" onclick="chooseLesson('Vokabeln')">📝 Vokabeln & Spiele</button>
        <button class="btn-kapi" style="background-color: #ff9800; color: white;" onclick="showKapiStory('B2')">📖 Geschichten</button>
        <br><button class="btn-kapi btn-home" onclick="showLevels()">⬅️ Zurück</button>
    `;
}

function chooseLesson(lesson) {
    setLearningFocus(true, lesson === 'Vokabeln' ? 'koffer' : '');
    if (lesson === "Sprechen") {
        document.getElementById("message").innerHTML = "Welchen Teil möchtest du üben?";
        document.getElementById("buttons").innerHTML = `
            <button class="btn-kapi btn-lesson-2" onclick="showTeil1()">🎤 Teil 1</button>
            <button class="btn-kapi" style="background:#b3e5fc;" onclick="showTeil2()">🎤 Teil 2</button>
            <button class="btn-kapi" style="background:linear-gradient(135deg,#fff0c9,#f7d7ce);color:#704b40;" onclick="showLiveTalkMenu()">☕ LiveTalk-Tagebuch</button>
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

// ==========================================
// NHIỆM VỤ CHUYÊN SÂU MỖI NGÀY + TRUYỆN CỦA VALI
// ==========================================
const TODAY_STUDY_KEY = 'kapi_today_study_v1';
const TODAY_STUDY_HISTORY_KEY = 'kapi_today_study_history_v1';
let activeTodayMission = null;

const TODAY_SKILLS = [
    { id:'hoeren', icon:'🎧', name:'Hören', minutes:30, detail:'Hoàn thành một Teil, xem lỗi và đọc lại transcript.' },
    { id:'lesen', icon:'📖', name:'Lesen', minutes:40, detail:'Đọc một tập truyện và vượt qua Mini-Quiz Sprachschätze.' },
    { id:'sprechen', icon:'🗣️', name:'Sprechen', minutes:30, detail:'Hoàn thành một Teil và nhận phiếu chấm của Mr. Efa.' },
    { id:'schreiben', icon:'✍️', name:'Schreiben', minutes:45, detail:'Viết trong 45 phút. Hết giờ ting ting và tự khóa bài.' },
    { id:'vokabeln', icon:'🧳', name:'Wortschatz', minutes:25, detail:'Học 8 từ và hoàn thành 5 câu kiểm tra cuối buổi.' }
];

const DAILY_KOFFER_STORIES = [
    { title:'Der verdächtige Regenschirm', text:'Am Morgen stand ein <b data-vi="đáng ngờ">verdächtiger</b> Regenschirm vor meiner Tür. Er gehörte niemandem, war aber bereits enttäuscht von mir. Ich nahm ihn mit. Seitdem regnet es nur innerhalb meiner Wohnung.', end:'🫩 „Tôi không giải thích thời tiết. Tôi chỉ kể chuyện.“' },
    { title:'Die höfliche Kartoffel', text:'Im Supermarkt bat mich eine Kartoffel sehr <b data-vi="lịch sự">höflich</b>, sie nicht zu kaufen. Sie habe am Montag einen wichtigen Termin. Ich respektierte ihre Planung und kaufte stattdessen eine Zwiebel ohne Zukunftspläne.', end:'🫩 „Củ khoai có lịch trình. Bạn cũng nên có.“' },
    { title:'Der Bus ohne Motivation', text:'Der Bus kam pünktlich, öffnete die Tür und sagte, er fühle sich heute nicht <b data-vi="có trách nhiệm">zuständig</b>. Alle Fahrgäste nickten verständnisvoll. Dann gingen wir gemeinsam zu Fuß, während der Bus hinter uns langsam Urlaub machte.', end:'🫩 „Phương tiện đã nghỉ việc. Tôi thì chưa được phép.“' },
    { title:'Ein Termin mit dem Kühlschrank', text:'Mein Kühlschrank wollte ein ernstes Gespräch führen. Er sei mit meiner <b data-vi="sự thiếu quyết đoán">Unentschlossenheit</b> unzufrieden: Jede Nacht öffne ich die Tür und nehme trotzdem nichts. Nun verlangt er feste Besuchszeiten.', end:'🫩 „Ngay cả tủ lạnh cũng đã đặt ranh giới.“' },
    { title:'Die Taube im Bewerbungsgespräch', text:'Eine Taube bewarb sich als Büroleiterin. Auf die Frage nach ihrer größten Stärke antwortete sie: „Ich kann gleichzeitig <b data-vi="kiên trì">hartnäckig</b> sein und Brot beobachten.“ Sie wurde sofort eingestellt.', end:'🫩 „Năng lực phù hợp thị trường. Tôi không có ý kiến.“' },
    { title:'Der Aufzug zum Dienstag', text:'Ich drückte im Aufzug auf den dritten Stock. Die Anzeige antwortete: Dienstag. Nach einer <b data-vi="sự do dự">kurzen Zögerung</b> stieg ich aus. Man sollte Maschinen nicht widersprechen, die Kalender bedienen können.', end:'🫩 „Bạn đến sai ngày. Vẫn hơn là không đến.“' }
];

function todayDateKey(date = new Date()) {
    const y = date.getFullYear();
    return `${y}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function readTodayHistory() {
    try { return JSON.parse(localStorage.getItem(TODAY_STUDY_HISTORY_KEY)) || []; } catch (_) { return []; }
}

function getTodayStudyMission() {
    const today = todayDateKey();
    try {
        const saved = JSON.parse(localStorage.getItem(TODAY_STUDY_KEY));
        if (saved && saved.date === today) return saved;
    } catch (_) {}
    const history = readTodayHistory();
    const yesterdaySkill = history[0]?.skill;
    let pool = TODAY_SKILLS.filter(item => item.id !== yesterdaySkill);
    if (!pool.length) pool = TODAY_SKILLS;
    const seed = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const picked = pool[seed % pool.length];
    const mission = { date:today, skill:picked.id, changed:false, completed:false, storyOpened:false };
    localStorage.setItem(TODAY_STUDY_KEY, JSON.stringify(mission));
    return mission;
}

function saveTodayStudyMission(mission) {
    localStorage.setItem(TODAY_STUDY_KEY, JSON.stringify(mission));
    activeTodayMission = mission;
}

function getTodaySkill(mission = getTodayStudyMission()) {
    return TODAY_SKILLS.find(item => item.id === mission.skill) || TODAY_SKILLS[0];
}

function renderTodayMissionCard(mission) {
    const skill = getTodaySkill(mission);
    return `<div style="max-width:720px;margin:0 auto 18px;padding:18px 20px;border:3px solid ${mission.completed ? '#8bc34a' : '#b8cf83'};border-radius:22px;background:linear-gradient(145deg,#fbfff3,#fff7e7);box-shadow:0 9px 20px rgba(79,103,58,.13);">
        <div style="font-size:13px;font-weight:900;letter-spacing:1.2px;color:#778b55;">${mission.completed ? '✅ HỒ SƠ HÔM NAY ĐÃ HOÀN THÀNH' : '🐘 MR. EFA ĐÃ CHỌN HỒ SƠ HÔM NAY'}</div>
        <div style="font-size:28px;font-weight:900;color:#3f5d38;margin:6px 0;">${skill.icon} ${skill.name} · ${skill.minutes} phút</div>
        <div style="color:#71806b;font-size:14px;">${mission.completed ? 'Vali đã buộc phải thực hiện nghĩa vụ kể chuyện.' : skill.detail}</div>
    </div>`;
}

function showTodayMission() {
    setLearningFocus(true, 'koffer');
    const mission = getTodayStudyMission();
    activeTodayMission = mission;
    const skill = getTodaySkill(mission);
    document.getElementById('message').innerHTML = renderTodayMissionCard(mission);
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:720px;margin:auto;padding:18px;border:2px solid #d5c4af;border-radius:18px;background:rgba(255,253,247,.92);color:#654f45;line-height:1.6;">
        <b>${skill.icon} Một kỹ năng duy nhất, học cho ra học:</b><br>${skill.detail}<br>
        <small>${mission.changed ? '🎲 Quyền đổi hôm nay đã sử dụng.' : '🎲 Cậu được đổi đúng một lần trong ngày.'}</small>
        <div style="margin-top:12px;padding:12px;border-radius:12px;background:${mission.completed ? '#eef7df' : '#f3eee8'};">🫩 ${mission.completed ? '“Giao dịch đã hoàn tất. Tôi sẽ kể đúng một chuyện.”' : '“Câu chuyện đang ở đây. Quyền truy cập của bạn thì không.”'}</div>
    </div>`;
    document.getElementById('buttons').innerHTML = `
        ${mission.completed
            ? '<button class="btn-kapi" style="background:#8d6e63;color:white;" onclick="openDailyKofferStory()">🎁 Nghe vali kể chuyện</button>'
            : `<button class="btn-kapi btn-green" onclick="startTodayMission()">▶ Bắt đầu ${skill.name}</button>`}
        ${!mission.completed && !mission.changed ? '<button class="btn-kapi" style="background:#ffe0b2;" onclick="changeTodayMission()">🎲 Đổi nhiệm vụ một lần</button>' : ''}
        ${!mission.completed ? '<button class="btn-kapi" style="background:#eee;color:#6d4c41;" onclick="tryLockedKofferStory()">🔒 Kể chuyện ngay</button>' : ''}
        <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>`;
}

function changeTodayMission() {
    const mission = getTodayStudyMission();
    if (mission.changed || mission.completed) return showTodayMission();
    const alternatives = TODAY_SKILLS.filter(item => item.id !== mission.skill);
    const next = alternatives[Math.floor(Math.random() * alternatives.length)];
    mission.skill = next.id;
    mission.changed = true;
    saveTodayStudyMission(mission);
    showTodayMission();
}

function startTodayMission() {
    const mission = getTodayStudyMission();
    activeTodayMission = mission;
    if (mission.completed) return openDailyKofferStory();
    if (mission.skill === 'hoeren') return showGoetheHoerenMenu();
    if (mission.skill === 'sprechen') return chooseLesson('Sprechen');
    if (mission.skill === 'vokabeln') return startDailyVocabMission();
    if (mission.skill === 'lesen') {
        const chapter = 1 + ([...mission.date].reduce((n,c)=>n+c.charCodeAt(0),0) % 7);
        return showKapiStory('B2', chapter);
    }
    if (mission.skill === 'schreiben') {
        const teil = Math.random() < .65 ? 1 : 2;
        const pool = teil === 1 ? schreibenTeil1 : schreibenTeil2;
        schreibenSession = { teil, task:pool[Math.floor(Math.random()*pool.length)], mode:'exam', startedAt:Date.now(), dailyMission:true };
        return beginSchreiben('exam');
    }
}

function tryLockedKofferStory() {
    const lines = ['Nút hoạt động bình thường. Người dùng thì chưa.','Tôi không kể chuyện bằng tín dụng.','Tôi nhận thanh toán bằng bài tập, không nhận ánh mắt 🥺.','Bạn bấm thêm lần nữa cũng không làm bài tự hoàn thành.','Hoàn thành nhiệm vụ trước. Tình cảm không thay thế được quy trình.'];
    alert('🫩 “' + lines[Math.floor(Math.random()*lines.length)] + '”');
}

function completeTodayStudyMission(skillId) {
    const mission = getTodayStudyMission();
    if (!activeTodayMission || mission.completed || mission.skill !== skillId) return false;
    mission.completed = true;
    mission.completedAt = new Date().toISOString();
    saveTodayStudyMission(mission);
    const history = readTodayHistory().filter(item => item.date !== mission.date);
    history.unshift({ date:mission.date, skill:mission.skill, completedAt:mission.completedAt });
    localStorage.setItem(TODAY_STUDY_HISTORY_KEY, JSON.stringify(history.slice(0,31)));
    if (typeof window.kapiRecordStudyCompletion === 'function') {
        window.kapiRecordStudyCompletion(skillId);
    }
    setTimeout(() => {
        const buttons = document.getElementById('buttons');
        if (buttons && !document.getElementById('daily-koffer-reward-btn')) {
            buttons.insertAdjacentHTML('afterbegin', '<button id="daily-koffer-reward-btn" class="btn-kapi" style="background:#8d6e63;color:white;box-shadow:0 6px 14px rgba(93,64,55,.22);" onclick="openDailyKofferStory()">🎁 Nhiệm vụ xong · Nghe vali kể chuyện</button>');
        }
    }, 350);
    return true;
}

function openDailyKofferStory() {
    const mission = getTodayStudyMission();
    if (!mission.completed) return tryLockedKofferStory();
    const index = [...mission.date].reduce((n,c)=>n+c.charCodeAt(0),0) % DAILY_KOFFER_STORIES.length;
    const story = DAILY_KOFFER_STORIES[index];
    mission.storyOpened = true;
    saveTodayStudyMission(mission);
    setLearningFocus(true, 'koffer');
    document.getElementById('message').innerHTML = `<div style="font-size:29px;font-weight:900;color:#6d4c41;">🧳 ${story.title}</div>`;
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:700px;margin:auto;padding:25px;border:2px solid #d7c3ae;border-radius:22px;background:#fffdf8;box-shadow:0 9px 20px rgba(80,60,47,.12);text-align:left;line-height:1.85;font-size:19px;color:#493b35;">
        <div style="font-size:13px;color:#9a8174;margin-bottom:10px;">🫩 EINE VÖLLIG NOTWENDIGE GESCHICHTE</div>
        <p>${story.text}</p><div style="border-top:1px dashed #cdb8a6;padding-top:13px;color:#795548;font-style:italic;">${story.end}</div>
        <small style="display:block;margin-top:12px;color:#9b8b82;">Chạm hoặc rê vào từ in đậm để xem nghĩa.</small>
    </div>`;
    document.querySelectorAll('#feedback-area b[data-vi]').forEach(word => {
        word.style.cssText = 'color:#d26939;border-bottom:2px dotted #d26939;cursor:help;';
        word.title = word.dataset.vi;
        word.onclick = () => alert(`${word.textContent}: ${word.dataset.vi}`);
    });
    document.getElementById('buttons').innerHTML = `<button class="btn-kapi btn-home" onclick="showTodayMission()">⬅️ Hồ sơ hôm nay</button>`;
}

function ringSchreibenBell() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        [0, .28, .56].forEach((delay, i) => {
            const osc = ctx.createOscillator(), gain = ctx.createGain();
            osc.frequency.value = i === 1 ? 880 : 1046;
            gain.gain.setValueAtTime(.0001, ctx.currentTime + delay);
            gain.gain.exponentialRampToValueAtTime(.22, ctx.currentTime + delay + .02);
            gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + delay + .23);
            osc.connect(gain); gain.connect(ctx.destination); osc.start(ctx.currentTime + delay); osc.stop(ctx.currentTime + delay + .25);
        });
    } catch (_) {}
}

function startDailySchreibenTimer(seconds) {
    clearInterval(countdown);
    let remaining = seconds;
    const render = () => {
        const timer = document.getElementById('timer');
        if (!timer) return;
        timer.innerText = `⏱️ Prüfung: ${Math.floor(remaining/60)}:${String(remaining%60).padStart(2,'0')}`;
        timer.style.color = remaining <= 60 ? '#c62828' : remaining <= 300 ? '#ef6c00' : remaining <= 600 ? '#b88700' : '';
    };
    render();
    countdown = setInterval(() => {
        remaining--; render();
        if (remaining <= 0) {
            clearInterval(countdown); ringSchreibenBell();
            const input = document.getElementById('schreibenInput');
            if (input) { input.readOnly = true; input.style.opacity = '.72'; }
            document.getElementById('timer').innerText = '🔔 TING TING TING · HẾT GIỜ';
            alert('🔔 Ting ting ting! Mr. Efa: “Hết giờ. Bỏ bút xuống.”\n🫩 “Bàn phím của bạn cũng nên nghe.”');
            submitSchreibenToEfa(true);
        }
    }, 1000);
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
    if (currentFlashcardGroup && vokabelGruppen[currentFlashcardGroup]) return currentFlashcardGroup;
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
    setLearningFocus(true, 'koffer');
    dailyMissionActive = false;
    document.getElementById("feedback-area").style.display = "none";
    let missed = getSavedMissed();
    let weeklyJournal = loadVocabJournal().current;
    let dailyStatus = getDailyMissionStatus();
    let warningHtml = missed.length > 0 ? `<button class="btn-grid btn-full" style="background:#ffb74d; color:white; justify-content:center; display:flex;" onclick="showLernenScreen('review')">⚠️ Sổ tay từ khó: Ôn ${missed.length} từ!</button>` : '';
    
    document.getElementById("message").innerText = "Was möchtest du im Alltag üben?";
    document.getElementById("buttons").innerHTML = `
        <div class="grid-container">
            <button class="btn-grid btn-full" style="background:linear-gradient(135deg,#e8f5e9,#fff8e1);border:3px solid #8bc34a;text-align:center;color:#47733c;font-weight:800;padding:20px;box-shadow:0 7px 15px rgba(76,125,55,.15);" onclick="startDailyVocabMission()">${dailyStatus.completed ? '✅ Nhiệm vụ hôm nay đã xong · Ôn lại' : '🐦 Bắt đầu nhiệm vụ hôm nay · khoảng 7 phút'}<br><small style="font-weight:normal;color:#71856a;">5 từ mới + 3 từ cần ôn + 5 câu kiểm tra</small></button>
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
            <button class="btn-grid btn-full" style="background:#fff9c4; text-align:center; color:#f39c12; font-weight:bold;" onclick="showMiniGameSetup('mc')">🎯 Game: Điền Từ Trắc Nghiệm</button>
            <button class="btn-grid btn-full" style="background:#dcedc8; text-align:center; color:#27ae60; font-weight:bold;" onclick="showMiniGameSetup('sentence')">✍️ Game: Đặt câu với từ ngẫu nhiên</button>
            <button class="btn-grid btn-full" style="background:#e8eaf6; text-align:center; color:#3f51b5; font-weight:bold;" onclick="showMiniGameSetup('tornado')">🌪️ Game: Lốc Xoáy Từ Vựng (Trộn Ngẫu Nhiên)</button>
            <button class="btn-grid btn-full" style="background:linear-gradient(135deg,#ffe0b2,#e3f2fd);border:2px solid #ffb74d;text-align:center;color:#795548;font-weight:800;" onclick="showKofferIntro()">🧳 Game: Koffer nach Deutschland</button>
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
let dailyMissionActive = false;
let dailyMissionOriginalWords = [];
let dailyMissionRatings = {};
let dailyMissionRequeued = new Set();

const DAILY_MISSION_KEY = 'kapi_daily_vocab_mission_v1';

function getDailyMissionStatus() {
    let status = {};
    try { status = JSON.parse(localStorage.getItem(DAILY_MISSION_KEY)) || {}; } catch (_) {}
    const today = getLocalDateKey(new Date());
    return status.date === today ? status : { date: today, completed: false, score: 0 };
}

function getAllUniqueVocabWords() {
    const seen = new Set();
    const words = [];
    Object.values(vokabelGruppen).forEach(group => {
        group.woerter.forEach(word => {
            const key = word.de.toLocaleLowerCase('de-DE');
            if (!seen.has(key)) {
                seen.add(key);
                words.push(word);
            }
        });
    });
    return words;
}

function findVocabWordByGerman(german, allWords) {
    const key = String(german || '').toLocaleLowerCase('de-DE');
    return allWords.find(word => word.de.toLocaleLowerCase('de-DE') === key);
}

function startDailyVocabMission() {
    const allWords = getAllUniqueVocabWords();
    const journal = loadVocabJournal().current;
    const missed = getSavedMissed();
    const reviewCandidates = [];
    const added = new Set();

    Object.values(journal.wordStats || {})
        .filter(stat => stat.wrong > stat.correct)
        .sort((a, b) => b.wrong - a.wrong)
        .forEach(stat => {
            const word = findVocabWordByGerman(stat.de, allWords);
            if (word && !added.has(word.de)) {
                reviewCandidates.push(word);
                added.add(word.de);
            }
        });

    shuffleArray(missed).forEach(word => {
        const fullWord = findVocabWordByGerman(word.de, allWords) || word;
        if (!added.has(fullWord.de)) {
            reviewCandidates.push(fullWord);
            added.add(fullWord.de);
        }
    });

    shuffleArray(journal.learnedWords || []).forEach(item => {
        const word = findVocabWordByGerman(item.de, allWords);
        if (word && !added.has(word.de)) {
            reviewCandidates.push(word);
            added.add(word.de);
        }
    });

    const reviewWords = reviewCandidates.slice(0, 3);
    const learnedKeys = new Set((journal.learnedWords || []).map(item => item.de));
    let newPool = allWords.filter(word => !added.has(word.de) && !learnedKeys.has(word.de));
    if (newPool.length < 5) newPool = allWords.filter(word => !added.has(word.de));
    const newWords = shuffleArray(newPool).slice(0, Math.max(0, 8 - reviewWords.length));

    if (reviewWords.length < 3) {
        const extraReview = shuffleArray(newPool.filter(word => !newWords.includes(word)))
            .slice(0, 3 - reviewWords.length);
        reviewWords.push(...extraReview);
    }

    dailyMissionOriginalWords = shuffleArray([...reviewWords, ...newWords]).slice(0, 8);
    flashcardWords = [...dailyMissionOriginalWords];
    currentFlashcardGroup = 'daily';
    currentFlashcardIndex = 0;
    isFlipped = false;
    dailyMissionActive = true;
    dailyMissionRatings = {};
    dailyMissionRequeued = new Set();
    renderFlashcard();
}

function rateDailyMissionWord(level) {
    const word = flashcardWords[currentFlashcardIndex];
    if (!word) return;

    recordLearnedWord(word);
    dailyMissionRatings[word.de] = level;

    if (level === 'hard') {
        let missed = getSavedMissed();
        if (!missed.some(item => item.de === word.de)) {
            missed.push(word);
            saveMissed(missed);
        }
        if (!dailyMissionRequeued.has(word.de)) {
            flashcardWords.push(word);
            dailyMissionRequeued.add(word.de);
        }
    }

    currentFlashcardIndex++;
    isFlipped = false;

    if (currentFlashcardIndex >= flashcardWords.length) {
        startDailyMissionQuiz();
    } else {
        renderFlashcard();
    }
}

function startDailyMissionQuiz() {
    dailyMissionActive = false;
    quizWords = shuffleArray(dailyMissionOriginalWords).slice(0, 5);
    currentQuizIndex = 0;
    quizScore = 0;
    currentMissedWords = [];
    showQuizQuestion();
}

function completeDailyMission() {
    const today = getLocalDateKey(new Date());
    const previous = getDailyMissionStatus();
    const firstCompletion = !previous.completed;
    localStorage.setItem(DAILY_MISSION_KEY, JSON.stringify({
        date: today,
        completed: true,
        score: quizScore,
        total: quizWords.length
    }));

    if (firstCompletion && typeof sysData !== 'undefined') {
        sysData.totalLeaves += 3;
        if (typeof saveData === 'function') saveData();
        if (typeof renderLeavesUI === 'function') renderLeavesUI();
        if (typeof renderShopUI === 'function') renderShopUI();
    }
    completeTodayStudyMission('vokabeln');
    return firstCompletion;
}

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
    dailyMissionActive = false;
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

    const dailyRatedCount = Object.keys(dailyMissionRatings).length;
    const progressLabel = dailyMissionActive
        ? `🐦 Nhiệm vụ hôm nay · Đã gặm ${Math.min(dailyRatedCount, 8)}/8 từ`
        : `Flashcard | Thẻ ${currentFlashcardIndex + 1}/${flashcardWords.length}`;

    document.getElementById("message").innerHTML = `
        <span style="font-size:16px;color:#7f8c8d; font-weight:bold;">${progressLabel}</span><br><br>
        <div style="background: #fff; border: 2px solid #bdc3c7; border-radius: 20px; padding: 15px 20px; box-shadow: 0 8px 16px rgba(0,0,0,0.08); max-width: 350px; margin: 0 auto; min-height: 250px; display: flex; flex-direction: column; align-items: center; user-select: none; transition: 0.2s;">
            ${pinBtnHtml}
            <div onclick="flipCard()" style="cursor:pointer; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding-top: 10px;">
                ${cardContent}
            </div>
        </div>
    `;
    
    let btnHtml = '';

    if (dailyMissionActive) {
        if (isFlipped) {
            btnHtml = `
                <p style="margin:20px 0 9px;color:#607d5a;font-weight:bold;">Từ này đang nằm ở đâu trong đầu bồ câu?</p>
                <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:9px;max-width:620px;margin:0 auto;">
                    <button class="btn-kapi" style="margin:0;background:#ffcdd2;" onclick="rateDailyMissionWord('hard')">😵 Chưa nhớ</button>
                    <button class="btn-kapi" style="margin:0;background:#fff9c4;" onclick="rateDailyMissionWord('medium')">🤔 Hơi nhớ</button>
                    <button class="btn-kapi" style="margin:0;background:#dcedc8;" onclick="rateDailyMissionWord('easy')">😎 Thuộc rồi</button>
                </div>`;
        } else {
            btnHtml = `<button class="btn-kapi btn-green" style="margin-top:20px;" onclick="flipCard()">👆 Lật thẻ rồi tự chấm</button>`;
        }
        btnHtml += `<br><button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Dừng nhiệm vụ</button>`;
    } else {
        btnHtml = `<div style="display:flex; justify-content: center; gap: 15px; max-width: 350px; margin: 0 auto; margin-top: 25px;">`;

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
    }
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

    if (currentFlashcardGroup === 'daily') {
        const firstCompletion = completeDailyMission();
        html += `<div style="margin-top:16px;padding:15px;background:linear-gradient(135deg,#e8f5e9,#fff8e1);border:2px dashed #8bc34a;border-radius:14px;text-align:center;"><b>🐦 Nhiệm vụ hôm nay hoàn thành!</b><br>${firstCompletion ? 'Kapi tặng cậu 3 chiếc lá 🌿🌿🌿' : 'Cậu đã ôn lại nhiệm vụ hôm nay rất ngoan :vvvv'}</div>`;
    }
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = html;
    document.getElementById("buttons").innerHTML = `<button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu Từ Vựng</button>`;
}

// ==========================================
// CỔNG MINIGAME TỪ VỰNG (LOCAL, KHÔNG GỌI API TRỪ NÚT CHẤM CÂU)
// ==========================================
const MINI_GAME_REWARD_KEY = 'kapi_vocab_game_rewards_v1';
let miniGame = {
    type: '', scope: 'all', words: [], questions: [], index: 0,
    score: 0, streak: 0, bestStreak: 0, wrongWords: [], sentenceDone: 0
};

const miniGameNames = {
    mc: '🎯 Điền Từ Trắc Nghiệm',
    sentence: '✍️ Đặt Câu Ngẫu Nhiên',
    tornado: '🌪️ Lốc Xoáy Từ Vựng'
};

const miniGameGroupLabels = {
    arbeit:'💼 Arbeit', umwelt:'🌍 Umwelt', kulinarik:'🍽️ Kulinarik',
    gesundheit:'💊 Gesundheit', technologie:'💻 Technologie', gesellschaft:'🏘️ Gesellschaft',
    studium:'🎓 Studium', saetze:'💬 Sätze', krankheiten:'🦠 Krankheiten',
    diagnostik:'🩺 Diagnostik', verbandmaterial:'🩹 Verbandmaterial'
};

function showMiniGameSetup(type) {
    miniGame.type = type;
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('message').innerHTML = `<b>${miniGameNames[type]}</b><br><small>Chọn phần từ mà bồ câu muốn đối đầu hôm nay:</small>`;

    let groupButtons = Object.keys(miniGameGroupLabels)
        .filter(key => vokabelGruppen[key] && vokabelGruppen[key].woerter.length)
        .map(key => `<button class="btn-grid" style="text-align:center;" onclick="beginMiniGame('${key}')">${miniGameGroupLabels[key]}</button>`).join('');

    document.getElementById('buttons').innerHTML = `
        <div class="grid-container">
            <button class="btn-grid btn-full" style="background:#fff3cd;text-align:center;font-weight:bold;" onclick="beginMiniGame('all')">🎲 Tất cả chủ đề</button>
            ${groupButtons}
            <button class="btn-grid" style="background:#fce4ec;text-align:center;" onclick="beginMiniGame('pinned')">📌 Chỉ từ đã ghim</button>
            <button class="btn-grid" style="background:#ede7f6;text-align:center;" onclick="beginMiniGame('rare')">😿 Hiếm / chuyên ngành</button>
            <button class="btn-grid btn-full" style="background:#e3f2fd;text-align:center;" onclick="beginMiniGame('weak')">🧠 Những từ từng trả lời sai</button>
        </div>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu</button>`;
}

function uniqueMiniGameWords(words) {
    const seen = new Set();
    return words.filter(word => {
        const key = String(word.de || '').toLocaleLowerCase('de-DE');
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function getMiniGameWordGroup(word) {
    for (const [groupName, group] of Object.entries(vokabelGruppen)) {
        if (group.woerter.some(item => item.de === word.de)) return groupName;
    }
    return '';
}

function getMiniGamePool(scope) {
    const all = getAllUniqueVocabWords();
    if (scope === 'all') return all;
    if (scope === 'pinned') return uniqueMiniGameWords(getSavedMissed());
    if (scope === 'rare') return all.filter(word => classifyGermanUsage(word, getMiniGameWordGroup(word)).icon === '😿');
    if (scope === 'weak') {
        const stats = loadVocabJournal().current.wordStats || {};
        const weakKeys = new Set(Object.values(stats).filter(item => item.wrong > 0).map(item => item.de.toLocaleLowerCase('de-DE')));
        getSavedMissed().forEach(item => weakKeys.add(item.de.toLocaleLowerCase('de-DE')));
        return all.filter(word => weakKeys.has(word.de.toLocaleLowerCase('de-DE')));
    }
    return vokabelGruppen[scope] ? uniqueMiniGameWords(vokabelGruppen[scope].woerter) : [];
}

function beginMiniGame(scope) {
    const pool = getMiniGamePool(scope);
    if (!pool.length) {
        alert(scope === 'pinned' || scope === 'weak' ? 'Mục này đang trống. Bồ câu chưa có từ nào cần cứu hộ! 🐦' : 'Nhóm này chưa có từ để chơi.');
        return;
    }
    miniGame = { ...miniGame, scope, words: shuffleArray(pool), questions: [], index: 0, score: 0, streak: 0, bestStreak: 0, wrongWords: [], sentenceDone: 0 };
    if (miniGame.type === 'sentence') startSentenceGame();
    else startChoiceMiniGame();
}

function buildChoiceQuestion(word, direction) {
    const all = getAllUniqueVocabWords();
    const field = direction === 'de-vi' ? 'vi' : 'de';
    const correct = word[field];
    const distractors = shuffleArray(all.filter(item => item.de !== word.de && item[field] && item[field] !== correct))
        .slice(0, 3).map(item => item[field]);
    const options = shuffleArray([correct, ...distractors]);
    return {
        word, direction, options, answer: options.indexOf(correct),
        prompt: direction === 'de-vi' ? word.de : word.vi
    };
}

function startChoiceMiniGame() {
    const total = miniGame.type === 'tornado' ? 12 : 10;
    const chosen = shuffleArray(miniGame.words).slice(0, Math.min(total, miniGame.words.length));
    miniGame.questions = chosen.map((word, index) => buildChoiceQuestion(
        word,
        miniGame.type === 'tornado' && index % 2 ? 'vi-de' : 'de-vi'
    ));
    showMiniChoiceQuestion();
}

function showMiniChoiceQuestion() {
    if (miniGame.index >= miniGame.questions.length) return finishMiniGame();
    const q = miniGame.questions[miniGame.index];
    const total = miniGame.questions.length;
    const percent = Math.round((miniGame.index / total) * 100);
    const instruction = q.direction === 'de-vi' ? 'Từ này có nghĩa là gì?' : 'Chọn cách nói tiếng Đức:';

    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('message').innerHTML = `
        <div style="max-width:560px;margin:0 auto;">
            <div style="display:flex;justify-content:space-between;color:#78909c;font-size:14px;font-weight:bold;"><span>${miniGameNames[miniGame.type]}</span><span>Câu ${miniGame.index + 1}/${total} · 🔥 ${miniGame.streak}</span></div>
            <div style="height:10px;background:#eceff1;border-radius:999px;margin:10px 0 22px;overflow:hidden;"><div style="height:100%;width:${percent}%;background:linear-gradient(90deg,#8bc34a,#ffca28);transition:.25s;"></div></div>
            <small style="color:#78909c;">${instruction}</small>
            <p style="font-size:27px;color:#2c3e50;font-weight:bold;margin:10px 0;">${q.prompt}</p>
        </div>`;

    document.getElementById('buttons').innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-width:620px;margin:0 auto;">
            ${q.options.map((option, index) => `<button class="btn-grid" style="text-align:center;min-height:68px;" onclick="checkMiniChoice(${index})">${option}</button>`).join('')}
        </div>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Thoát Game</button>`;
}

function checkMiniChoice(selectedIndex) {
    const q = miniGame.questions[miniGame.index];
    const correct = selectedIndex === q.answer;
    recordVocabAnswer(q.word, correct);

    if (correct) {
        miniGame.score++;
        miniGame.streak++;
        miniGame.bestStreak = Math.max(miniGame.bestStreak, miniGame.streak);
    } else {
        miniGame.streak = 0;
        if (!miniGame.wrongWords.some(item => item.de === q.word.de)) miniGame.wrongWords.push(q.word);
        const saved = getSavedMissed();
        if (!saved.some(item => item.de === q.word.de)) { saved.push(q.word); saveMissed(saved); }
    }

    const praise = miniGame.streak >= 3 ? `🔥 Chuỗi ${miniGame.streak}! Bồ câu bắt đầu bốc khói rồi!` : '😎 Chuẩn, người Đức cũng hiểu như vậy!';
    const correction = `🫪 Voi vừa nghe thấy một từ rơi xuống đất…<br>Đáp án đúng: <b>${q.options[q.answer]}</b>`;
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <div style="padding:13px;border-radius:12px;background:${correct ? '#e8f5e9' : '#ffebee'};color:${correct ? '#2e7d32' : '#b71c1c'};font-weight:bold;">${correct ? praise : correction}</div>
        <button class="btn-kapi" style="background:#f39c12;color:white;width:100%;margin:12px 0 0;" onclick="nextMiniChoice()">➡️ Câu tiếp theo</button>`;
    document.getElementById('buttons').style.display = 'none';
}

function nextMiniChoice() {
    miniGame.index++;
    document.getElementById('buttons').style.display = 'block';
    showMiniChoiceQuestion();
}

function startSentenceGame() {
    miniGame.questions = shuffleArray(miniGame.words).slice(0, Math.min(5, miniGame.words.length));
    miniGame.index = 0;
    showSentenceGame();
}

function showSentenceGame() {
    if (!miniGame.questions.length) {
        miniGame.type = 'sentence';
        miniGame.scope = 'all';
        miniGame.words = shuffleArray(getAllUniqueVocabWords());
        return startSentenceGame();
    }
    if (miniGame.index >= miniGame.questions.length) return finishMiniGame();
    const word = miniGame.questions[miniGame.index];
    const total = miniGame.questions.length;
    const percent = Math.round((miniGame.index / total) * 100);
    currentFlashcardGroup = getMiniGameWordGroup(word);
    recordLearnedWord(word);

    document.getElementById('message').innerHTML = `
        <div style="max-width:560px;margin:0 auto;">
            <div style="display:flex;justify-content:space-between;color:#78909c;font-size:14px;font-weight:bold;"><span>✍️ Đặt câu</span><span>${miniGame.index + 1}/${total}</span></div>
            <div style="height:10px;background:#eceff1;border-radius:999px;margin:10px 0 20px;overflow:hidden;"><div style="height:100%;width:${percent}%;background:#66bb6a;"></div></div>
            <b style="font-size:30px;color:#2980b9;">${word.de}</b><br><i style="color:#7f8c8d;">${word.vi}</i>
            ${renderUsageBadge(word)}
        </div>`;
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <textarea id="schreibenInput" rows="4" placeholder="Viết một câu có chứa '${word.de}' nhé..."></textarea>
        <div id="ai-correction" style="display:none;margin-top:10px;border-top:1px solid #eee;padding-top:15px;"></div>`;
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="checkGrammar('schreibenInput')">🐘 Nhờ voi chấm câu</button>
        <button class="btn-kapi" style="background:#fff3cd;" onclick="finishSentenceRound(false)">😵 Câu này khó, lưu để ôn</button>
        <button class="btn-kapi" style="background:#dcedc8;" onclick="finishSentenceRound(true)">✅ Đã viết xong · Tiếp</button>
        <br><button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Thoát Game</button>`;
}

function finishSentenceRound(done) {
    const word = miniGame.questions[miniGame.index];
    const text = (document.getElementById('schreibenInput') || {}).value || '';
    if (done && text.trim().length < 8) {
        alert('???? Hả, sao ngắn vậy :vvvv Viết ít nhất một câu nhỏ rồi hãy đi tiếp nhé!');
        return;
    }
    if (done) {
        miniGame.score++;
        miniGame.sentenceDone++;
        recordVocabAnswer(word, true);
    } else {
        recordVocabAnswer(word, false);
        miniGame.wrongWords.push(word);
        const saved = getSavedMissed();
        if (!saved.some(item => item.de === word.de)) { saved.push(word); saveMissed(saved); }
    }
    miniGame.index++;
    showSentenceGame();
}

function awardMiniGameLeaves() {
    const today = getLocalDateKey(new Date());
    let rewards = {};
    try { rewards = JSON.parse(localStorage.getItem(MINI_GAME_REWARD_KEY)) || {}; } catch (_) {}
    const key = `${today}_${miniGame.type}`;
    if (rewards[key]) return 0;
    const total = miniGame.questions.length || 1;
    const leaves = miniGame.score === total ? 3 : (miniGame.score / total >= 0.6 ? 2 : 1);
    rewards[key] = leaves;
    localStorage.setItem(MINI_GAME_REWARD_KEY, JSON.stringify(rewards));
    if (typeof sysData !== 'undefined') {
        sysData.totalLeaves += leaves;
        if (typeof saveData === 'function') saveData();
        if (typeof renderLeavesUI === 'function') renderLeavesUI();
        if (typeof renderShopUI === 'function') renderShopUI();
    }
    return leaves;
}

function finishMiniGame() {
    const total = miniGame.questions.length;
    const leaves = awardMiniGameLeaves();
    const wrong = uniqueMiniGameWords(miniGame.wrongWords);
    const percent = Math.round((miniGame.score / Math.max(1, total)) * 100);
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <div style="padding:18px;background:linear-gradient(135deg,#fff8e1,#e8f5e9);border:2px dashed #ffb74d;border-radius:16px;">
            <h3 style="margin-top:0;">🎒 Chiến lợi phẩm của bồ câu</h3>
            <p style="font-size:21px;"><b>${miniGame.score}/${total}</b> · ${percent}% ${miniGame.type === 'sentence' ? 'đã hoàn thành' : 'chính xác'}</p>
            ${miniGame.type !== 'sentence' ? `<p>🔥 Chuỗi đúng dài nhất: <b>${miniGame.bestStreak}</b></p>` : ''}
            <p>${leaves ? `+${leaves} 🍃 cho lần hoàn thành đầu tiên hôm nay` : '🍃 Hôm nay đã nhận thưởng game này rồi — chơi lại vẫn được ôn nhé!'}</p>
            ${wrong.length ? `<p style="color:#c0392b;"><b>Cần cứu hộ (${wrong.length}):</b><br>${wrong.map(word => word.de).join(' · ')}</p>` : '<p style="color:#2e7d32;"><b>Không có từ nào rơi khỏi voi! 🐘🐦</b></p>'}
        </div>`;
    document.getElementById('message').innerHTML = `<b>${miniGameNames[miniGame.type]} hoàn thành! 🎉</b>`;
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('buttons').innerHTML = `
        ${wrong.length ? '<button class="btn-kapi" style="background:#ffcc80;" onclick="reviewMiniGameMistakes()">🔁 Ôn riêng các từ sai</button>' : ''}
        <button class="btn-kapi btn-green" onclick="showMiniGameSetup(miniGame.type)">🎮 Chơi lượt khác</button>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu</button>`;
}

function reviewMiniGameMistakes() {
    const wrong = uniqueMiniGameWords(miniGame.wrongWords);
    if (!wrong.length) return showVokabelHauptmenu();
    dailyMissionActive = false;
    flashcardWords = wrong;
    currentFlashcardGroup = 'review';
    currentFlashcardIndex = 0;
    isFlipped = false;
    renderFlashcard();
}

// ==========================================
// GAME: KOFFER NACH DEUTSCHLAND
// Vali có 3 lần kiên nhẫn. Sai lần thứ ba là 🫩 tạm biệt.
// ==========================================
let kofferGame = {
    route: 'all', questions: [], index: 0, packed: [], mistakes: 0,
    wrongWords: [], answered: false, streak: 0, bestStreak: 0,
    levelUnlocked: false, typingMode: false, typingWords: [], typedIndex: 0
};

const KOFFER_HISTORY_KEY = 'kapi_koffer_history_v1';

function loadKofferHistory() {
    try { return JSON.parse(localStorage.getItem(KOFFER_HISTORY_KEY)) || []; }
    catch (_) { return []; }
}

function getKofferExample(word) {
    if (word.beispiel || word.example || word.satz || word.beispielsatz) {
        return word.beispiel || word.example || word.satz || word.beispielsatz;
    }
    const german = String(word.de || '').trim();
    if (/^(der|die|das)\s/i.test(german)) {
        return `Der Begriff „${german}“ ist für dieses Thema besonders wichtig.`;
    }
    if (/^(ich|wir|man|es|das|da|wenn|obwohl|dadurch|aus diesem grund|hinzu kommt)/i.test(german)) {
        return `Merksatz: „${german}${/[.!?]$/.test(german) ? '' : '.'}“`;
    }
    return `Heute übe ich den Ausdruck „${german}“ in einem eigenen Satz.`;
}

function saveKofferRoundToHistory() {
    const history = loadKofferHistory();
    const byGerman = new Map(history.map(item => [String(item.de).toLocaleLowerCase('de-DE'), item]));
    kofferGame.questions.forEach(question => {
        const word = question.word;
        const key = word.de.toLocaleLowerCase('de-DE');
        const old = byGerman.get(key) || {};
        byGerman.set(key, {
            de: word.de,
            vi: word.vi || '',
            example: getKofferExample(word),
            seen: (old.seen || 0) + 1,
            lastPlayed: getLocalDateKey(new Date())
        });
    });
    localStorage.setItem(KOFFER_HISTORY_KEY, JSON.stringify(Array.from(byGerman.values()).slice(-300)));
}

function getKofferReviewWords(allWords, count = 2) {
    const wordMap = new Map(allWords.map(word => [word.de.toLocaleLowerCase('de-DE'), word]));
    const available = loadKofferHistory()
        .map(item => wordMap.get(String(item.de).toLocaleLowerCase('de-DE')))
        .filter(Boolean);
    return shuffleArray(uniqueMiniGameWords(available)).slice(0, count);
}

const kofferRoutes = {
    all: {
        title: '🎲 Chuyến đi tổng hợp',
        subtitle: 'Đức, Việt, bệnh viện và đời sống trộn chung — vali tự lo số phận.',
        groups: []
    },
    pflege: {
        title: '🏥 Sang Đức học điều dưỡng',
        subtitle: 'Chỉ gói nhóm sức khỏe và y khoa. Voi đã chuẩn bị băng cá nhân.',
        groups: ['gesundheit', 'krankheiten', 'diagnostik', 'verbandmaterial']
    },
    alltag: {
        title: '🏠 Cuộc sống thường ngày',
        subtitle: 'Những từ cần để sống sót ngoài bệnh viện và tìm được bánh mì.',
        groups: ['arbeit', 'kulinarik', 'gesellschaft', 'saetze', 'studium']
    }
};

const kofferItemIcons = ['🧦','📘','🥨','🩹','🪥','🧸','☕','🩺'];
const kofferWrongLines = [
    'Khoan. Cậu định nhét từ này vào thật đấy à? Tôi bắt đầu muốn trả vé rồi.',
    'Sai thêm lần nữa là tôi đổ đồ ra ngay giữa sân bay nhé. Tôi nói thật đấy.',
    'Thôi, tới đây được rồi. Tôi trả hành lý, trả vé, trả luôn niềm tin cho cậu.'
];

const kofferMoodLines = [
    'Tôi còn ngồi đây là vì chuyến bay chưa mở cửa thôi.',
    'Đi Đức thì đi, nhưng cho tôi thở một miếng đã.',
    'Tôi không cáu. Mặt tôi sinh ra đã hết kiên nhẫn như thế.',
    'Cậu chọn cho kỹ nhé. Bánh xe của tôi bắt đầu run rồi đấy.',
    'Người ta bảo chuyến này vui lắm. Tôi đang chờ đoạn vui.',
    'Tôi đang chở tám từ và khoảng ba tấn áp lực tinh thần.',
    'Cậu cứ chọn đi. Tôi tranh thủ chuẩn bị tinh thần thất vọng.',
    'Tôi không ngủ gật. Tôi chỉ tạm thời rời khỏi cuộc đời.'
];

// 11 × 10 × 10 = 1.100 tổ hợp tuyệt tình. Vali không cần lặp lại chính mình.
const kofferFarewellOpeners = [
    'Tôi nghĩ kỹ rồi.', 'Hai bánh xe của tôi vừa họp khẩn.', 'Thôi, mình dừng ở đây nhé.',
    'Sau cú chọn vừa rồi, tôi đã hiểu tất cả.', 'Tôi không giận đâu, tôi chỉ hết muốn cố gắng thôi.',
    'Xin phép thông báo một tin không vui cho cậu.', 'Tôi từng đặt niềm tin vào cậu. Từng thôi.',
    'Từ giây phút này, hai ta chính thức đường ai nấy lăn.', 'Nội bộ vali vừa bỏ phiếu và cậu đã thua tuyệt đối.',
    'Tôi đã hỏi ý kiến tay kéo, ổ khóa và cả hai bánh xe.', 'Đừng níu nữa, khóa kéo của tôi đã khép lại rồi.'
];
const kofferFarewellActions = [
    'Tám từ này cậu tự xách nhé, tôi xin dừng phục vụ.',
    'Tôi trả lại đồ, trả lại vé và giữ lấy chút tự trọng cuối cùng.',
    'Từ nay cậu học phần cậu, tôi lăn phần tôi.',
    'Tôi xin rút khỏi chuyến đi trước khi niềm tin bị quá cân.',
    'Tôi để hết đồ lại đây; món nào lăn mất thì cậu tự nhặt.',
    'Tôi sẽ báo với hải quan rằng chúng ta chưa từng đi cùng nhau.',
    'Tôi tự nguyện trở thành hành lý thất lạc còn hơn chở tiếp.',
    'Hợp đồng chuyên chở từ vựng của chúng ta kết thúc tại đây.',
    'Tôi mang hai bánh xe đi, còn hậu quả cậu giữ lấy.',
    'Cậu vừa chọn sai từ, còn tôi chọn rời khỏi mối quan hệ này.'
];
const kofferFarewellEndings = [
    'Từ giờ gặp nhau ở băng chuyền thì cứ xem như người lạ.',
    'Cậu đừng gọi; tôi đã bật chế độ máy bay rồi.',
    'Quyết định có hiệu lực ngay, không có nút hoàn tác.',
    'Tôi chúc cậu may mắn, vì kiến thức thôi là chưa đủ đâu.',
    'Không bảo hành, không đổi trả và tuyệt đối không có cơ hội thứ hai.',
    'Tôi đi đây. Bồ câu ở lại nhớ tự nhặt tất lên nhé.',
    'Nền sân bay và ba con bồ câu đều có thể làm chứng.',
    'Chúng ta đều cần nghỉ ngơi, nhưng tôi cần nghỉ khỏi cậu.',
    'Phần đường còn lại cậu tự đi; tôi mệt cả bánh xe rồi.',
    'Tình nghĩa của chúng ta chính thức thất lạc cùng hành lý.'
];

function getKofferFarewellLine() {
    const pick = list => list[Math.floor(Math.random() * list.length)];
    return `${pick(kofferFarewellOpeners)} ${pick(kofferFarewellActions)} ${pick(kofferFarewellEndings)}`;
}

function getKofferMoodLine() {
    if (kofferGame.mistakes >= 2) return 'Tôi đã in đơn nghỉ chơi thành ba bản. Một bản gửi cậu, hai bản gửi hai bánh xe.';
    if (kofferGame.mistakes === 1) return 'Tôi vẫn cho cậu thêm một cơ hội, nhưng khóa kéo của tôi đang rất căng.';
    return kofferMoodLines[kofferGame.index % kofferMoodLines.length];
}

function renderKofferMascot(state = 'calm', elementId = '') {
    const safeState = ['calm', 'annoyed', 'done', 'leaving'].includes(state) ? state : 'calm';
    return `
        <style>
            @keyframes kofferBlink {
                0%, 42%, 46%, 100% { transform:scaleY(1); }
                44% { transform:scaleY(.08); }
            }
            @keyframes kofferSigh {
                0%,100% { transform:translateY(0) rotate(-1deg); }
                50% { transform:translateY(3px) rotate(1deg); }
            }
            @keyframes kofferTalk {
                0%,100% { height:5px;transform:scaleX(1); }
                35% { height:13px;transform:scaleX(.65); }
                70% { height:8px;transform:scaleX(1.15); }
            }
            .koffer-mascot{position:relative;width:96px;height:75px;margin:4px auto 8px;background:linear-gradient(145deg,#e7a74a,#bd7332);border:4px solid #6d4528;border-radius:15px 15px 18px 18px;box-shadow:inset 0 4px rgba(255,255,255,.27),0 8px 10px rgba(91,58,32,.18);animation:kofferSigh 3s ease-in-out infinite;transition:transform 1s ease-in,opacity 1s ease-in;flex:0 0 auto;}
            .koffer-mascot:before{content:'';position:absolute;width:38px;height:16px;border:5px solid #6d4528;border-bottom:0;border-radius:12px 12px 0 0;left:25px;top:-19px;}
            .koffer-mascot:after{content:'';position:absolute;left:45px;top:0;width:4px;height:100%;background:rgba(109,69,40,.32);}
            .koffer-eye{position:absolute;top:25px;width:25px;height:16px;background:#fffdf4;border:3px solid #4e342e;border-radius:5px 5px 14px 14px;overflow:hidden;animation:kofferBlink 4.2s infinite;transform-origin:center;z-index:3;}
            .koffer-eye.left{left:17px}.koffer-eye.right{right:17px}
            .koffer-eye:after{content:'';position:absolute;left:-2px;top:-2px;width:29px;height:8px;background:#c9813b;border-bottom:2px solid #4e342e;z-index:2;}
            .koffer-eye span{position:absolute;width:9px;height:10px;background:#3e2723;border-radius:50%;left:7px;top:5px;z-index:1;}
            .koffer-bag{position:absolute;top:40px;width:28px;height:10px;background:#a95f35;border-radius:0 0 18px 18px;opacity:.7;z-index:2;}
            .koffer-bag.left{left:16px}.koffer-bag.right{right:16px}
            .koffer-mouth{position:absolute;left:36px;top:57px;width:24px;height:5px;background:#4e342e;border-radius:8px;z-index:4;}
            .koffer-mascot.annoyed .koffer-eye,.koffer-mascot.leaving .koffer-eye{height:13px;top:28px;}
            .koffer-mascot.annoyed .koffer-bag,.koffer-mascot.leaving .koffer-bag{top:39px;height:12px;opacity:.9;}
            .koffer-mascot.annoyed .koffer-mouth,.koffer-mascot.leaving .koffer-mouth{height:4px;transform:rotate(-3deg)}
            .koffer-mascot.talking .koffer-mouth{animation:kofferTalk .24s ease-in-out 5;background:#4e342e;border-radius:4px 4px 12px 12px;transform-origin:center top;}
            .koffer-mascot.done .koffer-mouth{height:10px;background:transparent;border-bottom:4px solid #4e342e;border-radius:0 0 18px 18px;top:48px;}
            .koffer-wheel{position:absolute;bottom:-9px;width:15px;height:10px;background:#4e342e;border-radius:0 0 6px 6px;}.koffer-wheel.left{left:13px}.koffer-wheel.right{right:13px}
        </style>
        <div ${elementId ? `id="${elementId}"` : ''} class="koffer-mascot ${safeState}" role="img" aria-label="Vali Kapi đang ${safeState === 'done' ? 'hài lòng' : safeState === 'calm' ? 'chớp mắt' : 'bất mãn'}">
            <span class="koffer-eye left"><span></span></span><span class="koffer-eye right"><span></span></span>
            <span class="koffer-bag left"></span><span class="koffer-bag right"></span>
            <span class="koffer-mouth"></span><span class="koffer-wheel left"></span><span class="koffer-wheel right"></span>
        </div>`;
}

function makeKofferSayBye(elementId = 'koffer-face') {
    const suitcase = document.getElementById(elementId);
    if (suitcase) {
        suitcase.classList.add('talking');
        setTimeout(() => suitcase.classList.remove('talking'), 1350);
    }
    try {
        if ('speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
            window.speechSynthesis.cancel();
            const bye = new SpeechSynthesisUtterance('Bye.');
            bye.lang = 'de-DE';
            bye.rate = 0.72;
            bye.pitch = 0.62;
            bye.volume = 0.7;
            window.speechSynthesis.speak(bye);
        }
    } catch (_) {}
}

function showKofferIntro() {
    setLearningFocus(true);
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('message').innerHTML = `
        <div style="max-width:620px;margin:0 auto;">
            ${renderKofferMascot('calm')}
            <h2 style="margin:5px 0;color:#795548;">Koffer nach Deutschland</h2>
            <div style="display:inline-block;margin:2px auto 8px;padding:9px 13px;background:white;border:2px solid #d7ccc8;border-radius:16px;color:#6d4c41;font-size:14px;"><i>“Tôi nhận chuyến này vì phòng nhân sự nói chỉ có tám từ.”</i></div>
            <p style="color:#607d8b;line-height:1.6;">Vali chỉ còn chỗ cho <b>8 từ</b>. Đúng liên tiếp <b>3 câu</b> để mở Level 2; sau đó phải tự gõ lại toàn bộ tám từ. Sai ba lần, nó sẽ đổ đồ và bỏ đi không luyến tiếc.</p>
            ${renderKofferWeeklyProgress()}
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <div style="display:grid;gap:11px;max-width:620px;margin:0 auto;">
            <button class="btn-grid" style="background:#fff3e0;text-align:center;" onclick="startKofferGame('pflege')"><b>🏥 Sang Đức học điều dưỡng</b><br><small>Gesundheit · Krankheiten · Diagnostik</small></button>
            <button class="btn-grid" style="background:#e8f5e9;text-align:center;" onclick="startKofferGame('alltag')"><b>🏠 Cuộc sống thường ngày</b><br><small>Arbeit · Alltag · Studium</small></button>
            <button class="btn-grid" style="background:#e3f2fd;text-align:center;" onclick="startKofferGame('all')"><b>🎲 Chuyến đi tổng hợp</b><br><small>Trộn toàn bộ kho từ</small></button>
        </div>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu</button>`;
}

function getKofferPool(route) {
    const config = kofferRoutes[route];
    if (!config || !config.groups.length) return getAllUniqueVocabWords();
    let words = [];
    config.groups.forEach(groupName => {
        if (vokabelGruppen[groupName]) words = words.concat(vokabelGruppen[groupName].woerter);
    });
    return uniqueMiniGameWords(words);
}

function startKofferGame(route) {
    const routePool = getKofferPool(route);
    const fallbackPool = getAllUniqueVocabWords();
    const reviewWords = getKofferReviewWords(fallbackPool, 2);
    const reviewKeys = new Set(reviewWords.map(word => word.de.toLocaleLowerCase('de-DE')));
    const freshPool = routePool.filter(word => !reviewKeys.has(word.de.toLocaleLowerCase('de-DE')));
    const chosen = shuffleArray([
        ...reviewWords,
        ...shuffleArray(freshPool).slice(0, Math.max(0, 8 - reviewWords.length))
    ]).slice(0, Math.min(8, routePool.length + reviewWords.length));
    kofferGame = {
        route, index: 0, packed: [], mistakes: 0, wrongWords: [], answered: false,
        streak: 0, bestStreak: 0, levelUnlocked: false,
        typingMode: false, typingWords: [], typedIndex: 0,
        questions: chosen.map(word => {
            const distractors = shuffleArray(fallbackPool.filter(item => item.de !== word.de && item.de))
                .slice(0, 3).map(item => item.de);
            const options = shuffleArray([word.de, ...distractors]);
            return { word, options, answer: options.indexOf(word.de), isReview: reviewKeys.has(word.de.toLocaleLowerCase('de-DE')) };
        })
    };
    if (!kofferGame.questions.length) {
        alert('Vali mở ra nhưng bên trong chưa có từ nào :vvvv');
        return showKofferIntro();
    }
    renderKofferQuestion();
}

function renderKofferStatus() {
    const packedSlots = Array.from({ length: kofferGame.questions.length }, (_, index) =>
        index < kofferGame.packed.length
            ? `<span title="${kofferGame.packed[index].de}" style="font-size:27px;">${kofferItemIcons[index % kofferItemIcons.length]}</span>`
            : '<span style="width:28px;height:28px;border:2px dashed #bcaaa4;border-radius:8px;display:inline-block;"></span>'
    ).join('');
    const patience = Array.from({ length: 3 }, (_, index) =>
        `<span style="display:inline-block;width:13px;height:13px;margin-left:4px;border-radius:50%;border:2px solid #6d4c41;background:${index < 3 - kofferGame.mistakes ? '#8d6e63' : '#efebe9'};"></span>`
    ).join('');
    const faceState = kofferGame.mistakes >= 1 ? 'annoyed' : 'calm';
    const levelLabel = kofferGame.typingMode ? 'LEVEL 2 · ZOLLKONTROLLE' : 'LEVEL 1 · PACKEN';
    return `
        <div style="max-width:620px;margin:0 auto 16px;padding:14px;background:#fff8e1;border:2px solid #ffcc80;border-radius:18px;box-shadow:0 7px 14px rgba(121,85,72,.10);">
            <div style="display:flex;align-items:center;justify-content:center;gap:12px;">
                ${renderKofferMascot(faceState, 'koffer-face')}
                <div style="text-align:left;"><b>${kofferRoutes[kofferGame.route].title}</b><br><small style="color:#8d6e63;">${levelLabel}<br>Kiên nhẫn: ${patience} · Chuỗi đúng: 🔥 ${kofferGame.streak}</small></div>
            </div>
            <div style="position:relative;margin:7px auto 4px;max-width:470px;padding:9px 12px;background:white;border:2px solid #d7ccc8;border-radius:14px;color:#6d4c41;font-size:14px;font-style:italic;">“${getKofferMoodLine()}”</div>
            <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:12px;">${packedSlots}</div>
        </div>`;
}

function renderKofferQuestion() {
    if (kofferGame.index >= kofferGame.questions.length) {
        return kofferGame.levelUnlocked ? startKofferTypingLevel() : finishKofferGame(true);
    }
    const question = kofferGame.questions[kofferGame.index];
    const progress = Math.round((kofferGame.index / kofferGame.questions.length) * 100);
    kofferGame.answered = false;
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('message').innerHTML = `
        ${renderKofferStatus()}
        <div style="max-width:580px;margin:auto;">
            <div style="height:9px;background:#eceff1;border-radius:999px;overflow:hidden;"><div style="height:100%;width:${progress}%;background:linear-gradient(90deg,#ffb74d,#66bb6a);transition:.3s;"></div></div>
            <p style="color:#78909c;margin:13px 0 4px;">Món ${kofferGame.index + 1}/${kofferGame.questions.length} · Vali yêu cầu:</p>
            ${question.isReview ? '<div style="display:inline-block;padding:5px 10px;margin:3px 0 8px;background:#ede7f6;color:#5e35b1;border-radius:999px;font-size:13px;font-weight:bold;">🧠 Còn nhớ cái này không?</div><br>' : ''}
            <b style="font-size:25px;color:#37474f;">${question.word.vi}</b>
            <p style="font-size:14px;color:#8d6e63;">Chọn đúng từ tiếng Đức để bỏ vào vali.</p>
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;max-width:620px;margin:0 auto;">
            ${question.options.map((option, index) => `<button class="btn-grid" style="text-align:center;min-height:66px;background:#fffdf7;" onclick="checkKofferAnswer(${index})">${option}</button>`).join('')}
        </div>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Bỏ vali ở sân bay</button>`;
}

function checkKofferAnswer(selectedIndex) {
    if (kofferGame.answered) return;
    kofferGame.answered = true;
    const question = kofferGame.questions[kofferGame.index];
    const correct = selectedIndex === question.answer;
    recordVocabAnswer(question.word, correct);
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('feedback-area').style.display = 'block';

    if (correct) {
        kofferGame.packed.push(question.word);
        kofferGame.streak++;
        kofferGame.bestStreak = Math.max(kofferGame.bestStreak, kofferGame.streak);
        const justUnlocked = kofferGame.streak === 3 && !kofferGame.levelUnlocked;
        if (justUnlocked) kofferGame.levelUnlocked = true;
        document.getElementById('feedback-area').innerHTML = `
            <div style="padding:14px;border-radius:14px;background:#e8f5e9;color:#2e7d32;font-weight:bold;">✅ Cạch! Đã đóng gói <b>${question.word.de}</b>.<br><small>Chuỗi đúng: 🔥 ${kofferGame.streak}</small></div>
            ${justUnlocked ? '<div style="margin-top:10px;padding:15px;border:3px solid #ffb74d;border-radius:14px;background:linear-gradient(135deg,#fff3e0,#e3f2fd);color:#795548;font-weight:900;font-size:19px;">⬆️ LEVEL UP!<br><small>Hải quan đã nghe tin. Cuối lượt cậu phải tự gõ lại cả 8 từ.</small></div>' : ''}
            <button class="btn-kapi btn-green" style="width:100%;margin:12px 0 0;" onclick="${justUnlocked ? 'startKofferTypingLevel()' : 'nextKofferQuestion()'}">${justUnlocked ? '🛂 LEVEL UP · Sang màn gõ từ ngay' : '🧳 Đóng gói món tiếp theo'}</button>`;
        return;
    }

    kofferGame.streak = 0;
    kofferGame.mistakes++;
    if (!kofferGame.wrongWords.some(item => item.de === question.word.de)) kofferGame.wrongWords.push(question.word);
    const saved = getSavedMissed();
    if (!saved.some(item => item.de === question.word.de)) { saved.push(question.word); saveMissed(saved); }
    const line = kofferWrongLines[Math.min(kofferGame.mistakes - 1, kofferWrongLines.length - 1)];

    if (kofferGame.mistakes >= 3) {
        document.getElementById('feedback-area').innerHTML = `
            <div style="padding:14px;border-radius:14px;background:#ffebee;color:#b71c1c;font-weight:bold;">${line}<br><small>Đúng ra phải là: <b>${question.word.de}</b></small></div>
            <button class="btn-kapi" style="width:100%;margin:12px 0 0;background:#eceff1;" onclick="finishKofferGame(false)">🥺 Nhìn vali bỏ đi</button>`;
    } else {
        document.getElementById('feedback-area').innerHTML = `
            <div style="padding:14px;border-radius:14px;background:#fff3e0;color:#bf5f00;font-weight:bold;">${line}<br><small>Đúng ra phải là: <b>${question.word.de}</b></small></div>
            <button class="btn-kapi" style="width:100%;margin:12px 0 0;background:#ffcc80;" onclick="nextKofferQuestion()">🫩 Đi tiếp trước khi nó đổi ý</button>`;
    }
    makeKofferSayBye();
}

function nextKofferQuestion() {
    kofferGame.index++;
    document.getElementById('buttons').style.display = 'block';
    renderKofferQuestion();
}

function startKofferTypingLevel() {
    kofferGame.typingMode = true;
    kofferGame.typingWords = shuffleArray(kofferGame.questions.map(question => question.word));
    kofferGame.typedIndex = 0;
    kofferGame.mistakes = 0;
    kofferGame.streak = 0;
    // Level 2 là kiểm tra trí nhớ thật: không cho xem lại manifest hay đáp án trước khi gõ.
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('feedback-area').innerHTML = '';
    document.getElementById('buttons').style.display = 'block';
    renderKofferTypingQuestion();
}

function normalizeKofferAnswer(text) {
    return String(text || '')
        .toLocaleLowerCase('de-DE')
        .replace(/[„“”"'`´.,!?;:()[\]{}]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function renderKofferTypingQuestion() {
    if (kofferGame.typedIndex >= kofferGame.typingWords.length) return finishKofferGame(true);
    const word = kofferGame.typingWords[kofferGame.typedIndex];
    const progress = Math.round((kofferGame.typedIndex / kofferGame.typingWords.length) * 100);
    kofferGame.answered = false;
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('message').innerHTML = `
        ${renderKofferStatus()}
        <div style="max-width:580px;margin:auto;">
            <div style="height:9px;background:#eceff1;border-radius:999px;overflow:hidden;"><div style="height:100%;width:${progress}%;background:linear-gradient(90deg,#42a5f5,#7e57c2);transition:.3s;"></div></div>
            <p style="color:#78909c;margin:13px 0 4px;">Zollkontrolle ${kofferGame.typedIndex + 1}/${kofferGame.typingWords.length}</p>
            <b style="font-size:25px;color:#37474f;">${word.vi}</b>
            <p style="font-size:14px;color:#8d6e63;">Không có đáp án để chọn. Gõ lại từ tiếng Đức đầy đủ:</p>
        </div>`;
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('buttons').innerHTML = `
        <div style="max-width:560px;margin:0 auto;">
            <input id="kofferTypingInput" type="text" autocomplete="off" placeholder="der / die / das…" onkeypress="if(event.key==='Enter') checkKofferTypingAnswer()" style="width:100%;box-sizing:border-box;">
            <button class="btn-kapi btn-green" style="width:100%;margin:10px 0 0;" onclick="checkKofferTypingAnswer()">🔒 Khai báo với hải quan</button>
        </div>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">🚪 Bỏ vali ở cửa kiểm tra</button>`;
    setTimeout(() => {
        const input = document.getElementById('kofferTypingInput');
        if (input) input.focus();
    }, 80);
}

function checkKofferTypingAnswer() {
    if (kofferGame.answered) return;
    const input = document.getElementById('kofferTypingInput');
    const word = kofferGame.typingWords[kofferGame.typedIndex];
    const userAnswer = normalizeKofferAnswer(input ? input.value : '');
    const correctAnswer = normalizeKofferAnswer(word.de);
    if (!userAnswer) {
        alert('Hải quan nhận được một tờ khai trống. Vali nhìn cậu bằng toàn bộ sự 🫩 của nó.');
        return;
    }

    kofferGame.answered = true;
    const correct = userAnswer === correctAnswer;
    recordVocabAnswer(word, correct);
    document.getElementById('buttons').style.display = 'none';
    document.getElementById('feedback-area').style.display = 'block';

    if (correct) {
        kofferGame.streak++;
        kofferGame.bestStreak = Math.max(kofferGame.bestStreak, kofferGame.streak);
        document.getElementById('feedback-area').innerHTML = `
            <div style="padding:14px;border-radius:14px;background:#e8f5e9;color:#2e7d32;font-weight:bold;">✅ Hải quan đóng dấu: <b>${word.de}</b><br><small>${kofferGame.typedIndex + 1}/8 từ đã được nhớ lại bằng tay.</small></div>
            <button class="btn-kapi btn-green" style="width:100%;margin:12px 0 0;" onclick="nextKofferTypingWord()">➡️ Từ tiếp theo</button>`;
        return;
    }

    kofferGame.streak = 0;
    kofferGame.mistakes++;
    if (!kofferGame.wrongWords.some(item => item.de === word.de)) kofferGame.wrongWords.push(word);
    const saved = getSavedMissed();
    if (!saved.some(item => item.de === word.de)) { saved.push(word); saveMissed(saved); }
    const line = kofferGame.mistakes >= 3 ? getKofferFarewellLine() : kofferWrongLines[Math.min(kofferGame.mistakes - 1, 1)];

    document.getElementById('feedback-area').innerHTML = `
        <div style="padding:14px;border-radius:14px;background:#ffebee;color:#b71c1c;font-weight:bold;">“${line}”<br><small>Cậu gõ: <s>${input.value}</s><br>Đúng ra: <b>${word.de}</b></small></div>
        ${kofferGame.mistakes >= 3
            ? '<button class="btn-kapi" style="width:100%;margin:12px 0 0;background:#eceff1;" onclick="finishKofferGame(false)">🥺 Nhìn vali đổ đồ</button>'
            : '<button class="btn-kapi" style="width:100%;margin:12px 0 0;background:#ffcc80;" onclick="retryKofferTypingWord()">⌨️ Gõ lại từ này</button>'}`;
    makeKofferSayBye();
}

function retryKofferTypingWord() {
    document.getElementById('buttons').style.display = 'block';
    renderKofferTypingQuestion();
}

function nextKofferTypingWord() {
    kofferGame.typedIndex++;
    document.getElementById('buttons').style.display = 'block';
    renderKofferTypingQuestion();
}

const KOFFER_WEEKLY_STORY_KEY = 'kapi_koffer_weekly_story_v1';
const kofferWeeklyStories = [
    {
        title: 'Teil 1 · Der Koffer auf Gleis 7',
        html: `Am Montag stand ein Koffer ohne <ruby>Besitzer<rt>chủ sở hữu</rt></ruby> auf Gleis 7. Ein <ruby>Sicherheitsbeamter<rt>nhân viên an ninh</rt></ruby> wollte ihn öffnen. Da sagte eine müde Stimme <ruby>aus dem Inneren<rt>từ bên trong</rt></ruby>: „Fassen Sie mich nicht an. Ich habe gerade <ruby>gekündigt<rt>xin nghỉ việc</rt></ruby>.“ Alle <ruby>wichen zurück<rt>lùi lại</rt></ruby>. Nur eine kleine Taube blieb stehen. Plötzlich klopfte etwas dreimal von innen. Dann öffnete sich der Reißverschluss von selbst …`,
        speech: 'Am Montag stand ein Koffer ohne Besitzer auf Gleis sieben. Ein Sicherheitsbeamter wollte ihn öffnen. Da sagte eine müde Stimme aus dem Inneren: Fassen Sie mich nicht an. Ich habe gerade gekündigt. Alle wichen zurück. Nur eine kleine Taube blieb stehen. Plötzlich klopfte etwas dreimal von innen. Dann öffnete sich der Reißverschluss von selbst.'
    },
    {
        title: 'Teil 2 · Der blinde Passagier',
        html: `Aus dem Koffer sprang kein Mensch, sondern ein sehr kleiner Pinguin mit einer roten Krawatte. Er behauptete, er sei ein <ruby>blinder Passagier<rt>hành khách lậu</rt></ruby> und müsse dringend nach Berlin. Der Koffer <ruby>seufzte<rt>thở dài</rt></ruby>: „Ich transportiere keine Tiere mehr. Die letzte Ente hat meine Socken gefressen.“ Die Taube wollte gerade antworten, als der Pinguin ein goldenes Ticket <ruby>hervorzog<rt>rút ra</rt></ruby>. Darauf stand der Name des Koffers …`,
        speech: 'Aus dem Koffer sprang kein Mensch, sondern ein sehr kleiner Pinguin mit einer roten Krawatte. Er behauptete, er sei ein blinder Passagier und müsse dringend nach Berlin. Der Koffer seufzte: Ich transportiere keine Tiere mehr. Die letzte Ente hat meine Socken gefressen. Die Taube wollte gerade antworten, als der Pinguin ein goldenes Ticket hervorzog. Darauf stand der Name des Koffers.'
    },
    {
        title: 'Teil 3 · Ein Name, den niemand kannte',
        html: `Auf dem Ticket stand: Herr Knitterfrei. Der Koffer wurde <ruby>schlagartig<rt>đột ngột</rt></ruby> still. „Diesen Namen kennt niemand“, flüsterte er. Der Pinguin erklärte, das Ticket stamme aus dem <ruby>Fundbüro<rt>phòng đồ thất lạc</rt></ruby> des Berliner Flughafens und sei seit zwanzig Jahren <ruby>verschollen<rt>mất tích</rt></ruby>. Noch bevor jemand fragen konnte, warum ein Ticket so lange verschwunden war, ertönte aus dem Lautsprecher eine Durchsage: „Herr Knitterfrei, Ihr Besitzer wartet am Ausgang.“ Der Koffer drehte sich langsam um …`,
        speech: 'Auf dem Ticket stand: Herr Knitterfrei. Der Koffer wurde schlagartig still. Diesen Namen kennt niemand, flüsterte er. Der Pinguin erklärte, das Ticket stamme aus dem Fundbüro des Berliner Flughafens und sei seit zwanzig Jahren verschollen. Noch bevor jemand fragen konnte, warum ein Ticket so lange verschwunden war, ertönte aus dem Lautsprecher eine Durchsage: Herr Knitterfrei, Ihr Besitzer wartet am Ausgang. Der Koffer drehte sich langsam um.'
    },
    {
        title: 'Teil 4 · Die Frau mit dem gelben Regenschirm',
        html: `Am Ausgang stand eine alte Frau mit einem gelben Regenschirm. Als sie den Koffer sah, lächelte sie, als hätte sie ihn gestern erst <ruby>abgestellt<rt>đặt xuống</rt></ruby>. Herr Knitterfrei dagegen <ruby>erstarrte<rt>đứng sững</rt></ruby>. „Sie haben mich damals am Flughafen vergessen“, sagte er. Die Frau schüttelte den Kopf: „Nein. Du bist weggelaufen.“ Die Taube sah den Koffer an. Der Koffer sah die Taube an. Der Pinguin setzte vorsichtshalber einen Helm auf. Dann sagte die Frau: „Und ich weiß auch, warum.“ …`,
        speech: 'Am Ausgang stand eine alte Frau mit einem gelben Regenschirm. Als sie den Koffer sah, lächelte sie, als hätte sie ihn gestern erst abgestellt. Herr Knitterfrei dagegen erstarrte. Sie haben mich damals am Flughafen vergessen, sagte er. Die Frau schüttelte den Kopf: Nein. Du bist weggelaufen. Die Taube sah den Koffer an. Der Koffer sah die Taube an. Der Pinguin setzte vorsichtshalber einen Helm auf. Dann sagte die Frau: Und ich weiß auch, warum.'
    },
    {
        title: 'Teil 5 · Die verbotene Socke',
        html: `Die Frau öffnete ihre Handtasche und holte eine einzelne grüne Socke heraus. Der Koffer begann sofort zu <ruby>zittern<rt>run rẩy</rt></ruby>. „Die gehört nicht mir“, sagte er viel zu schnell. Laut der Frau enthielt die Socke eine <ruby>geheime Botschaft<rt>thông điệp bí mật</rt></ruby>, die niemals Deutschland erreichen durfte. Der Pinguin prüfte das Etikett und wurde blass. Die Taube fragte: „Was steht darauf?“ Er antwortete nicht, sondern zeigte wortlos auf die Waschmaschine hinter ihnen. Sie hatte gerade angefangen, rückwärts zu laufen …`,
        speech: 'Die Frau öffnete ihre Handtasche und holte eine einzelne grüne Socke heraus. Der Koffer begann sofort zu zittern. Die gehört nicht mir, sagte er viel zu schnell. Laut der Frau enthielt die Socke eine geheime Botschaft, die niemals Deutschland erreichen durfte. Der Pinguin prüfte das Etikett und wurde blass. Die Taube fragte: Was steht darauf? Er antwortete nicht, sondern zeigte wortlos auf die Waschmaschine hinter ihnen. Sie hatte gerade angefangen, rückwärts zu laufen.'
    },
    {
        title: 'Teil 6 · Abflug ohne Flugzeug',
        html: `Die Waschmaschine wurde immer schneller. Aus ihrer Trommel kam Wind, obwohl sie nicht einmal <ruby>angeschlossen<rt>được cắm điện</rt></ruby> war. Die alte Frau rief: „Niemand darf die Socke hineinwerfen!“ Natürlich stolperte die Taube genau in diesem Moment. Die Socke flog durch die Luft und <ruby>verschwand<rt>biến mất</rt></ruby> in der Trommel. Ein blaues Licht <ruby>breitete sich aus<rt>lan rộng</rt></ruby>. Der Boden unter ihnen löste sich auf — und der Koffer flüsterte: „Nicht schon wieder.“ …`,
        speech: 'Die Waschmaschine wurde immer schneller. Aus ihrer Trommel kam Wind, obwohl sie nicht einmal angeschlossen war. Die alte Frau rief: Niemand darf die Socke hineinwerfen! Natürlich stolperte die Taube genau in diesem Moment. Die Socke flog durch die Luft und verschwand in der Trommel. Ein blaues Licht breitete sich aus. Der Boden unter ihnen löste sich auf, und der Koffer flüsterte: Nicht schon wieder.'
    }
];

function getKofferWeekId(date = new Date()) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const day = copy.getDay() || 7;
    copy.setDate(copy.getDate() - day + 1);
    return copy.toLocaleDateString('sv-SE');
}

function loadKofferStoryProgress() {
    let data = {};
    try { data = JSON.parse(localStorage.getItem(KOFFER_WEEKLY_STORY_KEY) || '{}'); } catch (_) {}
    const weekId = getKofferWeekId();
    if (data.weekId !== weekId) data = { ...data, weekId, perfectDates: [] };
    data.perfectDates = Array.isArray(data.perfectDates) ? data.perfectDates : [];
    data.unlocked = Math.min(Number(data.unlocked) || 0, kofferWeeklyStories.length);
    data.claimedWeeks = data.claimedWeeks || {};
    return data;
}

function saveKofferStoryProgress(data) {
    try { localStorage.setItem(KOFFER_WEEKLY_STORY_KEY, JSON.stringify(data)); } catch (_) {}
}

function recordKofferPerfectDay() {
    const data = loadKofferStoryProgress();
    const today = new Date().toLocaleDateString('sv-SE');
    if (!data.perfectDates.includes(today)) data.perfectDates.push(today);
    let newlyUnlocked = false;
    if (data.perfectDates.length >= 5 && !data.claimedWeeks[data.weekId] && data.unlocked < kofferWeeklyStories.length) {
        data.unlocked++;
        data.claimedWeeks[data.weekId] = data.unlocked;
        newlyUnlocked = true;
    }
    saveKofferStoryProgress(data);
    return { ...data, newlyUnlocked };
}

function renderKofferWeeklyProgress(data = loadKofferStoryProgress()) {
    const count = Math.min(data.perfectDates.length, 5);
    const stamps = Array.from({ length: 5 }, (_, index) => index < count ? '🎫' : '▫️').join(' ');
    return `<div style="margin-top:12px;padding:12px;background:#fff8e1;border:2px dashed #ffb74d;border-radius:14px;color:#6d4c41;">
        <b>🎙️ Truyện thưởng tuần này: ${count}/5 ngày hoàn hảo</b><br>
        <span style="font-size:22px;letter-spacing:4px;">${stamps}</span><br>
        <small>Chỉ lượt gõ 8/8 không sai mới được đóng một tem mỗi ngày.</small>
        ${data.unlocked ? `<br><button class="btn-kapi" style="margin:9px 0 0;background:#ffe0b2;font-size:15px;padding:9px 13px;" onclick="showKofferRewardStory(${data.unlocked - 1})">🎧 Nghe chương đã mở gần nhất</button>` : ''}
    </div>`;
}

function showKofferRewardStory(index) {
    setLearningFocus(true);
    const data = loadKofferStoryProgress();
    const safeIndex = Math.max(0, Math.min(Number(index) || 0, data.unlocked - 1));
    if (!data.unlocked || !kofferWeeklyStories[safeIndex]) return showKofferIntro();
    const story = kofferWeeklyStories[safeIndex];
    document.getElementById('feedback-area').style.display = 'none';
    document.getElementById('message').innerHTML = `
        <style>
            .koffer-story-card{max-width:720px;margin:auto;padding:20px;background:#fffdf7;border:3px solid #ffcc80;border-radius:20px;text-align:left;line-height:2;color:#37474f;box-shadow:0 9px 22px rgba(93,64,55,.1)}
            .koffer-story-card ruby{color:#d35400;font-weight:900;ruby-position:under;text-decoration:underline dotted #ffb74d;text-underline-offset:3px}
            .koffer-story-card rt{font-size:10px;color:#795548;font-weight:600}
            .koffer-cliffhanger{margin-top:16px;padding:12px;background:#4e342e;color:white;border-radius:13px;text-align:center;font-weight:800}
            #koffer-storyteller.talking .koffer-mouth{animation:kofferTalk .24s ease-in-out infinite}
        </style>
        ${renderKofferMascot('calm', 'koffer-storyteller')}
        <div class="koffer-story-card">
            <h3 style="text-align:center;color:#795548;margin-top:0;">🧳 ${story.title}</h3>
            <div>${story.html}</div>
            <div class="koffer-cliffhanger">Fortsetzung folgt …<br><small>„Den Rest erzähle ich dir nächste Woche — wenn du dich benimmst.“</small></div>
        </div>`;
    const chapterButtons = Array.from({ length: data.unlocked }, (_, chapter) => `<button class="btn-kapi" style="font-size:14px;padding:8px 11px;background:${chapter === safeIndex ? '#ffcc80' : '#f5f5f5'};" onclick="showKofferRewardStory(${chapter})">Teil ${chapter + 1}</button>`).join('');
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="playKofferRewardStory(${safeIndex})">🔊 Vali kể chậm</button><br>
        <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:5px;">${chapterButtons}</div>
        <button class="btn-kapi btn-home" onclick="showKofferIntro()">⬅️ Về game vali</button>`;
}

function playKofferRewardStory(index) {
    const story = kofferWeeklyStories[index];
    const mascot = document.getElementById('koffer-storyteller');
    if (!story || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const voice = new SpeechSynthesisUtterance(story.speech);
    voice.lang = 'de-DE';
    voice.rate = 0.72;
    voice.pitch = 0.76;
    if (mascot) mascot.classList.add('talking');
    voice.onend = voice.onerror = () => mascot && mascot.classList.remove('talking');
    window.speechSynthesis.speak(voice);
}

function renderKofferRoundSummary() {
    const cards = kofferGame.questions.map((question, index) => {
        const word = question.word;
        return `
            <div style="padding:12px;background:#fff;border:1px solid #d7ccc8;border-radius:12px;text-align:left;">
                <b style="color:#5d4037;">${index + 1}. ${word.de}</b>
                ${question.isReview ? '<span style="float:right;padding:2px 7px;background:#ede7f6;color:#5e35b1;border-radius:999px;font-size:11px;">TỪ CŨ</span>' : ''}
                <div style="color:#455a64;margin-top:4px;">🇻🇳 ${word.vi}</div>
                <div style="color:#7b6b63;margin-top:6px;font-size:13px;font-style:italic;">💬 ${getKofferExample(word)}</div>
            </div>`;
    }).join('');
    return `
        <details open style="margin-top:14px;padding:12px;background:#fffaf0;border:2px solid #ffcc80;border-radius:15px;">
            <summary style="cursor:pointer;font-weight:900;color:#795548;">🧳 Manifest · 8 từ trong chuyến này</summary>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:9px;margin-top:11px;">${cards}</div>
        </details>`;
}

const KOFFER_DUMP_DAILY_KEY = 'kapi_koffer_dump_daily_v1';

function claimDailyKofferDump() {
    // Hoạt cảnh hiếm: chỉ mở sau Level 2 và tối đa một lần/ngày trên mỗi trình duyệt.
    if (!kofferGame.typingMode) return false;
    const today = new Date().toLocaleDateString('sv-SE');
    try {
        if (localStorage.getItem(KOFFER_DUMP_DAILY_KEY) === today) return false;
        localStorage.setItem(KOFFER_DUMP_DAILY_KEY, today);
    } catch (_) {}
    return true;
}

function finishKofferGame(success) {
    const wrong = uniqueMiniGameWords(kofferGame.wrongWords);
    const packed = kofferGame.packed.length;
    saveKofferRoundToHistory();
    const roundSummary = renderKofferRoundSummary();
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('feedback-area').style.display = 'block';

    if (success) {
        const storyProgress = kofferGame.typingMode && wrong.length === 0
            ? recordKofferPerfectDay()
            : loadKofferStoryProgress();
        const successStatus = renderKofferStatus().replace('class="koffer-mascot calm"', 'class="koffer-mascot done"').replace('class="koffer-mascot annoyed"', 'class="koffer-mascot done"');
        const successText = kofferGame.typingMode
            ? `Bồ câu đã tự gõ lại đủ <b>${kofferGame.typingWords.length}/${kofferGame.typingWords.length}</b> từ mà không nhìn đáp án.`
            : `Bồ câu đã hoàn thành Level 1 với chuỗi tốt nhất 🔥 <b>${kofferGame.bestStreak}</b>, nhưng chưa mở khóa Zollkontrolle.`;
        document.getElementById('message').innerHTML = `
            ${successStatus}
            <h2 style="color:#2e7d32;">🇩🇪 Vali đã tới Deutschland!</h2>
            <p>${successText}</p>`;
        document.getElementById('feedback-area').innerHTML = `
            <div style="padding:16px;background:#e8f5e9;border:2px dashed #81c784;border-radius:16px;">
                <b>🏅 Huy hiệu: ${kofferGame.typingMode ? 'Qua hải quan bằng trí nhớ' : 'Không bị bỏ lại ở sân bay'}</b><br>
                ${wrong.length ? `Cần ôn lại: ${wrong.map(word => word.de).join(' · ')}` : 'Không làm rơi từ nào. Voi rất đỗi tự hào 🫪'}
            </div>
            ${storyProgress.newlyUnlocked ? `<div style="margin-top:12px;padding:16px;background:linear-gradient(135deg,#fff3e0,#e8f5e9);border:3px solid #ffb74d;border-radius:17px;"><b>🎁 Vali miễn cưỡng mở khóa Teil ${storyProgress.unlocked}!</b><br><small>“Tôi không chuẩn bị riêng cho cậu đâu.”</small><br><button class="btn-kapi btn-green" style="margin:10px 0 0;" onclick="showKofferRewardStory(${storyProgress.unlocked - 1})">🎧 Nghe truyện thưởng</button></div>` : renderKofferWeeklyProgress(storyProgress)}
            ${roundSummary}`;
    } else {
        // Vali luôn mang đủ 8 món của chuyến; thất bại là nó dốc sạch, không chỉ đổ số từ đã trả lời đúng.
        const dumpedIcons = [...kofferItemIcons];
        const showFullDump = claimDailyKofferDump();
        if (!showFullDump) {
            const refusal = kofferGame.typingMode
                ? 'Hôm nay tôi diễn một lần rồi. Muốn xem nữa thì học thuộc tám từ đi.'
                : 'Chưa qua nổi Level 1 mà đã đòi xem tôi đổ đồ à? Hết suất diễn. Ôn từ đi.';
            document.getElementById('message').innerHTML = `
                <div style="max-width:580px;margin:auto;">
                    ${renderKofferMascot('annoyed')}
                    <div style="margin:10px auto;padding:12px 16px;background:#fff;border:2px solid #d7ccc8;border-radius:16px;color:#795548;font-size:16px;font-weight:800;line-height:1.5;">“${refusal}”</div>
                    <p style="color:#8d6e63;font-size:14px;">🫩 Vali đóng khóa. Không có tiết mục thất bại để cày.</p>
                </div>`;
            document.getElementById('feedback-area').innerHTML = `
                <div style="padding:16px;background:#fff3e0;border-radius:16px;">
                    Chuyến đi kết thúc. Muốn mở cảnh đặc biệt, bồ câu phải vào được <b>Level 2</b>; hoạt cảnh chỉ xuất hiện <b>một lần mỗi ngày</b>.<br>
                    ${wrong.length ? `Ôn lại ngay: <b>${wrong.map(word => word.de).join(' · ')}</b>` : ''}
                </div>${roundSummary}`;
        } else {
        document.getElementById('message').innerHTML = `
            <style>
                @keyframes kofferFinalDump {
                    0%,8%{transform:translateX(-50%) rotate(0);opacity:1}
                    11%{transform:translateX(calc(-50% - 7px)) rotate(-5deg)}
                    14%{transform:translateX(calc(-50% + 7px)) rotate(5deg)}
                    17%{transform:translateX(calc(-50% - 5px)) rotate(-4deg)}
                    21%{transform:translateX(-50%) rotate(0)}
                    35%,55%{transform:translateX(calc(-50% - 18px)) translateY(27px) rotate(-65deg)}
                    69%,78%{transform:translateX(-50%) translateY(0) rotate(0);opacity:1}
                    100%{transform:translateX(390px) rotate(12deg);opacity:0}
                }
                @keyframes kofferItemFall {
                    0%,34%{transform:translate(0,0) rotate(0) scale(.3);opacity:0}
                    38%{opacity:1}
                    72%{transform:translate(var(--drop-x),var(--drop-y)) rotate(var(--drop-r)) scale(1.08);opacity:1}
                    79%{transform:translate(var(--drop-x),calc(var(--drop-y) - 13px)) rotate(var(--drop-r)) scale(1)}
                    88%,100%{transform:translate(var(--drop-x),var(--drop-y)) rotate(var(--drop-r)) scale(1);opacity:1}
                }
                .koffer-farewell-bubble{position:relative;z-index:8;margin:0 auto 9px;padding:11px 15px;max-width:540px;background:#fff;border:2px solid #d7ccc8;border-radius:16px;color:#795548;font-size:clamp(14px,2.2vw,18px);font-weight:750;line-height:1.45;box-shadow:0 5px 14px rgba(93,64,55,.09);}
                .koffer-farewell-bubble:after{content:"";position:absolute;left:50%;bottom:-10px;width:17px;height:17px;background:#fff;border-right:2px solid #d7ccc8;border-bottom:2px solid #d7ccc8;transform:translateX(-50%) rotate(45deg);}
                .koffer-dump-stage{height:255px;position:relative;overflow:hidden;margin:auto;max-width:620px;}
                .koffer-airport-floor{position:absolute;left:4%;right:4%;bottom:27px;height:5px;border-radius:99px;background:#c7b8b1;box-shadow:0 6px 0 #efebe9;z-index:1;}
                .koffer-dump-actor{position:absolute;left:50%;top:35px;z-index:5;transform-origin:50% 82%;animation:kofferFinalDump 4.8s ease-in-out forwards;}
                .koffer-dump-actor #koffer-leaving{position:relative;z-index:2;margin:0;animation:none;transition:none;}
                .koffer-dumped-item{position:absolute;left:calc(50% - 14px);top:73px;font-size:29px;z-index:3;opacity:0;filter:drop-shadow(0 3px 2px rgba(0,0,0,.13));animation:kofferItemFall 3.8s cubic-bezier(.22,.72,.3,1) var(--drop-delay) forwards;}
                .koffer-dump-caption{position:relative;z-index:7;margin-top:2px;color:#8d6e63;font-size:14px;}
            </style>
            <div style="max-width:650px;margin:auto;padding-top:8px;">
                <div class="koffer-farewell-bubble">“${getKofferFarewellLine()}”</div>
                <div class="koffer-dump-stage">
                    <div class="koffer-airport-floor"></div>
                    <div id="koffer-dumped-items">${dumpedIcons.map((icon, index) => {
                        const scatter = [[-178,133,-35],[-130,143,22],[-78,132,-18],[-28,148,30],[30,137,-28],[82,148,38],[132,130,16],[178,145,-20]];
                        const [x, y, rotation] = scatter[index % scatter.length];
                        return `<span class="koffer-dumped-item" style="--drop-x:${x}px;--drop-y:${y}px;--drop-r:${rotation}deg;--drop-delay:${(index % 4) * 0.07}s">${icon}</span>`;
                    }).join('')}</div>
                    <div class="koffer-dump-actor">${renderKofferMascot('leaving', 'koffer-leaving')}</div>
                </div>
                <div class="koffer-dump-caption"><small>*Vali rung lên, nghiêng người dốc sạch đồ, nói “bye” rồi tự lăn đi.*</small></div>
            </div>`;
        document.getElementById('feedback-area').innerHTML = `
            <div style="padding:16px;background:#fff3e0;border-radius:16px;">
                Vali đã đổ sạch <b>${dumpedIcons.length} món</b> ra ngoài${packed ? `, kể cả ${packed} món bồ câu vừa đóng gói đúng` : ''}. Bồ câu đứng lại giữa sân bay với biểu cảm 🥺.<br>
                ${wrong.length ? `Từ làm vali mất niềm tin: <b>${wrong.map(word => word.de).join(' · ')}</b>` : ''}
            </div>${roundSummary}`;
        // Vali chỉ nói tạm biệt sau khi dựng dậy; tránh âm thanh chạy trước hoạt cảnh.
        setTimeout(() => makeKofferSayBye('koffer-leaving'), 3200);
        }
    }

    document.getElementById('buttons').innerHTML = `
        ${wrong.length ? '<button class="btn-kapi" style="background:#ffcc80;" onclick="reviewKofferMistakes()">🔁 Ôn những từ làm vali 🫩</button>' : ''}
        <button class="btn-kapi btn-green" onclick="startKofferGame(kofferGame.route)">🧳 Gọi vali quay lại</button>
        <button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu</button>`;
}

function reviewKofferMistakes() {
    const wrong = uniqueMiniGameWords(kofferGame.wrongWords);
    if (!wrong.length) return showVokabelHauptmenu();
    dailyMissionActive = false;
    flashcardWords = wrong;
    currentFlashcardGroup = 'review';
    currentFlashcardIndex = 0;
    isFlipped = false;
    renderFlashcard();
}

// ==========================================
// LIVETALK-TAGEBUCH: GPT PHÂN TÍCH, WEB GHI NHỚ, VALI PHÀN NÀN
// ==========================================
const LIVETALK_KEY = 'kapi_livetalk_diary_v1';
const LIVETALK_CHALLENGE_HISTORY_KEY = 'kapi_livetalk_challenges_v1';
let liveTalkDraftRows = [];
let liveTalkPractice = null;
let liveTalkEditIndex = -1;

function getLiveTalkChallengeHistory() {
    try {
        const history = JSON.parse(localStorage.getItem(LIVETALK_CHALLENGE_HISTORY_KEY));
        return Array.isArray(history) ? history : [];
    } catch (_) { return []; }
}

function rememberLiveTalkChallenge(challenge) {
    const history = getLiveTalkChallengeHistory();
    const fingerprint = [challenge.type, challenge.topic, challenge.prompt, ...(challenge.constraints || [])].filter(Boolean).join('|').trim().toLowerCase().replace(/\s+/g, ' ').slice(0, 700);
    if (!fingerprint || history.some(item => item.fingerprint === fingerprint)) return false;
    history.unshift({ fingerprint, prompt:challenge.prompt, date:new Date().toISOString() });
    localStorage.setItem(LIVETALK_CHALLENGE_HISTORY_KEY, JSON.stringify(history.slice(0, 500)));
    return true;
}

function getLiveTalkData() {
    try {
        const data = JSON.parse(localStorage.getItem(LIVETALK_KEY));
        return data && Array.isArray(data.sessions) ? data : { sessions:[] };
    } catch (_) { return { sessions:[] }; }
}

function saveLiveTalkData(data) {
    localStorage.setItem(LIVETALK_KEY, JSON.stringify(data));
}

function getAllLiveTalkRows() {
    return getLiveTalkData().sessions.flatMap(session => (session.rows || []).map(row => ({...row, sessionDate:session.date, sessionTitle:session.title})));
}

function newLiveTalkRow(row = {}) {
    return {
        id: row.id || `lt_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,
        target: row.target || '', said: row.said || '', correction: row.correction || '', native: row.native || '',
        rich: row.rich && typeof row.rich === 'object' ? {...row.rich} : {},
        reminder: row.reminder || '', tags: row.tags || '', right: Number(row.right || 0), wrong: Number(row.wrong || 0),
        level: Number(row.level || 0), nextReview: row.nextReview || todayDateKey(), retired: Boolean(row.retired)
    };
}

// Chỉ cho phép <mark> và <br> trong nội dung bút nhớ; mọi HTML khác đều bị loại bỏ.
function sanitizeLiveTalkRichHtml(html, fallback = '') {
    if (!html) return escapeSprechenHtml(fallback).replace(/\n/g, '<br>');
    const box = document.createElement('div');
    box.innerHTML = html;
    const cleanNode = node => {
        if (node.nodeType === Node.TEXT_NODE) return document.createTextNode(node.nodeValue || '');
        if (node.nodeType !== Node.ELEMENT_NODE) return document.createDocumentFragment();
        const tag = node.tagName.toLowerCase();
        const isHighlight = tag === 'mark' || Boolean(node.style?.backgroundColor);
        const out = isHighlight ? document.createElement('mark') : tag === 'br' ? document.createElement('br') : document.createDocumentFragment();
        if (tag !== 'br') [...node.childNodes].forEach(child => out.appendChild(cleanNode(child)));
        return out;
    };
    const safe = document.createElement('div');
    [...box.childNodes].forEach(node => safe.appendChild(cleanNode(node)));
    return safe.innerHTML;
}

function renderLiveTalkRichField(row, index, name, placeholder) {
    const html = sanitizeLiveTalkRichHtml(row.rich?.[name], row[name]);
    return `<div class="lt-rich" contenteditable="true" role="textbox" aria-multiline="true"
        data-lt-index="${index}" data-lt-field="${name}" data-placeholder="${placeholder}"
        oninput="updateLiveTalkRich(this)">${html}</div>`;
}

function updateLiveTalkRich(editor) {
    const row = liveTalkDraftRows[Number(editor.dataset.ltIndex)];
    if (!row) return;
    const field = editor.dataset.ltField;
    row[field] = editor.innerText.replace(/\n$/, '');
    row.rich ||= {};
    row.rich[field] = sanitizeLiveTalkRichHtml(editor.innerHTML, row[field]);
}

function formatLiveTalkSelection(mode) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
        return alert('Bôi đen một cụm từ trước đã nha bồ câu 🖍️');
    }
    const range = selection.getRangeAt(0);
    const startEditor = range.startContainer.nodeType === Node.ELEMENT_NODE ? range.startContainer.closest?.('.lt-rich') : range.startContainer.parentElement?.closest('.lt-rich');
    const endEditor = range.endContainer.nodeType === Node.ELEMENT_NODE ? range.endContainer.closest?.('.lt-rich') : range.endContainer.parentElement?.closest('.lt-rich');
    if (!startEditor || startEditor !== endEditor) return alert('Mỗi lần chỉ tô trong một ô thôi nha 🐦');
    startEditor.focus();
    document.execCommand('styleWithCSS', false, false);
    document.execCommand(mode === 'erase' ? 'removeFormat' : 'hiliteColor', false, mode === 'erase' ? null : '#ff9fc4');
    updateLiveTalkRich(startEditor);
}

function showLiveTalkMenu() {
    setLearningFocus(true, 'koffer');
    clearInterval(countdown);
    document.getElementById('timer').innerText = '';
    const data = getLiveTalkData();
    const rows = getAllLiveTalkRows();
    const today = todayDateKey();
    const due = rows.filter(row => !row.retired && (!row.nextReview || row.nextReview <= today)).length;
    document.getElementById('message').innerHTML = `
        <div style="font-size:31px;font-weight:900;color:#694f43;">☕ LiveTalk-Tagebuch</div>
        <div style="color:#91756a;margin-top:5px;">GPT phân tích · web ghi nhớ · vali không tự nguyện hợp tác.</div>`;
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <div style="max-width:760px;margin:auto;padding:18px;border:2px solid #d9c4ae;border-radius:20px;background:#fffdf8;color:#654f45;text-align:left;line-height:1.65;">
            <b>🗂️ ${data.sessions.length} biên bản · ${rows.length} mảnh ngôn ngữ</b><br>
            <span>${due ? `🔔 Có <b>${due}</b> câu đến hạn ôn.` : '🌿 Hiện chưa có câu nào đến hạn.'}</span>
            <div style="margin-top:10px;padding:11px;background:#f2ece7;border-radius:12px;">🫩 “Tôi không sửa bài. Tôi chỉ trả lại những lỗi bạn tưởng mình đã quên.”</div>
        </div>`;
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi" style="background:#ffe7a8;color:#624b37;" onclick="startLiveTalkEntry()">➕ Nhập biên bản mới</button>
        <button class="btn-kapi" style="background:#dcedc8;color:#3f5c36;" onclick="startLiveTalkPractice()">🔧 Ôn ${due || 'lỗi cũ'}</button>
        <button class="btn-kapi" style="background:#d9ecf7;color:#365d73;" onclick="showLiveTalkTopics()">🎤 Chủ đề nói tiếp</button>
        ${data.sessions.length ? '<button class="btn-kapi" style="background:#efe3f3;color:#684c70;" onclick="showLiveTalkArchive()">🗃️ Kho biên bản</button>' : ''}
        <button class="btn-kapi btn-home" onclick="chooseLesson('Sprechen')">⬅️ Zurück</button>`;
}

function startLiveTalkEntry(sessionIndex = -1) {
    const data = getLiveTalkData();
    const session = sessionIndex >= 0 ? data.sessions[sessionIndex] : null;
    liveTalkEditIndex = sessionIndex;
    liveTalkDraftRows = session ? session.rows.map(newLiveTalkRow) : [newLiveTalkRow(), newLiveTalkRow(), newLiveTalkRow()];
    renderLiveTalkEditor(sessionIndex, session?.title || 'Cuộc nói chuyện hôm nay');
}

function renderLiveTalkEditor(sessionIndex = -1, title = '') {
    document.getElementById('message').innerHTML = '<b>🗣️ Kịch bản luyện nói hằng ngày</b>';
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <style>
            .lt-editor{max-width:1050px;margin:auto;text-align:left}.lt-head{display:flex;gap:10px;margin-bottom:12px}.lt-title{flex:1;padding:12px;border:2px solid #d9c5b0;border-radius:12px;font-size:16px;background:#fffdf8}
            .lt-toolbar{display:flex;align-items:center;gap:8px;margin:0 0 10px;padding:8px 10px;border:1px solid #edc1d0;border-radius:12px;background:#fff4f8;color:#7b5260}.lt-marker,.lt-eraser{border:0;border-radius:999px;padding:8px 13px;font-weight:800;cursor:pointer}.lt-marker{background:#ff9fc4;color:#59273a;box-shadow:0 3px 0 #d9749b}.lt-eraser{background:#fff;color:#765b65;border:1px solid #dbc7ce}.lt-marker:active{transform:translateY(2px);box-shadow:0 1px 0 #d9749b}
            .lt-table{overflow-x:auto;border:2px solid #d8c7b9;border-radius:17px;background:#fff}.lt-grid{min-width:850px;display:grid;grid-template-columns:1fr 1.15fr 1.35fr 1.45fr}.lt-cell{padding:10px;border-right:1px solid #d8c7b9;border-bottom:1px solid #d8c7b9}.lt-cell:nth-child(4n){border-right:0}.lt-th{background:#fff8e7;font-weight:900;text-align:center;color:#634e43}.lt-rich{width:100%;min-height:92px;box-sizing:border-box;border:0;outline:0;background:transparent;font:15px/1.45 Arial,sans-serif;white-space:pre-wrap;overflow-wrap:anywhere}.lt-rich:empty:before{content:attr(data-placeholder);color:#aaa;pointer-events:none}.lt-rich:focus{background:#fffafd;box-shadow:inset 0 0 0 2px #ffd0e1;border-radius:8px}.lt-rich mark,.lt-rich span[style*="background-color"]{background:#ff9fc4!important;color:inherit;padding:1px 2px;border-radius:4px;box-decoration-break:clone;-webkit-box-decoration-break:clone}.lt-extra{grid-column:1/-1;display:grid;grid-template-columns:1.5fr 1fr auto;gap:9px;padding:9px;background:#faf6f1;border-bottom:1px solid #d8c7b9}.lt-extra input{padding:9px;border:1px solid #d7c7ba;border-radius:9px;background:#fff}.lt-delete{border:0;border-radius:9px;background:#ffebee;color:#a74450;cursor:pointer;padding:8px 12px}@media(max-width:700px){.lt-head{display:block}.lt-title{width:100%;box-sizing:border-box;margin-bottom:8px}.lt-toolbar{align-items:flex-start;flex-wrap:wrap}.lt-toolbar span{width:100%}}
        </style>
        <div class="lt-editor">
            <div class="lt-head"><input id="lt-session-title" class="lt-title" value="${escapeSprechenHtml(title)}" placeholder="Tên buổi LiveTalk"><div style="padding:12px;color:#8d6e63;">📅 ${todayDateKey()}</div></div>
            <div class="lt-toolbar">
                <span>🐦 Bôi đen chữ muốn nhớ:</span>
                <button type="button" class="lt-marker" onmousedown="event.preventDefault();formatLiveTalkSelection('highlight')">🖍️ Tô hồng</button>
                <button type="button" class="lt-eraser" onmousedown="event.preventDefault();formatLiveTalkSelection('erase')">⌫ Tẩy màu</button>
            </div>
            <div class="lt-table"><div class="lt-grid">
                <div class="lt-cell lt-th">🌿 Từ mục tiêu</div><div class="lt-cell lt-th">Câu đã nói</div><div class="lt-cell lt-th">❌ Lỗi cần sửa</div><div class="lt-cell lt-th">⭐ Cách nói hay</div>
                ${liveTalkDraftRows.map((row,index) => renderLiveTalkEditorRow(row,index)).join('')}
            </div></div>
            <button class="btn-kapi" style="margin:13px 0 0;background:#eef4df;color:#527048;" onclick="addLiveTalkRow(${sessionIndex})">＋ Thêm dòng</button>
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="saveLiveTalkSession(${sessionIndex})">💾 Lưu biên bản</button>
        <button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">⬅️ Hủy</button>`;
}

function renderLiveTalkEditorRow(row, index) {
    return `
        <div class="lt-cell">${renderLiveTalkRichField(row,index,'target','auf ein Thema eingehen')}</div>
        <div class="lt-cell">${renderLiveTalkRichField(row,index,'said','Câu cậu đã nói…')}</div>
        <div class="lt-cell">${renderLiveTalkRichField(row,index,'correction','Câu sai → câu sửa đúng')}</div>
        <div class="lt-cell">${renderLiveTalkRichField(row,index,'native','Cách nói tự nhiên hơn…')}</div>
        <div class="lt-extra">
            <input data-lt-index="${index}" data-lt-field="reminder" oninput="updateLiveTalkDraft(this)" value="${escapeSprechenHtml(row.reminder)}" placeholder="🧠 Câu nhắc vô tri, ví dụ: Praktikum không phải tài sản">
            <input data-lt-index="${index}" data-lt-field="tags" oninput="updateLiveTalkDraft(this)" value="${escapeSprechenHtml(row.tags)}" placeholder="🏷️ Arbeit, Pflege, Gefühle">
            <button class="lt-delete" onclick="deleteLiveTalkRow(${index})">🗑️</button>
        </div>`;
}

function updateLiveTalkDraft(input) {
    const row = liveTalkDraftRows[Number(input.dataset.ltIndex)];
    if (row) row[input.dataset.ltField] = input.value;
}

function addLiveTalkRow(sessionIndex) {
    liveTalkDraftRows.push(newLiveTalkRow());
    renderLiveTalkEditor(sessionIndex, document.getElementById('lt-session-title')?.value || 'Cuộc nói chuyện hôm nay');
}

function deleteLiveTalkRow(index) {
    liveTalkDraftRows.splice(index,1);
    if (!liveTalkDraftRows.length) liveTalkDraftRows.push(newLiveTalkRow());
    renderLiveTalkEditor(liveTalkEditIndex, document.getElementById('lt-session-title')?.value || 'Cuộc nói chuyện hôm nay');
}

function saveLiveTalkSession(sessionIndex = -1) {
    const rows = liveTalkDraftRows.filter(row => row.target.trim() || row.said.trim() || row.correction.trim() || row.native.trim());
    if (!rows.length) return alert('Biên bản đang trống. Vali từ chối lưu không khí 🫩');
    const data = getLiveTalkData();
    const session = { id:sessionIndex >= 0 ? data.sessions[sessionIndex].id : `session_${Date.now()}`, date:new Date().toISOString(), title:document.getElementById('lt-session-title')?.value.trim() || 'LiveTalk', rows };
    if (sessionIndex >= 0) data.sessions[sessionIndex] = session; else data.sessions.unshift(session);
    saveLiveTalkData(data);
    showLiveTalkSaved(session);
}

function getKofferLiveTalkLine(row, outcome) {
    const reminder = row.reminder.trim() || (row.target ? `Cấu trúc cần dùng là “${row.target}”.` : 'Hồ sơ vẫn yêu cầu sửa câu.');
    const starts = outcome === 'right'
        ? ['Không phát hiện vi phạm.','Hồ sơ lần này không gây đau mắt.','Tạm chấp nhận.','Động từ đã đến đúng cửa.','Ngữ pháp hôm nay còn sống.','Câu này được phép nhập cảnh.','Tôi chưa tìm thấy lý do để nói bye.','Bộ phận kiểm tra tạm thời im lặng.','Hồ sơ sạch một cách đáng ngờ.','Lần này bạn và tiếng Đức đã thỏa thuận được.','Không có gì rơi khỏi vali.','Câu nói đã đứng đúng hàng.']
        : ['Hồ sơ đã bị trả lại.','Không có diễn biến mới.','Tôi đã kiểm tra hai lần. Vẫn sai.','Kiến thức không qua hải quan.','Chúng ta lại gặp nhau ở đây.','Động từ vừa đi nhầm cổng.','Câu này đã tự làm mất hành lý.','Bộ phận ngữ pháp yêu cầu giải trình.','Tôi vừa tìm thấy một vi phạm quen thuộc.','Tiếng Đức đã từ chối ký nhận.','Hồ sơ phát ra âm thanh tuyệt vọng.','Bạn vừa trao cho tôi thêm việc.'];
    const ends = outcome === 'right'
        ? ['Đừng làm tôi hối hận.','Có thể tiếp tục tồn tại.','Tôi sẽ ghi nhận trong im lặng.','Một lần đúng chưa phải phép màu.','Bye, theo hướng tích cực.','Quyền sử dụng tạm thời được cấp.','Xin đừng tái phạm theo cách mới.','Tôi sẽ không khen thêm.','Hãy dùng nó trong một câu khác.','Hồ sơ được chuyển sang ngăn ít đáng lo.','Chúng ta coi như chưa từng cãi nhau.','Tiếp tục trước khi tôi đổi ý.']
        : ['Sửa rồi thử lại.','Tôi không nhận lời giải thích.','Đây không phải quyền tự do sáng tạo.','Vui lòng nhận lại động từ của bạn.','Tôi sẽ trả câu này lại vào ngày mai.','Không, bấm lại cũng không thành đúng.','Hãy đặt câu về đúng hiện thực.','Tôi đã chuẩn bị lịch tái khám.','Câu này chưa được phép rời sân bay.','Xin đừng biến lỗi thành truyền thống.','Tôi sẽ lưu việc này vào hồ sơ.','Bạn đã thua vòng này. Bye.'];
    const bridges = outcome === 'right'
        ? [`Quy tắc được dùng đúng: ${reminder}`,`Bản ghi xác nhận: ${reminder}`,`Ít nhất hôm nay bạn nhớ rằng ${reminder}`,`Điều khoản vừa được tuân thủ: ${reminder}`,`Chi tiết đáng ghi nhận: ${reminder}`,`Tôi nhắc lại để lần sau khỏi nhắc: ${reminder}`,`Tình trạng hiện tại: ${reminder}`,`Kết luận chuyên môn: ${reminder}`,`Dữ liệu tạm đồng ý rằng ${reminder}`,`Nội dung qua cửa kiểm tra: ${reminder}`]
        : [`Nguyên nhân rất quen thuộc: ${reminder}`,`Vấn đề vẫn là: ${reminder}`,`Biên bản ghi rõ: ${reminder}`,`Không có ngoại lệ cho việc này: ${reminder}`,`Đọc lại điều khoản: ${reminder}`,`Tôi buộc phải nhắc rằng ${reminder}`,`Tang vật ngôn ngữ cho thấy: ${reminder}`,`Cửa khẩu yêu cầu: ${reminder}`,`Lý do bị giữ lại: ${reminder}`,`Thông báo lần nữa: ${reminder}`];
    return `🫩 “${starts[Math.floor(Math.random()*starts.length)]} ${bridges[Math.floor(Math.random()*bridges.length)]} ${ends[Math.floor(Math.random()*ends.length)]}”`;
}

function showLiveTalkSaved(session) {
    document.getElementById('message').innerHTML = '<b>✅ Biên bản đã được lưu</b>';
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:760px;margin:auto;padding:20px;border:2px solid #d8c4b0;border-radius:18px;background:#fffdf8;text-align:left;">
        <b>${escapeSprechenHtml(session.title)}</b> · ${session.rows.length} dòng<br><br>${getKofferLiveTalkLine(session.rows[0], 'right')}
    </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="startLiveTalkPractice()">🔧 Luyện ngay</button>
        <button class="btn-kapi" style="background:#d9ecf7;" onclick="showLiveTalkTopics()">🎤 Gợi ý chủ đề tiếp</button>
        <button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">⬅️ Menu</button>`;
}

function getDueLiveTalkRows() {
    const today = todayDateKey();
    const due = getAllLiveTalkRows().filter(row => !row.retired && (!row.nextReview || row.nextReview <= today));
    return due.length ? due : getAllLiveTalkRows().filter(row => !row.retired);
}

async function startLiveTalkPractice() {
    const rows = getDueLiveTalkRows();
    if (!rows.length) return alert('Kho lỗi còn trống. Vali chưa có gì để trả lại 🫩');
    liveTalkPractice = { rows:shuffleArray(rows).slice(0,10), index:0, revealed:false, challenge:null, loading:false };
    await prepareLiveTalkChallenge();
}

function renderLiveTalkPractice() {
    const row = liveTalkPractice?.rows[liveTalkPractice.index];
    if (!row) return finishLiveTalkPractice();
    const challenge = liveTalkPractice.challenge;
    document.getElementById('message').innerHTML = `<b>🐘 Voi ra đề · ${liveTalkPractice.index+1}/${liveTalkPractice.rows.length}</b>`;
    document.getElementById('feedback-area').style.display = 'block';
    if (liveTalkPractice.loading || !challenge) {
        document.getElementById('feedback-area').innerHTML = `<div style="max-width:720px;margin:auto;padding:28px;border:2px solid #b9d8e8;border-radius:20px;background:#f2f9ff;color:#476777;"><b>🫪 Voi đang trộn chủ đề, ngữ cảnh và bẫy B2…</b><br><small>Vali đang đứng canh để voi không làm lộ đáp án.</small></div>`;
        document.getElementById('buttons').innerHTML = `<button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">🚪 Dừng ôn</button>`;
        return;
    }
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:720px;margin:auto;padding:23px;border:2px solid #d8c6b7;border-radius:20px;background:#fffdf8;text-align:left;color:#55433b;">
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:13px;"><span style="padding:5px 10px;border-radius:999px;background:#e7f1ff;color:#45647a;font-weight:bold;">🐘 ${escapeSprechenHtml(challenge.type || 'B2-Transfer')}</span><span style="padding:5px 10px;border-radius:999px;background:#fff0c9;color:#7a643a;">🎯 ${escapeSprechenHtml(challenge.topic || row.tags || 'Alltag')}</span></div>
        <div style="font-size:18px;line-height:1.65;color:#6d5145;">${escapeSprechenHtml(challenge.instruction || 'Hãy hoàn thành nhiệm vụ B2 sau:')}</div>
        <div style="margin-top:12px;padding:16px;border-radius:14px;background:#f5f1ec;font-size:20px;line-height:1.6;font-weight:700;white-space:pre-wrap;">${escapeSprechenHtml(challenge.prompt)}</div>
        ${challenge.constraints?.length ? `<div style="margin-top:12px;color:#8a6f62;"><b>📌 Điều kiện:</b> ${challenge.constraints.map(escapeSprechenHtml).join(' · ')}</div>` : ''}
        <textarea id="lt-practice-answer" rows="4" placeholder="Gõ câu sửa hoặc nói thành tiếng rồi ghi lại…" style="width:100%;box-sizing:border-box;margin-top:15px;padding:13px;border:2px solid #dfd1c5;border-radius:13px;font-size:16px;"></textarea>
        <div id="lt-practice-reveal"></div>
    </div>`;
    document.getElementById('buttons').innerHTML = `<button class="btn-kapi" style="background:#ffe0b2;" onclick="revealLiveTalkAnswer()">👁️ Mở hồ sơ đáp án</button><button class="btn-kapi" style="background:#dcecf6;color:#46687b;" onclick="requestAnotherLiveTalkChallenge()">🎲 Voi đổi đề</button><button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">🚪 Dừng ôn</button>`;
}

function buildOfflineLiveTalkChallenge(row) {
    const types = [
        ['B2-Präsentation','Mở đầu một phần trình bày B2 phù hợp với tình huống sau.'],
        ['Umformulierung','Viết lại ý sau theo cách tự nhiên và trang trọng hơn.'],
        ['Spontane Antwort','Trả lời ngay như trong một cuộc thảo luận Goethe B2.'],
        ['Transfer','Tự tạo một câu mới cho tình huống sau, dùng đúng cấu trúc đã học.'],
        ['Registerwechsel','Chuyển ý sau sang văn phong phù hợp với kỳ thi B2.']
    ];
    const topics = ['KI im Pflegealltag','eine Vier-Tage-Woche','Lebensmittelverschwendung','Stress am Arbeitsplatz','Online-Unterricht','öffentliche Verkehrsmittel','ehrenamtliche Arbeit','soziale Medien','Weiterbildung im Beruf','umweltfreundliches Reisen'];
    const contexts = ['Du leitest eine Diskussion ein.','Du widersprichst höflich.','Du fasst deine Meinung zusammen.','Du nennst einen Vorteil und eine Einschränkung.','Du reagierst auf die Meinung eines Kollegen.','Du beginnst den Hauptteil einer Präsentation.'];
    const constraints = ['12–20 Wörter','mindestens ein Nebensatz','keine Wiederholung von „ich denke“','natürliches B2-Deutsch','nur ein Satz'];
    const history = getLiveTalkChallengeHistory();
    for (let attempt=0; attempt<80; attempt++) {
        const type = types[Math.floor(Math.random()*types.length)];
        const topic = topics[Math.floor(Math.random()*topics.length)];
        const context = contexts[Math.floor(Math.random()*contexts.length)];
        const picked = shuffleArray(constraints).slice(0,2);
        const prompt = `${context}\nThema: ${topic}`;
        const fingerprint = `offline|${type[0]}|${prompt}|${picked.join('|')}`.toLowerCase();
        if (!history.some(item => item.fingerprint === fingerprint)) return { type:type[0], instruction:type[1], topic, prompt, constraints:picked, modelAnswer:row.native || row.correction || row.target, explanation:'Dùng cấu trúc mục tiêu trong một ngữ cảnh mới.', fingerprint, offline:true };
    }
    return { type:'Freie Produktion', instruction:'Tự tạo một câu B2 hoàn toàn mới bằng cấu trúc đã học.', topic:row.tags || 'Alltag', prompt:'Nói một ý có quan điểm, lý do và hệ quả trong một câu.', constraints:['không chép câu cũ','tự nhiên ở trình độ B2'], modelAnswer:row.native || row.correction || row.target, explanation:'Đây là bài tập chuyển giao, không phải học thuộc.', fingerprint:`free|${Date.now()}`, offline:true };
}

async function prepareLiveTalkChallenge(forceNew = false) {
    const row = liveTalkPractice?.rows[liveTalkPractice.index];
    if (!row) return finishLiveTalkPractice();
    liveTalkPractice.loading = true;
    liveTalkPractice.revealed = false;
    liveTalkPractice.challenge = null;
    renderLiveTalkPractice();
    const history = getLiveTalkChallengeHistory();
    let challenge = null;
    for (let attempt=0; attempt<3 && !challenge; attempt++) {
        try {
            const response = await fetch('/api/check', {
                method:'POST', headers:{'Content-Type':'application/json'},
                body:JSON.stringify({ mode:'livetalk_challenge', source:{ target:row.target, said:row.said, correction:row.correction, native:row.native, reminder:row.reminder, tags:row.tags }, usedChallenges:history.slice(0,60).map(item => item.prompt || item.fingerprint), nonce:`${Date.now()}_${Math.random()}_${attempt}_${forceNew}` })
            });
            const data = await response.json();
            if (!response.ok || !data.challenge?.prompt) throw new Error(data.error || 'Voi không gửi đề về');
            const candidate = data.challenge;
            candidate.fingerprint = [candidate.type,candidate.topic,candidate.prompt,...(candidate.constraints || [])].filter(Boolean).join('|').trim().toLowerCase().replace(/\s+/g,' ').slice(0,700);
            if (rememberLiveTalkChallenge(candidate)) challenge = candidate;
        } catch (_) { break; }
    }
    if (!challenge) {
        challenge = buildOfflineLiveTalkChallenge(row);
        rememberLiveTalkChallenge(challenge);
    }
    liveTalkPractice.challenge = challenge;
    liveTalkPractice.loading = false;
    renderLiveTalkPractice();
}

async function requestAnotherLiveTalkChallenge() {
    if (!liveTalkPractice || liveTalkPractice.loading) return;
    await prepareLiveTalkChallenge(true);
}

function revealLiveTalkAnswer() {
    const row = liveTalkPractice.rows[liveTalkPractice.index];
    const challenge = liveTalkPractice.challenge || {};
    liveTalkPractice.revealed = true;
    document.getElementById('lt-practice-reveal').innerHTML = `<div style="margin-top:16px;padding:15px;border-radius:14px;background:#eef5e7;line-height:1.65;">
        ${challenge.modelAnswer ? `<b>🐘 Đáp án gợi ý của voi:</b><br>${escapeSprechenHtml(challenge.modelAnswer)}<br>` : ''}
        ${challenge.explanation ? `<span style="color:#62715a;">${escapeSprechenHtml(challenge.explanation)}</span><br>` : ''}
        ${row.target ? `<b>🌿 Cấu trúc mục tiêu:</b><br>${escapeSprechenHtml(row.target)}<br>` : ''}
        ${row.correction ? `<b>✅ Câu sửa:</b><br>${escapeSprechenHtml(row.correction)}<br>` : ''}
        ${row.native ? `<b>⭐ Người bản xứ có thể nói:</b><br>${escapeSprechenHtml(row.native)}<br>` : ''}
        ${row.reminder ? `<b>🧠 Ám thị:</b> ${escapeSprechenHtml(row.reminder)}` : ''}
    </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="rateLiveTalkCard(true)">✅ Tôi nói được</button>
        <button class="btn-kapi" style="background:#ffcdd2;color:#7c3f45;" onclick="rateLiveTalkCard(false)">🫩 Vẫn sai</button>`;
}

function addDaysToDateKey(days) {
    const date = new Date(); date.setDate(date.getDate()+days); return todayDateKey(date);
}

function rateLiveTalkCard(correct) {
    const row = liveTalkPractice.rows[liveTalkPractice.index];
    const data = getLiveTalkData();
    let stored = null;
    data.sessions.some(session => {
        const found = session.rows.find(item => item.id === row.id);
        if (found) { stored = found; return true; }
        return false;
    });
    if (stored) {
        if (correct) {
            stored.right = Number(stored.right || 0) + 1;
            stored.level = Math.min(4, Number(stored.level || 0) + 1);
            stored.nextReview = addDaysToDateKey([1,3,7,14,30][stored.level - 1] || 30);
            stored.retired = stored.right >= 4 && stored.level >= 4;
        } else {
            stored.wrong = Number(stored.wrong || 0) + 1;
            stored.level = Math.max(0, Number(stored.level || 0) - 1);
            stored.nextReview = addDaysToDateKey(1);
            stored.retired = false;
        }
        saveLiveTalkData(data);
    }
    alert(getKofferLiveTalkLine(row, correct ? 'right' : 'wrong'));
    liveTalkPractice.index++;
    prepareLiveTalkChallenge();
}

function finishLiveTalkPractice() {
    document.getElementById('message').innerHTML = '<b>🧳 Zollkontrolle beendet</b>';
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:650px;margin:auto;padding:22px;border:2px solid #d8c4b2;border-radius:18px;background:#fffdf8;">🫩 “Buổi ôn đã kết thúc. Tôi không bình luận về cảm xúc, nhưng dữ liệu đã được cập nhật.”</div>`;
    document.getElementById('buttons').innerHTML = `<button class="btn-kapi" style="background:#d9ecf7;" onclick="showLiveTalkTopics()">🎤 Nói tiếp theo chủ đề liên quan</button><button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">⬅️ Menu</button>`;
}

const LIVETALK_TOPIC_TEMPLATES = {
    pflege:['Welche Erfahrung im Krankenhaus hat dich am stärksten verändert?','Was macht gute Pflege für dich persönlich aus?','Welche Belastungen im Pflegealltag werden oft unterschätzt?','Wie sollte ein gutes Pflegeteam mit Fehlern umgehen?','Welche Station passt deiner Meinung nach am besten zu dir?','Was würdest du einer neuen Pflegehelferin am ersten Tag raten?','Wie kann man trotz Zeitdruck menschlich mit Patienten umgehen?','Welche Fähigkeit möchtest du vor deiner Arbeit in Deutschland verbessern?'],
    arbeit:['Welche Arbeitsbedingungen sind dir besonders wichtig?','Wie gehst du mit Stress oder Konflikten am Arbeitsplatz um?','Was hast du durch praktische Arbeit über dich selbst gelernt?','Wann ist Teamarbeit hilfreich und wann anstrengend?','Welche Verantwortung sollte ein Arbeitgeber übernehmen?','Wie sieht für dich ein fairer Dienstplan aus?','Was würdest du an deinem früheren Arbeitsplatz verändern?','Welche Aufgabe gibt dir das Gefühl, etwas Sinnvolles zu tun?'],
    gefühle:['Wann hattest du zuletzt gemischte Gefühle und warum?','Worauf bist du heute stolz?','Welche Erfahrung musstest du erst einmal sacken lassen?','Wie merkst du, dass du eine Pause brauchst?','Was hilft dir, wenn du dich überfordert fühlst?','Welche Entscheidung ist dir in letzter Zeit schwergefallen?','Wann fühlst du dich an einem neuen Ort wirklich wohl?','Welche kleine Sache hat dich diese Woche gefreut?'],
    lernen:['Welche Lernmethode funktioniert bei dir wirklich?','Was motiviert dich, auch an schwierigen Tagen weiterzulernen?','Welche sprachliche Gewohnheit möchtest du verändern?','Wie gehst du mit Fehlern beim Sprechen um?','Welche deutsche Redewendung möchtest du aktiv benutzen?','Ist tägliches kurzes Lernen besser als eine lange Sitzung?','Wie könnte Technik beim Sprachenlernen sinnvoll helfen?','Welche Prüfungssituation findest du am schwierigsten?'],
    default:['Welche Erfahrung hat deine Meinung in letzter Zeit verändert?','Was war diese Woche überraschend schwierig?','Über welches Thema möchtest du heute genauer sprechen?','Welche Gewohnheit würdest du gern verändern?','Was würdest du deinem früheren Ich heute raten?','Welche kleine Entscheidung hat große Folgen gehabt?','Was bedeutet ein guter Alltag für dich?','Welche Sache wird von anderen oft unterschätzt?']
};

function buildLiveTalkTopicSuggestions() {
    const rows = getAllLiveTalkRows();
    const text = rows.map(row => `${row.tags} ${row.target} ${row.said} ${row.native}`).join(' ').toLowerCase();
    let key = 'default';
    if (/pflege|krankenhaus|patient/.test(text)) key = 'pflege';
    else if (/arbeit|praktikum|beruf|firma/.test(text)) key = 'arbeit';
    else if (/gefühl|stolz|angst|freu/.test(text)) key = 'gefühle';
    else if (/lern|deutsch|sprache|prüfung/.test(text)) key = 'lernen';
    const structures = shuffleArray(rows.map(row => row.target || row.native).filter(Boolean)).slice(0,3);
    return shuffleArray(LIVETALK_TOPIC_TEMPLATES[key]).slice(0,3).map((topic,index) => ({topic, structures:structures.slice(index % 2, index % 2 + 2)}));
}

function showLiveTalkTopics() {
    const suggestions = buildLiveTalkTopicSuggestions();
    document.getElementById('message').innerHTML = '<b>🎤 Wohin sprechen wir jetzt weiter?</b>';
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:780px;margin:auto;display:grid;gap:13px;text-align:left;">${suggestions.map((item,index) => `
        <div style="padding:17px;border:2px solid ${['#c8dda9','#b9d9e8','#e4c7d9'][index]};border-radius:17px;background:#fffdf8;">
            <b>${index+1}. ${escapeSprechenHtml(item.topic)}</b>
            <div style="margin-top:8px;color:#758560;">${item.structures.length ? `Bắt buộc thử dùng: ${item.structures.map(escapeSprechenHtml).join(' · ')}` : 'Nói tự do trong 90 giây.'}</div>
        </div>`).join('')}
        <div style="padding:13px;background:#f1ece8;border-radius:13px;">🫩 “Cấu trúc đã được cấp. Việc tạo thành câu thuộc trách nhiệm của bạn.”</div>
    </div>`;
    document.getElementById('buttons').innerHTML = `<button class="btn-kapi" style="background:#ffe0b2;" onclick="showLiveTalkTopics()">🎲 Bốc cách hỏi khác</button><button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">⬅️ Menu</button>`;
}

function showLiveTalkArchive() {
    const data = getLiveTalkData();
    document.getElementById('message').innerHTML = '<b>🗃️ Kho biên bản LiveTalk</b>';
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `<div style="max-width:850px;margin:auto;display:grid;gap:11px;text-align:left;">${data.sessions.map((session,index) => `
        <details style="padding:14px;border:2px solid #dfcdbd;border-radius:15px;background:#fffdf8;">
            <summary style="cursor:pointer;font-weight:900;color:#624c42;">${escapeSprechenHtml(session.title)} · ${session.rows.length} dòng</summary>
            <div style="margin-top:10px;display:grid;gap:8px;">${session.rows.map(row => `<div style="padding:10px;border-radius:10px;background:#f8f3ed;"><b>🌿 ${escapeSprechenHtml(row.target || 'Mảnh ngôn ngữ')}</b><br>${row.correction ? `✅ ${escapeSprechenHtml(row.correction)}<br>` : ''}${row.native ? `⭐ ${escapeSprechenHtml(row.native)}` : ''}</div>`).join('')}</div>
            <button class="btn-kapi" style="font-size:13px;padding:7px 12px;background:#e5eef6;" onclick="startLiveTalkEntry(${index})">✏️ Sửa biên bản</button>
            <button class="btn-kapi" style="font-size:13px;padding:7px 12px;background:#ffebee;color:#9d4b56;" onclick="deleteLiveTalkSession(${index})">🗑️ Xóa</button>
        </details>`).join('')}</div>`;
    document.getElementById('buttons').innerHTML = '<button class="btn-kapi btn-home" onclick="showLiveTalkMenu()">⬅️ Menu</button>';
}

function deleteLiveTalkSession(index) {
    if (!confirm('Xóa biên bản này? Những lỗi trong đó cũng sẽ rời sân bay.')) return;
    const data = getLiveTalkData(); data.sessions.splice(index,1); saveLiveTalkData(data); showLiveTalkArchive();
}

// 6. SPRECHEN & SCHREIBEN
// Kho đề teil1 / teil2 được giữ nguyên. Phần này chỉ quản lý buổi luyện.
const SPRECHEN_HISTORY_KEY = 'kapi_sprechen_history_v1';
const SPRECHEN_PROFILE_KEY = 'kapi_sprechen_candidate_v1';
const sprechenCounterarguments = [
    'Das klingt vernünftig, aber ist diese Lösung nicht zu teuer?',
    'Ich verstehe deinen Standpunkt. Trotzdem profitieren nicht alle Menschen davon.',
    'Da muss ich dir teilweise widersprechen. Welche Nachteile könnte das haben?',
    'Das ist ein gutes Argument. Aber funktioniert das auch langfristig?',
    'Viele Menschen sehen das anders. Wie würdest du sie überzeugen?'
];

let sprechenSession = null;
let sprechenRecorder = null;
let sprechenStream = null;
let sprechenAudioChunks = [];
let sprechenStartedAt = 0;
let sprechenPendingAvatar = '';

function showTeil1() {
    setLearningFocus(true);
    const thema = teil1[Math.floor(Math.random() * teil1.length)];
    setupSprechenUI({ teil: 1, thema: thema.thema, punkte: thema.punkte || [] });
}

function showTeil2() {
    setLearningFocus(true);
    const thema = teil2[Math.floor(Math.random() * teil2.length)];
    setupSprechenUI({ teil: 2, thema: String(thema), punkte: [] });
}

function escapeSprechenHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getSprechenCandidate() {
    let profile = null;
    try { profile = JSON.parse(localStorage.getItem(SPRECHEN_PROFILE_KEY)); } catch (_) {}
    if (!profile || !profile.name || !profile.code) {
        profile = {
            name: 'Kleine Taube',
            nickname: 'Bồ câu',
            code: `KAPI-${String(Math.floor(100 + Math.random() * 900))}`,
            avatar: ''
        };
        localStorage.setItem(SPRECHEN_PROFILE_KEY, JSON.stringify(profile));
    }
    if (!profile.nickname) profile.nickname = 'Bồ câu';
    if (typeof profile.avatar !== 'string') profile.avatar = '';
    return profile;
}

function renderKapiCandidateCard() {
    const profile = getSprechenCandidate();
    const status = sprechenSession && sprechenSession.mode
        ? (sprechenRecorder && sprechenRecorder.state === 'recording' ? '🔴 PRÜFUNG LÄUFT' : '✅ ZUGELASSEN')
        : '🌱 BEREIT… VERMUTLICH';
    const barcodeBars = Array.from({ length: 34 }, (_, i) =>
        `<i style="width:${i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1}px;"></i>`
    ).join('');

    return `
        <div class="kapi-id-wrap" title="Bấm để lật thẻ" onclick="toggleKapiCandidateCard(event)">
            <div class="kapi-id-card" id="kapi-candidate-card">
                <div class="kapi-id-face kapi-id-front">
                    <div class="kapi-id-head">
                        <span>KAPI SPRACHCLUB</span><span>🌿 CANDIDATE</span>
                    </div>
                    <div class="kapi-id-body">
                        <div class="kapi-id-photo">
                            <img src="${profile.avatar || 'capy.png'}" alt="Kapi Kandidat">
                            <span>✦</span>
                        </div>
                        <div class="kapi-id-data">
                            <div><b>GIVEN NAME</b><span>${escapeSprechenHtml(profile.name)}</span></div>
                            <div><b>NICKNAME</b><span>${escapeSprechenHtml(profile.nickname)}</span></div>
                            <div><b>LEVEL</b><span>Goethe B2</span></div>
                            <div><b>MODULE</b><span>Sprechen · Teil ${sprechenSession ? sprechenSession.teil : '?'}</span></div>
                            <div><b>STATUS</b><span>${status}</span></div>
                            <div class="kapi-id-motto">Gù gù · Deutsch · Brot</div>
                        </div>
                    </div>
                    <div class="kapi-id-bottom">
                        <button type="button" onclick="openSprechenProfileEditor(event)">✎ Chỉnh hồ sơ</button>
                        <div class="kapi-id-paw">🐾</div>
                        <div><div class="kapi-barcode">${barcodeBars}</div><small>${escapeSprechenHtml(profile.code)}</small></div>
                    </div>
                </div>
                <div class="kapi-id-face kapi-id-back">
                    <div class="kapi-id-head"><span>PROPERTY OF KAPI DEUTSCH</span><span>★</span></div>
                    <div class="kapi-back-paw">🐾</div>
                    <b>NẾU TÌM THẤY THÍ SINH ĐANG TRỐN THI</b>
                    <p>Vui lòng trả về phòng Sprechen.</p>
                    <div class="kapi-back-reward">REWARD: 1 BÁNH MÌ KHÔ 🥖</div>
                    <div class="kapi-signature">Kapi</div>
                    <small>${escapeSprechenHtml(profile.code)} · Gültig bis: khi bồ câu đỗ B2</small>
                </div>
            </div>
        </div>`;
}

function toggleKapiCandidateCard(event) {
    if (event && event.target && event.target.closest('button')) return;
    const card = document.getElementById('kapi-candidate-card');
    if (card) card.classList.toggle('is-flipped');
}

function openSprechenProfileEditor(event) {
    if (event) event.stopPropagation();
    const profile = getSprechenCandidate();
    sprechenPendingAvatar = profile.avatar || '';
    document.getElementById('kapi-profile-modal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'kapi-profile-modal';
    modal.className = 'kapi-profile-overlay';
    modal.onclick = e => { if (e.target === modal) closeSprechenProfileEditor(); };
    modal.innerHTML = `
        <div class="kapi-profile-dialog" role="dialog" aria-modal="true" aria-label="Chỉnh hồ sơ thí sinh">
            <button class="kapi-profile-close" onclick="closeSprechenProfileEditor()">×</button>
            <div class="kapi-profile-title">🪪 Hồ sơ bồ câu</div>
            <p>Tự làm giấy tờ cho mình. Cơ quan Kapi không kiểm tra tính xác thực :vvvv</p>
            <div class="kapi-profile-grid">
                <label class="kapi-avatar-editor">
                    <img id="kapi-avatar-preview" src="${profile.avatar || 'capy.png'}" alt="Xem trước avatar">
                    <span>📷 Thay ảnh</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" onchange="handleSprechenAvatar(event)">
                </label>
                <div class="kapi-profile-fields">
                    <label>Tên trên thẻ<input id="kapi-profile-name" maxlength="26" value="${escapeSprechenHtml(profile.name)}"></label>
                    <label>Nickname<input id="kapi-profile-nickname" maxlength="22" value="${escapeSprechenHtml(profile.nickname)}"></label>
                    <label>Mã thí sinh<input id="kapi-profile-code" maxlength="18" value="${escapeSprechenHtml(profile.code)}"></label>
                </div>
            </div>
            <small>Ảnh chỉ lưu trên thiết bị này và sẽ được thu nhỏ trước khi cất.</small>
            <div class="kapi-profile-actions">
                <button onclick="resetSprechenAvatar()">🐹 Dùng lại Kapi</button>
                <button class="save" onclick="saveSprechenProfile()">💾 Lưu thẻ</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
}

function closeSprechenProfileEditor() {
    document.getElementById('kapi-profile-modal')?.remove();
}

function handleSprechenAvatar(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) return alert('Ảnh to quá 8 MB rồi, Kapi không khiêng nổi :vvvv');
    const reader = new FileReader();
    reader.onload = () => {
        const image = new Image();
        image.onload = () => {
            const size = 420;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            const scale = Math.max(size / image.width, size / image.height);
            const width = image.width * scale;
            const height = image.height * scale;
            ctx.fillStyle = '#f3eadc';
            ctx.fillRect(0, 0, size, size);
            ctx.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
            sprechenPendingAvatar = canvas.toDataURL('image/jpeg', .82);
            document.getElementById('kapi-avatar-preview').src = sprechenPendingAvatar;
        };
        image.src = reader.result;
    };
    reader.readAsDataURL(file);
}

function resetSprechenAvatar() {
    sprechenPendingAvatar = '';
    const preview = document.getElementById('kapi-avatar-preview');
    if (preview) preview.src = 'capy.png';
}

function saveSprechenProfile() {
    const name = document.getElementById('kapi-profile-name')?.value.trim();
    const nickname = document.getElementById('kapi-profile-nickname')?.value.trim();
    const code = document.getElementById('kapi-profile-code')?.value.trim().toUpperCase();
    if (!name || !nickname || !code) return alert('Thẻ thi không được để trống nha bồ câu :vvvv');
    const profile = {
        name: name.slice(0, 26),
        nickname: nickname.slice(0, 22),
        code: code.replace(/[^A-Z0-9À-ỹ_-]/g, '-').slice(0, 18),
        avatar: sprechenPendingAvatar
    };
    try {
        localStorage.setItem(SPRECHEN_PROFILE_KEY, JSON.stringify(profile));
    } catch (_) {
        return alert('Ảnh vẫn hơi nặng. Hãy chọn ảnh khác nhẹ hơn nha.');
    }
    closeSprechenProfileEditor();
    document.getElementById('message').innerHTML = getSprechenTaskHtml();
}

function getSprechenTaskHtml() {
    if (!sprechenSession) return '';
    const punkte = sprechenSession.punkte.length
        ? `<div class="sprechen-task-points">${sprechenSession.punkte.map(p => `• ${escapeSprechenHtml(p)}`).join('<br>')}</div>`
        : '';
    return `
        <style>
            .sprechen-stage-head{position:relative;max-width:1120px;min-height:350px;margin:0 auto 8px;display:flex;align-items:flex-start;justify-content:center;padding:22px 335px 0;box-sizing:border-box}
            .sprechen-task-sheet{width:100%;max-width:590px;text-align:center;font-size:24px;line-height:1.45;padding-top:2px}
            .sprechen-task-title{font-size:30px;font-weight:900;margin-bottom:24px;color:#111}
            .sprechen-task-points{display:inline-block;margin-top:17px;text-align:left;line-height:1.75}
            .kapi-id-wrap{position:absolute;left:0;top:8px;width:310px;height:218px;perspective:1000px;transform:rotate(-1.2deg);cursor:pointer;z-index:3;filter:drop-shadow(0 10px 10px rgba(94,69,48,.18))}
            .kapi-id-card{position:relative;width:100%;height:100%;transition:transform .65s;transform-style:preserve-3d}
            .kapi-id-card.is-flipped{transform:rotateY(180deg)}
            .kapi-id-face{position:absolute;inset:0;backface-visibility:hidden;box-sizing:border-box;overflow:hidden;border:2px solid #d9b995;border-radius:20px;background:linear-gradient(145deg,#fffdf6,#f8eddb);color:#4b392e;font-family:Arial,sans-serif;box-shadow:inset 0 0 0 5px rgba(255,255,255,.45)}
            .kapi-id-face:after{content:'';position:absolute;width:105px;height:105px;right:-38px;bottom:-43px;border-radius:50%;background:rgba(151,181,126,.18);pointer-events:none}
            .kapi-id-head{height:39px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(90deg,#9fbd84 0 68%,#e9b17c 68%);color:#fffdf7;font-size:11px;font-weight:900;letter-spacing:1.5px}
            .kapi-id-head span:last-child{font-size:9px;letter-spacing:1px}
            .kapi-id-body{display:grid;grid-template-columns:106px 1fr;gap:13px;padding:12px 13px 5px}
            .kapi-id-photo{position:relative;height:119px;background:linear-gradient(150deg,#d7ece5,#f8d9bd);border:3px solid white;border-radius:15px;box-shadow:0 3px 8px rgba(99,71,47,.16);overflow:hidden}
            .kapi-id-photo img{width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.9) contrast(.98)}
            .kapi-id-photo span{position:absolute;left:5px;top:0;color:#f4a261;font-size:25px;transform:rotate(-18deg);text-shadow:0 1px white}
            .kapi-id-data{font-size:11px;line-height:1.58;text-align:left;overflow:hidden;padding-top:1px}
            .kapi-id-data>div:not(.kapi-id-motto){display:grid;grid-template-columns:66px 1fr;border-bottom:1px dashed #c7ad91;white-space:nowrap}
            .kapi-id-data b{color:#73935f;font-size:8px;letter-spacing:.55px}
            .kapi-id-data span{overflow:hidden;text-overflow:ellipsis}
            .kapi-id-motto{margin-top:6px;padding:5px 7px;border-radius:999px;background:#e8f0df;color:#688456;text-align:center;font-size:8px;font-weight:900;letter-spacing:.6px}
            .kapi-id-bottom{height:37px;padding:0 13px;display:flex;align-items:center;justify-content:space-between;gap:7px;background:rgba(236,213,184,.35)}
            .kapi-id-bottom button{position:relative;z-index:2;border:0;background:#c98455;color:white;border-radius:999px;padding:6px 10px;font-size:9px;font-weight:bold;cursor:pointer;box-shadow:0 2px 4px rgba(103,70,49,.15)}
            .kapi-id-paw{width:31px;height:31px;display:grid;place-items:center;border:2px solid #90ad79;border-radius:50%;font-size:18px;background:#f7ffef;transform:rotate(10deg)}
            .kapi-barcode{height:19px;display:flex;gap:1px;align-items:stretch;background:#fff;padding:2px 5px;border-radius:2px}
            .kapi-barcode i{display:block;background:#111}
            .kapi-id-bottom small{display:block;font-size:7px;text-align:center;letter-spacing:1px}
            .kapi-id-back{transform:rotateY(180deg);text-align:center;padding-bottom:8px}
            .kapi-back-paw{margin:18px auto 9px;width:58px;height:58px;display:grid;place-items:center;border:4px solid #91af78;border-radius:50%;font-size:35px;background:#eaf3e2}
            .kapi-id-back>b{display:block;padding:0 18px;color:#805338;font-size:12px;line-height:1.4}
            .kapi-id-back p{font-size:11px;margin:7px 0}
            .kapi-back-reward{display:inline-block;padding:6px 12px;background:#c98455;color:white;border-radius:999px;font-size:9px;font-weight:bold}
            .kapi-signature{position:absolute;right:18px;bottom:18px;font-family:cursive;font-size:21px;color:#79533f;transform:rotate(-8deg)}
            .kapi-id-back>small{position:absolute;left:13px;bottom:9px;font-size:7px}
            .kapi-profile-overlay{position:fixed;inset:0;z-index:99999;display:grid;place-items:center;padding:18px;background:rgba(54,42,34,.48);backdrop-filter:blur(5px)}
            .kapi-profile-dialog{position:relative;width:min(560px,94vw);box-sizing:border-box;padding:25px;border:3px solid #dcb88d;border-radius:25px;background:linear-gradient(145deg,#fffdf8,#f5eadb);box-shadow:0 22px 60px rgba(47,35,28,.28);color:#4c3b30;text-align:left}
            .kapi-profile-close{position:absolute;right:13px;top:10px;border:0;background:transparent;color:#8d6e63;font-size:29px;cursor:pointer}
            .kapi-profile-title{font-size:24px;font-weight:900;color:#795548}.kapi-profile-dialog>p{margin:7px 30px 18px 0;color:#8a7465;font-size:14px}
            .kapi-profile-grid{display:grid;grid-template-columns:165px 1fr;gap:20px;align-items:center}
            .kapi-avatar-editor{height:175px;position:relative;display:block;border:4px solid white;border-radius:20px;overflow:hidden;background:#dcebe1;box-shadow:0 5px 13px rgba(89,66,49,.18);cursor:pointer}
            .kapi-avatar-editor img{width:100%;height:100%;object-fit:cover}.kapi-avatar-editor span{position:absolute;left:50%;bottom:9px;transform:translateX(-50%);white-space:nowrap;padding:7px 12px;border-radius:999px;background:rgba(74,58,47,.78);color:white;font-size:12px;font-weight:bold}.kapi-avatar-editor input{display:none}
            .kapi-profile-fields{display:grid;gap:11px}.kapi-profile-fields label{font-size:11px;font-weight:900;color:#708c5c;letter-spacing:.6px}.kapi-profile-fields input{display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px 12px;border:2px solid #dfccb6;border-radius:12px;background:#fff;color:#3e332c;font-size:15px;outline:none}.kapi-profile-fields input:focus{border-color:#91ad79;box-shadow:0 0 0 3px rgba(145,173,121,.16)}
            .kapi-profile-dialog>small{display:block;margin-top:15px;color:#9a8778}.kapi-profile-actions{display:flex;justify-content:flex-end;gap:9px;margin-top:15px}.kapi-profile-actions button{border:0;border-radius:999px;padding:10px 16px;background:#e5dacb;color:#5c493c;font-weight:bold;cursor:pointer}.kapi-profile-actions .save{background:#86a86d;color:white}
            @media(max-width:900px){.sprechen-stage-head{display:block;min-height:0;padding:8px 10px}.kapi-id-wrap{position:relative;left:auto;top:auto;margin:0 auto 26px;transform:rotate(-.7deg)}.sprechen-task-sheet{font-size:20px}.sprechen-task-title{font-size:27px;margin-bottom:15px}}
            @media(max-width:560px){.kapi-id-wrap{width:286px;height:201px}.kapi-id-body{grid-template-columns:96px 1fr;padding:10px}.kapi-id-photo{height:108px}.kapi-id-data{font-size:10px}.kapi-profile-grid{grid-template-columns:1fr}.kapi-avatar-editor{width:155px;height:155px;margin:auto}.kapi-profile-actions{justify-content:stretch}.kapi-profile-actions button{flex:1}}
        </style>
        <div class="sprechen-stage-head">
            ${renderKapiCandidateCard()}
            <div class="sprechen-task-sheet">
                <div class="sprechen-task-title">🗣️ B2 Teil ${sprechenSession.teil}</div>
                <div>${escapeSprechenHtml(sprechenSession.thema)}</div>
                ${punkte}
            </div>
        </div>`;
}

function setupSprechenUI(task) {
    clearInterval(countdown);
    document.getElementById('timer').innerText = '';
    sprechenSession = {
        ...task,
        mode: '',
        notes: '',
        transcript: '',
        replyTranscript: '',
        counterargument: '',
        durationSeconds: 0,
        recordingRound: 1
    };
    document.getElementById('message').innerHTML = getSprechenTaskHtml();
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <div style="max-width:680px;margin:auto;padding:18px;background:#f3f8ff;border:2px solid #90caf9;border-radius:18px;text-align:left;line-height:1.6;">
            <b style="color:#1565c0;">🐘 Voi đã nhận đúng hồ sơ Sprechen</b><br>
            <span style="color:#607d8b;">Chọn chế độ. Kho đề vẫn giữ nguyên, chỉ khác cách luyện.</span>
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="beginSprechenPreparation('practice')">🌱 Übungsmodus</button>
        <button class="btn-kapi" style="background:#ffcc80;" onclick="beginSprechenPreparation('exam')">⏱️ Prüfungsmodus</button>
        <button class="btn-kapi btn-home" onclick="leaveSprechen()">⬅️ Zurück</button>`;
}

function beginSprechenPreparation(mode) {
    sprechenSession.mode = mode;
    document.getElementById('message').innerHTML = getSprechenTaskHtml();
    document.getElementById('feedback-area').innerHTML = `
        <div style="max-width:680px;margin:auto;text-align:left;">
            <label for="sprechen-notes"><b>📝 Stichpunkte chuẩn bị</b></label>
            <textarea id="sprechen-notes" rows="4" placeholder="Chỉ ghi từ khóa – đừng viết nguyên bài..." style="width:100%;box-sizing:border-box;margin-top:8px;"></textarea>
            ${mode === 'practice' ? `
                <div style="margin-top:12px;padding:13px;background:#fff8e1;border-radius:13px;color:#6d4c41;line-height:1.65;">
                    <b>🪜 Cầu nối cứu bồ câu:</b><br>
                    Zunächst möchte ich … · Hinzu kommt, dass … · Ein gutes Beispiel dafür ist … · Abschließend lässt sich sagen, dass …
                </div>` : `
                <div style="margin-top:12px;padding:13px;background:#ffebee;border-radius:13px;color:#8e3b46;">🔒 Prüfungsmodus: không hiện khung câu gợi ý.</div>`}
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="startSprechenRecording(1)">🎤 Bắt đầu nói</button>
        <button class="btn-kapi btn-home" onclick="restartSprechenModeChoice()">⬅️ Chọn lại chế độ</button>`;
    startSprechenTimer(mode === 'exam' ? 900 : 180, '⏳ Chuẩn bị');
}

function startSprechenTimer(seconds, label) {
    clearInterval(countdown);
    let remaining = seconds;
    const render = () => {
        const m = Math.floor(remaining / 60);
        const s = String(remaining % 60).padStart(2, '0');
        document.getElementById('timer').innerText = `${label}: ${m}:${s}`;
    };
    render();
    countdown = setInterval(() => {
        remaining--;
        render();
        if (remaining <= 0) {
            clearInterval(countdown);
            document.getElementById('timer').innerText = `⏰ ${label}: hết giờ`;
        }
    }, 1000);
}

function getSupportedAudioMimeType() {
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4'];
    return candidates.find(type => window.MediaRecorder && MediaRecorder.isTypeSupported(type)) || '';
}

async function startSprechenRecording(round = 1) {
    if (!sprechenSession) return;
    const notes = document.getElementById('sprechen-notes');
    if (notes) sprechenSession.notes = notes.value.trim();
    if (!navigator.mediaDevices || !window.MediaRecorder) return showSprechenFallback();

    try {
        sprechenStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = getSupportedAudioMimeType();
        sprechenRecorder = mimeType ? new MediaRecorder(sprechenStream, { mimeType }) : new MediaRecorder(sprechenStream);
        sprechenAudioChunks = [];
        sprechenSession.recordingRound = round;
        sprechenRecorder.ondataavailable = event => { if (event.data.size) sprechenAudioChunks.push(event.data); };
        sprechenRecorder.onstop = transcribeSprechenAudio;
        sprechenRecorder.start();
        sprechenStartedAt = Date.now();
        renderSprechenRecording();
    } catch (error) {
        console.error('Microphone error:', error);
        showSprechenFallback('Trình duyệt chưa cho phép dùng micro.');
    }
}

function renderSprechenRecording() {
    clearInterval(countdown);
    let seconds = 0;
    document.getElementById('message').innerHTML = `${getSprechenTaskHtml()}<br><div style="margin-top:16px;color:#e53935;font-weight:bold;">🔴 Đang ghi âm…</div>`;
    const render = () => document.getElementById('timer').innerText = `🎤 ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    render();
    countdown = setInterval(() => { seconds++; render(); }, 1000);
    document.getElementById('feedback-area').innerHTML = `
        <div style="padding:17px;background:#ffebee;border-radius:16px;color:#b71c1c;">
            <b>Voi đang nghe. Cứ nói hết câu, không cần hoảng khi vấp :vvvv</b><br>
            <small>${sprechenSession.recordingRound === 2 ? 'Hãy trả lời ý kiến phản biện.' : 'Audio chỉ được gửi đi sau khi cậu bấm dừng.'}</small>
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-red" onclick="stopSprechenRecording()">⏹️ Dừng và phiên âm</button>
        <button class="btn-kapi btn-home" onclick="leaveSprechen()">✖ Hủy buổi luyện</button>`;
}

function stopSprechenRecording() {
    if (!sprechenRecorder || sprechenRecorder.state === 'inactive') return;
    clearInterval(countdown);
    sprechenSession.durationSeconds += Math.max(1, Math.round((Date.now() - sprechenStartedAt) / 1000));
    sprechenRecorder.stop();
    document.getElementById('buttons').innerHTML = '';
    document.getElementById('feedback-area').innerHTML = `<div style="padding:18px;background:#e3f2fd;border-radius:16px;color:#1565c0;"><b>🐘 Voi đang nghe lại băng…</b><br><small>Bánh mì khô đang được chuyển hóa thành transcript.</small></div>`;
}

function stopSprechenStream() {
    if (sprechenStream) sprechenStream.getTracks().forEach(track => track.stop());
    sprechenStream = null;
}

async function transcribeSprechenAudio() {
    stopSprechenStream();
    const mimeType = sprechenRecorder.mimeType || 'audio/webm';
    const extension = mimeType.includes('mp4') ? 'm4a' : 'webm';
    const audioBlob = new Blob(sprechenAudioChunks, { type: mimeType });
    const formData = new FormData();
    formData.append('audio', audioBlob, `sprechen.${extension}`);

    try {
        const response = await fetch('/api/transcribe', { method: 'POST', body: formData });
        const data = await response.json();
        if (!response.ok || !data.text) throw new Error(data.error || 'Không có transcript');
        if (sprechenSession.recordingRound === 2) sprechenSession.replyTranscript = data.text.trim();
        else sprechenSession.transcript = data.text.trim();
        renderSprechenTranscript();
    } catch (error) {
        console.error('Transcription error:', error);
        showSprechenFallback('Voi nghe được tiếng nhưng máy phiên âm bị nghẹn. Cậu có thể dán transcript thủ công.');
    }
}

function renderSprechenTranscript() {
    const isTeil2FirstRound = sprechenSession.teil === 2 && !sprechenSession.replyTranscript;
    if (isTeil2FirstRound && !sprechenSession.counterargument) {
        sprechenSession.counterargument = sprechenCounterarguments[Math.floor(Math.random() * sprechenCounterarguments.length)];
    }
    document.getElementById('message').innerHTML = getSprechenTaskHtml();
    document.getElementById('timer').innerText = `🎤 ${sprechenSession.durationSeconds} giây đã nói`;
    document.getElementById('feedback-area').innerHTML = `
        <div style="max-width:700px;margin:auto;text-align:left;">
            <label><b>📜 Transcript của cậu</b> <small style="color:#78909c;">(sửa lỗi máy nghe nhầm trước khi chấm)</small></label>
            <div id="transcript-text" class="transcript-box" contenteditable="true" style="margin-top:8px;min-height:110px;">${sprechenSession.transcript}</div>
            ${sprechenSession.teil === 2 ? `
                <div style="margin-top:15px;padding:15px;background:#fff3e0;border-left:5px solid #ff9800;border-radius:12px;">
                    <b>🤝 Gesprächspartner widerspricht:</b><br>${sprechenSession.counterargument}
                </div>
                ${sprechenSession.replyTranscript ? `
                    <label style="display:block;margin-top:14px;"><b>💬 Câu phản hồi của cậu</b></label>
                    <div id="reply-transcript-text" class="transcript-box" contenteditable="true" style="margin-top:8px;min-height:80px;">${sprechenSession.replyTranscript}</div>` : ''}` : ''}
            <div id="ai-correction" style="display:none;margin-top:15px;"></div>
        </div>`;
    document.getElementById('buttons').innerHTML = isTeil2FirstRound
        ? `<button class="btn-kapi" style="background:#ffcc80;" onclick="startTeil2Reply()">🎤 Trả lời phản biện</button>
           <button class="btn-kapi btn-home" onclick="leaveSprechen()">⬅️ Dừng buổi luyện</button>`
        : `<button class="btn-kapi btn-green" onclick="checkSprechen()">🐘 Gửi voi chấm Sprechen</button>
           <button class="btn-kapi" style="background:#e1f5fe;" onclick="startSprechenRecording(${sprechenSession.teil === 2 ? 2 : 1})">🎤 Ghi lại</button>
           <button class="btn-kapi btn-home" onclick="leaveSprechen()">⬅️ Zurück</button>`;
}

function startTeil2Reply() {
    const first = document.getElementById('transcript-text');
    if (first) sprechenSession.transcript = first.innerText.trim();
    startSprechenRecording(2);
}

function showSprechenFallback(reason = '') {
    stopSprechenStream();
    clearInterval(countdown);
    document.getElementById('timer').innerText = '';
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <div style="padding:12px;background:#fff3e0;border-radius:12px;color:#8d6e63;margin-bottom:10px;">${reason || 'Thiết bị này chưa hỗ trợ ghi âm trực tiếp.'}</div>
        <div id="transcript-text" class="transcript-box" contenteditable="true" style="min-height:130px;" data-placeholder="Dán transcript hoặc dùng bàn phím giọng nói tại đây..."></div>
        <div id="ai-correction" style="display:none;margin-top:15px;"></div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="checkSprechen()">🐘 Gửi voi chấm Sprechen</button>
        <button class="btn-kapi btn-home" onclick="leaveSprechen()">⬅️ Zurück</button>`;
}

async function checkSprechen() {
    const transcriptBox = document.getElementById('transcript-text');
    const replyBox = document.getElementById('reply-transcript-text');
    const transcript = transcriptBox ? transcriptBox.innerText.trim() : sprechenSession.transcript;
    const replyTranscript = replyBox ? replyBox.innerText.trim() : sprechenSession.replyTranscript;
    if (!transcript) return alert('Bồ câu chưa nói gì, voi không thể chấm không khí :vvvv');

    sprechenSession.transcript = transcript;
    sprechenSession.replyTranscript = replyTranscript;
    let aiCorrection = document.getElementById('ai-correction');
    aiCorrection.style.display = 'block';
    aiCorrection.innerHTML = `<p style="color:#5c6bc0;"><i>🐘 Voi đang đeo kính chấm đúng rubric Sprechen…</i></p>`;
    document.getElementById('buttons').style.display = 'none';

    try {
        const response = await fetch('/api/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mode: 'sprechen',
                teil: sprechenSession.teil,
                thema: sprechenSession.thema,
                punkte: sprechenSession.punkte,
                transcript,
                replyTranscript,
                counterargument: sprechenSession.counterargument,
                durationSeconds: sprechenSession.durationSeconds,
                cauVidu: transcript
            })
        });
        const data = await response.json();
        if (!response.ok || !data.result) throw new Error(data.error || 'Voi không gửi phiếu chấm về');
        aiCorrection.innerHTML = `
            <div style="background:#eef4ff;padding:20px;border-radius:16px;border-left:6px solid #5c6bc0;line-height:1.7;color:#263238;box-shadow:0 5px 12px rgba(63,81,181,.10);">
                <h3 style="color:#3949ab;margin-top:0;">🐘 Phiếu chấm Sprechen</h3>${data.result}
            </div>`;
        saveSprechenHistory();
        completeTodayStudyMission('sprechen');
    } catch (error) {
        aiCorrection.innerHTML = `<p style="color:#c62828;font-weight:bold;">Voi bị nghẹn API: ${error.message}</p>`;
    } finally {
        document.getElementById('buttons').style.display = 'block';
        document.getElementById('buttons').innerHTML = `
            <button class="btn-kapi btn-green" onclick="${sprechenSession.teil === 1 ? 'showTeil1()' : 'showTeil2()'}">🎲 Luyện đề khác</button>
            <button class="btn-kapi btn-home" onclick="leaveSprechen()">⬅️ Về menu</button>`;
    }
}

function saveSprechenHistory() {
    let history = [];
    try { history = JSON.parse(localStorage.getItem(SPRECHEN_HISTORY_KEY)) || []; } catch (_) {}
    history.unshift({
        date: new Date().toISOString(),
        teil: sprechenSession.teil,
        thema: sprechenSession.thema,
        durationSeconds: sprechenSession.durationSeconds,
        transcript: sprechenSession.transcript,
        replyTranscript: sprechenSession.replyTranscript
    });
    localStorage.setItem(SPRECHEN_HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
}

function restartSprechenModeChoice() {
    if (!sprechenSession) return chooseLesson('Sprechen');
    setupSprechenUI({
        teil: sprechenSession.teil,
        thema: sprechenSession.thema,
        punkte: sprechenSession.punkte
    });
}

function leaveSprechen() {
    if (sprechenRecorder && sprechenRecorder.state !== 'inactive') {
        sprechenRecorder.onstop = null;
        sprechenRecorder.stop();
    }
    stopSprechenStream();
    clearInterval(countdown);
    sprechenSession = null;
    document.getElementById('timer').innerText = '';
    showLessons();
}

const SCHREIBEN_DRAFT_KEY = 'kapi_schreiben_draft_v2';
const SCHREIBEN_HISTORY_KEY = 'kapi_schreiben_history_v2';
let schreibenSession = null;

const schreibenTeil1 = [
    { title: 'Private Fotos in sozialen Medien', points: ['Vorteile: schnelle Kommunikation, Erinnerungen teilen', 'Nachteile: Datenschutzprobleme, Missbrauch von Fotos', 'Einfluss auf Freundschaften und Familie', 'Eigene Meinung: sinnvoll oder gefährlich?'] },
    { title: 'Werbung und Konsum', points: ['Werbung beeinflusst Kaufentscheidungen', 'Positive Aspekte: Information über Produkte', 'Negative Aspekte: Konsumdruck, Manipulation', 'Eigene Meinung: Grenzen für Werbung?'] },
    { title: 'Umweltfreundlicher Tourismus', points: ['Vorteile: Schutz der Natur, nachhaltige Entwicklung', 'Nachteile: höhere Kosten, weniger Komfort', 'Verantwortung der Reisenden', 'Eigene Meinung: notwendig oder übertrieben?'] },
    { title: 'Kleidungskonsum / Kleiderkonsum', points: ['Trends und Modezyklen', 'Umweltbelastung durch Textilindustrie', 'Persönliche Verantwortung beim Kauf', 'Eigene Meinung: weniger konsumieren?'] },
    { title: 'Verkehrsmittel Auto', points: ['Vorteile: Flexibilität, Komfort', 'Nachteile: Umweltverschmutzung, Kosten', 'Alternative Verkehrsmittel', 'Eigene Meinung: Auto unverzichtbar?'] },
    { title: 'Müll vermeiden', points: ['Recycling und Wiederverwendung', 'Verantwortung der Verbraucher', 'Politische Maßnahmen', 'Eigene Meinung: realistisch im Alltag?'] },
    { title: 'Lebensmittelverschwendung', points: ['Ursachen: Überproduktion, falsche Planung', 'Folgen: Umweltbelastung, Kosten', 'Lösungen: bessere Planung, Spenden', 'Eigene Meinung: Verantwortung der Konsumenten?'] },
    { title: 'Konflikte am Arbeitsplatz', points: ['Ursachen: Kommunikation, Stress', 'Lösungen: Gespräch, Mediation', 'Folgen für Produktivität', 'Eigene Meinung: wie wichtig ist Teamarbeit?'] },
    { title: 'Stress am Arbeitsplatz', points: ['Ursachen: Arbeitsdruck, Zeitmangel', 'Folgen: Gesundheit, Motivation', 'Lösungen: Pausen, bessere Organisation', 'Eigene Meinung: Arbeitgeber verantwortlich?'] },
    { title: 'Benotung in der Schule', points: ['Vorteile: Motivation, Vergleichbarkeit', 'Nachteile: Leistungsdruck, Ungerechtigkeit', 'Alternative Bewertungssysteme', 'Eigene Meinung: Noten abschaffen?'] },
    { title: 'Weblogs', points: ['Vorteile: Informationsaustausch, Kreativität', 'Nachteile: Fake News, Zeitaufwand', 'Einfluss auf Gesellschaft', 'Eigene Meinung: sinnvoll oder nicht?'] },
    { title: 'Handy als Kommunikationsmittel', points: ['Vorteile: ständige Erreichbarkeit', 'Nachteile: Abhängigkeit, Ablenkung', 'Einfluss auf Alltag', 'Eigene Meinung: unverzichtbar?'] },
    { title: 'Führerschein ab 16 Jahren', points: ['Vorteile: Mobilität, Selbstständigkeit', 'Nachteile: Unfallrisiko, Verantwortung', 'Vergleich mit anderen Ländern', 'Eigene Meinung: sinnvoll?'] },
    { title: 'Schönheitsoperationen', points: ['Vorteile: Selbstbewusstsein, medizinische Gründe', 'Nachteile: Risiken, Kosten', 'Gesellschaftlicher Druck', 'Eigene Meinung: akzeptabel?'] },
    { title: 'Onlinekauf – Sterben der Innenstädte', points: ['Vorteile: bequem, günstig', 'Nachteile: Verlust von Geschäften, weniger soziale Kontakte', 'Auswirkungen auf Städte', 'Eigene Meinung: Onlinehandel begrenzen?'] },
    { title: 'Öffentliche Verkehrsmittel', points: ['Vorteile: umweltfreundlich, günstig', 'Nachteile: Verspätungen, Überfüllung', 'Vergleich mit Auto', 'Eigene Meinung: mehr Förderung?'] },
    { title: 'Kulturangebote nutzen', points: ['Vorteile: Bildung, Freizeitgestaltung', 'Nachteile: Kosten, Zeitaufwand', 'Bedeutung für Gesellschaft', 'Eigene Meinung: wichtig?'] },
    { title: '4-Tage-Arbeitswoche', points: ['Vorteile: Work-Life-Balance, Motivation', 'Nachteile: Produktivität, Kosten', 'Beispiele aus anderen Ländern', 'Eigene Meinung: sinnvoll?'] },
    { title: 'Zeitmanagement', points: ['Vorteile: weniger Stress, bessere Organisation', 'Nachteile: Disziplin erforderlich', 'Methoden im Alltag', 'Eigene Meinung: notwendig?'] },
    { title: 'Freunde kennenlernen', points: ['Vorteile: soziale Kontakte, Unterstützung', 'Nachteile: Zeitaufwand, Konflikte', 'Bedeutung für Psyche', 'Eigene Meinung: wichtig?'] },
    { title: 'Teamarbeit', points: ['Vorteile: Zusammenarbeit, Motivation', 'Nachteile: Konflikte, Abhängigkeit', 'Bedeutung für Unternehmen', 'Eigene Meinung: unverzichtbar?'] },
    { title: 'Politisch engagieren', points: ['Vorteile: Demokratie stärken', 'Nachteile: Zeitaufwand, Konflikte', 'Verantwortung der Bürger', 'Eigene Meinung: notwendig?'] }
];

const schreibenTeil2 = [
    { title: 'Praktikumsverlängerung', points: ['Grund für Verlängerung nennen', 'Vorteile für Firma und Praktikant', 'Bitte um Bestätigung'] },
    { title: 'Papierloses Büro', points: ['Vorteile: Kosten sparen, Umwelt schützen', 'Nachteile: Technik erforderlich', 'Vorschlag an Vorgesetzten'] },
    { title: 'Führung im Museum absagen', points: ['Grund für Absage nennen', 'Entschuldigung anbieten', 'Alternative vorschlagen'] },
    { title: 'Verwarnung erhalten', points: ['Verständnis zeigen', 'Gründe erklären', 'Lösung anbieten'] },
    { title: 'Schulung in der Firma leiten', points: ['Thema vorstellen', 'Vorteile für Mitarbeiter', 'Bitte um Unterstützung'] },
    { title: 'Teilweise von zu Hause aus arbeiten', points: ['Gründe nennen: Flexibilität, Familie', 'Vorteile für Firma', 'Bitte um Zustimmung'] },
    { title: 'Arbeitszeugnis verloren', points: ['Problem schildern', 'Bitte um neues Zeugnis', 'Dank für Unterstützung'] },
    { title: 'Bewerbungsgespräch verpasst', points: ['Grund erklären', 'Entschuldigung anbieten', 'Bitte um neuen Termin'] },
    { title: 'Am Museumsbesuch nicht teilnehmen', points: ['Grund nennen', 'Entschuldigung', 'Alternative vorschlagen'] },
    { title: 'Umzug des Unternehmens unterstützen', points: ['Bereitschaft zeigen', 'Vorteile für Firma', 'Bitte um Aufgaben'] },
    { title: 'Am Schreibwettbewerb nicht teilnehmen', points: ['Grund nennen', 'Entschuldigung', 'Bitte um Verständnis'] },
    { title: 'Bücher nicht fristgemäß zurückgeben', points: ['Grund erklären', 'Entschuldigung', 'Bitte um Verlängerung'] }
];

function getSchreibenHistory() {
    try { return JSON.parse(localStorage.getItem(SCHREIBEN_HISTORY_KEY)) || []; } catch (_) { return []; }
}

function showSchreibenMenu() {
    setLearningFocus(true);
    clearInterval(countdown);
    document.getElementById('timer').innerText = '';
    const history = getSchreibenHistory();
    document.getElementById('message').innerHTML = `
        <div style="font-size:31px;font-weight:900;color:#5d4037;">🐘 Mr. Efas Schreibwerkstatt</div>
        <div style="margin-top:8px;color:#8d6e63;font-style:italic;">„Ich korrigiere keine leeren Seiten.“</div>`;
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <div style="max-width:760px;margin:auto;padding:18px;border:2px solid #d7c1a7;border-radius:20px;background:rgba(255,253,247,.88);color:#6d4c41;">
            Chọn một phòng. Mr. Efa sẽ giữ đề, bản nháp và cây bút đỏ. Bồ câu chỉ cần mang theo lương tâm.
            <br><small>🗂️ Schreibmappe: ${history.length} bài đã nộp trên thiết bị này.</small>
        </div>`;
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi" style="background:#dceecf;color:#38552f;" onclick="startSchreibenTask(1)">📰 Teil 1 · Redaktion</button>
        <button class="btn-kapi" style="background:#ffe0b2;color:#70451f;" onclick="startSchreibenTask(2)">✉️ Teil 2 · Postamt</button>
        ${history.length ? '<button class="btn-kapi" style="background:#e3edf7;" onclick="showSchreibenHistory()">🗂️ Schreibmappe</button>' : ''}
        <button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>`;
}

function startSchreibenTask(teil) {
    const pool = teil === 1 ? schreibenTeil1 : schreibenTeil2;
    const task = pool[Math.floor(Math.random() * pool.length)];
    schreibenSession = { teil, task, mode: '', startedAt: 0 };
    document.getElementById('message').innerHTML = renderSchreibenTaskCard();
    document.getElementById('feedback-area').innerHTML = `
        <div style="max-width:700px;margin:auto;padding:18px;border:2px solid #ccb89e;border-radius:18px;background:#fffdf7;color:#6d4c41;">
            <b>🐘 Mr. Efa:</b> „Wählen Sie Ihre Arbeitsbedingungen. Ausreden werden separat archiviert.“
        </div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi btn-green" onclick="beginSchreiben('practice')">🌱 Übungsmodus</button>
        <button class="btn-kapi" style="background:#ffcc80;" onclick="beginSchreiben('exam')">⏱️ Prüfungsmodus</button>
        <button class="btn-kapi btn-home" onclick="showSchreibenMenu()">⬅️ Andere Abteilung</button>`;
}

function renderSchreibenTaskCard() {
    if (!schreibenSession) return '';
    const label = schreibenSession.teil === 1 ? '📰 REDAKTION · FORUMSBEITRAG' : '✉️ POSTAMT · FORMELLE NACHRICHT';
    return `
        <div style="max-width:790px;margin:0 auto;padding:20px 23px;box-sizing:border-box;border:2px solid #d6bd9f;border-radius:20px;background:linear-gradient(145deg,#fffdf7,#f7eddd);box-shadow:0 8px 17px rgba(93,64,55,.10);text-align:left;">
            <div style="font-size:12px;font-weight:900;letter-spacing:1.5px;color:#7b9b67;">${label}</div>
            <div style="margin:8px 0 11px;font-size:27px;font-weight:900;color:#4e342e;">${escapeSprechenHtml(schreibenSession.task.title)}</div>
            <div style="display:grid;gap:6px;color:#6d4c41;line-height:1.45;">${schreibenSession.task.points.map(point => `<div>📌 ${escapeSprechenHtml(point)}</div>`).join('')}</div>
        </div>`;
}

function getSchreibenDraftId() {
    return `${schreibenSession.teil}:${schreibenSession.task.title}`;
}

function loadSchreibenDraft() {
    try {
        const all = JSON.parse(localStorage.getItem(SCHREIBEN_DRAFT_KEY)) || {};
        return all[getSchreibenDraftId()] || { text: '', notes: '' };
    } catch (_) { return { text: '', notes: '' }; }
}

function saveSchreibenDraft() {
    if (!schreibenSession) return;
    let all = {};
    try { all = JSON.parse(localStorage.getItem(SCHREIBEN_DRAFT_KEY)) || {}; } catch (_) {}
    all[getSchreibenDraftId()] = {
        text: document.getElementById('schreibenInput')?.value || '',
        notes: document.getElementById('schreiben-notes')?.value || '',
        savedAt: new Date().toISOString()
    };
    localStorage.setItem(SCHREIBEN_DRAFT_KEY, JSON.stringify(all));
    updateSchreibenStats();
}

function beginSchreiben(mode) {
    schreibenSession.mode = mode;
    schreibenSession.startedAt = Date.now();
    const draft = loadSchreibenDraft();
    document.getElementById('message').innerHTML = renderSchreibenTaskCard();
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = `
        <style>
            .efa-desk{max-width:920px;margin:auto;display:grid;grid-template-columns:minmax(0,1fr) 245px;gap:16px;align-items:start;text-align:left}
            .efa-paper{padding:21px;border:2px solid #d7c1aa;border-radius:18px;background:repeating-linear-gradient(#fffefb 0,#fffefb 31px,#e8eef0 32px);box-shadow:0 8px 18px rgba(80,60,47,.10)}
            .efa-paper textarea{width:100%;min-height:330px;box-sizing:border-box;padding:4px 7px;border:0;outline:0;resize:vertical;background:transparent;color:#263238;font:17px/32px Georgia,serif}
            .efa-side{display:grid;gap:12px}.efa-box{padding:14px;border:2px solid #dce7d5;border-radius:15px;background:#f8fcf5;color:#536747;font-size:13px}.efa-box b{display:block;margin-bottom:7px;color:#3f5b35}.efa-box label{display:block;margin:7px 0}.efa-box textarea{width:100%;box-sizing:border-box;border:1px solid #d8c9b7;border-radius:9px;padding:8px;background:#fffdf8}.efa-chip{display:inline-block;margin:3px 2px;padding:5px 8px;border:0;border-radius:999px;background:#e8f1df;color:#587047;font-size:11px;cursor:pointer}
            .efa-meta{display:flex;justify-content:space-between;gap:10px;margin-bottom:9px;color:#8d6e63;font-size:13px}.efa-stamp{display:inline-block;padding:4px 9px;border:2px solid #c47d59;border-radius:6px;color:#a85d3d;font-size:11px;font-weight:900;transform:rotate(-2deg)}
            @media(max-width:780px){.efa-desk{grid-template-columns:1fr}.efa-side{grid-row:1}.efa-paper textarea{min-height:300px}}
        </style>
        <div class="efa-desk">
            <div class="efa-paper">
                <div class="efa-meta"><span class="efa-stamp">MR. EFA · ENTWURF</span><span id="schreiben-stats">0 Wörter</span></div>
                <textarea id="schreibenInput" oninput="saveSchreibenDraft()" placeholder="${schreibenSession.teil === 1 ? 'Schreibe deinen Forumsbeitrag hier…' : 'Betreff: ...\n\nSehr geehrte/r ...'}">${escapeSprechenHtml(draft.text)}</textarea>
            </div>
            <div class="efa-side">
                ${mode === 'practice' ? `
                    <div class="efa-box"><b>🪜 Redemittel-Schublade</b>
                        ${(schreibenSession.teil === 1
                            ? ['Meiner Ansicht nach ', 'Hinzu kommt, dass ', 'Ein Beispiel dafür ist ', 'Abschließend lässt sich sagen, dass ']
                            : ['Sehr geehrte Damen und Herren,', 'Ich wende mich an Sie, weil ', 'Ich wäre Ihnen dankbar, wenn ', 'Mit freundlichen Grüßen'])
                            .map(item => `<button class="efa-chip" data-text="${escapeSprechenHtml(item)}" onclick="insertSchreibenText(this.dataset.text)">${item}</button>`).join('')}
                    </div>
                    <div class="efa-box"><b>📝 Stichpunkte</b><textarea id="schreiben-notes" rows="4" oninput="saveSchreibenDraft()" placeholder="Chỉ ghi từ khóa…">${escapeSprechenHtml(draft.notes)}</textarea></div>`
                    : '<div class="efa-box"><b>🔒 Prüfungsmodus</b>Ngăn kéo Redemittel đã bị Mr. Efa khóa lại.</div>'}
                <div class="efa-box"><b>✅ Selbstkontrolle</b>
                    ${schreibenSession.task.points.map((_, i) => `<label><input type="checkbox" class="schreiben-check"> Ý ${i + 1} đã có</label>`).join('')}
                    <label><input type="checkbox" class="schreiben-check"> ${schreibenSession.teil === 1 ? 'Einleitung & Schluss' : 'Anrede & Grußformel'}</label>
                    <label><input type="checkbox" class="schreiben-check"> Đã tự đọc lại</label>
                </div>
            </div>
        </div>
        <div id="ai-correction" style="display:none;max-width:920px;margin:18px auto 0;text-align:left;"></div>`;
    document.getElementById('buttons').innerHTML = `
        <button class="btn-kapi" style="background:#8eaa75;color:white;" onclick="submitSchreibenToEfa()">🐘 An Mr. Efa senden</button>
        <button class="btn-kapi btn-home" onclick="showSchreibenMenu()">⬅️ Entwurf verlassen</button>`;
    updateSchreibenStats();
    const seconds = schreibenSession.dailyMission ? 2700 : (schreibenSession.teil === 1 ? 3000 : 1500);
    if (schreibenSession.dailyMission) startDailySchreibenTimer(seconds);
    else startSprechenTimer(seconds, mode === 'exam' ? '⏱️ Prüfung' : '✍️ Schreibzeit');
}

function updateSchreibenStats() {
    const text = document.getElementById('schreibenInput')?.value.trim() || '';
    const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
    const stats = document.getElementById('schreiben-stats');
    if (stats) stats.textContent = `${words} Wörter · ${text.length} Zeichen`;
}

function insertSchreibenText(text) {
    const input = document.getElementById('schreibenInput');
    if (!input) return;
    const start = input.selectionStart;
    input.value = input.value.slice(0, start) + text + input.value.slice(input.selectionEnd);
    input.focus();
    input.selectionStart = input.selectionEnd = start + text.length;
    saveSchreibenDraft();
}

async function submitSchreibenToEfa(timedOut = false) {
    const input = document.getElementById('schreibenInput');
    const text = input?.value.trim() || '';
    const wordCount = text ? text.split(/\s+/).filter(Boolean).length : 0;
    if (!text) {
        if (timedOut) {
            const correction = document.getElementById('ai-correction');
            if (correction) { correction.style.display = 'block'; correction.innerHTML = '<div style="padding:18px;border:2px solid #d7c1aa;border-radius:15px;background:#fff8ee;color:#795548;"><b>🐘 Mr. Efa:</b> „Bài đã được khóa, nhưng tờ giấy hoàn toàn trống.“<br><small>Nhiệm vụ chưa được tính là hoàn thành.</small></div>'; }
            return;
        }
        return alert('Mr. Efa: „Sie haben mir ein leeres Blatt geschickt. Mutig.“');
    }
    if (!timedOut && wordCount < 35 && !confirm(`Mr. Efa đếm được ${wordCount} từ và đang nhướng mày. Vẫn nộp chứ?`)) return;
    const checks = [...document.querySelectorAll('.schreiben-check')];
    if (!timedOut && checks.some(box => !box.checked) && !confirm('Checklist vẫn còn mục trống. Cứ gửi cho Mr. Efa sao?')) return;

    if (input) { input.readOnly = true; input.style.opacity = '.78'; }

    clearInterval(countdown);
    const correction = document.getElementById('ai-correction');
    correction.style.display = 'block';
    correction.innerHTML = `<div style="padding:17px;border-radius:15px;background:#f1eadf;color:#6d4c41;"><b>🐘 Mr. Efa setzt seine Brille auf…</b><br><small>Ông ấy đang kiểm tra những Nebensätze khả nghi.</small></div>`;
    document.getElementById('buttons').style.display = 'none';

    try {
        const response = await fetch('/api/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mode: 'schreiben', teil: schreibenSession.teil,
                thema: schreibenSession.task.title, punkte: schreibenSession.task.points,
                text, wordCount,
                durationSeconds: Math.round((Date.now() - schreibenSession.startedAt) / 1000),
                cauVidu: text
            })
        });
        const data = await response.json();
        if (!response.ok || !data.result) throw new Error(data.error || 'Mr. Efa không gửi bài về');
        schreibenSession.challenge = data.challenge || 'Viết lại một câu từ bài trên theo cách tự nhiên hơn.';
        correction.innerHTML = `
            <div style="padding:21px;border:2px solid #cfb89d;border-radius:18px;background:#fffdf8;line-height:1.7;color:#3f332c;box-shadow:0 7px 16px rgba(80,59,45,.10);">
                <div style="display:inline-block;padding:6px 12px;border:3px double #b56548;color:#a54e36;font-weight:900;transform:rotate(-2deg);">VON MR. EFA GEPRÜFT</div>
                ${data.result}
            </div>
            <div style="margin-top:14px;padding:18px;border:2px solid #efb56f;border-radius:17px;background:#fff5e6;">
                <b>🧬 Mr. Efa lässt dich noch nicht nach Hause:</b>
                <p>${escapeSprechenHtml(schreibenSession.challenge)}</p>
                <textarea id="efa-challenge-answer" rows="3" placeholder="Câu trả lời của bồ câu…" style="width:100%;box-sizing:border-box;"></textarea>
                <button class="btn-kapi" style="margin:10px 0 0;background:#d99562;color:white;" onclick="checkEfaChallenge()">✏️ Nộp câu sửa</button>
                <div id="efa-challenge-result"></div>
            </div>`;
        saveSchreibenHistory(text, wordCount, data.result);
        clearSchreibenDraft();
        completeTodayStudyMission('schreiben');
    } catch (error) {
        correction.innerHTML = `<div style="color:#c62828;font-weight:bold;">Mr. Efa bị nghẹn API: ${escapeSprechenHtml(error.message)}</div>`;
    } finally {
        document.getElementById('buttons').style.display = 'block';
        document.getElementById('buttons').innerHTML = `
            <button class="btn-kapi btn-green" onclick="startSchreibenTask(${schreibenSession.teil})">🎲 Đề khác</button>
            <button class="btn-kapi btn-home" onclick="showSchreibenMenu()">⬅️ Về Schreibwerkstatt</button>`;
    }
}

async function checkEfaChallenge() {
    const challenge = schreibenSession?.challenge || '';
    const answer = document.getElementById('efa-challenge-answer')?.value.trim();
    if (!answer) return alert('Mr. Efa không chấm không khí lần hai :vvvv');
    const result = document.getElementById('efa-challenge-result');
    result.innerHTML = '<p>🐘 Mr. Efa đang xem cậu có thực sự sửa không…</p>';
    try {
        const response = await fetch('/api/check', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mode: 'schreiben_challenge', challenge, answer })
        });
        const data = await response.json();
        result.innerHTML = data.result || `<span style="color:#c62828;">${escapeSprechenHtml(data.error)}</span>`;
    } catch (_) { result.innerHTML = '<span style="color:#c62828;">Mr. Efa làm rơi bút rồi.</span>'; }
}

function saveSchreibenHistory(text, wordCount, feedback) {
    const history = getSchreibenHistory();
    history.unshift({ date: new Date().toISOString(), teil: schreibenSession.teil, title: schreibenSession.task.title, text, wordCount, feedback });
    localStorage.setItem(SCHREIBEN_HISTORY_KEY, JSON.stringify(history.slice(0, 25)));
}

function clearSchreibenDraft() {
    let all = {};
    try { all = JSON.parse(localStorage.getItem(SCHREIBEN_DRAFT_KEY)) || {}; } catch (_) {}
    delete all[getSchreibenDraftId()];
    localStorage.setItem(SCHREIBEN_DRAFT_KEY, JSON.stringify(all));
}

function showSchreibenHistory() {
    const history = getSchreibenHistory();
    document.getElementById('message').innerHTML = '<b>🗂️ Schreibmappe von Mr. Efa</b>';
    document.getElementById('feedback-area').style.display = 'block';
    document.getElementById('feedback-area').innerHTML = history.length ? `
        <div style="max-width:820px;margin:auto;display:grid;gap:11px;text-align:left;">${history.map((item, index) => `
            <details style="padding:14px;border:2px solid #e0d0bc;border-radius:14px;background:#fffdf8;">
                <summary style="cursor:pointer;font-weight:bold;color:#5d4037;">${index + 1}. Teil ${item.teil} · ${escapeSprechenHtml(item.title)} <small style="color:#8d6e63;">(${item.wordCount} Wörter)</small></summary>
                <p style="white-space:pre-wrap;line-height:1.6;">${escapeSprechenHtml(item.text)}</p>
                <div style="border-top:1px dashed #ccb89e;padding-top:10px;">${item.feedback || ''}</div>
            </details>`).join('')}</div>` : '<p>Schreibmappe còn trống. Mr. Efa nghe thấy tiếng gió.</p>';
    document.getElementById('buttons').innerHTML = '<button class="btn-kapi btn-home" onclick="showSchreibenMenu()">⬅️ Zurück</button>';
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
    setLearningFocus(true);
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
    completeTodayStudyMission('hoeren');
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
    if (selectedIndex === data.answer) completeTodayStudyMission('lesen');
}

function showKapiStory(level, chapter = 1) {
    setLearningFocus(true);
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
