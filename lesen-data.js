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
