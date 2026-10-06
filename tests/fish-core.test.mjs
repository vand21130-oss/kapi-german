import test from "node:test";
import assert from "node:assert/strict";
import C from "../fish-core.js";
import V from "../vocab-links-core.js";
function app() {
  const words = [
    { de: "zur Verfügung stehen", vi: "có sẵn" },
    { de: "eine Entscheidung treffen", vi: "quyết định" },
    { de: "in Betracht ziehen", vi: "cân nhắc" },
    { de: "sich Mühe geben", vi: "cố gắng" },
    { de: "auf etwas verzichten", vi: "từ bỏ" },
  ];
  words.forEach(Object.freeze);
  Object.freeze(words);
  const groups = { main: { titel: "Original", woerter: words } },
    initial = JSON.stringify(groups),
    index = V.createIndex(groups),
    data = new Map([["old", "untouched"]]);
  let now = Date.parse("2026-10-06T03:00:00Z"),
    legacy = [];
  const storage = {
    getItem: (k) => data.get(k) || null,
    setItem: (k, v) => data.set(k, v),
  };
  const db = C.create(index, storage, () => now, {
    legacy: () => legacy,
    priority: (e) => (e.word.de === "sich Mühe geben" ? 1 : 0),
  });
  return {
    db,
    data,
    index,
    groups,
    initial,
    storage,
    setDate: (d) => (now = Date.parse(d)),
    setLegacy: (rows) => (legacy = rows),
  };
}
test("fixed archive and two fish pools keep independent content and identities", () => {
  const a = app(),
    h = a.db.add({
      term: "zur Verfügung stehen",
      meaning: "nghĩa riêng Hören",
      skill: "hoeren",
    }),
    s = a.db.add({
      term: "zur Verfügung stehen",
      meaning: "nghĩa riêng Sprechen",
      skill: "sprechen",
    });
  assert.notEqual(h.id, s.id);
  assert.equal(a.db.word(h.id).vi, "nghĩa riêng Hören");
  assert.equal(a.db.word(s.id).vi, "nghĩa riêng Sprechen");
  assert.equal(
    a.index.entries.get(V.idFor("zur Verfügung stehen")).word.vi,
    "có sẵn",
  );
  assert.equal(JSON.stringify(a.groups), a.initial);
  assert.equal(a.data.get("old"), "untouched");
  assert.equal(a.db.promote, undefined);
  assert.equal(a.db.read().promoted, undefined);
});
test("new ChatGPT import is a real review and cannot be quizzed immediately", () => {
  const a = app();
  const r = a.db.add({ term: "am Ball bleiben", skill: "hoeren" }),
    f = a.db.read().fish[r.id];
  assert.equal(f.progress.chatGPTReviewCount, 1);
  assert.equal(f.progress.chatGPTResult, "reviewed");
  assert.equal(f.progress.nextKapiEligibleAt, "2026-10-08T03:00:00.000Z");
  assert.equal(a.db.queue("hoeren").length, 0);
  assert.equal(
    a.db.claim("am Ball bleiben", "hoeren", "fish-pool", "audio", "a", {
      poolId: r.id,
    }).ok,
    false,
  );
  a.setDate("2026-10-08T03:01:00Z");
  assert.equal(a.db.queue("hoeren")[0], r.id);
});
test("correct batch gets at least 3 days; wrong returns tomorrow; skill progress is independent", () => {
  const a = app(),
    h = a.db.add({
      term: "in Betracht ziehen",
      skill: "hoeren",
      fromChatGPT: false,
    }).id,
    s = a.db.add({
      term: "in Betracht ziehen",
      skill: "sprechen",
      fromChatGPT: false,
    }).id;
  a.db.markChatGPT([h], "correct");
  assert.equal(a.db.read().fish[h].progress.correctCount, 1);
  assert.equal(a.db.read().fish[s].progress.correctCount, 0);
  assert.equal(a.db.queue("sprechen").length, 0);
  a.setDate("2026-10-07T04:00:00Z");
  assert.equal(a.db.queue("sprechen").length, 1);
  assert.equal(a.db.queue("hoeren").length, 0);
  a.db.markChatGPT([h], "wrong");
  assert.equal(a.db.read().fish[h].progress.status, "weak");
  assert.equal(a.db.queue("hoeren").length, 0);
  a.setDate("2026-10-08T04:01:00Z");
  assert.equal(a.db.queue("hoeren").length, 1);
});
test("8 reviewed + 16 imported do not consume Kapi quota; older due fish remain available", () => {
  const a = app(),
    old = [];
  for (let i = 0; i < 12; i++)
    old.push(
      a.db.add({ term: "old " + i, skill: "hoeren", fromChatGPT: false }).id,
    );
  a.db.markChatGPT(old.slice(0, 8), "correct");
  for (let i = 0; i < 16; i++) a.db.add({ term: "new " + i, skill: "hoeren" });
  assert.equal(Object.keys(a.db.read().fish).length, 28);
  assert.deepEqual(a.db.queue("hoeren").sort(), old.slice(8).sort());
  assert.equal(
    a.db.read().history.filter((h) => h.source === "chatgpt").length,
    24,
  );
});
test("canonical comparison ignores case, Unicode and terminal punctuation without merging data", () => {
  const a = app();
  a.db.add({
    term: "  EINE Entscheidung treffen!!! ",
    skill: "hoeren",
    fromChatGPT: false,
  });
  assert.ok(
    !a.db.archive(10).some((e) => e.word.de === "eine Entscheidung treffen"),
  );
  assert.equal(a.index.entries.size, 5);
  assert.equal(C.canonical(" U\u0308berlegen. "), C.canonical("überlegen"));
  a.db.add({
    term: "Entscheidung treffen",
    skill: "sprechen",
    fromChatGPT: false,
  });
  assert.equal(Object.keys(a.db.read().fish).length, 2);
});
test("archive daily limit persists across reloads and only presents three", () => {
  const a = app();
  for (const [i, e] of a.db.archive(3).entries()) {
    assert.equal(
      a.db.claim(e.word, "archive", "ancient", "recall", "a" + i, {
        archive: true,
      }).ok,
      true,
    );
    a.db.archiveDisposition("a" + i, "remembered");
  }
  assert.equal(a.db.ancientRemaining(), 0);
  const b = C.create(a.index, a.storage, () =>
    Date.parse("2026-10-06T04:00:00Z"),
  );
  assert.equal(b.ancientRemaining(), 0);
  const e = b.archive(1)[0];
  assert.equal(
    b.claim(e.word, "archive", "ancient", "recall", "four", { archive: true })
      .ok,
    false,
  );
  assert.equal(Object.keys(b.read().fish).length, 0);
});
test("ancient useful words return in 7 days; sleeping words stay asleep; neither enters a pool", () => {
  const a = app();
  a.db.claim("sich Mühe geben", "archive", "ancient", "recall", "a", {
    archive: true,
  });
  a.db.archiveDisposition("a", "useful");
  a.db.claim("in Betracht ziehen", "archive", "ancient", "recall", "b", {
    archive: true,
  });
  a.db.archiveDisposition("b", "sleep");
  a.setDate("2026-10-12T03:01:00Z");
  assert.equal(
    a.db.eligible("sich Mühe geben", null, { archive: true }),
    false,
  );
  a.setDate("2026-10-13T03:01:00Z");
  assert.equal(a.db.eligible("sich Mühe geben", null, { archive: true }), true);
  assert.equal(
    a.db.eligible("in Betracht ziehen", null, { archive: true }),
    false,
  );
  assert.equal(Object.keys(a.db.read().fish).length, 0);
});
test("existing legacy content remains by reference, new saves receive cooldown only once", () => {
  const a = app();
  const original = { de: "legacy term", vi: "keep" };
  a.setLegacy([
    {
      id: "old",
      word: original,
      skill: "hoeren",
      seed: { status: "stable", correctCount: 4, nextDue: "2026-10-09" },
    },
  ]);
  a.db.syncLegacy();
  assert.equal(a.db.read().fish.old.word, undefined);
  assert.equal(a.db.word("old"), original);
  assert.equal(a.db.read().history.length, 0);
  a.setLegacy([
    { id: "old", word: original, skill: "hoeren" },
    { id: "new", word: { de: "new entry", vi: "new" }, skill: "sprechen" },
  ]);
  a.db.syncLegacy();
  a.db.syncLegacy();
  assert.equal(a.db.read().history.length, 1);
  assert.equal(a.db.read().fish.old.progress.correctCount, 4);
  assert.equal(a.db.queue("sprechen").length, 0);
});
test("repeat batches are idempotent and correcting the result does not inflate totals", () => {
  const a = app(),
    id = a.db.add({ term: "test", skill: "hoeren", result: "correct" }).id;
  a.db.markChatGPT([id, id], "correct");
  assert.equal(a.db.read().fish[id].progress.correctCount, 1);
  a.db.markChatGPT([id], "wrong");
  const p = a.db.read().fish[id].progress;
  assert.equal(p.correctCount, 0);
  assert.equal(p.wrongCount, 1);
  assert.equal(p.chatGPTReviewCount, 1);
});
test("claims prevent cross-tab races; same-question remediation stays one review", () => {
  const a = app(),
    id = a.db.add({ term: "test", skill: "sprechen", fromChatGPT: false }).id,
    b = C.create(a.index, a.storage, () => Date.parse("2026-10-06T03:00:00Z"));
  assert.equal(
    a.db.claim("test", "sprechen", "gate", "sentence", "one", { poolId: id })
      .ok,
    true,
  );
  assert.equal(b.claim("test", "hoeren", "other", "listen", "two").ok, false);
  a.db.finish("one", false, { amend: true });
  a.db.finish("one", true, { amend: true, note: "Fixed sentence", used: true });
  assert.equal(a.db.read().history.length, 1);
  assert.equal(a.db.read().fish[id].progress.correctCount, 1);
  assert.equal(a.db.read().fish[id].progress.wrongCount, 0);
});
test("bad storage fails closed; no old data is erased", () => {
  const a = app();
  a.data.set(C.KEY, "broken");
  assert.throws(() => a.db.add({ term: "test", skill: "hoeren" }));
  assert.equal(a.data.get(C.KEY), "broken");
  assert.equal(a.data.get("old"), "untouched");
  const b = C.create(a.index, {
    getItem: () => null,
    setItem: () => {
      throw Error("quota");
    },
  });
  assert.throws(() => b.add({ term: "test", skill: "hoeren" }), /quota/);
});
