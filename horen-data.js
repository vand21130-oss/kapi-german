const alleHoerenPruefungen = [
    {
        id: 1,
        niveau: "B2",
        name: "Đề 1: Gesellschaft & Wirtschaft (Cây nhà lá vườn 🌿)",
        teile: [
            {
                teilName: "Teil 1: Aktuelle Meldungen (15 Câu - 5 Text)",
                audioSrc: "de1-teil1.mp3",
                fragen: [
                    // --- TEXT 1 ---
                    { frage: "1. Warum entscheiden sich wieder mehr Menschen für eine handwerkliche Ausbildung?", antworten: ["A. Weil ein Studium heute keine Garantie mehr für eine stabile Anstellung ist.", "B. Weil die Arbeit im Handwerk körperlich weniger anstrengend geworden ist als früher.", "C. Weil die Hörsäle an den Universitäten aus Sicherheitsgründen geschlossen wurden."], richtig: 0, begruendung: "Text 1: 'Angesichts überfüllter Hörsäle und Absolventen, die prekäre Beschäftigungsverhältnisse vorfinden, rückt das Handwerk wieder in den Fokus.'" },
                    { frage: "2. Was sagt der Text über die Bezahlung im Handwerk aus?", antworten: ["A. Sie ist immer noch niedriger als in akademischen Berufen.", "B. Spezialisierte Handwerker verdienen oft mehr als Berufseinsteiger mit Universitätsabschluss.", "C. Die Löhne sind nur gestiegen, weil die Digitalisierung Kosten spart."], richtig: 1, begruendung: "Text 1: 'Die Vergütung für spezialisierte Fachkräfte übersteigt mittlerweile oft das Einstiegsgehalt von Master-Absolventen.'" },
                    { frage: "3. Was ist das Hauptproblem für die Zukunft des Sektors?", antworten: ["A. Dass die Digitalisierung viele Arbeitsplätze überflüssig macht.", "B. Dass junge Menschen trotz guter Verdienstmöglichkeiten das Image skeptisch sehen.", "C. Dass es zu viele staatliche Förderungen gibt."], richtig: 1, begruendung: "Text 1: 'Dennoch bleibt der Nachwuchsmangel bestehen, da das gesellschaftliche Ansehen... nur zögerlich folgt.'" },
                    
                    // --- TEXT 2 ---
                    { frage: "4. Was kritisiert der Text am Begriff „klimaneutral“?", antworten: ["A. Dass er nur für Schwerindustrie verwendet werden darf.", "B. Dass die gesetzlichen Regelungen für seine Verwendung unzureichend sind.", "C. Dass die Verbraucher den Begriff ignorieren."], richtig: 1, begruendung: "Text 2: 'Der Begriff klimaneutral ist gesetzlich kaum geschützt.'" },
                    { frage: "5. Wie gehen viele Konzerne mit dem Thema Nachhaltigkeit um?", antworten: ["A. Sie verändern ihre gesamte Produktion.", "B. Sie setzen auf Werbung und Ausgleichszahlungen statt auf reale Veränderungen.", "C. Sie arbeiten eng mit staatlichen Organen zusammen."], richtig: 1, begruendung: "Text 2: 'Viele Konzerne investieren lieber in Marketingkampagnen und den Kauf von zweifelhaften CO2-Zertifikaten...'" },
                    { frage: "6. Welche Lösung wird im Text vorgeschlagen?", antworten: ["A. Verbraucher sollten sich besser informieren.", "B. Preise müssten drastisch erhöht werden.", "C. Eine verpflichtende Überprüfung durch neutrale Instanzen muss eingeführt werden."], richtig: 2, begruendung: "Text 2: 'Experten fordern daher eine strengere Zertifizierungspflicht durch unabhängige staatliche Organe...'" },
                    
                    // --- TEXT 3 ---
                    { frage: "7. Welchen Vorteil nennen die Befürworter der bargeldlosen Gesellschaft?", antworten: ["A. Die Förderung der Anonymität beim täglichen Einkauf.", "B. Eine effektivere Kontrolle von illegalen Beschäftigungsverhältnissen.", "C. Dass digitale Systeme für ältere Menschen einfacher zu bedienen sind."], richtig: 1, begruendung: "Text 3: 'Befürworter verweisen auf die Effizienz und die Bekämpfung von Schwarzarbeit.'" },
                    { frage: "8. Was ist die größte Sorge der Kritiker?", antworten: ["A. Zu hohe Gebühren.", "B. Dass der Datenschutz verloren geht und das Finanzverhalten überwachbar wird.", "C. Dass die Technik komplett versagen würde."], richtig: 1, begruendung: "Text 3: 'Kritiker jedoch sehen im Verschwinden von Münzen und Scheinen den Weg in den gläsernen Bürger.'" },
                    { frage: "9. Warum warnt der Einzelhandelsverband vor der Umstellung?", antworten: ["A. Weniger Gewinn.", "B. Weil bestimmte Bevölkerungsgruppen vom wirtschaftlichen Leben abgeschnitten werden könnten.", "C. Infrastruktur reicht nicht aus."], richtig: 1, begruendung: "Text 3: 'Zudem warnt der Einzelhandelsverband vor einer sozialen Ausgrenzung älterer Generationen...'" },
                    
                    // --- TEXT 4 ---
                    { frage: "10. Warum ist die Energiebilanz von Urban Farming oft negativ?", antworten: ["A. Zu viel Treibstoff.", "B. Weil die technische Instandhaltung der Anlagen extrem viel Energie benötigt.", "C. Bauern benutzen effizientere Traktoren."], richtig: 1, begruendung: "Text 4: '...ist der Ressourcenverbrauch für Bewässerungssysteme und künstliche Beleuchtung in geschlossenen Räumen enorm.'" },
                    { frage: "11. Für welche Produkte eignet sich Vertical Farming momentan am ehesten?", antworten: ["A. Preisgünstige Grundnahrungsmittel.", "B. Für spezielle Produkte, die zu einem hohen Preis verkauft werden können.", "C. Obstsorten mit viel Platzbedarf."], richtig: 1, begruendung: "Text 4: 'Ökonomen betonen, dass diese Methode derzeit nur für hochpreisige Nischenprodukte wie exotische Kräuter rentabel ist.'" },
                    { frage: "12. Was ist laut Text das größte Hindernis für den großflächigen Anbau in Städten?", antworten: ["A. Mangel an Fachkräften.", "B. Die hohen finanziellen Belastungen durch die Immobilienpreise in der Stadt.", "C. Widerstand der Landwirte."], richtig: 1, begruendung: "Text 4: '...da die Kosten pro Quadratmeter in der Innenstadt schlichtweg zu hoch kalkuliert sind.'" },
                    
                    // --- TEXT 5 ---
                    { frage: "13. Wie hat sich die Bedeutung von Bildungsabschlüssen laut Text verändert?", antworten: ["A. Ein Diplom garantiert lebenslange Sicherheit.", "B. Das Wissen aus der Ausbildung veraltet heute wesentlich schneller als früher.", "C. Universitätsabschlüsse sind wertvoller."], richtig: 1, begruendung: "Text 5: 'In einer sich rasant wandelnden Arbeitswelt verliert das einmal erworbene Diplom immer schneller an Wert.'" },
                    { frage: "14. Was wird an der aktuellen Praxis der Weiterbildung kritisiert?", antworten: ["A. Zu viele Fortbildungen während der Arbeitszeit.", "B. Dass die Kosten und der Zeitaufwand immer häufiger bei den Angestellten liegen.", "C. Keine staatlichen Angebote."], richtig: 1, begruendung: "Text 5: '...wird heute oft erwartet, dass Arbeitnehmer sich in ihrer Freizeit und auf eigene Kosten qualifizieren.'" },
                    { frage: "15. Was ist das Risiko der beschriebenen „Bildungsschere“?", antworten: ["A. Dass Menschen mit geringem Einkommen den Anschluss am Arbeitsmarkt verlieren.", "B. Dass gut verdienende Arbeitnehmer ihre Freizeit nur noch mit Lernen verbringen.", "C. Qualität der universitären Lehre sinkt."], richtig: 0, begruendung: "Text 5: '...während Geringverdiener in ihren veralteten Berufsfeldern gefangen bleiben.'" }
                ]
            },
            {
                teilName: "Teil 2: Der Experten-Vortrag (Präsentation)",
                audioSrc: "de1-teil2.mp3",
                fragen: [
                    { frage: "16. Warum ist die „Fear of Failure“ in Europa ausgeprägter als in den USA?", antworten: ["A. Weniger staatliche Unterstützung.", "B. Weil das soziale Ansehen in Europa stärker an beruflichen Erfolg gekoppelt ist.", "C. Schwerere Kreditvergabe."], richtig: 1, begruendung: "Vortrag: '...die Tatsache, dass der gesellschaftliche Status extrem eng mit einer lückenlosen Erfolgsbiografie verknüpft ist.'" },
                    { frage: "17. Was versteht der Redner unter einer „positiven Fehlerkultur“?", antworten: ["A. Fehler absichtlich machen.", "B. Dass Misserfolge offen kommuniziert werden, um systemische Schwachstellen zu finden.", "C. Mitarbeiter nicht mehr haftbar machen."], richtig: 1, begruendung: "Vortrag: 'Vielmehr geht es darum, eine Umgebung zu schaffen, in der Missgeschicke... transparent analysiert werden. Nur so lassen sich Defizite im System identifizieren.'" },
                    { frage: "18. Welchen Fehler machen viele Gründer laut dem Experten in der Anfangsphase?", antworten: ["A. Zu viel Geld in Marketing.", "B. Sie halten zu lange an einer ursprünglichen Idee fest, die am Markt vorbeigeht.", "C. Zu viele Mitarbeiter."], richtig: 1, begruendung: "Vortrag: 'Viele Gründer verlieben sich so sehr in ihre Vision, dass sie Warnsignale des Marktes ignorieren.'" },
                    { frage: "19. Wie beeinflusst die Digitalisierung den Umgang mit Fehlern?", antworten: ["A. Durch Datenanalysen können Fehlentscheidungen heute schneller korrigiert werden.", "B. Mitarbeiter verstecken Fehler häufiger.", "C. Größere finanzielle Schäden."], richtig: 0, begruendung: "Vortrag: 'Dank Echtzeit-Datenanalysen lassen sich Fehlentwicklungen beinahe sofort erkennen und korrigieren...'" },
                    { frage: "20. Was empfiehlt der Experte etablierten Großunternehmen?", antworten: ["A. Fokus auf Tradition.", "B. Kleine, unabhängige Teams zu bilden, die wie Start-ups agieren dürfen.", "C. Hierarchien verstärken."], richtig: 1, begruendung: "Vortrag: 'Schaffen Sie geschützte Räume, kleine Experimentier-Inseln, in denen Teams völlig autark wie junge Start-ups agieren können...'" },
                    { frage: "21. Welches Fazit zieht der Redner am Ende seines Vortrags?", antworten: ["A. Dass Scheitern nur dann wertvoll ist, wenn eine tiefgreifende Analyse erfolgt.", "B. Jeder Gründer muss scheitern.", "C. Politik soll Risiken übernehmen."], richtig: 0, begruendung: "Vortrag: 'Es wird erst dann zu einem Mehrwert... wenn man die intellektuelle Disziplin besitzt, die Ursachen schonungslos aufzuarbeiten.'" }
                ]
            },
            {
                teilName: "Teil 3: Erweiterte Diskussion (Wer sagt was?)",
                audioSrc: "de1-teil3.mp3",
                fragen: [
                    { frage: "22. Die soziale Isolierung im Homeoffice schadet der Identifikation mit dem Betrieb.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1, begruendung: "Dr. Schmidt: 'Wir beobachten eine massive Erosion der Firmenkultur... Diese soziale Vereinsamung führt dazu, dass Mitarbeiter viel schneller kündigen...'" },
                    { frage: "23. Kreative Prozesse lassen sich nicht erfolgreich in digitale Formate pressen.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1, begruendung: "Dr. Schmidt: 'Kreativität ist ein chaotischer, physischer Prozess. Zoom-Meetings sind zu strukturiert für echte Innovation.'" },
                    { frage: "24. Die Wahl des Arbeitsorts ist heute ein entscheidender Faktor im Recruiting.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2, begruendung: "Frau Lange: 'Die Flexibilität, das Arbeiten von überall, ist mittlerweile das schlagkräftigste Argument in unseren Bewerbungsgesprächen.'" },
                    { frage: "25. Das Festhalten an Anwesenheitskontrolle ist ein Zeichen von mangelnder Modernität.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2, begruendung: "Frau Lange: 'Der Kernpunkt ist doch die Kontrollillusion des Managements... Wir müssen weg von der Absitz-Kultur.'" },
                    { frage: "26. Die häusliche Umgebung bietet oft keine professionellen Arbeitsbedingungen.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1, begruendung: "Dr. Schmidt: 'Zudem darf man die prekäre Ergonomie in vielen Privathaushalten nicht vergessen – ein Küchentisch ersetzt kein professionelles Büro...'" },
                    { frage: "27. Nur ein hybrides Modell wird den unterschiedlichen Bedürfnissen gerecht.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2, begruendung: "Frau Lange: 'Ein hybrides Modell, bei dem man sich gezielt für Workshops trifft... ist der einzige Weg, der beide Seiten zufriedenstellt.'" }
                ]
            },
            {
                teilName: "Teil 4: Der Experten-Vortrag (Attention Economy)",
                audioSrc: "de1-teil4.mp3",
                fragen: [
                    { frage: "28. Was ist die Kernaussage von Prof. Veith zu Beginn?", antworten: ["A. Informationen sind das kostbarste Gut.", "B. In einer Welt des Informationsüberflusses ist menschliche Aufmerksamkeit die knappste Ressource.", "C. Schnelleres Lernen durch Technik."], richtig: 1, begruendung: "Vortrag: 'In unserer voll vernetzten Welt ist es die menschliche Aufmerksamkeit. Wir sprechen von der Attention Economy.'" },
                    { frage: "29. Warum nutzen Plattformen „algorithmische Belohnungssysteme“?", antworten: ["A. Relevante Bildungsinhalte.", "B. Um die Verweildauer der Nutzer durch psychologische Reize künstlich zu verlängern.", "C. Gegen Falschinformationen."], richtig: 1, begruendung: "Vortrag: 'Durch algorithmische Belohnungssysteme wird in unserem Gehirn Dopamin ausgeschüttet...'" },
                    { frage: "30. Welchen Einfluss hat die Aufmerksamkeitsökonomie auf den Journalismus?", antworten: ["A. Nachrichten werden kürzer und oberflächlicher, um die Klickzahlen zu erhöhen.", "B. Tiefgründige Recherchen.", "C. Höhere Qualität."], richtig: 0, begruendung: "Vortrag: 'Der Journalismus steht unter dem Diktat der Klickzahlen. Eine komplexe Analyse verkauft sich schlechter als eine reißerische Schlagzeile.'" },
                    { frage: "31. Was versteht der Redner unter dem Begriff „Infinite Scrolling“?", antworten: ["A. Neue Archivierungsmethode.", "B. Ein technisches Design, das das natürliche Ende einer Informationseinheit verhindert.", "C. Lesehilfe für Blinde."], richtig: 1, begruendung: "Vortrag: 'Wo früher ein Zeitungsartikel endete... gibt es heute keinen natürlichen Stopp-Moment mehr.'" },
                    { frage: "32. Welchen Lösungsvorschlag macht der Redner auf individueller Ebene?", antworten: ["A. Kompletter Verzicht.", "B. Die bewusste Gestaltung von analogen Freiräumen.", "C. Apps blockieren."], richtig: 1, begruendung: "Vortrag: 'Wir müssen eine neue Souveränität entwickeln... Wer nicht entscheidet, worauf er blickt, dem wird diese Entscheidung von einer KI abgenommen.'" }
                ]
            },
            {
                teilName: "Teil 5: Wissenschaftlicher Diskurs (Wachstum & Ökonomie)",
                audioSrc: "de1-teil5.mp3",
                fragen: [
                    { frage: "33. Welches Paradoxon beschreibt Prof. von Hagens zu Beginn?", antworten: ["A. Dass Menschen trotz höherem Einkommen immer weniger konsumieren.", "B. Dass wirtschaftliches Wachstum weltweit steigt, aber die Lebenszufriedenheit stagnieren.", "C. Dass technische Innovationen den Ressourcenverbrauch nicht senken, sondern steigern."], richtig: 2, begruendung: "Vortrag: 'Das Paradoxon... Wir bauen zwar Autos, die weniger Benzin verbrauchen, aber... Am Ende ist der absolute Ressourcenverbrauch höher als zuvor.'" },
                    { frage: "34. Was ist die Hauptkritik am „Grünen Wachstum“ (Green Growth)?", antworten: ["A. Es ist zu teuer für Entwicklungsländer.", "B. Es ist eine Illusion, da die Effizienzgewinne durch Mehrkonsum aufgefressen werden.", "C. Die Technologie ist noch nicht weit genug fortgeschritten."], richtig: 1, begruendung: "Vortrag: 'Wir können die Produktion nicht unendlich entkoppeln... Jedes produzierte Gut benötigt seltene Erden, Wasser und Energie.'" },
                    { frage: "35. Welchen neuen Wohlstandsbegriff schlägt Dr. Martinez vor?", antworten: ["A. Den Besitz von langlebigen Luxusgütern.", "B. Die Souveränität über die eigene Zeit und soziale Bindungen.", "C. Ein staatlich garantiertes Grundeinkommen für alle Bürger."], richtig: 1, begruendung: "Dr. Martinez: 'Echter Wohlstand ist Zeitsouveränität. Die Fähigkeit, weniger zu arbeiten, mehr Zeit für Bildung, Familie...'" }
                ]
            }
        ]
    }
];
