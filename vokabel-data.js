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

// ==========================================
// 2. TỪ VỰNG FULL HÌNH ẢNH SVG CUTE (ĐÃ BỔ SUNG ALLTAG)
// ==========================================
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
    arbeit: {
        titel: "💼 Arbeit",
        woerter: [
            { de: "das Gehalt", vi: "tiền lương", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='35' fill='%23f1c40f' stroke='%23f39c12' stroke-width='4'/><text x='50' y='60' font-size='30' font-family='sans-serif' fill='%23d35400' text-anchor='middle'>€</text></svg>" },
            { de: "das Vorstellungsgespräch", vi: "buổi phỏng vấn", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='30' cy='40' r='15' fill='%233498db'/><circle cx='70' cy='40' r='15' fill='%232ecc71'/><path d='M 30 70 Q 50 90 70 70' stroke='%2334495e' stroke-width='5' fill='none'/><path d='M 40 30 Q 50 15 60 30' stroke='%23f1c40f' stroke-width='4' fill='none'/></svg>" },
            { de: "die Bewerbung", vi: "đơn xin việc", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='25' y='15' width='50' height='70' rx='5' fill='%23ecf0f1' stroke='%23bdc3c7' stroke-width='4'/><circle cx='50' cy='35' r='10' fill='%2395a5a6'/><line x1='35' y1='55' x2='65' y2='55' stroke='%237f8c8d' stroke-width='4'/><line x1='35' y1='65' x2='55' y2='65' stroke='%237f8c8d' stroke-width='4'/></svg>" }
        ]
    },
    umwelt: {
        titel: "🌍 Umwelt",
        woerter: [
            { de: "der Umweltschutz", vi: "bảo vệ môi trường", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='35' fill='%233498db'/><path d='M30 40 Q50 20 60 40 Q70 60 50 70 Q30 60 30 40' fill='%232ecc71'/><path d='M50 85 Q70 100 90 85' stroke='%23f1c40f' stroke-width='5' fill='none'/><path d='M10 85 Q30 100 50 85' stroke='%23f1c40f' stroke-width='5' fill='none'/></svg>" },
            { de: "die Mülltrennung", vi: "phân loại rác", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='15' y='40' width='20' height='45' rx='3' fill='%233498db'/><rect x='40' y='40' width='20' height='45' rx='3' fill='%23f1c40f'/><rect x='65' y='40' width='20' height='45' rx='3' fill='%232c3e50'/><path d='M15 40 L35 40 M40 40 L60 40 M65 40 L85 40' stroke='%23ecf0f1' stroke-width='4'/></svg>" },
            { de: "klimaneutral", vi: "trung hòa khí hậu", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='35' fill='%23ecf0f1' stroke='%232ecc71' stroke-width='5'/><text x='50' y='58' font-size='22' font-weight='bold' fill='%232c3e50' text-anchor='middle'>CO2</text><path d='M40 70 L50 80 L75 45' fill='none' stroke='%232ecc71' stroke-width='6'/></svg>" }
        ]
    },
    kulinarik: {
        titel: "🍽️ Kulinarik",
        woerter: [
            { de: "die Ernährung", vi: "dinh dưỡng", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='40' cy='55' r='20' fill='%23e74c3c'/><path d='M40 35 Q45 25 50 35' fill='none' stroke='%232ecc71' stroke-width='4'/><path d='M60 40 L80 80 L70 90 Z' fill='%23e67e22'/><path d='M65 45 L50 30' stroke='%232ecc71' stroke-width='4'/></svg>" },
            { de: "das Rezept", vi: "công thức nấu ăn", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='25' y='20' width='50' height='60' rx='5' fill='%23ecf0f1' stroke='%2395a5a6' stroke-width='4'/><line x1='35' y1='40' x2='65' y2='40' stroke='%237f8c8d' stroke-width='4'/><line x1='35' y1='55' x2='55' y2='55' stroke='%237f8c8d' stroke-width='4'/><circle cx='70' cy='30' r='8' fill='%23e74c3c'/></svg>" }
        ]
    },
    gesundheit: {
        titel: "💊 Gesundheit",
        woerter: [
            { de: "die Vorsorge", vi: "sự phòng ngừa", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M50 15 L85 30 L85 60 Q50 95 50 95 Q15 60 15 30 Z' fill='%233498db'/><path d='M40 45 L60 45 M50 35 L50 55' stroke='%23fff' stroke-width='8'/></svg>" },
            { de: "die Behandlung", vi: "sự điều trị", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='40' width='40' height='20' rx='10' fill='%23e74c3c'/><rect x='40' y='40' width='20' height='20' rx='10' fill='%23fff'/><path d='M70 30 L90 50 L70 70' stroke='%232ecc71' stroke-width='5' fill='none'/></svg>" }
        ]
    },
    technologie: {
        titel: "💻 Technologie",
        woerter: [
            { de: "die Digitalisierung", vi: "số hóa", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='20' y='25' width='60' height='40' rx='4' fill='%2334495e'/><rect x='10' y='65' width='80' height='10' rx='2' fill='%23bdc3c7'/><text x='50' y='52' font-size='18' font-weight='bold' fill='%232ecc71' text-anchor='middle'>0101</text></svg>" },
            { de: "die künstliche Intelligenz", vi: "trí tuệ nhân tạo", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='30' y='25' width='40' height='40' rx='8' fill='%23ecf0f1' stroke='%237f8c8d' stroke-width='4'/><circle cx='40' cy='40' r='5' fill='%23e74c3c'/><circle cx='60' cy='40' r='5' fill='%23e74c3c'/><path d='M 40 55 Q 50 65 60 55' stroke='%237f8c8d' stroke-width='4' fill='none'/><line x1='50' y1='15' x2='50' y2='25' stroke='%23f1c40f' stroke-width='4'/></svg>" }
        ]
    },
    gesellschaft: {
        titel: "🏘️ Gesellschaft",
        woerter: [
            { de: "die Bevölkerung", vi: "dân số", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='30' cy='35' r='10' fill='%23f39c12'/><circle cx='50' cy='25' r='12' fill='%233498db'/><circle cx='70' cy='35' r='10' fill='%23e74c3c'/><path d='M15 70 Q30 50 45 70 M35 70 Q50 40 65 70 M55 70 Q70 50 85 70' stroke='%232c3e50' stroke-width='5' fill='none'/></svg>" },
            { de: "die Integration", vi: "sự hội nhập", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><path d='M30 30 L50 30 L50 50 L30 50 Z' fill='%233498db'/><path d='M50 30 L70 30 L70 50 L50 50 Z' fill='%23e74c3c'/><path d='M40 50 L60 50 L60 70 L40 70 Z' fill='%23f1c40f'/><circle cx='50' cy='50' r='8' fill='%232ecc71'/></svg>" }
        ]
    },
    studium: {
        titel: "🎓 Studium",
        woerter: [
            { de: "das Semester", vi: "học kỳ", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='25' y='25' width='50' height='50' rx='5' fill='%23ecf0f1' stroke='%2334495e' stroke-width='4'/><rect x='25' y='25' width='50' height='15' rx='5' fill='%23e74c3c'/><circle cx='40' cy='55' r='6' fill='%233498db'/><circle cx='60' cy='55' r='6' fill='%23bdc3c7'/></svg>" },
            { de: "die Vorlesung", vi: "bài giảng", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><rect x='15' y='20' width='70' height='45' fill='%232c3e50' stroke='%237f8c8d' stroke-width='3'/><circle cx='50' cy='80' r='12' fill='%23f39c12'/><path d='M40 100 L60 100 L50 85 Z' fill='%233498db'/><line x1='25' y1='35' x2='55' y2='35' stroke='%23ecf0f1' stroke-width='3'/></svg>" }
        ]
    },
    saetze: {
        titel: "💬 Sätze",
        woerter: [
            { de: "Meiner Meinung nach", vi: "Theo ý kiến của tôi", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><ellipse cx='50' cy='40' rx='35' ry='25' fill='%23ecf0f1' stroke='%2395a5a6' stroke-width='3'/><circle cx='35' cy='75' r='8' fill='%23ecf0f1'/><circle cx='25' cy='88' r='4' fill='%23ecf0f1'/><text x='50' y='48' font-size='20' fill='%2334495e' text-anchor='middle'>💡</text></svg>" },
            { de: "Ich bin davon überzeugt, dass", vi: "Tôi tin chắc rằng", bild: "data:image/svg+xml;utf8,<svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'><circle cx='50' cy='50' r='35' fill='%232ecc71'/><path d='M35 50 L45 60 L65 35' fill='none' stroke='%23fff' stroke-width='8'/><circle cx='70' cy='25' r='5' fill='%23f1c40f'/><circle cx='85' cy='40' r='4' fill='%23f1c40f'/></svg>" }
        ]
    }
};

// 4. GAME TRẮC NGHIỆM ĐIỀN TỪ (50 CÂU B2 CỰC "CUỐN")
// ==========================================
const quizGameData = [
    { question: "Die ______ der neuen Technologie hat den Markt revolutioniert.", options: ["Einführung", "Erkältung", "Verband"], answer: 0, explanation: "Einführung (sự ra mắt/giới thiệu) phù hợp ngữ cảnh công nghệ." },
    { question: "Er hat sich für die Stelle beworben, aber leider eine ______ erhalten.", options: ["Absage", "Zusage", "Karies"], answer: 0, explanation: "Absage (sự từ chối) đối lập với việc được nhận vào làm." },
    { question: "Um die Umwelt zu schützen, müssen wir ______.", options: ["Energie verschwenden", "Ressourcen schonen", "Müll produzieren"], answer: 1, explanation: "Ressourcen schonen (tiết kiệm tài nguyên) là cách bảo vệ môi trường." },
    { question: "Der ______ des Patienten war nach dem Lauf sehr hoch.", options: ["Puls", "Asthma", "Rezept"], answer: 0, explanation: "Puls (nhịp tim) tăng cao khi vận động mạnh." },
    { question: "Die Politik muss klare ______ für den Datenschutz schaffen.", options: ["Leitplanken", "Krankheiten", "Gehälter"], answer: 0, explanation: "Leitplanken (khung/định hướng) dùng trong quản lý chính sách." },
    { question: "Er hat die ______ seiner Tat erst viel später verstanden.", options: ["Konsequenzen", "Pflaster", "Vorlesungen"], answer: 0, explanation: "Konsequenzen (hậu quả) là từ vựng B2 rất hay dùng." },
    { question: "Bevor man eine Wunde näht, muss man sie gründlich ______.", options: ["ignorieren", "desinfizieren", "operieren"], answer: 1, explanation: "desinfizieren (khử trùng) là bước bắt buộc trước khi khâu vết thương." },
    { question: "Eine ______ Ernährung stärkt das Immunsystem nachhaltig.", options: ["ausgewogene", "digitale", "verstauchte"], answer: 0, explanation: "ausgewogene (cân bằng) luôn đi kèm với Ernährung (dinh dưỡng)." },
    { question: "Im Krankenhaus gelten strenge ______, um Infektionen zu vermeiden.", options: ["Vorlesungen", "Hygienevorschriften", "Bewerbungen"], answer: 1, explanation: "Hygienevorschriften (quy định vệ sinh) rất quan trọng trong môi trường y tế." },
    { question: "Durch das sogenannte ______ kann der Körper alte Zellen abbauen.", options: ["Heilfasten", "Homeoffice", "Stethoskop"], answer: 0, explanation: "Heilfasten (nhịn ăn chữa bệnh) giúp cơ thể tái tạo." },
    { question: "Für das sechsmonatige ______ im Krankenhaus brauche ich noch einen Nachweis.", options: ["Praktikum", "Gehalt", "Pflaster"], answer: 0, explanation: "Praktikum (kỳ thực tập) thường kéo dài vài tháng." },
    { question: "Die regelmäßige ______ der Instrumente ist absolut notwendig.", options: ["Sterilisation", "Integration", "Bevölkerung"], answer: 0, explanation: "Sterilisation (tiệt trùng) dụng cụ y tế là quy tắc sống còn." },
    { question: "Er leidet unter chronischer ______, weshalb er abends keinen Kaffee mehr trinkt.", options: ["Digitalisierung", "Schlaflosigkeit", "Zusammenarbeit"], answer: 1, explanation: "Schlaflosigkeit (chứng mất ngủ) liên quan đến việc tránh caffeine." },
    { question: "Um die B2-Prüfung zu bestehen, muss man komplexe Texte ______.", options: ["ignorieren", "verstehen", "vermeiden"], answer: 1, explanation: "verstehen (hiểu) là yêu cầu của bài đọc B2." },
    { question: "Die ______ von Plastikmüll ist ein globales Problem.", options: ["Entsorgung", "Ernährung", "Atmosphäre"], answer: 0, explanation: "Entsorgung (xử lý rác thải) đi cùng với Müll." },
    { question: "Als Pflegekraft muss man oft im ______ arbeiten.", options: ["Schichtdienst", "Urlaub", "Ausland"], answer: 0, explanation: "Schichtdienst (làm việc theo ca) là đặc thù ngành điều dưỡng." },
    { question: "Bitte messen Sie den ______ des Patienten im Zimmer 3.", options: ["Kultur", "Blutdruck", "Staub"], answer: 1, explanation: "Blutdruck messen (đo huyết áp) là nghiệp vụ y tế cơ bản." },
    { question: "Die ______ der Wunde verläuft ohne Komplikationen.", options: ["Heilung", "Symptome", "Diagnose"], answer: 0, explanation: "Heilung (sự chữa lành) đi với Wunde." },
    { question: "Nach dem Aufstehen lüfte ich sofort das Zimmer, um für ein gutes ______ zu sorgen.", options: ["Raumklima", "Gehalt", "Wetter"], answer: 0, explanation: "Raumklima (không khí trong phòng) cải thiện khi thông gió." },
    { question: "Nüsse wie ______ sind ein perfekter und gesunder Snack für zwischendurch.", options: ["Mandeln", "Bonbons", "Schokolade"], answer: 0, explanation: "Mandeln (hạnh nhân) là một loại hạt dinh dưỡng." },
    { question: "Die ______ von Krankheiten ist oft besser als ihre spätere Behandlung.", options: ["Prävention", "Operation", "Infektion"], answer: 0, explanation: "Prävention (sự phòng ngừa) tốt hơn chữa bệnh." },
    { question: "In der Pflege ist ______ gegenüber den Patienten eine extrem wichtige Eigenschaft.", options: ["Empathie", "Karies", "Arroganz"], answer: 0, explanation: "Empathie (sự đồng cảm) cần thiết khi chăm sóc bệnh nhân." },
    { question: "Grüner Tee enthält viele ______, die den Stoffwechsel anregen.", options: ["Zusätze", "Antioxidantien", "Bakterien"], answer: 1, explanation: "Antioxidantien (chất chống oxy hóa) có nhiều trong trà xanh." },
    { question: "Ich bin ein absoluter ______, bei mir muss alles am richtigen Platz liegen.", options: ["Ordnungsfanatiker", "Arzt", "Hund"], answer: 0, explanation: "Ordnungsfanatiker (người cuồng sự gọn gàng) thích mọi thứ ngăn nắp." },
    { question: "Vor der Operation muss der Patient eine ______ unterschreiben.", options: ["Einverständniserklärung", "Bewerbung", "Zeitung"], answer: 0, explanation: "Einverständniserklärung (giấy cam kết đồng ý) là thủ tục pháp lý y tế." },
    { question: "Die ______ der Haut ist wichtig, um vorzeitige Alterung zu verhindern.", options: ["Feuchtigkeitspflege", "Akne", "Trockenheit"], answer: 0, explanation: "Feuchtigkeitspflege (dưỡng ẩm) giúp bảo vệ da." },
    { question: "Produkte mit chemischen ______ versuche ich in meiner Routine zu vermeiden.", options: ["Zusätzen", "Vitaminen", "Pflanzen"], answer: 0, explanation: "Zusätze (chất phụ gia/hóa học) thường gây kích ứng." },
    { question: "Der Arzt verschreibt ein ______, um die bakterielle Infektion zu bekämpfen.", options: ["Antibiotikum", "Pflaster", "Stethoskop"], answer: 0, explanation: "Antibiotikum (thuốc kháng sinh) trị nhiễm khuẩn." },
    { question: "Das ______ ist ein wichtiges Dokument für die berufliche Anerkennung.", options: ["Zertifikat", "Plastik", "Haustier"], answer: 0, explanation: "Zertifikat (chứng chỉ) cần cho công việc." },
    { question: "Bei einem medizinischen Notfall zählt jede ______.", options: ["Sekunde", "Woche", "Ausrede"], answer: 0, explanation: "Sekunde (giây) rất quý giá trong cấp cứu." },
    { question: "Künstliche Intelligenz wird genutzt, um ______ zu erstellen und Videos zu bearbeiten.", options: ["Skripte", "Medikamente", "Krankheiten"], answer: 0, explanation: "Skripte (kịch bản) có thể tạo bằng AI." },
    { question: "Die Stimmen in diesem Kurzfilm wurden durch KI ______.", options: ["generiert", "operiert", "gelöscht"], answer: 0, explanation: "generiert (được tạo ra) dùng cho giọng nói AI." },
    { question: "Das Spülen des Geschirrs sollte man am besten ______ erledigen.", options: ["sofort", "nie", "nächstes Jahr"], answer: 0, explanation: "sofort (ngay lập tức) là thói quen giữ nhà cửa sạch sẽ." },
    { question: "Süßgetränke meide ich, stattdessen trinke ich lieber warmen ______.", options: ["Tee", "Sirup", "Cola"], answer: 0, explanation: "Tee (trà) là lựa chọn thay thế lành mạnh." },
    { question: "Die Patientenakte muss streng ______ behandelt werden.", options: ["vertraulich", "öffentlich", "gefährlich"], answer: 0, explanation: "vertraulich (bảo mật) là quy định y tế." },
    { question: "Zur ______ der Muskeln nach dem Sport helfen Dehnübungen.", options: ["Regeneration", "Verletzung", "Infektion"], answer: 0, explanation: "Regeneration (phục hồi) cơ bắp sau thể thao." },
    { question: "Bei der ______ von analogen Horror-Videos kommt es sehr auf die Soundeffekte an.", options: ["Produktion", "Zerstörung", "Diagnose"], answer: 0, explanation: "Produktion (sản xuất) video cần chú trọng âm thanh." },
    { question: "Die ______ der Pflegeausbildung erfordert viel Disziplin und Ausdauer.", options: ["Absolvierung", "Vermeidung", "Krankheit"], answer: 0, explanation: "Absolvierung (việc hoàn thành) khóa học cần nỗ lực." },
    { question: "Eine klare ______ zwischen Arbeit und Privatleben beugt Burnout vor.", options: ["Trennung", "Integration", "Vorlesung"], answer: 0, explanation: "Trennung (sự phân định) rõ ràng giúp cân bằng cuộc sống." },
    { question: "Bei akuter ______ muss der Patient schnellstmöglich ins Krankenhaus.", options: ["Atemnot", "Langeweile", "Freude"], answer: 0, explanation: "Atemnot (khó thở) là trường hợp khẩn cấp." },
    { question: "Die tägliche ______ des Gesichts beugt Unreinheiten vor.", options: ["Reinigung", "Verschmutzung", "Operation"], answer: 0, explanation: "Reinigung (làm sạch) ngăn ngừa mụn." },
    { question: "Wir müssen unsere ______ optimieren, um produktiver zu sein.", options: ["Abläufe", "Fehler", "Symptome"], answer: 0, explanation: "Abläufe (quy trình) cần được tối ưu." },
    { question: "Ein guter ______ ist essenziell für die kognitive Leistungsfähigkeit.", options: ["Schlafzyklus", "Puls", "Bildschirm"], answer: 0, explanation: "Schlafzyklus (chu kỳ giấc ngủ) ảnh hưởng đến não bộ." },
    { question: "Die ______ von Fremdsprachen öffnet viele Türen im Berufsleben.", options: ["Beherrschung", "Vergessenheit", "Angst"], answer: 0, explanation: "Beherrschung (việc thông thạo) ngoại ngữ mang lại cơ hội." },
    { question: "Zur Bestimmung des Blutzuckers verwendet man eine kleine ______.", options: ["Kanüle", "Bewerbung", "Tastatur"], answer: 0, explanation: "Kanüle (kim tiêm) dùng lấy máu." },
    { question: "Der ständige ______ nach Perfektionismus kann auch sehr stressig sein.", options: ["Drang", "Schlaf", "Hund"], answer: 0, explanation: "Drang (sự thôi thúc) hoàn hảo gây áp lực." },
    { question: "Eine gute ______ der Hautbarriere ist das A und O bei der Pflege.", options: ["Stärkung", "Zerstörung", "Akne"], answer: 0, explanation: "Stärkung (củng cố) hàng rào bảo vệ da." },
    { question: "Wir brauchen mehr ______ im Gesundheitswesen, um den Personalmangel auszugleichen.", options: ["Fachkräfte", "Computer", "Krankheiten"], answer: 0, explanation: "Fachkräfte (nhân lực chuyên môn) đang thiếu hụt." },
    { question: "Die regelmäßige ______ von Vokabeln ist der Schlüssel zum Erfolg beim Sprachenlernen.", options: ["Wiederholung", "Ignoranz", "Pause"], answer: 0, explanation: "Wiederholung (sự ôn tập) là chìa khóa." },
    { question: "Die ______ in unserem Team ist sehr kooperativ und unterstützend.", options: ["Atmosphäre", "Mülltrennung", "Grippe"], answer: 0, explanation: "Atmosphäre (bầu không khí) làm việc rất tốt." }
];
