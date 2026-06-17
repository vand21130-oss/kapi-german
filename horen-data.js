const alleHoerenPruefungen = [
    {
        id: 1,
        niveau: "B2",
        name: "Đề 1: Gesellschaft & Wirtschaft (Cây nhà lá vườn 🌿)",
        teile: [
            {
                teilName: "Teil 1: Aktuelle Meldungen aus Gesellschaft und Wirtschaft",
                audioSrc: "de1-teil1.mp3", // Về sau có file audio thì sửa tên ở đây nhé
                fragen: [
                    { frage: "1. Warum entscheiden sich wieder mehr Menschen für eine handwerkliche Ausbildung?", antworten: ["A. Weil ein Studium heute keine Garantie mehr für eine stabile Anstellung ist.", "B. Weil die Arbeit im Handwerk körperlich weniger anstrengend geworden ist als früher.", "C. Weil die Hörsäle an den Universitäten aus Sicherheitsgründen geschlossen wurden."], richtig: 0 },
                    { frage: "2. Was sagt der Text über die Bezahlung im Handwerk aus?", antworten: ["A. Sie ist trotz der Komplexität der Aufgaben immer noch niedriger als in akademischen Berufen.", "B. Spezialisierte Handwerker verdienen oft mehr als Berufseinsteiger mit Universitätsabschluss.", "C. Die Löhne sind nur deshalb gestiegen, weil die Digitalisierung Kosten spart."], richtig: 1 },
                    { frage: "3. Was ist das Hauptproblem für die Zukunft des Sektors?", antworten: ["A. Dass die Digitalisierung viele Arbeitsplätze im Handwerk überflüssig macht.", "B. Dass junge Menschen trotz guter Verdienstmöglichkeiten das Image des Handwerks skeptisch sehen.", "C. Dass es zu viele staatliche Förderungen für Geisteswissenschaftler gibt."], richtig: 1 },
                    { frage: "4. Was kritisiert der Text am Begriff „klimaneutral“?", antworten: ["A. Dass er nur für Produkte aus der Schwerindustrie verwendet werden darf.", "B. Dass die gesetzlichen Regelungen für seine Verwendung unzureichend sind.", "C. Dass die Verbraucher den Begriff nicht verstehen und deshalb ignorieren."], richtig: 1 },
                    { frage: "5. Wie gehen viele Konzerne mit dem Thema Nachhaltigkeit um?", antworten: ["A. Sie verändern ihre gesamte Produktion, um CO2-Zertifikate zu sparen.", "B. Sie setzen auf Werbung und Ausgleichszahlungen statt auf reale Veränderungen.", "C. Sie arbeiten eng mit staatlichen Organen zusammen, um neue Label zu entwickeln."], richtig: 1 },
                    { frage: "6. Welche Lösung wird im Text vorgeschlagen?", antworten: ["A. Die Verbraucher sollten sich besser über Produktionsketten informieren.", "B. Die Preise für grüne Produkte müssten drastisch erhöht werden.", "C. Eine verpflichtende Überprüfung durch neutrale Instanzen muss eingeführt werden."], richtig: 2 },
                    { frage: "7. Welchen Vorteil nennen die Befürworter der bargeldlosen Gesellschaft?", antworten: ["A. Die Förderung der Anonymität beim täglichen Einkauf.", "B. Eine effektivere Kontrolle von illegalen Beschäftigungsverhältnissen.", "C. Dass digitale Systeme für ältere Menschen einfacher zu bedienen sind."], richtig: 1 },
                    { frage: "8. Was ist die größte Sorge der Kritiker?", antworten: ["A. Dass die Banken zu hohe Gebühren für digitale Zahlungen verlangen könnten.", "B. Dass der Datenschutz verloren geht und das Finanzverhalten überwachbar wird.", "C. Dass die Technik bei einem Stromausfall komplett versagen würde."], richtig: 1 },
                    { frage: "9. Warum warnt der Einzelhandelsverband vor der Umstellung?", antworten: ["A. Weil der Einzelhandel durch digitale Zahlungen weniger Gewinn macht.", "B. Weil bestimmte Bevölkerungsgruppen vom wirtschaftlichen Leben abgeschnitten werden könnten.", "C. Weil die Infrastruktur in den Städten für bargeldloses Zahlen noch nicht ausreicht."], richtig: 1 },
                    { frage: "10. Warum ist die Energiebilanz von Urban Farming oft negativ?", antworten: ["A. Weil der Transport der Ernte in die Innenstadt zu viel Treibstoff verbraucht.", "B. Weil die technische Instandhaltung der Anlagen extrem viel Energie benötigt.", "C. Weil die Bauern auf dem Land effizientere Traktoren benutzen als die Städter."], richtig: 1 },
                    { frage: "11. Für welche Produkte eignet sich Vertical Farming momentan am ehesten?", antworten: ["A. Für preisgünstige Grundnahrungsmittel wie Getreide.", "B. Für spezielle Produkte, die zu einem hohen Preis verkauft werden können.", "C. Für Obstsorten, die besonders viel Platz zum Wachsen benötigen."], richtig: 1 },
                    { frage: "12. Was ist laut Text das größte Hindernis für den großflächigen Anbau in Städten?", antworten: ["A. Der Mangel an Fachkräften, die sich mit städtischer Botanik auskennen.", "B. Die hohen finanziellen Belastungen durch die Immobilienpreise in der Stadt.", "C. Der Widerstand der traditionellen Landwirte gegen die neue Konkurrenz."], richtig: 1 },
                    { frage: "13. Wie hat sich die Bedeutung von Bildungsabschlüssen laut Text verändert?", antworten: ["A. Ein Diplom garantiert heute lebenslange Sicherheit im gewählten Beruf.", "B. Das Wissen aus der Ausbildung veraltet heute wesentlich schneller als früher.", "C. Universitätsabschlüsse sind heute wertvoller, da sie seltener geworden sind."], richtig: 1 },
                    { frage: "14. Was wird an der aktuellen Praxis der Weiterbildung kritisiert?", antworten: ["A. Dass die Unternehmen zu viele Fortbildungen während der Arbeitszeit verlangen.", "B. Dass die Kosten und der Zeitaufwand immer häufiger bei den Angestellten liegen.", "C. Dass es keine staatlichen Angebote für die berufliche Qualifizierung gibt."], richtig: 1 },
                    { frage: "15. Was ist das Risiko der beschriebenen „Bildungsschere“?", antworten: ["A. Dass Menschen mit geringem Einkommen den Anschluss am Arbeitsmarkt verlieren.", "B. Dass gut verdienende Arbeitnehmer ihre Freizeit nur noch mit Lernen verbringen.", "C. Dass die Qualität der universitären Lehre durch zu viele Fortbildungen sinkt."], richtig: 0 }
                ]
            },
            {
                teilName: "Teil 2: Der Experten-Vortrag (Präsentation)",
                audioSrc: "de1-teil2.mp3",
                fragen: [
                    { frage: "16. Warum ist die „Fear of Failure“ in Europa ausgeprägter als in den USA?", antworten: ["A. Weil es in Europa weniger staatliche Unterstützung für junge Gründer gibt.", "B. Weil das soziale Ansehen in Europa stärker an beruflichen Erfolg gekoppelt ist.", "C. Weil amerikanische Banken Kredite leichter vergeben als europäische Institute."], richtig: 1 },
                    { frage: "17. Was versteht der Redner unter einer „positiven Fehlerkultur“?", antworten: ["A. Dass Fehler absichtlich gemacht werden sollten, um daraus zu lernen.", "B. Dass Misserfolge offen kommuniziert werden, um systemische Schwachstellen zu finden.", "C. Dass Mitarbeiter für Fehler nicht mehr finanziell haftbar gemacht werden dürfen."], richtig: 1 },
                    { frage: "18. Welchen Fehler machen viele Gründer laut dem Experten in der Anfangsphase?", antworten: ["A. Sie investieren zu viel Geld in Marketing, statt in die Produktentwicklung.", "B. Sie halten zu lange an einer ursprünglichen Idee fest, die am Markt vorbeigeht.", "C. Sie stellen zu viele Mitarbeiter ein, bevor das erste Produkt fertig ist."], richtig: 1 },
                    { frage: "19. Wie beeinflusst die Digitalisierung den Umgang mit Fehlern?", antworten: ["A. Durch Datenanalysen können Fehlentscheidungen heute schneller korrigiert werden.", "B. Die digitale Überwachung führt dazu, dass Mitarbeiter Fehler häufiger verstecken.", "C. Softwarefehler verursachen heute größere finanzielle Schäden als früher."], richtig: 0 },
                    { frage: "20. Was empfiehlt der Experte etablierten Großunternehmen?", antworten: ["A. Den Fokus wieder mehr auf Tradition und Sicherheit zu legen.", "B. Kleine, unabhängige Teams zu bilden, die wie Start-ups agieren dürfen.", "C. Die Hierarchien zu verstärken, um Fehlentscheidungen zu vermeiden."], richtig: 1 },
                    { frage: "21. Welches Fazit zieht der Redner am Ende seines Vortrags?", antworten: ["A. Dass Scheitern nur dann wertvoll ist, wenn eine tiefgreifende Analyse erfolgt.", "B. Dass jeder Gründer mindestens einmal gescheitert sein muss, um Erfolg zu haben.", "C. Dass die Politik die Risiken von Start-ups komplett übernehmen sollte."], richtig: 0 }
                ]
            },
            {
                teilName: "Teil 3: Erweiterte Diskussion (Wer sagt was?)",
                audioSrc: "de1-teil3.mp3",
                fragen: [
                    { frage: "22. Die soziale Isolierung im Homeoffice schadet der Identifikation mit dem Betrieb.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1 },
                    { frage: "23. Kreative Prozesse lassen sich nicht erfolgreich in digitale Formate pressen.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1 },
                    { frage: "24. Die Wahl des Arbeitsorts ist heute ein entscheidender Faktor im Recruiting.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2 },
                    { frage: "25. Das Festhalten an Anwesenheitskontrolle ist ein Zeichen von mangelnder Modernität.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2 },
                    { frage: "26. Die häusliche Umgebung bietet oft keine professionellen Arbeitsbedingungen.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1 },
                    { frage: "27. Nur ein hybrides Modell wird den unterschiedlichen Bedürfnissen gerecht.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2 },
                    { frage: "28. Das Management muss die Leistung anhand von Resultaten neu definieren.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2 },
                    { frage: "29. Homeoffice spart den Unternehmen langfristig erhebliche Fixkosten für Büromieten.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 2 },
                    { frage: "30. Die Trennung von Privat- und Berufsleben wird durch Remote Work gefährlich instabil.", antworten: ["Frau Weber", "Dr. Schmidt", "Frau Lange"], richtig: 1 }
                ]
            },
            {
                teilName: "Teil 4: Der Experten-Vortrag (Attention Economy)",
                audioSrc: "de1-teil4.mp3",
                fragen: [
                    { frage: "31. Was ist die Kernaussage von Prof. Veith zu Beginn seines Vortrags?", antworten: ["A. Informationen sind im Internet das kostbarste Gut geworden.", "B. In einer Welt des Informationsüberflusses ist menschliche Aufmerksamkeit die knappste Ressource.", "C. Die Technologie hat dazu geführt, dass Menschen heute schneller lernen können."], richtig: 1 },
                    { frage: "32. Warum nutzen Plattformen „algorithmische Belohnungssysteme“?", antworten: ["A. Um die Nutzererfahrung durch relevante Bildungsinhalte zu verbessern.", "B. Um die Verweildauer der Nutzer durch psychologische Reize künstlich zu verlängern.", "C. Um sicherzustellen, dass keine Falschinformationen verbreitet werden."], richtig: 1 },
                    { frage: "33. Welchen Einfluss hat die „Aufmerksamkeitsökonomie“ auf den Journalismus?", antworten: ["A. Nachrichten werden kürzer und oberflächlicher, um die Klickzahlen zu erhöhen.", "B. Journalisten investieren mehr Zeit in tiefgründige Recherchen.", "C. Die Qualität der Berichterstattung ist durch die Digitalisierung insgesamt gestiegen."], richtig: 0 },
                    { frage: "34. Was versteht der Redner unter dem Begriff „Infinite Scrolling“?", antworten: ["A. Eine neue Methode zur Archivierung von großen Datenmengen.", "B. Ein technisches Design, das das natürliche Ende einer Informationseinheit verhindert.", "C. Ein Programm, das blinden Menschen das Lesen im Internet erleichtert."], richtig: 1 },
                    { frage: "35. Welche gesundheitlichen Folgen werden im Vortrag explizit genannt?", antworten: ["A. Eine Zunahme von physischen Erkrankungen wie Rückenschmerzen.", "B. Chronische Konzentrationsstörungen und eine verminderte Fähigkeit zur Tiefenreflexion.", "C. Eine allgemeine Verbesserung der Reaktionsschnelligkeit durch ständige Reize."], richtig: 1 },
                    { frage: "36. Wie reagiert die Wirtschaft laut Prof. Veith auf diesen Trend?", antworten: ["A. Unternehmen verzichten zunehmend auf digitale Werbung.", "B. Das Marketing konzentriert sich fast ausschließlich auf emotionale Schockmomente.", "C. Firmen investieren Milliarden, um Sekunden der menschlichen Konzentration zu „kaufen“."], richtig: 2 },
                    { frage: "37. Was kritisiert der Experte am Bildungssektor?", antworten: ["A. Dass Schulen zu wenig Computer zur Verfügung haben.", "B. Dass Lehrpläne die Vermittlung von „Aufmerksamkeitsdisziplin“ bisher vernachlässigen.", "C. Dass Lehrer zu viel Zeit mit sozialen Medien verbringen."], richtig: 1 },
                    { frage: "38. Welchen Lösungsvorschlag macht der Redner auf individueller Ebene?", antworten: ["A. Den kompletten Verzicht auf Smartphones und das Internet.", "B. Die bewusste Gestaltung von „digitalen Fastenperioden“ und analogen Freiräumen.", "C. Die Installation von Apps, die die Nutzungszeit automatisch blockieren."], richtig: 1 },
                    { frage: "39. Welche Rolle sollte der Staat laut Prof. Veith einnehmen?", antworten: ["A. Er sollte den Betrieb von sozialen Netzwerken komplett verbieten.", "B. Er muss strengere Richtlinien für manipulatives Design in der Softwareentwicklung vorgeben.", "C. Er sollte Internetzugang für alle Bürger kostenlos machen."], richtig: 1 },
                    { frage: "40. Welches Fazit zieht der Redner am Ende?", antworten: ["A. Die digitale Revolution ist gescheitert und wir sollten zur analogen Welt zurückkehren.", "B. Wir müssen die Kontrolle über unsere Wahrnehmung von den Algorithmen zurückerobern.", "C. Die menschliche Psyche wird sich in wenigen Jahren perfekt an den Stress anpassen."], richtig: 1 }
                ]
            },
            {
                teilName: "Teil 5: Wissenschaftlicher Diskurs (Wachstum & Ökonomie)",
                audioSrc: "de1-teil5.mp3",
                fragen: [
                    { frage: "41. Welches Paradoxon beschreibt Prof. von Hagens zu Beginn?", antworten: ["A. Dass Menschen trotz höherem Einkommen immer weniger konsumieren.", "B. Dass wirtschaftliches Wachstum weltweit steigt, aber die Lebenszufriedenheit stagnieren.", "C. Dass technische Innovationen den Ressourcenverbrauch nicht senken, sondern steigern."], richtig: 2 },
                    { frage: "42. Was ist die Hauptkritik am „Grünen Wachstum“ (Green Growth)?", antworten: ["A. Es ist zu teuer für Entwicklungsländer.", "B. Es ist eine Illusion, da die Effizienzgewinne durch Mehrkonsum aufgefressen werden.", "C. Die Technologie ist noch nicht weit genug fortgeschritten."], richtig: 1 },
                    { frage: "43. Welchen neuen Wohlstandsbegriff schlägt Dr. Martinez vor?", antworten: ["A. Den Besitz von langlebigen Luxusgütern.", "B. Die Souveränität über die eigene Zeit und soziale Bindungen.", "C. Ein staatlich garantiertes Grundeinkommen für alle Bürger."], richtig: 1 }
                ]
            }
        ]
    }
];
