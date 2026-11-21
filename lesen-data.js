// Goethe-Zertifikat B2 Lesen (Erwachsene)
// 10 original practice tasks: two complete tasks for each official Teil.
// The texts are original; only the task structure follows the official model.

const LESEN_B2_TASKS = [
    {
        id: 'lesen_t1_konsum',
        teil: 1,
        title: 'Weniger kaufen, bewusster leben',
        topic: 'Konsum & Alltag',
        suggestedMinutes: 18,
        targetWords: ['die Wegwerfgesellschaft', 'Neuware', 'impulsiver Konsum', 'Ressourcen schonen', 'die Versandkosten', 'der Gebrauchsgegenstand'],
        instruction: 'Sie lesen in einem Forum, wie Menschen über bewussten Konsum denken. Auf welche der vier Personen treffen die Aussagen 1 bis 9 zu? Die Personen können mehrmals gewählt werden.',
        people: [
            {
                id: 'a', name: 'Lina, Mainz',
                text: 'Früher habe ich oft Neuware gekauft, obwohl meine alten Sachen noch funktioniert haben. Besonders bei Kleidung ließ ich mich leicht von Rabatten locken. Inzwischen frage ich mich vor jedem Kauf, ob ich den Gegenstand wirklich brauche. Defekte Geräte lasse ich nach Möglichkeit reparieren. Das spart nicht immer sofort Geld, aber ich möchte diese Wegwerfgesellschaft nicht länger unterstützen. Vollständig minimalistisch lebe ich trotzdem nicht: Dinge, die ich oft benutze und wirklich mag, dürfen bleiben.'
            },
            {
                id: 'b', name: 'Cem, Dortmund',
                text: 'Nachhaltigkeit ist wichtig, aber sie muss in meinen Alltag passen. Ich arbeite lange und bestelle deshalb vieles im Internet. Dass dabei Versandkosten entstehen und manchmal mehrere Pakete ankommen, finde ich ärgerlich. Noch nerviger ist allerdings eine Reklamation, wenn ein Produkt nicht passt. Dann verliere ich viel Zeit. Ich kaufe daher lieber seltener, dafür bei Händlern, mit denen ich schon gute Erfahrungen gemacht habe. Auf Komfort möchte ich nicht völlig verzichten.'
            },
            {
                id: 'c', name: 'Nora, Freiburg',
                text: 'Bei mir ist nicht der Kauf das Problem, sondern das Weggeben. An vielen Gebrauchsgegenständen hängen Erinnerungen: die Tasse aus der ersten WG, Bücher aus dem Studium oder eine Jacke meiner Großmutter. Natürlich brauche ich nicht alles davon. Trotzdem kann ich mich nicht innerhalb eines Wochenendes von der Hälfte meines Besitzes trennen. Ich sortiere portionsweise aus und mache nach jeder Kiste eine Pause. So bleibt die Entscheidung für mich erträglich.'
            },
            {
                id: 'd', name: 'Felix, Potsdam',
                text: 'Nicht jeder Haushalt muss eine Bohrmaschine, eine Leiter und zehn selten genutzte Werkzeuge besitzen. In unserem Wohnviertel gibt es einen gemeinsamen Schrank, aus dem man solche Dinge ausleihen kann. Dadurch schonen wir Ressourcen und kommen zugleich mit den Nachbarn ins Gespräch. Manche fürchten, dass etwas kaputtgeht oder nicht zurückgebracht wird. Bei uns helfen klare Regeln und eine Liste. Bislang funktioniert das erstaunlich reibungslos.'
            }
        ],
        questions: [
            {number:1,text:'Wer verbindet Gegenstände stark mit persönlichen Erinnerungen?',answer:'c',why:'Nora kể nhiều món đồ gắn với những kỷ niệm cụ thể.'},
            {number:2,text:'Wer nutzt gemeinschaftlichen Besitz statt alles selbst zu kaufen?',answer:'d',why:'Felix mượn dụng cụ từ chiếc tủ dùng chung thay vì tự mua.'},
            {number:3,text:'Wer möchte trotz Umweltbewusstsein nicht auf Bequemlichkeit verzichten?',answer:'b',why:'Cem coi sống bền vững là quan trọng nhưng vẫn muốn giữ sự tiện lợi.'},
            {number:4,text:'Wer lässt funktionsunfähige Dinge möglichst wieder instand setzen?',answer:'a',why:'Lina cố gắng đem các thiết bị hỏng đi sửa.'},
            {number:5,text:'Wer wurde früher leicht zu ungeplanten Käufen verleitet?',answer:'a',why:'Trước đây, giảm giá khiến Lina mua cả những thứ không cần thiết.'},
            {number:6,text:'Wer sieht im Teilen auch einen sozialen Vorteil?',answer:'d',why:'Việc dùng chung đồ giúp tạo thêm quan hệ trong khu phố.'},
            {number:7,text:'Wer empfindet die Rückgabe ungeeigneter Waren als besonders lästig?',answer:'b',why:'Cem thấy việc khiếu nại và đổi trả vừa tốn thời gian vừa phiền.'},
            {number:8,text:'Wer braucht beim Aussortieren ein langsames Vorgehen?',answer:'c',why:'Nora chỉ có thể chia tay đồ đạc từng ít một.'},
            {number:9,text:'Wer will bewusster konsumieren, ohne auf wenige geliebte Dinge zu verzichten?',answer:'a',why:'Lina vẫn giữ những món thường dùng và thực sự yêu thích.'}
        ]
    },
    {
        id: 'lesen_t1_hybridarbeit',
        teil: 1,
        title: 'Wo arbeitet es sich am besten?',
        topic: 'Arbeit & Homeoffice',
        suggestedMinutes: 18,
        targetWords: ['das Homeoffice', 'der Pendler', 'abgelenkt', 'die Arbeitsmenge', 'den Überblick behalten', 'die Vereinbarkeit von Beruf und Familie'],
        instruction: 'Sie lesen in einem Forum Meinungen zu Homeoffice und Büroarbeit. Auf welche der vier Personen treffen die Aussagen 1 bis 9 zu? Die Personen können mehrmals gewählt werden.',
        people: [
            {id:'a',name:'Miriam, Kiel',text:'Seit ich zwei Tage pro Woche im Homeoffice arbeite, lässt sich die Vereinbarkeit von Beruf und Familie viel besser organisieren. Ich kann mein Kind morgens zur Schule bringen und spare außerdem den Arbeitsweg. Allerdings brauche ich zu Hause feste Arbeitszeiten. Sonst erledige ich zwischendurch Hausarbeit und verliere den Überblick. Für mich ist deshalb eine Mischung ideal: konzentrierte Aufgaben zu Hause, Besprechungen im Büro.'},
            {id:'b',name:'Jonas, Hamburg',text:'In meiner kleinen Wohnung kann ich mich kaum konzentrieren. Der Esstisch ist gleichzeitig Arbeitsplatz, und die Nachbarn sind nicht gerade leise. Im Büro werde ich zwar gelegentlich von Kollegen angesprochen, aber dort habe ich einen guten Schreibtisch und alle technischen Geräte. Außerdem entstehen viele Ideen erst im spontanen Gespräch. Ich würde freiwillig an fast jedem Tag vor Ort arbeiten.'},
            {id:'c',name:'Aylin, Kassel',text:'Als tägliche Pendlerin habe ich früher fast zwei Stunden in Zügen verbracht. Seit unsere Firma mobiles Arbeiten eingeführt hat, gewinne ich viel Zeit. Ganz ohne Büro möchte ich trotzdem nicht sein, denn neue Mitarbeiter lassen sich online schwer einarbeiten. Entscheidend ist für mich, dass Teams gemeinsame Präsenztage festlegen. Sonst fährt man ins Büro und sitzt dort allein in einer Videokonferenz.'},
            {id:'d',name:'Robert, Leipzig',text:'Ob jemand im Büro sitzt, sagt wenig über seine Leistung aus. Wichtiger sind klare Aufgaben und realistische Termine. In meinem Team ist die Arbeitsmenge allerdings gestiegen, seit alle ständig erreichbar sind. Einige beantworten sogar spätabends Nachrichten. Deshalb brauchen wir verbindliche Grenzen. Mobiles Arbeiten ist nur dann ein Fortschritt, wenn die gewonnene Freiheit nicht sofort mit zusätzlicher Arbeit gefüllt wird.'}
        ],
        questions: [
            {number:1,text:'Wer hält einen gemeinsamen Bürotag für das Team für notwendig?',answer:'c',why:'Aylin muốn cả nhóm có những ngày cùng hiện diện tại văn phòng.'},
            {number:2,text:'Wer kann in der eigenen Wohnung schlecht arbeiten?',answer:'b',why:'Jonas thiếu không gian và bị tiếng ồn làm phiền.'},
            {number:3,text:'Wer warnt davor, dass flexible Arbeit zu Mehrarbeit führt?',answer:'d',why:'Robert nhận thấy khối lượng việc tăng và mọi người luôn phải sẵn sàng trả lời.'},
            {number:4,text:'Wer verbindet Heimarbeit mit familiären Vorteilen?',answer:'a',why:'Miriam sắp xếp việc đưa đón con đi học thuận lợi hơn.'},
            {number:5,text:'Wer spart durch mobiles Arbeiten besonders viel Reisezeit?',answer:'c',why:'Trước đây Aylin phải đi làm gần hai tiếng mỗi ngày.'},
            {number:6,text:'Wer schätzt Ideen, die ungeplant im direkten Austausch entstehen?',answer:'b',why:'Jonas xem những cuộc trò chuyện tự phát là nguồn của ý tưởng mới.'},
            {number:7,text:'Wer braucht klare Regeln, um sich zu Hause nicht mit anderen Aufgaben zu beschäftigen?',answer:'a',why:'Nếu không có quy tắc rõ ràng, Miriam dễ bị việc nhà làm phân tâm.'},
            {number:8,text:'Wer findet das Arbeitsergebnis wichtiger als den Arbeitsort?',answer:'d',why:'Robert đánh giá hiệu quả qua nhiệm vụ và thời hạn, không qua sự có mặt.'},
            {number:9,text:'Wer bevorzugt unterschiedliche Orte für unterschiedliche Tätigkeiten?',answer:'a',why:'Miriam làm việc cần tập trung ở nhà và họp tại văn phòng.'}
        ]
    },
    {
        id: 'lesen_t2_reparatur',
        teil: 2,
        title: 'Reparieren statt wegwerfen',
        topic: 'Technik & Umwelt',
        suggestedMinutes: 12,
        targetWords: ['das Ersatzteil', 'defekt', 'die Wegwerfgesellschaft', 'Ressourcen schonen', 'die Verkaufszahlen', 'auf dem neuesten Stand sein'],
        instruction: 'Sie lesen in einer Zeitschrift einen Artikel. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht.',
        segments: [
            'Ein Smartphone mit schwachem Akku, ein Toaster mit losem Kabel oder eine Waschmaschine, deren Tür nicht mehr schließt: Viele Geräte werden ersetzt, sobald sie defekt sind. Dabei wäre eine Reparatur technisch oft möglich.',
            'Ein Grund dafür ist, dass Verbraucher vor dem Kauf kaum erkennen können, wie leicht sich ein Produkt öffnen und reparieren lässt. Bei manchen Geräten ist der Akku fest eingebaut; bei anderen fehlt schon nach wenigen Jahren das passende Ersatzteil.',
            'Mehrere europäische Länder versuchen deshalb, Reparaturen attraktiver zu machen. In einigen Regionen bekommen Kunden einen Teil der Kosten zurück, wenn sie ein kaputtes Gerät in einem anerkannten Betrieb instand setzen lassen.',
            'Die Nachfrage ist groß. Werkstätten berichten, dass viele Menschen ihre Geräte gern länger nutzen würden, wenn die Reparatur bezahlbar und unkompliziert wäre.',
            'Kritiker bezweifeln jedoch, dass finanzielle Zuschüsse allein genügen. Hersteller müssten Produkte so konstruieren, dass einzelne Teile ohne Spezialwerkzeug ausgetauscht werden können.',
            'Auch Software spielt eine Rolle. Ein technisch funktionierendes Telefon wird nutzlos, wenn es keine Sicherheitsupdates mehr erhält. Verbraucher kaufen dann ein neues Modell, nur um digital auf dem neuesten Stand zu sein.',
            'Eine längere Nutzungsdauer würde nicht nur private Haushalte entlasten. Sie könnte Rohstoffe sparen, Müll vermeiden und damit Ressourcen schonen. Der Abschied von der Wegwerfgesellschaft beginnt also nicht erst im Recyclinghof, sondern bereits bei der Produktplanung.'
        ],
        options: [
            {id:'a',text:'Allerdings muss der Antrag zusammen mit der Rechnung eingereicht werden.'},
            {id:'b',text:'Deshalb fordern Fachleute verbindliche Updates über einen längeren Zeitraum.'},
            {id:'c',text:'Was fehlt, sind verlässliche Informationen über die Reparierbarkeit.'},
            {id:'d',text:'Ein solches Design könnte zwar die Herstellung etwas teurer machen.'},
            {id:'e',text:'Trotzdem steigen die Verkaufszahlen neuer Küchengeräte jedes Jahr.'},
            {id:'f',text:'Der sogenannte Reparaturbonus soll genau an diesem Punkt helfen.'},
            {id:'g',text:'Manche Werkstätten lehnen elektronische Geräte grundsätzlich ab.'},
            {id:'h',text:'Die ersten Auswertungen zeigen, dass das Angebot tatsächlich genutzt wird.'}
        ],
        questions: [
            {number:10,text:'Lücke 10',answer:'c',why:'Sau khả năng sửa chữa, mạch ý chuyển sang vấn đề người mua thiếu thông tin.'},
            {number:11,text:'Lücke 11',answer:'f',why:'Câu về Reparaturbonus dẫn trực tiếp sang khoản hỗ trợ tài chính.'},
            {number:12,text:'Lücke 12',answer:'a',why:'Sau phần hoàn tiền phải là điều kiện nộp hóa đơn và đơn đề nghị.'},
            {number:13,text:'Lücke 13',answer:'h',why:'Kết quả đánh giá ban đầu xác nhận nhu cầu đối với chương trình rất cao.'},
            {number:14,text:'Lücke 14',answer:'d',why:'Ý kiến về chi phí sản xuất cao hơn nối đúng với thiết kế dễ sửa chữa.'},
            {number:15,text:'Lücke 15',answer:'b',why:'Thiếu cập nhật bảo mật dẫn tới yêu cầu hỗ trợ cập nhật lâu hơn.'}
        ]
    },
    {
        id: 'lesen_t2_stadtverkehr',
        teil: 2,
        title: 'Wie Innenstädte beweglich bleiben',
        topic: 'Verkehr & Stadtleben',
        suggestedMinutes: 12,
        targetWords: ['die City-Maut', 'der Pendler', 'der Bahnverkehr', 'die Feinstaubbelastung', 'sich stauen', 'umgeleitet', 'die Verzögerungen'],
        instruction: 'Sie lesen in einer Zeitschrift einen Artikel. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht.',
        segments: [
            'Morgens stauen sich Autos auf den Zufahrtsstraßen, Busse kommen nur langsam voran und Anwohner klagen über Lärm. Viele Städte suchen deshalb nach Wegen, den Verkehr im Zentrum zu verringern.',
            'Ein häufig diskutiertes Mittel ist die City-Maut. Wer mit dem Auto in einen bestimmten Bereich fährt, bezahlt eine Gebühr. Befürworter erwarten davon weniger Fahrzeuge und eine geringere Feinstaubbelastung.',
            'Eine Gebühr allein löst das Problem jedoch nicht. Pendler brauchen eine verlässliche Alternative, sonst wird Mobilität vor allem für Menschen mit geringem Einkommen teurer.',
            'Dazu gehören häufigere Züge, sichere Fahrradwege und Parkplätze an Bahnhöfen außerhalb des Zentrums. Besonders wichtig ist, dass der Bahnverkehr auch am Abend funktioniert.',
            'Während der Bauphase neuer Strecken entstehen allerdings zusätzliche Schwierigkeiten. Straßen werden gesperrt, Buslinien umgeleitet und Fahrgäste müssen mit Verzögerungen rechnen.',
            'Damit die Bevölkerung solche Belastungen akzeptiert, müssen Städte früh und verständlich informieren. Digitale Anzeigen allein reichen nicht, weil nicht jeder ständig eine App benutzt.',
            'Langfristig kann ein gut abgestimmtes System die Innenstadt ruhiger und zugänglicher machen. Entscheidend ist, nicht nur das Autofahren unattraktiver zu machen, sondern bessere Möglichkeiten anzubieten.'
        ],
        options: [
            {id:'a',text:'In mehreren europäischen Städten gibt es damit bereits Erfahrungen.'},
            {id:'b',text:'Deshalb muss der öffentliche Verkehr gleichzeitig ausgebaut werden.'},
            {id:'c',text:'Dort sollen künftig ausschließlich Touristen parken dürfen.'},
            {id:'d',text:'Nur dann bleibt der Umstieg auch für Schichtarbeiter realistisch.'},
            {id:'e',text:'Kurzfristig kann die Verkehrslage dadurch sogar unübersichtlicher werden.'},
            {id:'f',text:'Trotzdem lehnen grundsätzlich alle Einzelhändler die Pläne ab.'},
            {id:'g',text:'Hinweise sollten deshalb über mehrere Kanäle verbreitet werden.'},
            {id:'h',text:'Doch zunächst stellt sich die Frage, mit welchen Maßnahmen das gelingen kann.'}
        ],
        questions: [
            {number:10,text:'Lücke 10',answer:'h',why:'Sau khi nêu vấn đề, bài chuyển hợp lý sang câu hỏi về các biện pháp.'},
            {number:11,text:'Lücke 11',answer:'a',why:'Kinh nghiệm từ các thành phố khác nối trực tiếp với việc áp dụng City-Maut.'},
            {number:12,text:'Lücke 12',answer:'b',why:'Nếu muốn người dân có lựa chọn khác, giao thông công cộng phải được cải thiện song song.'},
            {number:13,text:'Lücke 13',answer:'d',why:'Các chuyến buổi tối đặc biệt cần thiết với người làm theo ca.'},
            {number:14,text:'Lücke 14',answer:'e',why:'Đóng đường và đổi tuyến có thể làm tình hình rối hơn trong ngắn hạn.'},
            {number:15,text:'Lücke 15',answer:'g',why:'Thông báo qua nhiều kênh giải quyết hạn chế của việc chỉ dùng ứng dụng.'}
        ]
    },
    {
        id: 'lesen_t3_aufmerksamkeit',
        teil: 3,
        title: 'Wenn jede Nachricht wichtig erscheint',
        topic: 'Smartphone & Konzentration',
        suggestedMinutes: 12,
        targetWords: ['die kurzfristige Dopamin-Belohnung', 'die Zeitwahrnehmung', 'sich ablenken lassen', 'den Arbeitsfluss unterbrechen', 'die reale Welt vernachlässigen', 'die Konzentrationsfähigkeit'],
        instruction: 'Sie lesen in einer Zeitung einen Artikel. Wählen Sie bei den Aufgaben 16 bis 21 die richtige Lösung a, b oder c.',
        article: [
            'Nur kurz auf das Smartphone schauen – und plötzlich sind zwanzig Minuten vergangen. Dieses Erlebnis kennen viele Menschen. Forschende erklären es unter anderem damit, dass soziale Netzwerke ständig neue, nicht vorhersehbare Inhalte anbieten. Ein interessantes Video oder eine freundliche Nachricht wirkt wie eine kurzfristige Dopamin-Belohnung. Weil die nächste Belohnung jederzeit erscheinen könnte, fällt es schwer, das Gerät wegzulegen.',
            'Das Problem besteht nicht nur in der verlorenen Zeit. Jede Unterbrechung zwingt das Gehirn, sich anschließend erneut in eine Aufgabe einzuarbeiten. Wer beim Schreiben alle paar Minuten Nachrichten liest, braucht deshalb häufig deutlich länger. Selbst wenn die Antwort nur wenige Sekunden dauert, kann sie den Arbeitsfluss unterbrechen. Untersuchungen zeigen außerdem, dass bereits ein sichtbares Smartphone Aufmerksamkeit bindet: Ein Teil des Gehirns muss ständig den Impuls kontrollieren, danach zu greifen.',
            'Besonders auffällig verändert sich die Zeitwahrnehmung. In einer endlosen Folge kurzer Beiträge gibt es kaum natürliche Stoppsignale. Bei einem Buch endet ein Kapitel, bei einer Fernsehsendung eine Folge. Eine App lädt dagegen automatisch den nächsten Inhalt. Nutzer müssen selbst entscheiden, wann genug ist – genau diese Entscheidung wird aber mit zunehmender Müdigkeit schwieriger.',
            'Ein vollständiger Verzicht ist für die meisten Menschen weder realistisch noch nötig. Fachleute empfehlen stattdessen, störende Signale zu reduzieren. Benachrichtigungen lassen sich ausschalten, das Gerät kann während konzentrierter Arbeit außer Sichtweite liegen. Hilfreich ist auch, bestimmte Zeiten für Nachrichten festzulegen. So muss man nicht bei jedem Ton neu entscheiden, ob man reagieren möchte.',
            'Gleichzeitig warnen Psychologen vor einer rein technischen Lösung. Wer aus Langeweile, Einsamkeit oder Stress ständig zum Telefon greift, wird sein Verhalten durch einen anderen Bildschirm ersetzen. Wichtig sei daher, die eigene Gewohnheit wahrzunehmen und passende Alternativen zu finden: einen kurzen Spaziergang, ein Gespräch oder eine Pause ohne Medien. Ziel ist nicht, die digitale Welt abzulehnen, sondern die reale Welt nicht unbemerkt zu vernachlässigen.'
        ],
        questions: [
            {number:16,text:'Warum fällt es vielen schwer, soziale Netzwerke zu verlassen?',options:{a:'Die Inhalte sind fachlich besonders anspruchsvoll.',b:'Neue angenehme Reize können jederzeit auftauchen.',c:'Die Apps funktionieren nur für kurze Zeit.'},answer:'b',why:'Những phần thưởng nhỏ không đoán trước khiến người dùng muốn xem tiếp.'},
            {number:17,text:'Was bewirkt eine kurze Unterbrechung bei der Arbeit?',options:{a:'Man muss sich erneut in die Tätigkeit hineindenken.',b:'Man bearbeitet danach leichtere Aufgaben.',c:'Man erinnert sich besser an Einzelheiten.'},answer:'a',why:'Sau mỗi lần gián đoạn, ta phải mất công nhập tâm lại vào nhiệm vụ.'},
            {number:18,text:'Was kann schon ein sichtbares Smartphone verursachen?',options:{a:'Es verbessert die schnelle Reaktion.',b:'Es verändert automatisch die Bildschirmzeit.',c:'Es beansprucht einen Teil der Aufmerksamkeit.'},answer:'c',why:'Não phải dùng một phần chú ý để kiềm chế ý muốn cầm điện thoại.'},
            {number:19,text:'Warum verliert man in Apps leicht das Zeitgefühl?',options:{a:'Es fehlen klare natürliche Endpunkte.',b:'Die Beiträge werden immer länger.',c:'Die Uhrzeit wird meistens ausgeblendet.'},answer:'a',why:'Khác chương sách hay tập phim, luồng nội dung vô tận không có điểm dừng tự nhiên.'},
            {number:20,text:'Welche Maßnahme empfehlen Fachleute für konzentriertes Arbeiten?',options:{a:'Alle Nachrichten sofort beantworten.',b:'Das Smartphone außer Sichtweite legen.',c:'Nur noch am Computer kommunizieren.'},answer:'b',why:'Trong thời gian tập trung, điện thoại nên được đặt ngoài tầm mắt.'},
            {number:21,text:'Was reicht nach Ansicht der Psychologen nicht aus?',options:{a:'Nur die technischen Einstellungen zu verändern.',b:'Pausen ohne digitale Medien zu machen.',c:'Die Gründe des eigenen Verhaltens zu beobachten.'},answer:'a',why:'Nếu nguyên nhân là cảm xúc, chỉ thay đổi cài đặt kỹ thuật là chưa đủ.'}
        ]
    },
    {
        id: 'lesen_t3_fleischersatz',
        teil: 3,
        title: 'Was steckt im pflanzlichen Burger?',
        topic: 'Ernährung & Konsum',
        suggestedMinutes: 12,
        targetWords: ['Fleischersatzprodukte', 'die Inhaltsstoffe', 'eiweißhaltige Nahrung', 'nährstoffarm', 'herkömmliches Fleisch', 'die ökologische Bilanz'],
        instruction: 'Sie lesen in einer Zeitung einen Artikel. Wählen Sie bei den Aufgaben 16 bis 21 die richtige Lösung a, b oder c.',
        article: [
            'Pflanzliche Burger, Würste aus Erbsenprotein und Aufschnitt ohne tierische Zutaten nehmen immer mehr Platz im Supermarktregal ein. Fleischersatzprodukte richten sich längst nicht mehr nur an Menschen, die vollständig vegetarisch leben. Viele Käufer möchten lediglich an einigen Tagen auf herkömmliches Fleisch verzichten, ohne ihre gewohnten Gerichte grundlegend zu verändern.',
            'Aus ökologischer Sicht können die Produkte Vorteile haben. Für die Herstellung pflanzlicher Rohstoffe werden in der Regel weniger Fläche und Wasser benötigt als für die Massentierhaltung. Auch der Ausstoß von Treibhausgasen kann niedriger sein. Eine gute ökologische Bilanz ist jedoch nicht garantiert: Werden Zutaten über weite Strecken transportiert oder sehr aufwendig verarbeitet, fällt der Vorteil kleiner aus.',
            'Ernährungswissenschaftler raten deshalb zu einem genauen Blick auf die Inhaltsstoffe. Manche Ersatzprodukte enthalten viel Salz, Fett und zahlreiche Zusatzstoffe, damit Geschmack und Konsistenz Fleisch ähneln. Pflanzlich bedeutet also nicht automatisch gesund. Gleichzeitig liefern viele Produkte eiweißhaltige Nahrung und können Teil einer ausgewogenen Ernährung sein.',
            'Entscheidend ist, womit man vergleicht. Ein stark verarbeitetes Ersatzprodukt ist möglicherweise ungünstiger als ein einfaches Gericht aus Linsen und Gemüse. Im Vergleich zu einer fettreichen Wurst kann es dagegen besser abschneiden. Pauschale Urteile helfen daher wenig. Wer nur das grüne Etikett betrachtet, übersieht leicht, dass auch ein veganes Produkt nährstoffarm sein kann.',
            'Verbraucherschützer fordern verständlichere Kennzeichnungen. Käufer sollten auf einen Blick erkennen können, wie stark ein Produkt verarbeitet ist, woher die wichtigsten Zutaten stammen und welche Nährwerte es besitzt. Bis solche Angaben überall einheitlich sind, bleibt nur der Vergleich der Verpackungen. Und manchmal ist die einfachste Alternative weder Fleisch noch Ersatz: ein Gericht, das schon immer pflanzlich war.'
        ],
        questions: [
            {number:16,text:'Wer kauft laut Artikel zunehmend Fleischersatz?',options:{a:'Nur konsequente Vegetarier.',b:'Auch Menschen, die zeitweise weniger Fleisch essen.',c:'Vor allem Personen mit Lebensmittelallergien.'},answer:'b',why:'Nhiều người mua chỉ muốn bớt ăn thịt vào một số ngày.'},
            {number:17,text:'Wann kann der ökologische Vorteil geringer werden?',options:{a:'Wenn pflanzliche Rohstoffe regional wachsen.',b:'Wenn Produkte wenig Wasser benötigen.',c:'Wenn Transport und Verarbeitung sehr aufwendig sind.'},answer:'c',why:'Vận chuyển xa và chế biến phức tạp làm lợi thế sinh thái nhỏ đi.'},
            {number:18,text:'Wovor warnen Ernährungswissenschaftler?',options:{a:'Pflanzliche Produkte grundsätzlich für gesund zu halten.',b:'Eiweiß aus Pflanzen zu verwenden.',c:'Lebensmittel nach ihrem Salzgehalt zu vergleichen.'},answer:'a',why:'Sản phẩm thực vật vẫn có thể chứa nhiều muối, chất béo và phụ gia.'},
            {number:19,text:'Warum sind pauschale Bewertungen schwierig?',options:{a:'Die Preise ändern sich täglich.',b:'Das Ergebnis hängt vom jeweiligen Vergleichsprodukt ab.',c:'Die Zutatenlisten sind gesetzlich verboten.'},answer:'b',why:'Đồ thay thế có thể tốt hơn xúc xích nhưng lại kém một món đậu lăng đơn giản.'},
            {number:20,text:'Was können grüne Verpackungen nach Ansicht des Textes verdecken?',options:{a:'Dass ein Produkt wenig Nährstoffe enthält.',b:'Dass Fleisch enthalten ist.',c:'Dass das Produkt ausverkauft ist.'},answer:'a',why:'Một sản phẩm thuần chay vẫn có thể nghèo dinh dưỡng.'},
            {number:21,text:'Was verlangen Verbraucherschützer?',options:{a:'Ein Verbot stark verarbeiteter Nahrung.',b:'Einheitliche und leicht verständliche Informationen.',c:'Geringere Preise für herkömmliches Fleisch.'},answer:'b',why:'Mức độ chế biến, nguồn gốc và dinh dưỡng phải được trình bày dễ hiểu.'}
        ]
    },
    {
        id: 'lesen_t4_vier_tage',
        teil: 4,
        title: 'Vier Tage arbeiten – eine gute Idee?',
        topic: 'Arbeitswelt',
        suggestedMinutes: 12,
        targetWords: ['die Arbeitsmenge', 'die Leistungsfähigkeit steigern', 'erhöhter Aufwand in der Abstimmung', 'die Vereinbarkeit von Beruf und Familie', 'der Pendler', 'die Arbeitsbedingungen'],
        instruction: 'Sie lesen Meinungsäußerungen zur Vier-Tage-Woche. Welche Äußerung a bis h passt zu welcher Überschrift 22 bis 27? Eine Äußerung passt nicht. Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden.',
        opinions: [
            {id:'a',text:'Für Eltern kann ein zusätzlicher freier Tag die Vereinbarkeit von Beruf und Familie deutlich verbessern. Termine, Einkäufe und gemeinsame Zeit müssen dann nicht vollständig ins Wochenende gedrängt werden.'},
            {id:'b',text:'Unser Versuch war erfolgreich, weil wir vorher unnötige Besprechungen gestrichen haben. Weniger Sitzungen und klarere Zuständigkeiten halfen uns, die Leistungsfähigkeit zu steigern, ohne länger zu arbeiten.'},
            {id:'c',text:'Ich würde gern nur vier Tage arbeiten, könnte aber auf zwanzig Prozent meines Gehalts nicht verzichten. Solange nicht klar ist, ob der Lohn gleich bleibt, ist das Modell für mich keine echte Option.'},
            {id:'d',text:'Unsere Kunden erwarten von Montag bis Freitag Unterstützung. Eine Vier-Tage-Woche funktioniert daher nur, wenn Teams ihre freien Tage unterschiedlich legen. Das verursacht einen erhöhten Aufwand in der Abstimmung.'},
            {id:'e',text:'In der Pflege lässt sich die Arbeit nicht einfach auf einen Tag weniger verteilen. Patienten brauchen weiterhin Versorgung. Ohne zusätzliches Personal würden sich die Arbeitsbedingungen der Beschäftigten sogar verschlechtern.'},
            {id:'f',text:'Für Pendler bedeutet ein Arbeitstag weniger auch eine Fahrt weniger. Das spart Zeit, Geld und Emissionen. Besonders auf langen Strecken ist dieser Nebeneffekt keineswegs unbedeutend.'},
            {id:'g',text:'Unternehmen sollten das Modell zunächst einige Monate testen und Daten sammeln. Erst dann lässt sich beurteilen, ob es zur jeweiligen Branche und zum Team passt. Eine sofortige dauerhafte Umstellung wäre voreilig.'},
            {id:'h',text:'Wenn dieselbe Arbeitsmenge nur in vier Tage gepresst wird, entsteht kein freier Tag, sondern vier extrem lange und anstrengende Tage. Entscheidend ist deshalb, Aufgaben tatsächlich zu reduzieren.'}
        ],
        example:{text:'Mehr Zeit für Kinder und private Aufgaben',answer:'a'},
        questions: [
            {number:22,text:'Effizienter durch weniger Besprechungen',answer:'b',why:'Ý b giảm số cuộc họp và làm rõ trách nhiệm để tăng hiệu quả.'},
            {number:23,text:'Erreichbarkeit erfordert versetzte freie Tage',answer:'d',why:'Ý d yêu cầu các nhóm nghỉ khác ngày để vẫn phục vụ khách hàng.'},
            {number:24,text:'Nicht in jedem Beruf ohne zusätzliche Kräfte möglich',answer:'e',why:'Ý e nhấn mạnh ngành chăm sóc vẫn phải phục vụ liên tục.'},
            {number:25,text:'Auch der Arbeitsweg spielt eine Rolle',answer:'f',why:'Ý f nói về việc giảm một chuyến đi làm mỗi tuần.'},
            {number:26,text:'Vor einer endgültigen Entscheidung erst ausprobieren',answer:'g',why:'Ý g đề nghị thử nghiệm có thời hạn trước khi áp dụng lâu dài.'},
            {number:27,text:'Gleiche Aufgaben in kürzerer Zeit erhöhen die Belastung',answer:'h',why:'Ý h cảnh báo việc nhồi nguyên khối lượng công việc vào bốn ngày.'}
        ]
    },
    {
        id: 'lesen_t4_ehrenamt',
        teil: 4,
        title: 'Warum sich Menschen engagieren',
        topic: 'Gesellschaft & Ehrenamt',
        suggestedMinutes: 12,
        targetWords: ['das Engagement', 'ehrenamtlich', 'gemeinnützig', 'der Zusammenhalt', 'die Gleichgesinnten', 'Verantwortung für das eigene Handeln'],
        instruction: 'Sie lesen Meinungsäußerungen zum Ehrenamt. Welche Äußerung a bis h passt zu welcher Überschrift 22 bis 27? Eine Äußerung passt nicht. Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden.',
        opinions: [
            {id:'a',text:'Als ich neu in die Stadt zog, kannte ich niemanden. Im gemeinnützigen Gartenprojekt traf ich schnell Gleichgesinnte. Aus dem gemeinsamen Engagement sind echte Freundschaften entstanden.'},
            {id:'b',text:'Viele Vereine verbringen zu viel Zeit mit Formularen, Anträgen und Abrechnungen. Wer ehrenamtlich helfen will, sollte nicht zuerst einen Kurs in Verwaltung benötigen. Weniger Bürokratie würde deutlich mehr Menschen motivieren.'},
            {id:'c',text:'Neben Beruf und Familie bleibt mir kaum planbare Freizeit. Ich unterstütze Aktionen gern, aber eine feste Aufgabe an jedem Mittwoch kann ich nicht übernehmen. Dieses schlechte Gewissen hält mich eher vom Engagement ab.'},
            {id:'d',text:'In unserem Viertel fehlte ein sicherer Weg zur Schule. Erst nachdem Eltern Daten gesammelt, Gespräche organisiert und öffentlich Druck gemacht hatten, änderte die Stadt die Verkehrsführung. Lokales Engagement kann also sehr konkret etwas bewegen.'},
            {id:'e',text:'Bei Bewerbungen wird Ehrenamt oft positiv bewertet. Das ist verständlich, denn man lernt dabei Organisation, Kommunikation und Verantwortung für das eigene Handeln. Es sollte aber nicht nur als kostenloses Karrieretraining betrachtet werden.'},
            {id:'f',text:'Nicht jeder kann sich langfristig binden. Digitale Plattformen vermitteln inzwischen kleine Aufgaben, die nur eine Stunde dauern. Solche flexiblen Formen senken die Hürde und erreichen Menschen, die klassische Vereine kaum ansprechen.'},
            {id:'g',text:'Bürger dürfen nicht jede soziale Aufgabe übernehmen, während der Staat sich zurückzieht. Ehrenamt kann professionelle Angebote ergänzen, aber niemals ausreichende Finanzierung und qualifiziertes Personal ersetzen.'},
            {id:'h',text:'Regelmäßige gemeinsame Aktivitäten stärken den Zusammenhalt. Gerade ältere Menschen erleben dadurch, dass ihre Erfahrung gebraucht wird, und sind weniger allein. Davon profitiert nicht nur der Einzelne, sondern das ganze Wohngebiet.'}
        ],
        example:{text:'Durch gemeinsame Interessen neue Kontakte finden',answer:'a'},
        questions: [
            {number:22,text:'Verwaltung erschwert freiwillige Arbeit',answer:'b',why:'Ý b xem biểu mẫu và thanh quyết toán là rào cản của tình nguyện viên.'},
            {number:23,text:'Engagement kann unmittelbar die Umgebung verändern',answer:'d',why:'Trong ý d, sáng kiến của phụ huynh đã làm thành phố đổi cách tổ chức giao thông.'},
            {number:24,text:'Nebenbei entstehen beruflich nützliche Kompetenzen',answer:'e',why:'Ý e nêu kỹ năng tổ chức và giao tiếp có ích khi xin việc.'},
            {number:25,text:'Kurze flexible Einsätze erreichen weitere Gruppen',answer:'f',why:'Ý f nói về các nhiệm vụ ngắn, linh hoạt và không cần cam kết dài hạn.'},
            {number:26,text:'Freiwillige dürfen staatliche Leistungen nicht ersetzen',answer:'g',why:'Ý g nhấn mạnh rõ trách nhiệm không thể thoái thác của nhà nước.'},
            {number:27,text:'Gemeinsame Aufgaben wirken gegen Einsamkeit',answer:'h',why:'Ý h cho thấy hoạt động chung đều đặn đặc biệt giúp người cao tuổi bớt cô đơn.'}
        ]
    },
    {
        id: 'lesen_t5_bibliothek',
        teil: 5,
        title: 'Benutzungsordnung der Stadtbibliothek',
        topic: 'Regeln & Bildung',
        suggestedMinutes: 6,
        targetWords: ['eingeschrieben sein', 'vorbestellen', 'abgelaufen', 'die Aufbewahrung', 'buchungspflichtig', 'der Zugriff'],
        instruction: 'Sie möchten die Stadtbibliothek nutzen und lesen die Benutzungsordnung. Welche Überschriften a bis h passen zu den Paragraphen 28 bis 30? Vier Überschriften werden nicht gebraucht.',
        headings: [
            {id:'a',text:'Anmeldung und Bibliotheksausweis'},
            {id:'b',text:'Leihfristen und Verlängerung'},
            {id:'c',text:'Verlust des Ausweises'},
            {id:'d',text:'Digitale Medien'},
            {id:'e',text:'Verhalten in den Räumen'},
            {id:'f',text:'Schließfächer und Aufbewahrung'},
            {id:'g',text:'Arbeits- und Gruppenräume'},
            {id:'h',text:'Gebühren für Kopien'}
        ],
        example:{text:'Der Zugang zu E-Books und Datenbanken ist mit einem gültigen Ausweis auch außerhalb der Bibliothek möglich. Nach Ablauf der Mitgliedschaft wird der Zugriff automatisch gesperrt.',answer:'d'},
        sections: [
            {number:28,text:'Zur Anmeldung ist ein gültiger Personalausweis oder Reisepass vorzulegen. Studierende, die an einer örtlichen Hochschule eingeschrieben sind, erhalten gegen Vorlage ihrer Studienbescheinigung eine Ermäßigung. Änderungen der Adresse müssen der Bibliothek mitgeteilt werden.'},
            {number:29,text:'Bücher können in der Regel vier Wochen ausgeliehen werden. Eine Verlängerung ist möglich, sofern das Medium nicht von einer anderen Person vorbestellt wurde und die maximale Leihdauer noch nicht erreicht ist. Nach Ablauf der Frist entstehen Säumnisgebühren.'},
            {number:30,text:'Einzelarbeitsplätze können ohne Anmeldung genutzt werden. Gruppenräume sind dagegen buchungspflichtig und höchstens zwei Stunden pro Tag reservierbar. Wird ein reservierter Raum nicht innerhalb von fünfzehn Minuten belegt, darf er weitergegeben werden.'}
        ],
        questions: [
            {number:28,text:'§ 28',answer:'a',why:'Đoạn này quy định giấy tờ, giảm phí và thông tin khi đăng ký.'},
            {number:29,text:'§ 29',answer:'b',why:'Nội dung là thời hạn mượn, gia hạn, đặt trước và trả muộn.'},
            {number:30,text:'§ 30',answer:'g',why:'Đoạn này mô tả cách dùng và đặt trước phòng làm việc.'}
        ]
    },
    {
        id: 'lesen_t5_homeoffice_regeln',
        teil: 5,
        title: 'Betriebsvereinbarung zum mobilen Arbeiten',
        topic: 'Regeln & Beruf',
        suggestedMinutes: 6,
        targetWords: ['die Räumlichkeiten', 'personenbezogene Daten', 'der Zugriff', 'sensible Daten', 'die Gleitzeit', 'etwas freischalten lassen'],
        instruction: 'Sie arbeiten in einem Unternehmen und lesen die Regeln zum mobilen Arbeiten. Welche Überschriften a bis h passen zu den Paragraphen 28 bis 30? Vier Überschriften werden nicht gebraucht.',
        headings: [
            {id:'a',text:'Genehmigung und Voraussetzungen'},
            {id:'b',text:'Datenschutz und vertrauliche Unterlagen'},
            {id:'c',text:'Arbeitszeit und Erreichbarkeit'},
            {id:'d',text:'Gesundheit am Arbeitsplatz'},
            {id:'e',text:'Kosten und technische Ausstattung'},
            {id:'f',text:'Unfälle während der Arbeit'},
            {id:'g',text:'Beendigung der Vereinbarung'},
            {id:'h',text:'Nutzung privater Geräte'}
        ],
        example:{text:'Personenbezogene Daten dürfen nicht von Familienmitgliedern eingesehen werden. Ausdrucke mit sensiblen Daten sind in verschlossenen Behältern aufzubewahren und im Betrieb zu vernichten.',answer:'b'},
        sections: [
            {number:28,text:'Mobiles Arbeiten muss vor Beginn schriftlich mit der zuständigen Führungskraft vereinbart werden. Voraussetzung ist, dass die Aufgaben ohne Beeinträchtigung des Betriebs außerhalb der betrieblichen Räumlichkeiten erledigt werden können. Ein automatischer Anspruch besteht nicht.'},
            {number:29,text:'Es gelten die betriebliche Gleitzeit und die gesetzlichen Ruhezeiten. Beschäftigte müssen während der gemeinsam festgelegten Kernzeit erreichbar sein. Außerhalb dieser Zeit besteht keine Pflicht, Nachrichten sofort zu beantworten.'},
            {number:30,text:'Das Unternehmen stellt Laptop, Netzteil und notwendige Software bereit. Zusätzliche Programme müssen von der IT freigeschaltet werden. Laufende private Kosten für Strom oder Internet werden nicht erstattet, sofern keine abweichende Einzelvereinbarung besteht.'}
        ],
        questions: [
            {number:28,text:'§ 28',answer:'a',why:'Đoạn này quy định việc phê duyệt và các điều kiện cần thiết.'},
            {number:29,text:'§ 29',answer:'c',why:'Nội dung là giờ linh hoạt, thời gian nghỉ và khả năng liên lạc.'},
            {number:30,text:'§ 30',answer:'e',why:'Đoạn này nói về thiết bị, quyền cài phần mềm và hoàn chi phí.'}
        ]
    }
];


// Original Kapi practice pack · 2026-11-21 · one task per Teil.
LESEN_B2_TASKS.push(...[
    {
        "id": "lesen_t1_nachbarschaft_20261121",
        "teil": 1,
        "title": "Wie viel Nähe tut der Nachbarschaft gut?",
        "topic": "Wohnen & Nachbarschaft",
        "suggestedMinutes": 18,
        "targetWords": [
            "Rücksicht nehmen",
            "sich absprechen",
            "die Privatsphäre",
            "sich verpflichtet fühlen",
            "der Zusammenhalt",
            "verbindlich"
        ],
        "instruction": "Sie lesen in einem Forum Beiträge über das Zusammenleben im Wohnhaus. Auf welche der vier Personen treffen die Aussagen 1 bis 9 zu? Die Personen können mehrmals gewählt werden. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 1,
                "text": "Wer hat seine Einstellung zu formellen Absprachen geändert?",
                "answer": "c",
                "why": "Eva trước đây phản đối quy định, sau trải nghiệm lại coi thỏa thuận rõ ràng là nền tảng tin cậy. Không nhầm với Lena: cô điều chỉnh việc tiếp khách, không thay đổi quan điểm về quy tắc nói chung."
            },
            {
                "number": 2,
                "text": "Wer hält einen Kommunikationsweg trotz seiner Nachteile für erhaltenswert?",
                "answer": "b",
                "why": "Tarek thừa nhận nhóm có tranh cãi nhưng không muốn bỏ vì tiện cho thông tin thực tế. trotzdem báo hiệu sự nhượng bộ."
            },
            {
                "number": 3,
                "text": "Wer möchte vermeiden, dass Hilfe zur einzigen Grundlage der Versorgung wird?",
                "answer": "d",
                "why": "Martin giữ dịch vụ trả phí: giúp đỡ tự nguyện chỉ bổ sung, không thay cách tổ chức ổn định. Câu không hỏi ai phản đối việc giúp hàng xóm."
            },
            {
                "number": 4,
                "text": "Wer erlebte, dass eine eigene Initiative als Verpflichtung verstanden wurde?",
                "answer": "a",
                "why": "Lena tự đề xuất buổi nấu ăn nhưng sau đó bị mặc định luôn làm chủ nhà. eigene Initiative ↔ selbst vorgeschlagen; Verpflichtung ↔ dauerhafte Zusage."
            },
            {
                "number": 5,
                "text": "Wer unterscheidet zwischen sachlichen Mitteilungen und der Klärung persönlicher Konflikte?",
                "answer": "b",
                "why": "Tarek dùng nhóm cho cửa hỏng và kiện hàng, nhưng yêu cầu nói trực tiếp khi có trách móc. Không phải từ bỏ hoàn toàn công cụ số."
            },
            {
                "number": 6,
                "text": "Wer berichtet, dass eindeutige Regeln den persönlichen Kontakt sogar verbessert haben?",
                "answer": "c",
                "why": "Eva nói ít cãi nhau hơn nên còn thời gian trò chuyện. Bẫy là đoán quy tắc sẽ làm quan hệ xa cách: đó chỉ là nỗi lo cũ đã bị bác bỏ."
            },
            {
                "number": 7,
                "text": "Wer legt Wert darauf, dass jemand trotz Unterstützungsbedarf selbst etwas beiträgt?",
                "answer": "d",
                "why": "Bố Martin cần giúp đỡ nhưng vẫn tưới cây cho hàng xóm. Người nhận hỗ trợ cũng có năng lực đóng góp, không chỉ là người được chăm lo."
            },
            {
                "number": 8,
                "text": "Wer will eine gemeinsame Aktivität fortsetzen, ohne regelmäßig teilnehmen zu müssen?",
                "answer": "a",
                "why": "Lena vẫn coi trọng buổi nấu ăn nhưng muốn được vắng mặt mà không giải thích. Không phải cô muốn chấm dứt hoạt động."
            },
            {
                "number": 9,
                "text": "Wer begrenzt bewusst die Zeiten, in denen er Nachrichten wahrnimmt?",
                "answer": "b",
                "why": "Tarek chỉ đọc buổi tối và tắt thông báo; đây là giới hạn tiếp nhận, không phải hạn chế quyền đăng tin của người khác."
            }
        ],
        "people": [
            {
                "id": "a",
                "text": "Als ich vor zwei Jahren hier einzog, wollte ich endlich in einem Haus wohnen, in dem man einander kennt. Deshalb habe ich selbst einen monatlichen Kochabend vorgeschlagen und anfangs jedes Mal meine Küche zur Verfügung gestellt. Mit der Zeit wurde daraus jedoch eine feste Erwartung: Wenn ich absagte, musste ich mich beinahe rechtfertigen. Einige verwechselten meine Begeisterung offenbar mit einer dauerhaften Zusage. Inzwischen wechseln wir uns als Gastgeber ab, und niemand muss begründen, warum er einmal fehlt. Die Abende sind mir nach wie vor wichtig; nur möchte ich mich nicht zur Geselligkeit verpflichtet fühlen. Dass man sich im selben Haus wohlfühlt, heißt schließlich nicht, dass man seine gesamte Freizeit miteinander verbringen muss.",
                "name": "Lena, Bremen"
            },
            {
                "id": "b",
                "text": "Unsere Hausgruppe auf dem Handy hat einen schlechten Ruf, weil dort manchmal über abgestellte Fahrräder gestritten wird. Trotzdem möchte ich sie nicht abschaffen, denn für eine defekte Haustür oder ein verlorenes Paket ist sie ausgesprochen praktisch. Was mich stört, ist die Annahme, dass jede Nachricht sofort beantwortet werden müsse. Ich lese die Beiträge deshalb nur abends und habe die Benachrichtigungen ausgeschaltet. Eine Nachbarin kümmert sich außerdem darum, wichtige Hinweise im Eingangsbereich auszuhängen, damit auch Menschen ohne Smartphone informiert bleiben. Bei persönlichen Vorwürfen hilft dagegen kein weiterer Kommentar in der Gruppe: Darüber sollten die Beteiligten direkt miteinander sprechen. Ein digitales Werkzeug kann Absprachen erleichtern, aber ein schwieriges Gespräch nimmt es uns nicht ab.",
                "name": "Tarek, Köln"
            },
            {
                "id": "c",
                "text": "Ich fand lange, gute Nachbarn müssten sich auch ohne Listen und Vorschriften verständigen können. Als wir gemeinsam ein Lastenrad anschafften, genügte deshalb zunächst eine kurze Nachricht, wenn jemand es brauchte. Doch ausgerechnet an den Wochenenden, an denen viele einkaufen wollten, fühlten sich mehrere Personen gleichzeitig im Recht. Seit wir verbindliche Zeitfenster buchen und Verspätungen melden, gibt es erheblich weniger Ärger. Meine frühere Sorge, dadurch würde der Umgang unpersönlicher, hat sich nicht bestätigt. Im Gegenteil: Weil niemand mehr über eine vermeintliche Bevorzugung diskutieren muss, bleibt beim Zurückbringen Zeit für ein freundliches Gespräch. Vertrauen entsteht für mich inzwischen nicht dadurch, dass alles offenbleibt, sondern dadurch, dass sich alle auf dieselben Vereinbarungen verlassen können.",
                "name": "Eva, Dresden"
            },
            {
                "id": "d",
                "text": "Seit mein Vater schlechter gehen kann, weiß ich spontane Hilfsangebote in unserem Haus besonders zu schätzen. Eine Nachbarin bringt gelegentlich Einkäufe mit, ein anderer Bewohner trägt schwere Pakete nach oben. Das erleichtert unseren Alltag, lässt sich aber nicht für jede Woche fest einplanen. Deshalb bleibt der bezahlte Lieferdienst bestehen, obwohl manche meinen, auf diese Ausgabe könnten wir nun verzichten. Gegenseitige Unterstützung soll ergänzen, was zuverlässig organisiert werden muss, und nicht stillschweigend an dessen Stelle treten. Auch ein Dankeschön darf nicht bedeuten, dass beim nächsten Mal automatisch wieder Hilfe erwartet wird. Mein Vater möchte sich außerdem nach seinen Möglichkeiten beteiligen und gießt im Urlaub die Pflanzen der anderen. So bleibt er ein Nachbar mit eigenen Fähigkeiten und wird nicht nur als jemand wahrgenommen, um den man sich kümmern muss.",
                "name": "Martin, Bonn"
            }
        ]
    },
    {
        "id": "lesen_t2_leihladen_20261121",
        "teil": 2,
        "title": "Leihen braucht mehr als ein Regal",
        "topic": "Alltag & gemeinschaftlicher Konsum",
        "suggestedMinutes": 12,
        "targetWords": [
            "zur Verfügung stehen",
            "die Anschaffung",
            "der Aufwand",
            "in Anspruch nehmen",
            "auf Dauer",
            "sich lohnen"
        ],
        "instruction": "Sie lesen einen Zeitschriftenartikel über einen Leihladen. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 10,
                "text": "Lücke 10",
                "answer": "f",
                "why": "f cụ thể hóa khoảng cách cung–cầu: nhiều máy bánh, ít vali. Diese ở câu tiếp theo chỉ Reisekoffer; không thể nối với một lựa chọn chỉ nói chung về thiết bị."
            },
            {
                "number": 11,
                "text": "Lücke 11",
                "answer": "g",
                "why": "g bổ sung bước kiểm tra và xác nhận riêng. Erst diese Bestätigung ở sau nối chính xác với persönliche Zusage; h nói được nhận ngay, trái điều kiện chưa chắc chắn ở trước."
            },
            {
                "number": 12,
                "text": "Lücke 12",
                "answer": "e",
                "why": "e đưa ra các buổi hướng dẫn cho nhóm sợ dùng sai. Dort ở sau trỏ về Einführungstermine, rồi giải thích họ được thử có hướng dẫn. Không phải thay hướng dẫn giấy bằng bán đồ."
            },
            {
                "number": 13,
                "text": "Lücke 13",
                "answer": "a",
                "why": "a giải quyết khoản mặt bằng chưa được phí bao phủ. diese Unterstützung ở sau là thành phố trả tiền thuê; không phải tăng phí ngay hoặc thành phố vận hành cửa hàng."
            },
            {
                "number": 14,
                "text": "Lücke 14",
                "answer": "c",
                "why": "c đưa vào khảo sát để đo việc bỏ mua mới. In dieser ở sau là Befragung giống cái; nội dung khảo sát trả lời trực tiếp câu hỏi ở trước."
            },
            {
                "number": 15,
                "text": "Lücke 15",
                "answer": "b",
                "why": "b giải thích tại sao thử sở thích mới vẫn có giá trị dù không làm giảm mua sắm. Đoạn kết phân biệt hai lợi ích; d nói về đặt trước qua điện thoại, không nối với lập luận về giá trị của việc khám phá sở thích mới."
            }
        ],
        "segments": [
            "Eine Bohrmaschine ist nützlich, steht in vielen Wohnungen aber die meiste Zeit unbenutzt im Schrank. Ähnlich sieht es mit Waffeleisen oder großen Reisekoffern aus, deren Anschaffung sich für wenige Einsätze kaum lohnt. Eine Stadtteilinitiative eröffnete deshalb einen Laden, in dem solche Gegenstände gegen einen kleinen Jahresbeitrag ausgeliehen werden können. Die Idee fand sofort Zustimmung, und schon vor der Eröffnung wurden zahlreiche gebrauchte Geräte gespendet. Bei der ersten Bestandsaufnahme zeigte sich allerdings eine überraschende Lücke zwischen Angebot und tatsächlichem Bedarf.",
            "Diese fehlten ausgerechnet in den Schulferien, als besonders viele Familien gleichzeitig verreisen wollten. Das Team entschied daher, künftig nicht mehr jede Spende anzunehmen, sondern gezielt nach häufig nachgefragten Dingen zu suchen. Inzwischen zeigt ein Onlinekatalog, welche Gegenstände vorhanden sind und wann sie zur Verfügung stehen. Eine Reservierung darin bedeutet jedoch noch nicht, dass der Gegenstand für den gewünschten Termin sicher zugesagt ist.",
            "Erst diese Bestätigung ist verbindlich; eine automatisch versandte Eingangsbestätigung reicht dafür nicht aus. So lässt sich vermeiden, dass jemand umsonst zum Laden kommt, weil ein Gerät noch geprüft oder verspätet zurückgegeben wird. Nach den ersten Monaten bemerkten die Freiwilligen außerdem, dass eine ausführliche Anleitung nicht in jedem Fall genügt. Manche Interessierte verzichteten auf eine Ausleihe, weil sie befürchteten, bei einem unbekannten Gerät etwas falsch zu machen.",
            "Dort können sie unter Anleitung ausprobieren, wie sich das Gerät bedienen lässt, ohne es gleich mit nach Hause nehmen zu müssen. Dieses Angebot wird gut angenommen, bindet aber Personal, das währenddessen keine Rückgaben bearbeiten kann. Auch die Kontrolle, Reinigung und Reparatur der Geräte erweist sich als aufwendiger, als zunächst vermutet wurde. Der Jahresbeitrag deckt zwar Verschleißteile ab, nicht jedoch die laufenden Ausgaben für die Räume.",
            "Ohne diese Unterstützung müsste der Beitrag deutlich steigen, was gerade Haushalte mit wenig Geld ausschließen könnte. Die Stadt verlangt dafür einen jährlichen Bericht über die Nutzung, schreibt aber keine Mindestzahl an Ausleihen vor. Für das Team zählt ohnehin nicht allein, wie oft etwas über den Tresen geht. Es möchte auch wissen, ob die Mitglieder dank des Angebots tatsächlich auf einen eigenen Kauf verzichten.",
            "In dieser geben die Mitglieder an, ob sie den geliehenen Gegenstand sonst gekauft, anderswo gemietet oder gar nicht benutzt hätten. Die ersten Antworten machen deutlich, warum eine hohe Zahl von Ausleihen nicht automatisch für einen ebenso großen Rückgang des Konsums steht. Einige Mitglieder probieren mit geliehenen Geräten lediglich neue Hobbys aus, für die sie vorher nichts angeschafft hätten. Daraus folgt für die Initiative allerdings nicht, dass solche Ausleihen unerwünscht wären.",
            "Entscheidend ist für sie vielmehr, unterschiedliche Wirkungen nicht miteinander zu verwechseln. Gemeinsame Nutzung kann neue Möglichkeiten eröffnen und zugleich Anschaffungen ersetzen, aber beides lässt sich nicht mit derselben Zahl belegen. Auf Dauer soll der Laden deshalb weder möglichst viele Geräte sammeln noch möglichst viele Vorgänge verbuchen. Er soll verlässlich das bereitstellen, was im Viertel gebraucht wird."
        ],
        "options": [
            {
                "id": "a",
                "text": "Die Stadt übernimmt deshalb vorerst die Miete, während der Verein den Betrieb organisiert."
            },
            {
                "id": "b",
                "text": "Gerade das Entdecken einer Tätigkeit kann schließlich ebenfalls einen Wert haben."
            },
            {
                "id": "c",
                "text": "Um das herauszufinden, führt es seit Kurzem eine kurze Befragung nach der Rückgabe durch."
            },
            {
                "id": "d",
                "text": "Für diese Gruppe wird nun eine zusätzliche telefonische Reservierung eingerichtet."
            },
            {
                "id": "e",
                "text": "Für diese Gruppe werden nun regelmäßig offene Einführungstermine angeboten."
            },
            {
                "id": "f",
                "text": "Mehrere Waffeleisen waren vorhanden, geeignete Reisekoffer dagegen kaum."
            },
            {
                "id": "g",
                "text": "Erst wenn eine Mitarbeiterin die Verfügbarkeit geprüft hat, erhalten die Mitglieder eine persönliche Zusage."
            },
            {
                "id": "h",
                "text": "Seitdem lässt sich jedes Gerät ohne weitere Rückmeldung sofort abholen."
            }
        ]
    },
    {
        "id": "lesen_t3_termine_20261121",
        "teil": 3,
        "title": "Warum wir vereinbarte Termine verpassen",
        "topic": "Alltag & Organisation",
        "suggestedMinutes": 12,
        "targetWords": [
            "einen Termin vereinbaren",
            "kurzfristig absagen",
            "in Anspruch nehmen",
            "verbindlich",
            "der Aufwand",
            "zur Verfügung stehen"
        ],
        "instruction": "Sie lesen einen Zeitungsartikel über nicht wahrgenommene Termine. Wählen Sie bei den Aufgaben 16 bis 21 jeweils die richtige Lösung a, b oder c. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 16,
                "text": "Was folgert die Beratungsstelle aus den Rückmeldungen?",
                "answer": "b",
                "why": "b tổng hợp các nguyên nhân khác nhau nên cần cách xử lý khác nhau. a biến một nguyên nhân thành nguyên nhân chính; c trái câu vẫn giữ trách nhiệm của người đặt hẹn.",
                "options": {
                    "a": "Die meisten Ausfälle beruhen auf zu früh vereinbarten Terminen.",
                    "b": "Unterschiedliche Ursachen erfordern mehr als eine einheitliche Reaktion.",
                    "c": "Bei organisatorischen Hindernissen entfällt die Verantwortung der Kundschaft."
                }
            },
            {
                "number": 17,
                "text": "Warum bewertet das Team die gestiegene Zahl der Absagen positiv?",
                "answer": "a",
                "why": "a diễn đạt lại việc chỗ trống được trả sớm cho người khác. b nhầm báo hủy với nhu cầu giảm, đã bị bài bác bỏ; c nhầm tác dụng của link hủy với tác dụng nhắc nhớ.",
                "options": {
                    "a": "Nicht benötigte Zeiten lassen sich rechtzeitig neu vergeben.",
                    "b": "Der Bedarf an Beratung ist dadurch insgesamt zurückgegangen.",
                    "c": "Die Kundschaft erinnert sich seitdem zuverlässiger an die Uhrzeit."
                }
            },
            {
                "number": 18,
                "text": "Wovon sollte der Einsatz einer Ausfallgebühr laut Artikel abhängen?",
                "answer": "c",
                "why": "c nêu tiêu chí tác giả kết luận: mục đích và nhóm đối tượng. Thiệt hại kinh tế ở a được thừa nhận nhưng không phải tiêu chí duy nhất. b nhắc sự thuận tiện đặt hẹn, không phải căn cứ đánh giá phí trong đoạn.",
                "options": {
                    "a": "Ausschließlich von der Höhe des entgangenen Umsatzes.",
                    "b": "Davon, ob sämtliche Termine online gebucht werden können.",
                    "c": "Von der Aufgabe des Angebots und der Situation seiner Zielgruppe."
                }
            },
            {
                "number": 19,
                "text": "Welches Risiko sieht der Artikel bei der sofortigen Vergabe freier Termine?",
                "answer": "b",
                "why": "b là chênh lệch cơ hội do không được dùng điện thoại trong giờ làm. a đảo ngược quan hệ tốc độ–nhu cầu; c là suy luận không có trong bài, vì không nói thời gian tư vấn bị rút ngắn.",
                "options": {
                    "a": "Menschen mit dem dringendsten Bedarf antworten häufig zu schnell.",
                    "b": "Beruflich bedingte Erreichbarkeit beeinflusst die Chance auf einen Platz.",
                    "c": "Kurzfristig benachrichtigte Personen erhalten eine kürzere Beratung."
                }
            },
            {
                "number": 20,
                "text": "Was bezweckt die Beratungsstelle mit den telefonischen Rückfragen?",
                "answer": "c",
                "why": "c diễn đạt mục đích không dành hết lịch cho người phản hồi nhanh. a sai vì vẫn giữ kênh điện tử; b đảo nghĩa vì cách này tốn công hơn, không giảm hành chính.",
                "options": {
                    "a": "Sie will die digitale Warteliste schrittweise vollständig ersetzen.",
                    "b": "Sie will die Bearbeitung freier Termine mit weniger Personal erledigen.",
                    "c": "Sie will den Zugang weniger stark von einer schnellen Online-Reaktion abhängig machen."
                }
            },
            {
                "number": 21,
                "text": "Woran misst das Team letztlich den Erfolg seiner Maßnahmen?",
                "answer": "a",
                "why": "a giữ cả hai tiêu chí: hỗ trợ phù hợp nhanh hơn và chi phí tổ chức tương xứng. b là mục tiêu lấp kín lịch mà đoạn cuối bác bỏ; c đánh giá theo công cụ chứ không theo ích lợi thực tế.",
                "options": {
                    "a": "An besserem Zugang zu geeigneter Hilfe bei vertretbarem Aufwand.",
                    "b": "Daran, dass unabhängig vom Aufwand kein Termin mehr frei bleibt.",
                    "c": "Am Anteil der Buchungen, die ohne persönlichen Kontakt erfolgen."
                }
            }
        ],
        "article": [
            "Ein freier Stuhl im Friseursalon, ein ungenutzter Beratungstermin, ein Tisch, der im Restaurant leer bleibt: Wer ohne Absage nicht erscheint, hinterlässt mehr als eine Lücke im Kalender. Die reservierte Zeit steht anderen häufig nicht mehr zur Verfügung, obwohl diese gern gekommen wären. Schnell fällt dann das Urteil, die Kundschaft sei unzuverlässiger geworden. Mitarbeitende einer kommunalen Beratungsstelle wollten sich mit dieser Erklärung jedoch nicht zufriedengeben und fragten nach, warum vereinbarte Gespräche ausgefallen waren.",
            "Die Antworten waren unterschiedlich: Manche hatten die Uhrzeit verwechselt, andere mussten kurzfristig ein krankes Kind betreuen. Eine dritte Gruppe hatte durchaus versucht abzusagen, war am Telefon aber nicht durchgekommen. Gerade bei Terminen, die mehrere Wochen im Voraus vereinbart worden waren, hatte sich zudem die persönliche Situation verändert. Nicht hinter jedem leeren Stuhl stand also dieselbe Haltung, und entsprechend wenig versprach eine einzige Maßnahme für alle Fälle. Das entbindet niemanden von seiner Verantwortung, verschiebt aber den Blick auf die Bedingungen, unter denen eine Absage möglich ist.",
            "Die Beratungsstelle versandte zunächst Erinnerungen am Vorabend. Dadurch wurden tatsächlich weniger Termine vergessen; die Zahl der rechtzeitig freigegebenen Plätze stieg jedoch kaum. Wer schon wusste, dass er nicht kommen konnte, musste weiterhin während der Sprechzeiten anrufen. Erst ein zusätzlicher Link, über den sich ein Termin mit wenigen Schritten stornieren ließ, führte zu mehr Absagen. Diese Zunahme war kein Zeichen schwindenden Interesses: Die Plätze konnten nun früher anderen angeboten werden.",
            "Besonders gefragt sind in der Debatte Gebühren für versäumte Termine. Für einen kleinen Betrieb kann ein Ausfall wirtschaftlich schwer wiegen, weshalb ein finanzieller Anreiz zur rechtzeitigen Absage nachvollziehbar ist. Bei einer sozialen Beratungsstelle kann die Aussicht auf eine Gebühr jedoch auch Menschen abschrecken, die ihre Lage ohnehin kaum überblicken. Sie buchen dann womöglich gar keinen Termin mehr, obwohl sie Unterstützung benötigen. Ob eine Gebühr sinnvoll ist, lässt sich daher nicht unabhängig davon beurteilen, welchen Zweck ein Angebot erfüllt und wen es erreichen soll.",
            "Auch digitale Wartelisten lösen das Problem nicht von allein. Wer auf einen frei gewordenen Platz sofort reagieren muss, ist im Vorteil, wenn er tagsüber sein Telefon benutzen darf. Eine Person an der Kasse oder in einer Werkhalle bemerkt dieselbe Nachricht möglicherweise erst in der Pause. Die Beratungsstelle reserviert deshalb einen Teil der frei gewordenen Zeiten für telefonische Rückfragen und verteilt nicht alles nach dem Prinzip der schnellsten Antwort. Das ist aufwendiger, verhindert aber, dass technische Erreichbarkeit mit tatsächlichem Bedarf verwechselt wird.",
            "Am Ende zählt für das Team weder die Zahl verschickter Erinnerungen noch die möglichst vollständige Besetzung jedes einzelnen Zeitfensters. Es prüft, ob Ratsuchende schneller passende Unterstützung erhalten und ob der zusätzliche Verwaltungsaufwand in einem vernünftigen Verhältnis dazu steht. Ein Verfahren, das jede Lücke schließt, dafür aber persönliche Beratung verdrängt, wäre kein Fortschritt. Verbindlichkeit bleibt wichtig, doch sie lässt sich leichter erwarten, wenn Buchung, Änderung und Absage im Alltag tatsächlich funktionieren."
        ]
    },
    {
        "id": "lesen_t4_sonntag_20261121",
        "teil": 4,
        "title": "Soll die Bibliothek sonntags öffnen?",
        "topic": "Freizeit & öffentlicher Raum",
        "suggestedMinutes": 12,
        "targetWords": [
            "zur Verfügung stehen",
            "der Zugang",
            "auf etwas verzichten",
            "die Beratung",
            "die Verantwortung",
            "Rücksicht nehmen"
        ],
        "instruction": "Sie lesen Meinungsäußerungen zur Sonntagsöffnung einer Bibliothek. Welche Äußerung a bis h passt zu welcher Überschrift 22 bis 27? Eine Äußerung passt nicht. Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 22,
                "text": "Mehr als eine Ausleihstelle: ein Ort ohne Konsumzwang",
                "answer": "d",
                "why": "d nói đến đọc báo, gặp người và không cần gọi món. f cũng nói về tiếp cận, nhưng trọng tâm là rào cản thẻ và công nghệ, không phải không gian giao tiếp miễn phí."
            },
            {
                "number": 23,
                "text": "Erweiterter Betrieb braucht abgesicherte Arbeitsbedingungen",
                "answer": "c",
                "why": "c ủng hộ có điều kiện: thêm người và bù đắp ca cuối tuần. Không nhầm h: h muốn ưu tiên tiền cho sách, không đưa điều kiện nhân sự cho việc mở rộng."
            },
            {
                "number": 24,
                "text": "Technische Selbstbedienung darf niemanden ausschließen",
                "answer": "f",
                "why": "f tập trung vào người không thẻ hoặc không hiểu máy, rồi yêu cầu hướng dẫn. b cũng nhắc máy nhưng yêu cầu quảng cáo trung thực về giới hạn dịch vụ."
            },
            {
                "number": 25,
                "text": "Über die Grenzen des Angebots ehrlich informieren",
                "answer": "b",
                "why": "b không chủ yếu yêu cầu tăng dịch vụ mà yêu cầu nói rõ những việc chưa làm được Chủ nhật. Cụm weniger ... als nhấn mạnh sự chênh lệch giữa quảng cáo và thực tế."
            },
            {
                "number": 26,
                "text": "Mit Rücksicht auf Anwohnende zu einer tragfähigen Lösung",
                "answer": "g",
                "why": "g sẵn sàng ủng hộ nếu có giờ sự kiện và giới hạn loa. Không phải phản đối toàn bộ việc mở cửa hoặc chỉ nói giờ phù hợp với khách đọc."
            },
            {
                "number": 27,
                "text": "Erst Erfahrungen sammeln, dann über eine Ausweitung entscheiden",
                "answer": "e",
                "why": "e đề nghị thử ở một nơi nhiều tháng và đánh giá nhiều yếu tố. Số đông ở ngày đầu không đủ kết luận; h không đề nghị thử mà muốn dùng tiền cho kho sách."
            }
        ],
        "opinions": [
            {
                "id": "a",
                "text": "Wenn ich unter der Woche Feierabend habe, schließt unsere Bibliothek gerade. Am Samstag erledige ich die Einkäufe für meine Eltern, sodass auch dieser Tag selten infrage kommt. Ein paar Stunden am Sonntag würden mir ermöglichen, endlich in Ruhe durch die Regale zu gehen, statt immer nur schnell bestellte Bücher abzuholen. Dafür brauche ich kein großes Veranstaltungsprogramm, sondern schlicht eine offene Tür."
            },
            {
                "id": "b",
                "text": "Bei uns gibt es bereits Sonntagsöffnungen, allerdings ohne Fachpersonal. Wer weiß, was er sucht, kommt damit zurecht; für eine komplizierte Recherche reicht ein Automat dagegen nicht. Mich stört weniger die eingeschränkte Leistung als die Werbung, die einen ganz normalen Bibliothekstag verspricht. Man sollte deutlich sagen, was möglich ist und wofür man weiterhin werktags kommen muss."
            },
            {
                "id": "c",
                "text": "Unsere Beschäftigten unterstützen längere Öffnungszeiten grundsätzlich. Wenn dafür aber dieselben Menschen zusätzlich sonntags erscheinen sollen, ohne an anderer Stelle entlastet zu werden, geht die Rechnung nicht auf. Freiwillige können bei Veranstaltungen helfen, die fachliche Verantwortung übernehmen sie damit nicht. Vor einer Ausweitung müssen zusätzliche Stellen und ein verlässlicher Ausgleich für Wochenenddienste gesichert sein."
            },
            {
                "id": "d",
                "text": "In der Diskussion geht es ständig um Ausleihzahlen. Ich gehe jedoch oft in die Bibliothek, ohne etwas mitzunehmen, weil ich dort Zeitung lesen und anderen Menschen begegnen kann. Anders als im Café muss ich dafür nichts bestellen, und anders als zu Hause bin ich nicht allein. Gerade am Sonntag fehlt vielen ein solcher Ort, dessen Nutzen sich nicht an der Zahl ausgeliehener Bücher ablesen lässt."
            },
            {
                "id": "e",
                "text": "Ich würde eine Sonntagsöffnung zunächst in einem einzigen Haus erproben. Nach einigen Monaten könnte man die Nutzung, die Kosten und die Rückmeldungen der Beschäftigten vergleichen, bevor weitere Standorte folgen. Ein voll besetzter erster Sonntag beweist noch nicht, dass das Interesse dauerhaft anhält. Ebenso wenig sollte ein einzelner schwacher Tag schon das Ende bedeuten."
            },
            {
                "id": "f",
                "text": "Ein Zugang per Mitgliedskarte klingt unkompliziert, setzt aber voraus, dass man die Regeln und die Technik versteht. Wer noch keinen Ausweis hat oder sich am Terminal unsicher fühlt, bleibt sonst vor der Tür. Bevor die Bibliothek sonntags ohne Personal öffnet, sollte sie daher Einführungen anbieten und erklären, wie im Notfall Hilfe erreichbar ist. Längere Zeiten allein schaffen noch keinen Zugang für alle."
            },
            {
                "id": "g",
                "text": "Die Bibliothek plant am Sonntag Lesungen im Innenhof, direkt unter unseren Schlafzimmerfenstern. Ich möchte niemandem Bücher oder Begegnungen verbieten, aber auch wir brauchen einen ruhigen Tag. Für Veranstaltungen im Freien sollten deshalb feste Zeiten gelten, und Lautsprecher gehören nach drinnen. Mit solchen Absprachen könnte ich die Öffnung unterstützen, ohne auf jede Rücksichtnahme verzichten zu müssen."
            },
            {
                "id": "h",
                "text": "Ich sehe den größten Engpass im Medienetat, nicht bei den Öffnungszeiten. Auf gefragte Romane wartet man monatelang, und aktuelle Fachbücher fehlen oft ganz. Wenn zusätzliche Mittel vorhanden sind, würde ich damit lieber den Bestand erweitern, statt einen weiteren Öffnungstag zu finanzieren. Ein länger zugängliches Regal hilft wenig, wenn das benötigte Buch nicht darin steht."
            }
        ],
        "example": {
            "text": "Öffnungszeiten mit dem eigenen Alltag vereinbaren",
            "answer": "a"
        }
    },
    {
        "id": "lesen_t5_gemeinschaftsraum_20261121",
        "teil": 5,
        "title": "Nutzungsordnung für den Gemeinschaftsraum",
        "topic": "Wohnen & Regeln",
        "suggestedMinutes": 6,
        "targetWords": [
            "die Nutzung",
            "verbindlich",
            "schriftlich",
            "die Haftung",
            "die Aufbewahrung",
            "rechtzeitig"
        ],
        "instruction": "Sie möchten den Gemeinschaftsraum Ihrer Wohnanlage nutzen und lesen die Nutzungsordnung. Welche Überschriften a bis h passen zu den Paragraphen 28 bis 30? Vier Überschriften werden nicht gebraucht. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 28,
                "text": "§ 28",
                "answer": "b",
                "why": "Toàn đoạn quy định nộp đơn, xác nhận và thứ tự ưu tiên, nên chọn b. Nhắc Hausversammlungen không biến nó thành quy định nhóm người ở a; chưa bàn đổi hay hủy nên không chọn c."
            },
            {
                "number": 29,
                "text": "§ 29",
                "answer": "e",
                "why": "Trọng tâm là tình trạng phòng và thời hạn bàn giao sau khi dùng. Chi phí chỉ là chi tiết phụ và được quyết định riêng, nên g không bao quát đoạn. f nói giờ ra vào hoạt động, không phải trách nhiệm dọn trả phòng."
            },
            {
                "number": 30,
                "text": "§ 30",
                "answer": "c",
                "why": "Đoạn nói hủy và đổi lịch đã xác nhận, khác b là đăng ký ban đầu. Có khoản phí nhưng không phải bồi thường thiệt hại tài sản của g. Chú ý ngoại lệ es sei denn: được miễn nếu phòng được giao lại đúng khung giờ."
            }
        ],
        "headings": [
            {
                "id": "a",
                "text": "Zulässiger Personenkreis und Veranstaltungszweck"
            },
            {
                "id": "b",
                "text": "Reservierungsverfahren und Verbindlichkeit"
            },
            {
                "id": "c",
                "text": "Nachträgliche Änderung und Absage einer Buchung"
            },
            {
                "id": "d",
                "text": "Lagerung privater Gegenstände"
            },
            {
                "id": "e",
                "text": "Reinigung und Rückgabe nach der Nutzung"
            },
            {
                "id": "f",
                "text": "Zutrittszeiten und Rücksichtnahme im Betrieb"
            },
            {
                "id": "g",
                "text": "Kostenübernahme bei verursachten Schäden"
            },
            {
                "id": "h",
                "text": "Ausgabe und Aufbewahrung der Schlüssel"
            }
        ],
        "example": {
            "answer": "a",
            "text": "Der Gemeinschaftsraum steht volljährigen Bewohnerinnen und Bewohnern der Wohnanlage für private, nicht gewerbliche Veranstaltungen zur Verfügung. Externe Gäste dürfen eingeladen werden, sofern eine berechtigte Person die Verantwortung für die Veranstaltung übernimmt. Eine Überlassung an Dritte zur eigenständigen Nutzung ist ausgeschlossen."
        },
        "sections": [
            {
                "number": 28,
                "text": "Nutzungswünsche sind spätestens sieben Kalendertage vor dem vorgesehenen Termin über das Verwaltungsportal einzureichen. Die automatische Nachricht über den Eingang des Antrags stellt noch keine Zusage dar. Eine Buchung kommt erst mit der schriftlichen Bestätigung durch die Verwaltung zustande. Gehen mehrere Anträge für denselben Zeitraum ein, ist der Zeitpunkt des vollständigen Antrags maßgeblich. Regelmäßig stattfindende Hausversammlungen sind hiervon ausgenommen und werden vorrangig berücksichtigt. Aus einer früheren Überlassung entsteht kein Anspruch auf weitere Termine."
            },
            {
                "number": 29,
                "text": "Der Raum ist spätestens zum Ende des bestätigten Zeitraums geräumt und besenrein zu übergeben. Benutztes Geschirr ist zu spülen und an den vorgesehenen Platz zurückzustellen; Abfälle sind in den dafür bestimmten Behältern außerhalb des Gebäudes zu entsorgen. Die Durchführung dieser Arbeiten ist in die gebuchte Zeit einzurechnen. Eine anschließende freie Stunde im Belegungsplan berechtigt nicht zu einer späteren Übergabe. Festgestellte Mängel sind bei der Übergabe im Protokoll festzuhalten; über eine etwaige Kostenforderung wird gesondert entschieden."
            },
            {
                "number": 30,
                "text": "Eine bestätigte Nutzung kann bis 48 Stunden vor Beginn kostenfrei storniert werden. Maßgeblich ist der Eingang der Mitteilung bei der Verwaltung, nicht der Zeitpunkt ihrer Absendung. Bei späterem Rücktritt bleibt die vereinbarte Pauschale fällig, es sei denn, der Raum wird für denselben Zeitraum anderweitig vergeben. Der Wunsch nach einem anderen Termin gilt als Absage der bisherigen Buchung und erfordert einen neuen Antrag. Ein eigenständiger Tausch mit anderen Nutzenden ist nicht zulässig, auch wenn beide Seiten damit einverstanden sind."
            }
        ]
    }
]);

// Original Kapi practice pack 2 · 2026-11-21.
LESEN_B2_TASKS.push(...[
    {
        "id": "lesen_t1_kochen_20261121b",
        "teil": 1,
        "title": "Was kommt abends auf den Tisch?",
        "topic": "Ernährung & Alltag",
        "suggestedMinutes": 18,
        "targetWords": [
            "der Aufwand",
            "auf etwas verzichten",
            "sich etwas vornehmen",
            "die Gewohnheit",
            "übrig bleiben",
            "Rücksicht nehmen"
        ],
        "instruction": "Sie lesen in einem Forum, wie vier Personen ihren Kochalltag organisieren. Auf welche Person treffen die Aussagen 1 bis 9 zu? Die Personen können mehrmals gewählt werden. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 1,
                "text": "Wer kann inzwischen von Vorgaben abweichen, weil er sich fachlich sicherer fühlt?",
                "answer": "d",
                "why": "David chuyển từ bám công thức sang tự điều chỉnh nhờ nắm kỹ thuật. Không nhầm với Nora: kế hoạch linh hoạt của cô liên quan lịch ăn, không phải kỹ năng nấu."
            },
            {
                "number": 2,
                "text": "Wer findet, dass weniger gemeinsame Mahlzeiten das Zusammenleben verbessert haben?",
                "answer": "c",
                "why": "Mila đối chiếu yêu cầu ăn chung mỗi ngày với một buổi cố định; seltener lại dẫn tới entspannter, không phải quan hệ kém đi."
            },
            {
                "number": 3,
                "text": "Wer plant auch deshalb, damit bereits gekaufte Lebensmittel vollständig verwendet werden?",
                "answer": "a",
                "why": "Nora nhận ra đồ đã mở bị hỏng và dùng nguyên liệu trong nhiều món. Ben dự trữ đồ đông lạnh để tiết kiệm thời gian, không nêu mục tiêu xử lý nguyên liệu thừa."
            },
            {
                "number": 4,
                "text": "Wer lehnt es ab, die Qualität einer Mahlzeit am Aufwand zu messen?",
                "answer": "b",
                "why": "Ben phản đối quan niệm món tử tế phải cầu kỳ. Anh vẫn có thể nấu nhiều món khi rảnh nên không phải luôn ghét nấu phức tạp."
            },
            {
                "number": 5,
                "text": "Wer wurde durch gesundheitliche Umstände zum Kochen gebracht?",
                "answer": "d",
                "why": "Nguyên nhân David bắt đầu là Unverträglichkeit. Chú ý erst ... als chỉ thời điểm và động lực ban đầu, khác việc lựa chọn khẩu vị sau này."
            },
            {
                "number": 6,
                "text": "Wer hält sich trotz Vorbereitung bewusst Möglichkeiten für spontane Entscheidungen offen?",
                "answer": "a",
                "why": "Nora chỉ lên lịch ba tối, không cả tuần, để vẫn đi ăn với bạn. Đây là giới hạn của kế hoạch chứ không từ bỏ việc chuẩn bị."
            },
            {
                "number": 7,
                "text": "Für wen steht beim Kochen mit anderen der persönliche Austausch im Vordergrund?",
                "answer": "c",
                "why": "Mila nhấn mạnh weniger ... als: trò chuyện quan trọng hơn món mới. David cũng thích trao đổi nhưng nói về mời khách, không về cùng nấu ăn."
            },
            {
                "number": 8,
                "text": "Wer kocht je nach verfügbarer Freizeit bewusst unterschiedlich aufwendig?",
                "answer": "b",
                "why": "Ben chọn món nhanh trong tuần nhưng có thể làm nhiều món vào ngày nghỉ. Không suy ra anh không bao giờ dành nhiều công cho bữa ăn."
            },
            {
                "number": 9,
                "text": "Wer überprüft bei Einladungen ausdrücklich, ob die eigenen Vorlieben geteilt werden?",
                "answer": "d",
                "why": "David không mặc định khẩu vị mình là của khách nên hỏi trước. Hỏi về món thích không đồng nghĩa chỉ hỏi về bệnh không dung nạp."
            }
        ],
        "people": [
            {
                "id": "a",
                "text": "Sonntags schreibe ich inzwischen auf, was ich an den nächsten drei Abenden kochen möchte, und kaufe entsprechend ein. Früher hielt ich solche Pläne für unnötig, bis ich bemerkte, wie oft angebrochene Packungen bei mir verdarben. Seitdem verwende ich dieselben Zutaten bewusst in verschiedenen Gerichten, etwa Spinat zunächst in einer Suppe und später in einer Füllung. Eine ganze Woche möchte ich trotzdem nicht festlegen, weil ich gelegentlich spontan mit Freunden essen gehe. Was ich spare, ist vor allem die tägliche Entscheidung vor dem Supermarktregal; schneller koche ich deshalb nicht unbedingt. Neue Rezepte probiere ich weiterhin aus, allerdings erst, wenn ich weiß, wofür ich die übrigen Zutaten nutzen kann. Mein Plan soll mir Freiraum verschaffen und nicht zu einer weiteren Pflicht werden, die ich jeden Abend erfüllen muss.",
                "name": "Nora, Münster"
            },
            {
                "id": "b",
                "text": "Nach einem langen Arbeitstag habe ich durchaus Hunger auf etwas Warmes, aber selten Lust, erst eine Stunde in der Küche zu stehen. Deshalb enthält mein Gefrierfach immer Gemüse und selbst gekochte Soßen, aus denen schnell etwas entsteht. Früher fand ich das gegenüber frischen Zutaten zweitklassig, heute stört mich eher die Vorstellung, ein ordentliches Essen müsse unbedingt aufwendig sein. Wenn Gäste kommen, bereite ich manchmal trotzdem mehrere Gänge zu, weil mir das an freien Tagen Freude macht. Unter der Woche messe ich meine Kochkünste jedoch nicht daran, wie lange ich beschäftigt bin. Auch eine fertige Suppe darf es sein, solange sie mir schmeckt; ich möchte mein Abendessen nicht vor anderen rechtfertigen müssen. Die eingesparte Zeit verbringe ich lieber draußen als mit dem Fotografieren besonders schöner Teller.",
                "name": "Ben, Hannover"
            },
            {
                "id": "c",
                "text": "In unserer Wohngemeinschaft haben wir lange versucht, an jedem Abend gemeinsam zu essen. Das klang verbindend, führte aber dazu, dass jemand hungrig wartete oder kurz vor dem Essen noch eine Absage kam. Jetzt verabreden wir uns nur noch für den Mittwoch, und wer teilnehmen möchte, meldet sich bis zum Vorabend. An den übrigen Tagen sorgt jeder für sich, ohne dass dies als mangelndes Interesse an den anderen verstanden wird. Beim gemeinsamen Kochen geht es mir weniger um neue Gerichte als darum, endlich einmal ohne Eile miteinander zu reden. Seit wir seltener zusammen essen, sind unsere Abende tatsächlich entspannter geworden. Ein festes Treffen, auf das man sich freuen kann, ist mir lieber als ein täglicher Anspruch, der bei niemandem richtig in den Kalender passt.",
                "name": "Mila, Leipzig"
            },
            {
                "id": "d",
                "text": "Ich habe das Kochen erst entdeckt, als ich wegen einer Unverträglichkeit genauer auf mein Essen achten musste. Anfangs hielt ich mich streng an Rezepte, weil ich fürchtete, beim Austauschen einzelner Zutaten würde nichts mehr gelingen. Inzwischen beherrsche ich einige Grundtechniken und ändere Gerichte danach ab, was ich vertrage und was gerade vorhanden ist. Das macht mich unabhängiger von speziellen Produkten, die oft teuer oder schwer zu bekommen sind. Für andere zu kochen, finde ich trotzdem anspruchsvoller, denn mein persönlicher Geschmack ist nicht automatisch ihrer. Deshalb frage ich vor einer Einladung nach, statt stillschweigend anzunehmen, alle würden dieselben Zutaten mögen. Auf den Austausch über das Essen freue ich mich dann besonders, auch wenn jemand eine andere Würzung bevorzugt.",
                "name": "David, Augsburg"
            }
        ]
    },
    {
        "id": "lesen_t2_paketraum_20261121b",
        "teil": 2,
        "title": "Ein Raum für Pakete – und viele offene Fragen",
        "topic": "Wohnen & Zustellung",
        "suggestedMinutes": 12,
        "targetWords": [
            "die Zustellung",
            "der Zugang",
            "die Benachrichtigung",
            "entgegennehmen",
            "der Aufwand",
            "die Aufbewahrung"
        ],
        "instruction": "Sie lesen einen Zeitschriftenartikel über einen Paketraum in einem Wohnhaus. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 10,
                "text": "Lücke 10",
                "answer": "e",
                "why": "e đưa vào các doanh nghiệp chưa có quy trình, là đối tượng của Mit diesen ở sau. Hệ thống ra vào khác nhau khiến phải thỏa thuận riêng, không thể chỉ treo biển."
            },
            {
                "number": 11,
                "text": "Lücke 11",
                "answer": "b",
                "why": "b nói về người không đăng ký; Für sie ở sau giải thích họ vẫn dùng cách nhận cũ. Đây là lựa chọn cá nhân, không phải cấm họ nhận hàng."
            },
            {
                "number": 12,
                "text": "Lücke 12",
                "answer": "f",
                "why": "f cung cấp số khu kệ để giải quyết việc tìm thùng giống nhau. Diese Angabe ở sau là số này. Câu tiếp theo phân biệt đánh số khu với làm ngăn riêng từng hộ."
            },
            {
                "number": 13,
                "text": "Lücke 13",
                "answer": "a",
                "why": "a đặt thời hạn năm ngày để giải quyết phòng quá đầy. dieser Frist ở sau cần mốc thời gian cụ thể này; h dành phòng cho người vắng không giải quyết hàng tồn và không đưa thời hạn rõ."
            },
            {
                "number": 14,
                "text": "Lücke 14",
                "answer": "d",
                "why": "d đưa ra biên bản ghi theo dõi; Darin ở sau trỏ vào biên bản rồi liệt kê dữ liệu. Đây là đánh giá công việc phát sinh, không phải cho rằng ít đường đi thì chắc chắn ít việc."
            },
            {
                "number": 15,
                "text": "Lücke 15",
                "answer": "c",
                "why": "c nhấn mạnh cần làm rõ trách nhiệm dù đa số ủng hộ. Vì thế đoạn sau chỉ gia hạn có thời hạn và chỉ định người phụ trách. g trái cả điều kiện sofern ở trước lẫn quyết định chỉ thử tiếp ở sau."
            }
        ],
        "segments": [
            "Wer tagsüber nicht zu Hause ist, kennt die Zettel im Briefkasten: Ein Paket liegt bei einem Nachbarn, ein anderes in einer Filiale am Stadtrand. In einem großen Wohnhaus schlug der Hausbeirat deshalb vor, einen ungenutzten Raum im Erdgeschoss für Lieferungen einzurichten. Das klang zunächst nach einer einfachen Lösung, denn die Fläche war vorhanden und musste kaum umgebaut werden. Noch vor der Eröffnung stellte sich jedoch heraus, dass nicht alle Zustelldienste mit demselben Zugangssystem arbeiteten.",
            "Mit diesen musste die Verwaltung zunächst einzeln klären, ob und unter welchen Bedingungen eine Ablage im Raum überhaupt möglich war. Ein Schild an der Haustür genügte dafür nicht, auch wenn manche Bewohner genau das erwartet hatten. Nach mehreren Absprachen begann ein dreimonatiger Versuch mit den beteiligten Unternehmen. Dabei erhielten die Zustellenden einen zeitlich begrenzten Code, während die Bewohner ihren normalen Hausschlüssel benutzten. Wer die neue Möglichkeit nutzen wollte, musste sich ausdrücklich dafür anmelden; eine Pflicht zur Teilnahme gab es nicht.",
            "Für sie blieb die bisherige Zustellung an die Wohnungstür beziehungsweise an eine vereinbarte Abholstelle bestehen. So konnten auch Personen, die zunächst skeptisch waren, die Erfahrungen im Haus beobachten, ohne ihr eigenes Verfahren sofort umzustellen. Schon bald zeigte sich allerdings, dass die bloße Nachricht über eine Lieferung nicht ausreichte. In Stoßzeiten standen viele ähnlich aussehende Kartons dicht nebeneinander, und das Suchen dauerte länger als erwartet.",
            "Diese Angabe wurde fortan auch in die Benachrichtigung aufgenommen, sodass sich die Suche auf einen kleinen Bereich beschränkte. Ein eigenes Fach für jede Wohnung ließ sich dagegen nicht verwirklichen, weil dafür der Platz fehlte. Außerdem blieb die Frage offen, wie lange Sendungen dort stehen dürfen. Einige Bewohner waren auf Reisen, andere verschoben das Abholen, gerade weil der Weg nun so bequem war. Nach wenigen Wochen war der Raum deshalb so voll, dass neue Pakete kaum noch unterzubringen waren.",
            "Nach Ablauf dieser Frist erhielten die Empfänger eine Erinnerung und mussten mit der Verwaltung eine Lösung vereinbaren. Wer länger abwesend war, konnte beispielsweise eine vertraute Person mit der Abholung beauftragen. Eine automatische Rücksendung war nicht vorgesehen, denn darüber sollte nicht ohne Rücksprache entschieden werden. Für die Verwaltung entstand dadurch zusätzliche Arbeit, die bei der ursprünglichen Planung unterschätzt worden war.",
            "Darin wurden nicht nur die Zahl der Sendungen, sondern auch Suchzeiten, Rückfragen und Beschwerden festgehalten. Die Auswertung zeigte am Ende, dass weniger Nachbarn Lieferungen entgegennehmen mussten, die Verwaltung jedoch häufiger vermitteln musste. Der Aufwand war also nicht einfach verschwunden, sondern hatte sich teilweise verlagert. Trotzdem sprach sich eine Mehrheit dafür aus, den Raum weiter zu nutzen, sofern die zusätzliche Betreuung verlässlich organisiert würde.",
            "Deshalb beschloss die Hausgemeinschaft zunächst nur eine Verlängerung um sechs Monate und legte fest, wer für Rückfragen zuständig ist. Ob sich die Lösung auf Dauer bewährt, soll danach erneut gemeinsam beurteilt werden. Ein Paketraum spart Wege, funktioniert aber nicht ohne Regeln und Menschen, die sich um die Ausnahmen kümmern."
        ],
        "options": [
            {
                "id": "a",
                "text": "Für jede Sendung wurde deshalb eine Höchstdauer von fünf Tagen festgelegt."
            },
            {
                "id": "b",
                "text": "Andere wiederum entschieden sich bewusst gegen eine Anmeldung."
            },
            {
                "id": "c",
                "text": "Eine hohe Zustimmung allein beantwortete jedoch noch nicht die Frage nach der Zuständigkeit."
            },
            {
                "id": "d",
                "text": "Um solche Folgen beurteilen zu können, führte das Team während der Testphase ein einfaches Protokoll."
            },
            {
                "id": "e",
                "text": "Einige Unternehmen sahen dieses Verfahren bislang gar nicht vor."
            },
            {
                "id": "f",
                "text": "Deshalb wurde jeder Regalabschnitt mit einer gut sichtbaren Nummer versehen."
            },
            {
                "id": "g",
                "text": "Nach dieser Zustimmung war die dauerhafte Öffnung bereits ohne weitere Bedingungen beschlossen."
            },
            {
                "id": "h",
                "text": "Für diese Zeit sollte der Raum ausschließlich den abwesenden Bewohnern vorbehalten bleiben."
            }
        ]
    },
    {
        "id": "lesen_t3_bewertungen_20261121b",
        "teil": 3,
        "title": "Fünf Sterne – aber für wen?",
        "topic": "Onlinekauf & Verbraucheralltag",
        "suggestedMinutes": 12,
        "targetWords": [
            "die Bewertung",
            "aussagekräftig",
            "die Rückmeldung",
            "in Betracht ziehen",
            "die Voraussetzung",
            "enttäuscht sein"
        ],
        "instruction": "Sie lesen einen Artikel über Kundenbewertungen im Internet. Wählen Sie bei den Aufgaben 16 bis 21 jeweils die richtige Lösung a, b oder c. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 16,
                "text": "Was verdeutlicht das Beispiel der Kaffeemaschine?",
                "answer": "c",
                "why": "c là luận điểm các kỳ vọng sử dụng khác nhau. a suy diễn nhận xét bị bịa, điều bài phủ nhận là không nhất thiết; b thu hẹp mọi người mua vào tiếng ồn.",
                "options": {
                    "a": "Gute Bewertungen entstehen häufig ohne wirkliche Produkterfahrung.",
                    "b": "Bei Haushaltsgeräten ist die Lautstärke das wichtigste Kaufkriterium.",
                    "c": "Ein positiv bewertetes Gerät kann für andere Bedürfnisse ungeeignet sein."
                }
            },
            {
                "number": 17,
                "text": "Welche Grenze des Sterndurchschnitts wird beschrieben?",
                "answer": "a",
                "why": "a tổng hợp việc giao hàng, thao tác và chất lượng được gộp cùng con số. b nhầm lời khuyên không quá chú ý số lẻ với lỗi tính; c thêm kết luận về số người mà bài không nêu.",
                "options": {
                    "a": "Die Zahl lässt die unterschiedlichen Grundlagen der Urteile nicht erkennen.",
                    "b": "Die Plattformen berechnen kleine Unterschiede meist ungenau.",
                    "c": "Die Zahl sinkt automatisch, sobald mehr Personen ein Produkt bewerten."
                }
            },
            {
                "number": 18,
                "text": "Was besagt ein bestätigter Kauf laut Text?",
                "answer": "b",
                "why": "b chỉ giữ phạm vi xác nhận giao dịch qua tài khoản. Nó không bảo đảm tự do khỏi lợi ích như c hoặc thử đủ lâu như a.",
                "options": {
                    "a": "Die bewertende Person hat den Artikel ausreichend lange getestet.",
                    "b": "Für das betreffende Konto ist eine Bestellung über die Plattform nachgewiesen.",
                    "c": "Die Bewertung wurde ohne finanzielle oder andere Anreize abgegeben."
                }
            },
            {
                "number": 19,
                "text": "Wann ist ein negativer Kommentar besonders aufschlussreich?",
                "answer": "a",
                "why": "a diễn đạt điều kiện cụ thể giúp liên hệ với việc dùng của mình. b nhầm tính gay gắt với chất lượng; c thêm tiêu chuẩn tương đồng toàn bộ sở thích, bài chỉ cần điều kiện liên quan.",
                "options": {
                    "a": "Wenn der beschriebene Nachteil auf die eigene Verwendung bezogen werden kann.",
                    "b": "Wenn er deutlich entschiedener formuliert ist als die positiven Urteile.",
                    "c": "Wenn die schreibende Person in allen Bereichen denselben Geschmack hat."
                }
            },
            {
                "number": 20,
                "text": "Welchen Zweck hat die vorab erstellte Liste?",
                "answer": "c",
                "why": "c hướng sự đánh giá vào nhu cầu riêng thay vì chỉ tìm xác nhận lựa chọn có sẵn. a sai vì danh sách vẫn cần chỉnh khi thấy yếu tố mới; b bài không đề nghị bỏ qua phản đối.",
                "options": {
                    "a": "Sie legt die Kaufentscheidung schon vor dem Lesen endgültig fest.",
                    "b": "Sie macht es überflüssig, widersprechende Bewertungen zu berücksichtigen.",
                    "c": "Sie hilft, Einwände anhand eigener Prioritäten abzuwägen."
                }
            },
            {
                "number": 21,
                "text": "Welche Schlussfolgerung zieht der Artikel?",
                "answer": "b",
                "why": "b là kết luận đánh giá cung cấp căn cứ phải đối chiếu nhu cầu. a biến đánh giá thành quyết định thay người mua; c loại bỏ dữ liệu hữu ích, trái weder nutzlos.",
                "options": {
                    "a": "Bei genügend Bewertungen kann die persönliche Prüfung entfallen.",
                    "b": "Der Nutzen von Bewertungen hängt davon ab, wie man sie auf die eigene Situation bezieht.",
                    "c": "Eigene Anforderungen lassen sich am besten ohne Kundenurteile bestimmen."
                }
            }
        ],
        "article": [
            "Eine Kaffeemaschine erhält begeisterte Bewertungen, doch nach dem Kauf ist die neue Besitzerin enttäuscht: Für ihre kleine Küche ist das Gerät viel zu laut. Das bedeutet nicht zwangsläufig, dass die positiven Urteile erfunden waren. Wer vor allem große Mengen Kaffee zubereitet, setzt möglicherweise andere Schwerpunkte als jemand, der frühmorgens niemanden wecken möchte. Bewertungen beschreiben daher nicht nur ein Produkt, sondern auch Erwartungen, die häufig unausgesprochen bleiben.",
            "Beim Vergleich mehrerer Angebote fällt der Blick dennoch meist zuerst auf den Durchschnitt der vergebenen Sterne. Diese Zahl ist übersichtlich, fasst aber sehr unterschiedliche Erfahrungen zusammen. Ein Kunde bewertet den schnellen Versand, eine andere Person die Bedienung, ein dritter schreibt nach einem einzigen Einsatz über die Qualität. Ein hoher Durchschnitt kann deshalb eine erste Orientierung bieten, ersetzt aber nicht die Frage, worauf die Urteile jeweils beruhen. Gerade wenn zwei Produkte ähnlich abschneiden, lohnt sich der Blick in die einzelnen Texte mehr als der Vergleich der zweiten Nachkommastelle.",
            "Auch der Hinweis auf einen bestätigten Kauf wird leicht überschätzt. Er kann zeigen, dass ein Kundenkonto den Artikel tatsächlich über die Plattform bestellt hat. Ob die Person sorgfältig getestet hat, ausreichend Erfahrung besitzt oder für ihre Bewertung einen Vorteil erhalten hat, geht daraus nicht hervor. Der Hinweis ist somit eine zusätzliche Information, aber kein Gütesiegel für die Begründung des Urteils.",
            "Besonders nützlich können kritische Kommentare sein, wenn sie konkrete Bedingungen nennen. Die Aussage, ein Kopfhörer drücke nach zwei Stunden unter einer Brille, hilft eher weiter als das pauschale Urteil, er sei schlecht. Für jemanden ohne Brille kann dieser Nachteil weniger wichtig sein; für eine Brillenträgerin ist er womöglich entscheidend. Hilfreich ist außerdem, wenn mehrere voneinander unabhängige Rückmeldungen dasselbe Problem unter ähnlichen Bedingungen beschreiben. Nicht die Schärfe der Kritik macht sie wertvoll, sondern ihre Nachvollziehbarkeit für die eigene Nutzung.",
            "Manche Käufer lesen schließlich so lange weiter, bis sie eine Bewertung finden, die ihre ursprüngliche Entscheidung bestätigt. Die Suche wirkt dann gründlich, führt aber kaum zu einer offeneren Abwägung. Ein Verbraucherberater empfiehlt in einem Workshop deshalb, vor dem Lesen drei unverzichtbare Eigenschaften aufzuschreiben und ein Kriterium festzulegen, bei dem man zu einem Kompromiss bereit wäre. So lässt sich gezielter prüfen, ob ein Einwand wirklich gegen den Kauf spricht oder lediglich eine andere Vorliebe widerspiegelt. Die Liste verhindert allerdings nicht jede Fehlentscheidung und sollte geändert werden, wenn beim Lesen ein bislang übersehener wichtiger Aspekt auftaucht.",
            "Kundenurteile sind damit weder nutzlos noch eine fertige Kaufentscheidung. Sie liefern Anhaltspunkte, deren Bedeutung erst im Verhältnis zu den eigenen Anforderungen deutlich wird. Wer nach dem Lesen besser erklären kann, warum ein Produkt zu seinem Alltag passt, hat mehr gewonnen als jemand, der nur eine möglichst hohe Sternezahl gefunden hat."
        ]
    },
    {
        "id": "lesen_t4_nebensaison_20261121b",
        "teil": 4,
        "title": "Urlaub außerhalb der Hauptsaison",
        "topic": "Reisen & Alltag",
        "suggestedMinutes": 12,
        "targetWords": [
            "in Kauf nehmen",
            "Rücksicht nehmen",
            "zur Verfügung stehen",
            "die Voraussetzung",
            "sich lohnen",
            "auf etwas verzichten"
        ],
        "instruction": "Sie lesen Meinungsäußerungen zu Reisen außerhalb der Hauptsaison. Welche Äußerung a bis h passt zu welcher Überschrift 22 bis 27? Eine Äußerung passt nicht. Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 22,
                "text": "Ein günstiges Angebot kann am Ende teuer werden",
                "answer": "d",
                "why": "d đối chiếu giá phòng thấp với chi phí taxi khiến hết tiền tiết kiệm. h có nhắc tìm khách sạn nhưng trọng tâm là linh hoạt đặt sát ngày, không phải tổng chi phí."
            },
            {
                "number": 23,
                "text": "Weniger Spitzen ermöglichen verlässlichere Beschäftigung",
                "answer": "c",
                "why": "c muốn phân bố khách đều để ký hợp đồng dài, không nhất thiết tăng tổng khách. b cũng nhắc công ty nhưng nói về giới hạn lịch của người đi du lịch."
            },
            {
                "number": 24,
                "text": "Die Wahl der Reisezeit ist nicht für alle frei",
                "answer": "b",
                "why": "b bác lời trách gia đình đi cùng mùa vì lịch học và công ty hạn chế lựa chọn. Không nhầm h: người đó tự chọn giữ sự linh hoạt, không bị ràng buộc như b."
            },
            {
                "number": 25,
                "text": "Entzerrung allein garantiert noch keinen ökologischen Vorteil",
                "answer": "g",
                "why": "g phân biệt bớt đông với bền vững: cần xét đi thêm chuyến và phương tiện. e lo mất thời gian nghỉ của địa phương, không phân tích tác động cách di chuyển."
            },
            {
                "number": 26,
                "text": "Das Urlaubsprogramm an veränderte Bedingungen anpassen",
                "answer": "f",
                "why": "f thay đổi kỳ vọng và chuẩn bị hoạt động thay thế theo mùa, không hứa thời tiết tốt. h nói về thời điểm đặt chứ không về chương trình phù hợp mùa."
            },
            {
                "number": 27,
                "text": "Auch der Urlaubsort braucht Zeiten zum Durchatmen",
                "answer": "e",
                "why": "e đòi giữ khoảng nghỉ để sửa chữa và hồi phục. a muốn yên cho kỳ nghỉ cá nhân; e bảo vệ nhịp sống của người địa phương."
            }
        ],
        "opinions": [
            {
                "id": "a",
                "text": "Ich fahre gern im November ans Meer, weil ich dann am Strand lange unterwegs sein kann, ohne ständig Gruppen ausweichen zu müssen. Dass es früher dunkel wird und manches Café geschlossen ist, nehme ich dafür in Kauf. Für mich besteht Erholung nicht darin, möglichst viele Angebote zu nutzen, sondern endlich weniger Reize um mich zu haben."
            },
            {
                "id": "b",
                "text": "Immer heißt es, man müsse seine Reise nur ein wenig verschieben, dann werde alles günstiger und ruhiger. Mit schulpflichtigen Kindern und einem Betrieb, der den Urlaub weit im Voraus festlegt, ist das aber keine frei verfügbare Möglichkeit. Mich ärgert deshalb der Vorwurf, Familien würden aus Bequemlichkeit alle zur selben Zeit verreisen. Bevor man ihnen bessere Planung empfiehlt, sollte man sich die Grenzen ihres Kalenders ansehen."
            },
            {
                "id": "c",
                "text": "Ich betreibe ein kleines Hotel und würde gern auch im Winter mehr Gäste aufnehmen. Dann könnte ich Beschäftigten längere Verträge anbieten, statt jedes Frühjahr ein neues Team einarbeiten zu müssen. Ein voller Sommer allein reicht für solche Zusagen nicht aus, solange im übrigen Jahr kaum etwas gebucht wird. Für mich geht es deshalb weniger um noch mehr Besucher insgesamt als um eine gleichmäßigere Verteilung."
            },
            {
                "id": "d",
                "text": "Das günstige Hotel im Herbst sah im Angebot hervorragend aus, nur fuhr der Bus vom Bahnhof dann bloß zweimal täglich. Ohne Auto mussten wir für mehrere Ausflüge ein Taxi nehmen, sodass die Ersparnis rasch aufgebraucht war. Heute prüfe ich vor der Buchung zuerst, was sich am Zielort tatsächlich erreichen lässt. Ein niedriger Zimmerpreis sagt eben wenig darüber aus, was der gesamte Aufenthalt kostet."
            },
            {
                "id": "e",
                "text": "Als Bewohnerin eines Küstenortes wünsche ich mir im Winter nicht einfach dieselben Menschenmengen wie im August. Die ruhigeren Monate geben uns Zeit, Wege instand zu setzen und uns vom Sommerbetrieb zu erholen. Wenn nun jede Woche ein neues Großereignis Besucher anlocken soll, geht genau diese Pause verloren. Gäste sind willkommen, aber eine Verlängerung der Saison braucht Grenzen, die auch für die Menschen vor Ort passen."
            },
            {
                "id": "f",
                "text": "Ich plane inzwischen lieber eine Wanderreise im Frühjahr als einen Badeurlaub, bei dem ich jeden Tag auf Sonne hoffe. Das Wetter lässt sich nicht buchen, doch die Erwartungen lassen sich an die Jahreszeit anpassen. Ein verregneter Vormittag ist für mich kein verlorener Urlaubstag, wenn ich von Anfang an auch Museen oder einen Lesetag vorgesehen habe. Entscheidend ist, dass ich nicht im April dasselbe Programm voraussetze wie im Hochsommer."
            },
            {
                "id": "g",
                "text": "Werbung für Reisen im Frühling betont gern, dass weniger Gedränge automatisch auch weniger Belastung für die Umwelt bedeute. Wenn dadurch jedoch zusätzlich gereist wird oder für ein fernes Ziel das Flugzeug gewählt wird, ist dieser Vorteil keineswegs sicher. Ich würde daher die Anreise und die Zahl meiner Reisen betrachten, bevor ich allein den Monat als Beleg für Nachhaltigkeit anführe. Ein leererer Strand kann angenehm sein, ersetzt aber keine solche Abwägung."
            },
            {
                "id": "h",
                "text": "Seit ich allein verreise, buche ich am liebsten kurzfristig. Wenn sich ein günstiges Zeitfenster ergibt, möchte ich nicht schon durch lange vorher getroffene Entscheidungen gebunden sein. Manchmal finde ich dann nicht mehr mein Wunschhotel, dafür kann ich auf eine unerwartete freie Woche reagieren. Diese Beweglichkeit ist mir wichtiger als die Gewissheit, Monate vorher jedes Detail zu kennen."
            }
        ],
        "example": {
            "text": "Weniger Trubel als persönlicher Erholungsgewinn",
            "answer": "a"
        }
    },
    {
        "id": "lesen_t5_abendkurs_20261121b",
        "teil": 5,
        "title": "Teilnahmebedingungen für Abendkurse",
        "topic": "Weiterbildung & Regeln",
        "suggestedMinutes": 6,
        "targetWords": [
            "die Anmeldung",
            "die Bescheinigung",
            "die Voraussetzung",
            "nachweisen",
            "schriftlich",
            "die Teilnahme"
        ],
        "instruction": "Sie möchten an einem Abendkurs teilnehmen und lesen die Teilnahmebedingungen des Bildungszentrums. Welche Überschriften a bis h passen zu den Paragraphen 28 bis 30? Vier Überschriften werden nicht gebraucht. Kapi-Übung nach Goethe-Format; kein offizieller Prüfungssatz.",
        "questions": [
            {
                "number": 28,
                "text": "§ 28",
                "answer": "b",
                "why": "b bao quát xếp trình độ và điều kiện chuyển nhóm. Đoạn không nói cấp giấy tham gia ở e: Einstufungstest không phải Abschlussprüfung. Không tự có quyền đòi lớp mới khi hết chỗ."
            },
            {
                "number": 29,
                "text": "§ 29",
                "answer": "d",
                "why": "d bao quát bỏ lỡ buổi và ngoại lệ học bù. Có nhắc không hoàn tiền nhưng không phải rút cả khóa ở c; câu cuối loại buổi do giáo viên hủy khỏi quy định, nên không chọn g."
            },
            {
                "number": 30,
                "text": "§ 30",
                "answer": "e",
                "why": "e là chủ đề bao trùm: điều kiện và ý nghĩa giấy xác nhận. Trả đủ phí chỉ là một điều kiện phụ, không biến đoạn thành cách và hạn thanh toán ở h. Giấy không chứng nhận trình độ."
            }
        ],
        "headings": [
            {
                "id": "a",
                "text": "Anmeldung und Zustandekommen des Vertrags"
            },
            {
                "id": "b",
                "text": "Einstufung und Wechsel des Kursniveaus"
            },
            {
                "id": "c",
                "text": "Rücktritt und Erstattung der Kursgebühr"
            },
            {
                "id": "d",
                "text": "Versäumte Unterrichtsstunden und Ersatzangebote"
            },
            {
                "id": "e",
                "text": "Voraussetzungen für die Teilnahmebescheinigung"
            },
            {
                "id": "f",
                "text": "Umgang mit Unterrichtsmaterialien"
            },
            {
                "id": "g",
                "text": "Absage eines Kurses durch das Bildungszentrum"
            },
            {
                "id": "h",
                "text": "Zahlungsweise und Fälligkeit"
            }
        ],
        "example": {
            "answer": "a",
            "text": "Die Anmeldung erfolgt über das Onlineformular oder persönlich im Sekretariat. Sie wird erst verbindlich, sobald das Bildungszentrum eine schriftliche Bestätigung versandt hat. Eine bloße Teilnahme an der ersten Unterrichtsstunde ersetzt die Anmeldung nicht."
        },
        "sections": [
            {
                "number": 28,
                "text": "Vor Beginn eines aufbauenden Sprachkurses ist ein Einstufungstest abzulegen, sofern kein anerkannter Nachweis über die erforderlichen Vorkenntnisse vorliegt. Das Ergebnis dient der Zuordnung zu einer geeigneten Lerngruppe und ist keine Abschlussprüfung. Erweist sich die Zuordnung während der ersten beiden Unterrichtswochen als unpassend, kann im Einvernehmen mit der Kursleitung ein Wechsel beantragt werden. Die Umsetzung setzt einen freien Platz in der gewünschten Gruppe voraus. Ein Anspruch auf einen zusätzlichen Kurs entsteht daraus nicht."
            },
            {
                "number": 29,
                "text": "Nicht wahrgenommene Unterrichtsstunden werden grundsätzlich weder erstattet noch auf andere Personen übertragen. Bei nachgewiesener längerer Erkrankung kann die Verwaltung im Rahmen verfügbarer Plätze die Teilnahme an einer entsprechenden Einheit in einem Parallelkurs gestatten. Hierauf besteht kein Anspruch; eine vorherige schriftliche Zustimmung ist erforderlich. Die selbstständige Bearbeitung bereitgestellter Aufgaben ist unabhängig davon möglich, gilt jedoch nicht als nachgeholte Anwesenheit. Von der Kursleitung abgesagte Stunden sind von diesen Regelungen nicht betroffen und werden gesondert neu angesetzt."
            },
            {
                "number": 30,
                "text": "Eine Bescheinigung wird auf Antrag ausgestellt, wenn mindestens vier Fünftel der vorgesehenen Unterrichtsstunden besucht wurden. Maßgeblich sind die von der Kursleitung geführten Anwesenheitslisten einschließlich genehmigter Ersatztermine. Der Nachweis bestätigt ausschließlich die Teilnahme und enthält keine Aussage über ein erreichtes Sprachniveau. Ein gesondertes Prüfungszertifikat wird dadurch nicht ersetzt. Die Ausstellung setzt außerdem voraus, dass die Kursgebühr vollständig entrichtet wurde; eine Ratenzahlungsvereinbarung allein genügt hierfür nicht."
            }
        ]
    }
]);
