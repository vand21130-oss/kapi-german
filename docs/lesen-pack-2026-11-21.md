# Kapi Lesen practice pack — 2026-11-21

Five original practice tasks, one per part, appended to the existing ten tasks.
These are not official Goethe exam papers and have not been calibrated with test takers.

| Teil | Topic | Questions | Suggested minutes |
| --- | --- | --- | --- |
| 1 | Wie viel Nähe tut der Nachbarschaft gut? | 1–9 | 18 |
| 2 | Leihen braucht mehr als ein Regal | 10–15 | 12 |
| 3 | Warum wir vereinbarte Termine verpassen | 16–21 | 12 |
| 4 | Soll die Bibliothek sonntags öffnen? | 22–27 | 12 |
| 5 | Nutzungsordnung für den Gemeinschaftsraum | 28–30 | 6 |

## Editorial approach

The official adult model below was inspected for the five task formats, question counts,
suggested times, repeated person assignments, sentence cohesion, distractors, opinion
matching and rules/headings matching. All German passages and questions in this pack
are newly written. The sample's texts and answers were not copied.

- Official format reference: https://bfu.goethe.de/b2_mod_2MX6/lesen.php
- So geht’s zu B2 publisher description: https://www.klett-sprachen.de/so-geht-s-zu-b2/t-492/9783126751568
- Werkstatt B2 publisher description: https://praxis.gr/werkstatt-b2-lehrbuch-student-s-book-en
- Aspekte neu B2 publisher description: https://www.klett-sprachen.de/aspekte-neu-b2/t-166/9783126050265

The publisher descriptions were consulted for positioning only; this is not a claim
to have reviewed or reproduced their complete books. Goethe's model is the direct
format reference. Everyday topics, subordinate clauses, concessive statements,
pronoun references and scope/condition distinctions guide the original writing.

Every source sentence and selectable option has a Vietnamese translation after
submission. Each answer has exact source evidence and an explanation of the
paraphrase or competing interpretation. In Teil 2, evidence connects both sides
of a gap, not merely a shared keyword. In Teil 4 and 5 the example answer is not
reused, and the specified number of unused options is retained.

## Integration and verification

- Existing ten task records and their review metadata are unchanged.
- The existing selector reads the same LESEN_B2_TASKS array, now with 15 tasks,
  three per Teil. No scheduling, storage, scoring or vocabulary code is changed.
- A saved daily plan remains valid; additions do not replace today's chosen tasks.
- The instruction on each new task labels it as original Kapi practice.
- Automated tests exercise real part renderers, hidden solutions before submission,
  bilingual/evidence rendering after submission, correct and wrong answer scoring,
  selection of each new task, and preservation of a saved daily plan.
- Tests use an isolated runtime; they do not claim a live signed-in browser check.

Run: `node --test tests/lesen-pack-20261121.test.mjs tests/lesen-review-data.test.mjs tests/lesen-review-runtime.test.mjs`
