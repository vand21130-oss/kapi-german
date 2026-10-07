# Goethe listening replay packages

The four shelves use `window.KapiGoetheListeningLessons` in
`goethe-listening-data.js`. The initial library is deliberately empty: no real
Teil 4 package has been supplied yet. The legacy library remains accessible
while empty; its files and saved state are not deleted.

Each complete lesson has:
- `id`: unique, permanent string (also used by replay history)
- `teil`: integer 1–4
- `title`: display title
- `audio`: local `audio/` or `assets/` path, or HTTPS URL
- `instructions`: optional text
- `questions`: array of `{prompt, options: [string, ...], answer, explanation?}`;
  `answer` is a zero-based option index. True/false and multiple choice both use
  options, preserving the supplied question wording and numbering in `prompt`.
- `transcript`: ordered `{de, vi}` sentence/utterance pairs

Import the user's audio, questions, answer key and transcript together. Translate
missing Vietnamese lines and check against the German original. Confirm playback
with the real file before retiring the old library. No timestamps are required.

The player hides answers until all questions are answered and submitted. Replay
shows only the audio and bilingual transcript, with a return-to-results control.
History is isolated in `kapi_goethe_replay_v1`; Fish pools and vocabulary stores
are untouched. The daily suggestion is stable for the Bangkok calendar day,
favors least recently completed lessons and avoids the last completed Teil when
alternatives exist. Learners can also choose a shelf manually.

Validation: `node --test tests/goethe-listening.test.mjs` and `npm test`.
These exercise DOM flow and saved history, not real browser audio decoding.
