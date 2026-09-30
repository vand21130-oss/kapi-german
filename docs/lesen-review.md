# Lesen feedback repair

After submission, all ten existing tasks show each German sentence with a Vietnamese translation. Every graded question points to exact source sentences, underlines the relevant German keywords, and explains the question-to-text paraphrase. Before submission none of this is shown. Both daily reading cards use the same renderer. Source texts, answers, scoring and daily selection are unchanged.

Submitting or navigating away stops and clears the Lesen clock. Daily reward stories have manual playback with pause/resume/stop, sentence-level bilingual notes and contextual vocabulary examples. The pigeon interview story uses the supplied recording at `audio/vali-stories/die-taube-im-bewerbungsgespraech.m4a`; other stories retain German browser speech. Browser speech requires an installed German browser/system voice; recorded playback does not. Missing voices and playback errors are displayed inline. Additional recordings can be mapped by exact story title in `DAILY_STORY_RECORDINGS`.

Existing storage remains intact: pink highlights in `kapi_lesen_highlights_v1`; explicitly added unknown words in `kapi_lesen_pending_words_v1`; recognized source words in each history record's `reviewWords` in `kapi_lesen_history_v1`. The existing gate samples three words from an earlier day's eligible reading record. With fewer than three review words there is no gate. Original pass rules, 24-hour permits and the cross-skill vocabulary ledger are unchanged. The completion view explains this flow and links to the original warehouse entries. No new vocabulary store or Vali popup is introduced.

Checks:

```sh
node --check kapi-logic.js
node --check lesen-review.js
node --test --test-isolation=none tests/lesen-review-data.test.mjs tests/lesen-review-runtime.test.mjs tests/gate-auth.test.mjs tests/vocab-links-core.test.mjs
```

Data tests check every authored translation's sentence count and every evidence keyword against the unchanged German source. Runtime tests check answer hiding, bilingual evidence, clock clearing, and speech lifecycle with mocked browser speech. They do not establish audible playback or real-browser layout. The full existing integration suite additionally requires `npm ci` dependencies, including linkedom and @vercel/functions.
