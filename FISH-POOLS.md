# Cá Béo and Ancient Rediscovery

## Data boundaries

- `vokabel-data.js` and all original vocabulary IDs/groups remain unchanged. The original archive is read-only to this module.
- Hören and Sprechen have independent pool records and progress. A matching spelling is **not** an archive ID or a shared identity; there is no promotion, merge, or archive migration API.
- Existing Hör-Wortschatz and LiveTalk content remains under its original storage keys. The new `kapi_fish_pools_v1` key stores references and additional review metadata. New batch-import content lives only in that new pool collection.
- Deleted legacy rows are not resurrected: reference records whose source no longer exists are excluded.
- Canonical keys normalize Unicode (NFKC), case, whitespace and trailing punctuation solely to exclude duplicate quiz targets. They do not remove articles, infer synonyms or rewrite stored terms.

## ChatGPT reviews

Kapi cannot observe private ChatGPT sessions. The learner communicates reviews using the selected-pool checkbox/paste batch or the import form.

- New imports default to `reviewed` in ChatGPT: two-day cooldown, without pretending an unknown answer was correct.
- Correct: at least three days, or the longer existing spaced-repetition interval.
- Wrong/weak: 24 hours (therefore never the same calendar day).
- Repeating a batch on the same day is idempotent; correcting its result updates that review rather than adding another success.
- The batch changes only the selected skill's progress. A shared comparison ledger prevents any surface from quizzing the same phrase again that day; it does not transfer mastery between skills.
- Pre-existing pool entries retain their saved progress on first installation. Newly saved legacy entries receive the default ChatGPT cooldown. No historical ChatGPT review is fabricated for old entries.

Metadata includes `lastChatGPTReview`, `lastKapiReview`, `chatGPTResult`, `nextKapiEligibleAt`, per-skill counters and status. New fish quizzes use the existing Voi evaluation endpoint for Sprechen, and audio-first self-assessment for Hören. Existing transcript/context audio and Vali's correction/three-attempt/24-hour permit flows remain in place.

## Daily selection

Hören/Sprechen sessions offer up to eight due fish, mixing weak/new/other due entries. ChatGPT reviews do not consume the Kapi quota. Targets are reserved under a same-origin Web Lock **before** rendering and recorded in shared history even if the learner leaves the question. Retries inside that same ongoing question remain possible and use the same receipt.

Archive games exclude active pool matches, today's targets, and recently reviewed archive words. Existing Lesen links and source content remain intact; only eligible review selection changes.

## Ancient Rediscovery

The separate archive entry point presents one word at a time, at most **three presented words per Bangkok calendar day**. Reopening or reloading does not reset that limit. It prioritizes long-unseen items and the existing 😸 usage classification. Unknown historical per-word dates are not invented.

- Remembered: schedule archive rediscovery after 30 days.
- Familiar: offer one short sentence and save the note; no automatic enrollment. A separate explicit button can create a copy in the learner-selected fish pool, leaving the archive intact.
- Forgotten/useful: revisit after seven days.
- Forgotten/not needed: leave sleeping in the archive.

Natural occurrences in a new reading/listening exercise are not quiz reservations.

## Scope and safety

Storage and Web Locks are scoped to the current browser profile and site origin, as with the existing app. There is no cross-device cloud sync and no automatic ChatGPT account integration. Different browser profiles cannot share cooldowns without a future sync service.

Invalid or full new storage fails closed for quiz reservation instead of clearing data or silently allowing duplicate quizzes. Existing content readers remain available. Deploy on HTTPS with Web Locks support.

No new dependency, API key or server configuration is needed. The module is loaded by three added asset tags in `index.html`; the legacy script changes only await Hören save actions and display pool-aware counts/buttons.

## Verification

`npm test` includes pure-core coverage and full app DOM integration, with frozen original vocabulary objects. Scenarios cover separate meanings for the same phrase, new-import cooldown, correct/wrong schedules, the 8-old + 16-new scenario, independent skill progress, cross-tab reservation, legacy data preservation, Voi correction notes and the persistent three-word archive limit.
