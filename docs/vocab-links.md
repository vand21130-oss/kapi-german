# Vokabeln connections

`vokabel-data.js` remains the source of truth. The connection layer reads it before
the existing Hören/Lesen runtime views are created. A canonical ID is derived from
the normalized full German source label; moving a word between groups does not
change that ID. Equal source labels share metadata while retaining all locations.
The original word objects, meanings, images and usage classifier stay intact.

`vocab-links-core.js` handles source references, conservative text recognition,
encounter counters, game selection and matching with existing activities.
`vocab-links.js` observes the existing save/render functions. Its optional hooks
preserve their arguments, results and errors. Connection failures never stop the
original lesson. `vocab-links.css` styles only the added collapsed hints.

Only `kapi_vocab_links_v1` is written by this layer. It contains word IDs,
skill/source references and counters, not copied German/Vietnamese entries or
user essays. Existing saved words, notes, highlights, drafts, review permits and
reward keys are not migrated, replaced or cleared. Existing histories are read
once to backfill references; source/day receipts deduplicate repeated views and
saves. Lifetime totals stay; daily detail is retained for 90 days.

An encounter or production counter does not certify a correct sentence or change
mastery. Recognition supports exact lemmas, grammar annotations, some plurals and
conjugations/collocations. It is not a complete German lemmatizer; ambiguous labels
and unrecognized forms are left unlinked. Unknown words are never auto-added.

The existing game draw gets a mix of recent cross-skill words and older words
within its selected pool. Counts, distractors, marking and rewards stay as before.
Koffer may use a recent word encountered in two skills for a review slot. The
daily mission draw is excluded from these changes. Related activities are optional
links into the existing catalog; Lesen links still call its original review gate.

Validation:

```sh
npm ci
npm run check
node --test --test-isolation=none tests/*.test.mjs
```

The DOM integration tests execute the actual legacy scripts against a parsed
`index.html`. Linkedom is a development dependency only. These tests cover saved
data retention, hidden answers, all four skill connections, the 24-hour permit,
original game sizes and an identical daily mission draw with or without the layer.
