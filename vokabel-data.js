const teil1 = [
    {thema:"Fremdsprachen lernen",punkte:["Vorteile für Beruf und Zukunft","Kognitive Fähigkeiten fördern","Kulturelles Verständnis erweitern","Zeitaufwand"]},
    {thema:"Online Sprache lernen",punkte:["Flexibilität im Alltag","Kosten und Zugänglichkeit","Soziale Kontakte","Lernqualität"]},
    {thema:"Berufliche Fortbildung",punkte:["Neue Kenntnisse erwerben","Karrierechancen verbessern","Zeit- und Kostenaufwand","Motivation"]},
    {thema:"Bewerbungsgespräch vorbereiten",punkte:["Selbstbewusstsein stärken","Recherche über die Firma","Typische Fragen üben","Kleidung"]},
    {thema:"Berufserfahrung in der Studienzeit",punkte:["Vorteile für Karriere","Verbindung Theorie und Praxis","Zeitmanagement","Belastung"]},
    {thema:"Im Ausland arbeiten",punkte:["Berufliche Chancen","Kulturelle Erfahrungen","Sprachkenntnisse","Familie und Freunde"]},
    {thema:"Job online suchen",punkte:["Flexibilität und Zeitersparnis","Große Auswahl","Gefahr von unseriösen Angeboten","Traditionelle Methoden"]},
    {thema:"Sich beruflich neu orientieren",punkte:["Gründe für Neuorientierung","Chancen und Risiken","Weiterbildung","Privatleben"]},
    {thema:"Umweltbewusst leben",punkte:["Müll vermeiden","Energie sparen","Nachhaltige Produkte","Verantwortung"]},
    {thema:"Umweltfreundliche Verkehrsmittel",punkte:["Kosten und Nutzen","Beitrag zum Klimaschutz","Alltagstauglichkeit","Vergleich mit Auto"]},
    {thema:"Müll vermeiden",punkte:["Recycling","Plastik reduzieren","Bewusstsein schaffen","Alltagstipps"]},
    {thema:"Energie sparen",punkte:["Kosten senken","Umwelt schützen","Technik nutzen","Verhalten ändern"]},
    {thema:"Gebrauchte Produkte kaufen",punkte:["Nachhaltigkeit","Geld sparen","Qualität und Risiko","Konsumverhalten"]},
    {thema:"Stress vermeiden",punkte:["Ursachen erkennen","Entspannungsmethoden","Gesundheit","Work-Life-Balance"]},
    {thema:"Fit bleiben",punkte:["Sport treiben","Ernährung beachten","Motivation","Gesundheitliche Vorteile"]},
    {thema:"Gesund werden ohne Chemie",punkte:["Naturheilmittel","Ernährung","Risiken und Grenzen","Vergleich mit Medikamenten"]},
    {thema:"Bewegung im Alltag",punkte:["Treppen statt Aufzug","Fahrrad statt Auto","Kleine Übungen","Vorteile"]},
    {thema:"Neue Sportart treiben",punkte:["Motivation","Kosten","Soziale Kontakte","Gesundheit"]},
    {thema:"Gesundheitsförderung am Arbeitsplatz",punkte:["Programme","Motivation","Kosten für Unternehmen","Produktivität"]},
    {thema:"Sich im Verein engagieren",punkte:["Soziale Kontakte","Verantwortung","Freizeit","Gesellschaft"]},
    {thema:"Wohnsituation während des Studiums",punkte:["Kosten","WG oder allein","Nähe zur Uni","Soziale Kontakte"]},
    {thema:"Harmonie in der Nachbarschaft",punkte:["Rücksicht nehmen","Konflikte vermeiden","Gemeinschaft","Regeln"]},
    {thema:"Privatsphäre in sozialen Netzwerken",punkte:["Datenschutz","Risiken","Verantwortung","Einfluss auf Beziehungen"]},
    {thema:"Geld sparen",punkte:["Budget planen","Angebote nutzen","Konsum einschränken","Zukunft"]},
    {thema:"Die Wahl des Studiums",punkte:["Interessen","Berufschancen","Kosten und Dauer","Persönliche Entwicklung"]},
    {thema:"Zu Hause fürs Studium lernen",punkte:["Flexibilität","Ablenkungen","Lernmethoden","Bibliothek"]},
    {thema:"Konflikte am Arbeitsplatz lösen",punkte:["Ursachen","Kommunikation","Lösungen","Zusammenarbeit"]},
    {thema:"Arbeitsatmosphäre verbessern",punkte:["Motivation","Teamarbeit","Konflikte vermeiden","Produktivität"]},
    {thema:"Mitbestimmung im Unternehmen",punkte:["Rechte","Motivation","Risiken","Beispiele"]},
    {thema:"Höflichkeit am Arbeitsplatz",punkte:["Respekt","Kommunikation","Konflikte vermeiden","Zusammenarbeit"]},
    {thema:"Öffentliche Verkehrsmittel",punkte:["Kosten","Umweltfreundlichkeit","Alltagstauglichkeit","Vergleich mit Auto"]},
    {thema:"Kulturangebote nutzen",punkte:["Bildung","Freizeitgestaltung","Kosten","Soziale Kontakte"]},
    {thema:"Auf tierische Produkte verzichten",punkte:["Gesundheit","Umwelt schützen","Kosten","Soziale Aspekte"]},
    {thema:"4-Tage-Arbeitswoche",punkte:["Vorteile für Arbeitnehmer","Produktivität","Kosten für Unternehmen","Work-Life-Balance"]},
    {thema:"Zeitmanagement",punkte:["Planung","Prioritäten","Stress vermeiden","Alltag"]},
    {thema:"Freunde kennenlernen",punkte:["Soziale Kontakte","Freizeitgestaltung","Psyche","Herausforderungen"]},
    {thema:"Teamarbeit",punkte:["Zusammenarbeit","Konflikte vermeiden","Motivation","Produktivität"]},
    {thema:"Ein neues Land kennenlernen",punkte:["Kultur erleben","Sprache lernen","Kosten","Persönliche Entwicklung"]},
    {thema:"Politisch engagieren",punkte:["Verantwortung","Gesellschaft beeinflussen","Demokratie","Risiken"]}
];

const teil2 = [
    "Soll man die Arbeitszeit verkürzen?","Wie sinnvoll ist ein Großraumbüro?","Soll ein Angestellter von zu Hause aus arbeiten?","Flexible Arbeitszeiten","Online studieren oder Präsenzunterricht?","Sollen Studierende ihre Professoren beurteilen?","Umweltschutz an der Universität","Duales Studium","Soll man ein Eigenheim kaufen, statt zu mieten?","Soll man in einer Wohngemeinschaft (WG) leben?","Soll man in der Stadt oder auf dem Land wohnen?","Bargeld oder Kreditkarte?","Ist Markenkleidung wichtig?","Soll man im Internet kaufen?","Sollen Geschäfte jeden Tag geöffnet haben?","Online-Meeting","Gespräche online","Präsentationen bei Online-Meetings ersetzen?","Soll man in sozialen Medien aktiv sein?","Sollen junge Kinder Haustiere adoptieren?","Soll man mit Kindern reisen?","Sollen Kinder Fremdsprachen lernen?","Books oder E-Books?","Ausländische Filme in Originalsprache zeigen?","Nachrichten kostenpflichtig – sinnvoll?"
];

const vokabelGruppen = {
    krankheiten: {
        titel: "🦠 Krankheiten & Symptome",
        woerter: [
            { de: "sich anstecken durch (+ Akk.)", vi: "lây nhiễm qua", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='30' cy='50' r='15' fill='%23e74c3c'/><circle cx='70' cy='50' r='15' fill='%233498db'/><path d='M45 50 L55 50' stroke='%23e74c3c' stroke-width='3' stroke-dasharray='4'/><text x='50' y='45' font-size='15' text-anchor='middle'>🦠</text></svg>" },
            { de: "die Symptome", vi: "triệu chứng", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='20' width='40' height='60' rx='5' fill='%23ecf0f1' stroke='%23bdc3c7' stroke-width='2'/><line x1='40' y1='35' x2='60' y2='35' stroke='%2334495e' stroke-width='2'/><circle cx='35' cy='35' r='2' fill='%23e74c3c'/></svg>" },
            { de: "der Ausbruch der Krankheit", vi: "sự bùng phát bệnh", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='15' fill='%23e74c3c'/><path d='M50 25 L50 15 M50 75 L50 85 M25 50 L15 50 M75 50 L85 50' stroke='%23e74c3c' stroke-width='4'/></svg>" },
            { de: "die Akne", vi: "mụn trứng cá", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='35' fill='%23f1c40f' opacity='0.5'/><circle cx='40' cy='40' r='4' fill='%23e74c3c'/><circle cx='60' cy='45' r='3' fill='%23e74c3c'/></svg>" },
            { de: "das Asthma", vi: "hen suyễn", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M35 40 Q20 50 35 70 Q50 60 45 40 Z' fill='%23e74c3c' opacity='0.7'/><path d='M65 40 Q80 50 65 70 Q50 60 55 40 Z' fill='%23e74c3c' opacity='0.7'/></svg>" },
            { de: "der Ausschlag", vi: "phát ban", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M30 80 Q50 90 70 80 L60 20 Q50 10 40 20 Z' fill='%23f39c12' opacity='0.5'/><circle cx='45' cy='40' r='2' fill='%23e74c3c'/><circle cx='55' cy='50' r='3' fill='%23e74c3c'/></svg>" },
            { de: "die Erkältung", vi: "cảm lạnh", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='45' r='25' fill='%23ecf0f1' stroke='%23bdc3c7' stroke-width='3'/><circle cx='50' cy='45' r='5' fill='%23e74c3c'/></svg>" },
            { de: "der erhöhte Puls", vi: "nhịp tim tăng cao", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M50 30 A 15 15 0 0 0 20 30 A 15 15 0 0 0 50 60 A 15 15 0 0 0 80 30 A 15 15 0 0 0 50 30 Z' fill='%23e74c3c'/><path d='M10 50 L30 50 L40 20 L60 80 L70 50 L90 50' stroke='%23fff' stroke-width='3' fill='none'/></svg>" },
            { de: "die Grippe", vi: "bệnh cúm", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='20' fill='%232ecc71' opacity='0.7'/><circle cx='50' cy='50' r='10' fill='%23e74c3c'/></svg>" },
            { de: "der Infarkt", vi: "nhồi máu", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M50 30 A 15 15 0 0 0 20 30 A 15 15 0 0 0 50 60 A 15 15 0 0 0 80 30 A 15 15 0 0 0 50 30 Z' fill='%23e74c3c'/><path d='M60 20 L40 45 L55 45 L40 70' fill='none' stroke='%23f1c40f' stroke-width='5'/></svg>" },
            { de: "die Karies", vi: "sâu răng", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M30 40 Q50 20 70 40 L60 80 Q50 90 40 80 Z' fill='%23ecf0f1' stroke='%23bdc3c7' stroke-width='3'/><circle cx='60' cy='45' r='8' fill='%232c3e50'/></svg>" },
            { de: "die Migräne", vi: "bệnh đau nửa đầu", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='30' fill='%23ecf0f1' stroke='%23bdc3c7' stroke-width='3'/><path d='M60 30 L50 50 L65 50 L45 80' fill='none' stroke='%23e74c3c' stroke-width='4'/></svg>" },
            { de: "die Mittelohrentzündung", vi: "viêm tai giữa", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M40 20 Q70 20 70 50 Q70 80 40 80' fill='none' stroke='%23f39c12' stroke-width='6'/><circle cx='55' cy='50' r='10' fill='%23e74c3c'/></svg>" },
            { de: "der Schnupfen", vi: "sổ mũi", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M50 30 L40 60 L60 60 Z' fill='%23ecf0f1' stroke='%23bdc3c7' stroke-width='3'/><circle cx='45' cy='65' r='4' fill='%233498db'/><circle cx='55' cy='65' r='4' fill='%233498db'/></svg>" },
            { de: "der verstauchte Fuß", vi: "bong gân chân", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M40 20 L40 60 L70 80 L30 80 Z' fill='%23f39c12' opacity='0.5'/><circle cx='45' cy='70' r='5' fill='%23e74c3c'/></svg>" },
            { de: "der Kardiologe", vi: "bác sĩ tim mạch", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='30' r='15' fill='%233498db'/><rect x='35' y='50' width='30' height='40' fill='%23ecf0f1'/><path d='M50 65 A 5 5 0 0 0 40 65 A 5 5 0 0 0 50 75 A 5 5 0 0 0 60 65 A 5 5 0 0 0 50 65 Z' fill='%23e74c3c'/></svg>" },
            { de: "der Orthopäde", vi: "bác sĩ chỉnh hình", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='30' cy='30' r='15' fill='%232ecc71'/><rect x='20' y='50' width='20' height='40' fill='%23ecf0f1'/><path d='M60 20 L60 80 M50 30 L70 30 M50 50 L70 50 M50 70 L70 70' stroke='%23bdc3c7' stroke-width='4'/></svg>" },
            { de: "die ärztliche Vorsorge-Untersuchung", vi: "khám sức khỏe định kỳ", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='20' width='60' height='60' rx='5' fill='%23fff' stroke='%23bdc3c7' stroke-width='3'/><path d='M40 60 L60 60 M50 50 L50 70' stroke='%232ecc71' stroke-width='5'/></svg>" },
            { de: "das Heilfasten", vi: "nhịn ăn chữa bệnh", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='35' fill='none' stroke='%23bdc3c7' stroke-width='4'/><path d='M30 50 C 40 70, 60 70, 70 50' fill='none' stroke='%232ecc71' stroke-width='4'/></svg>" },
            { de: "das digitale Zeitalter", vi: "kỷ nguyên số", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='30' fill='%232c3e50'/><text x='35' y='40' font-size='10' fill='%232ecc71'>101</text></svg>" },
            { de: "die angemessene Kleidung", vi: "trang phục phù hợp", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M30 30 L70 30 L80 50 L65 50 L65 80 L35 80 L35 50 L20 50 Z' fill='%233498db'/></svg>" }
        ]
    },
    diagnostik: {
        titel: "🩺 Diagnostische Instrumente",
        woerter: [
            { de: "das Stethoskop", vi: "ống nghe", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M30 20 Q30 50 50 50 Q70 50 70 20 M50 50 L50 80' stroke='%232c3e50' stroke-width='6' fill='none'/><circle cx='50' cy='85' r='10' fill='%237f8c8d'/></svg>" },
            { de: "das Blutdruckmessgerät", vi: "máy đo huyết áp", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='30' width='60' height='30' rx='3' fill='%2334495e'/><circle cx='50' cy='75' r='12' fill='%23fff' stroke='%23bdc3c7' stroke-width='2'/></svg>" }
        ]
    },
    verbandmaterial: {
        titel: "🩹 Verbandmaterial",
        woerter: [
            { de: "die Kanüle", vi: "kim tiêm", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='40' y='70' width='20' height='20' fill='%23e74c3c'/><path d='M48 70 L48 10 L52 10 L52 70 Z' fill='%23bdc3c7'/></svg>" },
            { de: "das Pflaster", vi: "băng cá nhân", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><g transform='rotate(45 50 50)'><rect x='20' y='40' width='60' height='20' rx='10' fill='%23e67e22'/><rect x='40' y='40' width='20' height='20' fill='%23fff' opacity='0.7'/></g></svg>" }
        ]
    },
    arbeit: { titel: "💼 Arbeit", woerter: [{ de: "das Gehalt", vi: "tiền lương" }, { de: "das Vorstellungsgespräch", vi: "buổi phỏng vấn" }, { de: "die Bewerbung", vi: "đơn xin việc" }] },
    umwelt: { titel: "🌍 Umwelt", woerter: [{ de: "der Umweltschutz", vi: "bảo vệ môi trường" }, { de: "die Mülltrennung", vi: "phân loại rác" }, { de: "klimaneutral", vi: "trung hòa khí hậu" }] },
    kulinarik: { titel: "🍽️ Kulinarik", woerter: [{ de: "die Ernährung", vi: "dinh dưỡng" }, { de: "das Rezept", vi: "công thức nấu ăn" }] },
    gesundheit: { titel: "💊 Gesundheit", woerter: [{ de: "die Vorsorge", vi: "sự phòng ngừa" }, { de: "die Behandlung", vi: "sự điều trị" }] },
    technologie: { titel: "💻 Technologie", woerter: [{ de: "die Digitalisierung", vi: "số hóa" }, { de: "die künstliche Intelligenz", vi: "trí tuệ nhân tạo" }] },
    gesellschaft: { titel: "🏘️ Gesellschaft", woerter: [{ de: "die Bevölkerung", vi: "dân số" }, { de: "die Integration", vi: "sự hội nhập" }] },
    studium: { titel: "🎓 Studium", woerter: [{ de: "das Semester", vi: "học kỳ" }, { de: "die Vorlesung", vi: "bài giảng" }] },
    saetze: { titel: "💬 Sätze", woerter: [{ de: "Meiner Meinung nach", vi: "Theo ý kiến của tôi" }, { de: "Ich bin davon überzeugt, dass", vi: "Tôi tin chắc rằng" }] }
};

// Dữ liệu Game Điền Từ Trắc Nghiệm (Khôi phục kho Game của Vịt)
const quizGameData = [
    { question: "Der Arzt hört die Lunge mit dem ______ ab.", options: ["Stethoskop", "Pflaster", "Kanüle"], answer: 0, explanation: "Stethoskop (ống nghe) là dụng cụ chuyên dụng để nghe nhịp tim và phổi." },
    { question: "Um die kleine Wunde zu schützen, brauchen wir ein ______.", options: ["Blutdruckmessgerät", "Pflaster", "Asthma"], answer: 1, explanation: "Pflaster (băng cá nhân) dùng để bảo vệ vết thương hở nhỏ." },
    { question: "Viele Unternehmen investieren in die ______ ihrer Prozesse.", options: ["Mülltrennung", "Erkältung", "Digitalisierung"], answer: 2, explanation: "Digitalisierung (Số hóa) là quá trình chuyển đổi quy trình trong doanh nghiệp." },
    { question: "Der Begriff ______ ist gesetzlich kaum geschützt.", options: ["klimaneutral", "Integration", "Gehalt"], answer: 0, explanation: "klimaneutral (trung hòa khí hậu) là thuật ngữ thường bị lạm dụng trong quảng cáo." },
    { question: "Nach dem Studium muss man oft lange nach einer passenden ______ suchen.", options: ["Bewerbung", "Anstellung", "Vorlesung"], answer: 1, explanation: "Anstellung (vị trí công việc) là mục tiêu sau khi tốt nghiệp." },
    { question: "Gegen die starken Kopfschmerzen nehme ich eine ______.", options: ["Symptome", "Behandlung", "Tablette"], answer: 2, explanation: "Tablette (viên thuốc) dùng để giảm đau đầu." },
    { question: "Eine ______ Ernährung ist extrem wichtig für die Gesundheit.", options: ["künstliche", "ausgewogene", "digitale"], answer: 1, explanation: "ausgewogene Ernährung (chế độ ăn cân bằng) tốt cho sức khỏe." },
    { question: "In der ______ diskutiert man oft über den Klimawandel.", options: ["Bevölkerung", "Gesellschaft", "Mittelohrentzündung"], answer: 1, explanation: "Gesellschaft (xã hội) là nơi diễn ra các cuộc thảo luận công cộng." },
    { question: "Die ______ von Schwarzarbeit ist ein großer Vorteil des bargeldlosen Bezahlens.", options: ["Bekämpfung", "Karies", "Bevölkerung"], answer: 0, explanation: "Bekämpfung (sự phòng chống) là hành động ngăn chặn tội phạm tài chính." },
    { question: "Wer im Homeoffice arbeitet, schätzt vor allem die ______.", options: ["Flexibilität", "Migräne", "Technologie"], answer: 0, explanation: "Flexibilität (sự linh hoạt) là lợi ích lớn nhất của làm việc tại nhà." }
];
