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
    document.getElementById("buttons").innerHTML = `<button class="btn-kapi" style="background:#4CAF50; color:white;" onclick="sayHallo()">👋 Hallo Kapi</button>`;
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

function showVokabelHauptmenu() {
    document.getElementById("feedback-area").style.display = "none";
    let missed = getSavedMissed();
    let warningHtml = missed.length > 0 ? `<button class="btn-grid btn-full" style="background:#ffb74d; color:white; justify-content:center; display:flex;" onclick="showLernenScreen('review')">⚠️ Ôn ${missed.length} từ hay quên!</button>` : '';
    
    document.getElementById("message").innerText = "Was möchtest du im Alltag üben?";
    document.getElementById("buttons").innerHTML = `
        <div class="grid-container">
            ${warningHtml}
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

function showLernenScreen(gruppe) {
    currentFlashcardGroup = gruppe;
    if (gruppe === 'review') {
        flashcardWords = getSavedMissed();
    } else {
        flashcardWords = vokabelGruppen[gruppe].woerter;
    }

    if(flashcardWords.length === 0) { alert("Chưa có từ vựng!"); return; }
    
    currentFlashcardIndex = 0;
    isFlipped = false;
    renderFlashcard();
}

function renderFlashcard() {
    document.getElementById("feedback-area").style.display = "none";
    let w = flashcardWords[currentFlashcardIndex];
    
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
            <p style="font-size:15px; color:#95a5a6; margin-top:20px; font-style:italic;">👆 Chạm để lật lại</p>
        `;
    }

    document.getElementById("message").innerHTML = `
        <span style="font-size:16px;color:#7f8c8d; font-weight:bold;">Flashcard | Thẻ ${currentFlashcardIndex + 1}/${flashcardWords.length}</span><br><br>
        <div onclick="flipCard()" style="cursor:pointer; background: #fff; border: 2px solid #bdc3c7; border-radius: 20px; padding: 40px 20px; box-shadow: 0 8px 16px rgba(0,0,0,0.08); max-width: 350px; margin: 0 auto; min-height: 220px; display: flex; flex-direction: column; justify-content: center; align-items: center; user-select: none; transition: 0.2s;">
            ${cardContent}
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

function flipCard() { isFlipped = !isFlipped; renderFlashcard(); }
function nextFlashcard() { currentFlashcardIndex++; isFlipped = false; renderFlashcard(); }
function prevFlashcard() { currentFlashcardIndex--; isFlipped = false; renderFlashcard(); }

function startSpecificQuiz(gruppe) {
    if (gruppe === 'review') {
        quizWords = getSavedMissed();
    } else {
        quizWords = [...vokabelGruppen[gruppe].woerter];
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
    
    if (isCorrect) {
        quizScore++;
        savedMissed = savedMissed.filter(item => item.de !== w.de);
        resultHtml = `<h3 style="color:#27ae60; margin:0;">✅ Chính xác!</h3><p style="font-size:18px;"><b>${w.de}</b> = ${w.vi}</p>`;
    } else {
        currentMissedWords.push(w);
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
        html += `<h3 style="color:#e74c3c;">Các từ Vịt gõ sai:</h3><ul style="text-align:left;">`;
        currentMissedWords.forEach(w => { html += `<li><b>${w.de}</b> (${w.vi})</li>`; });
        html += `</ul>`;
    } else { html += `<h3 style="color:#2ecc71;">Tuyệt vời! Không sai từ nào!</h3>`; }
    document.getElementById("feedback-area").style.display = "block";
    document.getElementById("feedback-area").innerHTML = html;
    document.getElementById("buttons").innerHTML = `<button class="btn-kapi btn-home" onclick="showVokabelHauptmenu()">⬅️ Về Menu Từ Vựng</button>`;
}

// 4. GAME TRẮC NGHIỆM ĐIỀN TỪ
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
    document.getElementById("buttons").style.display = "block";
    currentGameIndex++;
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
            <i>Click chuột vào đây, nhấn <b>Windows + H</b> và bắt đầu nói tiếng Đức...</i>
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

async function checkGrammar(inputId) {
    let element = document.getElementById(inputId);
    let text = element.tagName === "DIV" ? element.innerText.trim() : element.value.trim();
    if(!text || text.includes("Windows + H")) return alert("Vịt chưa gõ/đọc gì cả!");
    
    let aiCorrection = document.getElementById("ai-correction");
    aiCorrection.style.display = "block";
    aiCorrection.innerHTML = "<p style='color:#e67e22;'><i>Kapi đang soi lỗi mạo từ, đuôi tính từ... 🦫🔍</i></p>";
    
    try {
        const response = await fetch('https://api.languagetool.org/v2/check', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ text: text, language: 'de-DE' }) });
        const data = await response.json();
        if (data.matches.length === 0) {
            aiCorrection.innerHTML = `<div style="background:#e8f5e9; padding:15px; border-radius:8px; border-left:4px solid #2ecc71;"><h3 style="color:#27ae60; margin:0;">✅ Wunderbar!</h3><p style="margin:5px 0 0 0;">Không phát hiện lỗi ngữ pháp!</p></div>`;
        } else {
            let html = `<h3 style="color:#e74c3c; margin-top:0;">❌ Kapi phát hiện ${data.matches.length} lỗi:</h3>`;
            data.matches.forEach(m => {
                let suggestions = m.replacements.slice(0, 3).map(r => r.value).join(" <b>hoặc</b> ");
                html += `<div style="margin-bottom:15px; padding:12px; background:#fff5f5; border-left:4px solid #e74c3c; border-radius:4px;"><span style="font-weight:bold; color:#c0392b;">Lỗi:</span> ${m.message} <br>${suggestions ? `<span style="color:#27ae60;">💡 Thử sửa thành: <b>${suggestions}</b></span>` : ''}</div>`;
            });
            aiCorrection.innerHTML = html;
        }
    } catch(e) { aiCorrection.innerHTML = `<p style="color:red;">Lỗi kết nối máy chủ LanguageTool!</p>`; }
}

// 7. HÖREN LOGIC
function showHoerenMenu() {
    document.getElementById("feedback-area").style.display = "none";
    document.getElementById("message").innerHTML = `🎧 Kho đề Hören - Trình độ ${currentLevel}`;
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
    document.getElementById("buttons").innerHTML = html + `<button class="btn-kapi btn-home" onclick="showLessons()">⬅️ Zurück</button>`;
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
    document.getElementById("buttons").innerHTML = html + `<button class="btn-kapi btn-home" onclick="showHoerenMenu()">⬅️ Chọn đề khác</button>`;
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
            <button class="btn-kapi btn-green" onclick="startHoerenTeil(${currentTeilIndex})">🔄 Nghe lại phần này</button>
        </div></div>
    `;
    document.getElementById("feedback-area").innerHTML = resultHtml;
}

// =========================================================
// 8. TRUYỆN CỦA KAPI
// =========================================================
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
                <button class="btn-kapi btn-green" onclick="alert('Tập 5 đang lên kịch bản, Vịt đợi xíu nha! 🦫🎬')">Tập 5 ➡️</button>
            `;
        }
    }

    document.getElementById("feedback-area").innerHTML = resultHtml;
    document.getElementById("buttons").innerHTML = buttonContent;
}
