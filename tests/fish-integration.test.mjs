import test from "node:test";
import assert from "node:assert/strict";
import { app } from "./fish-harness.mjs";
const db = (a) => a.sandbox.KapiFish.db;
const plain = (x) => JSON.parse(JSON.stringify(x));
const click = (a, label) =>
  [...a.document.querySelectorAll("button")].find((b) =>
    b.textContent.includes(label),
  );
test("installation keeps archive and legacy saved content byte-for-byte", async () => {
  const old = {
    kapi_hoer_words_v1:
      '[{"de":"my fish","vi":"my note","status":"listening","streak":2,"active":false}]',
    kapi_livetalk_diary_v1:
      '{"sessions":[{"id":"s1","date":"2026-09-29","title":"keep","rows":[{"id":"r1","target":"das Homeoffice","said":"old answer","source":"sprechen","right":2,"nextReview":"2026-10-07"}]}]}',
    kapi_livetalk_gate_v1: '{"permitUntil":1790812800000,"pityPass":true}',
    kapi_schreiben_draft_v2: '{"mytask":{"text":"unfinished"}}',
  };
  const a = app(old);
  await a.flush();
  for (const [k, v] of Object.entries(old)) assert.equal(a.data.get(k), v, k);
  assert.equal(
    a.run(
      `JSON.stringify(Object.fromEntries(${JSON.stringify(a.sourceKeys)}.map(key=>[key,vokabelGruppen[key]])))`,
    ),
    a.snapshot,
  );
  assert.equal(db(a).byTerm("my fish", "hoeren")[0].progress.streak, 2);
  const b = app(Object.fromEntries(a.data));
  await b.flush();
  assert.deepEqual(plain(db(b).read()), plain(db(a).read()));
  assert.deepEqual(a.alerts, []);
});
test("16 new Hören entries save fully, get cooldown, and never enter original source", async () => {
  const a = app();
  await a.flush();
  for (let i = 0; i < 16; i++)
    await a.run(`hoerAddWord('phrase ${i}','meaning ${i}')`);
  await a.flush();
  assert.equal(Object.keys(db(a).read().fish).length, 16);
  assert.equal(db(a).queue("hoeren").length, 0);
  assert.equal(
    db(a)
      .read()
      .history.filter((h) => h.source === "chatgpt").length,
    16,
  );
  assert.equal(a.run("vokabelGruppen.hoerenAktiv.woerter.length"), 0);
  assert.equal(a.run("typeof vokabelGruppen.fishPromoted"), "undefined");
  a.run("showHoerWortschatz()");
  assert.match(a.document.getElementById("buttons").textContent, /0 lượt/);
  assert.deepEqual(a.alerts, []);
});
test("batch checkbox and pasted list both write real ChatGPT reviews, only in chosen pool", async () => {
  const a = app();
  await a.flush();
  const h = db(a).add({
      term: "same phrase",
      skill: "hoeren",
      fromChatGPT: false,
    }).id,
    s = db(a).add({
      term: "same phrase",
      skill: "sprechen",
      fromChatGPT: false,
    }).id;
  const other = db(a).add({
    term: "another phrase",
    skill: "hoeren",
    fromChatGPT: false,
  }).id;
  a.sandbox.KapiFish.open("hoeren");
  const check = a.document.querySelector("input[type=checkbox]");
  check.checked = true;
  check.onchange();
  const batch = a.document.querySelector(".fish-panel > details");
  batch.querySelector("textarea").value = "another phrase";
  const btn = click(a, "Đã quiz ở ChatGPT hôm nay");
  await btn.onclick({ currentTarget: btn });
  await a.flush();
  assert.ok(db(a).read().fish[h].progress.lastChatGPTReview);
  assert.ok(db(a).read().fish[other].progress.lastChatGPTReview);
  assert.equal(db(a).read().fish[s].progress.lastChatGPTReview, null);
  assert.equal(db(a).queue("sprechen").length, 0);
  assert.deepEqual(a.alerts, []);
});
test("legacy games exclude active pool words and reserve before painting", async () => {
  const a = app();
  await a.flush();
  const words = a.run("getAllUniqueVocabWords().slice(0,2)");
  db(a).add({ term: words[0].de, skill: "hoeren", fromChatGPT: false });
  a.run(`flashcardWords=${JSON.stringify(words)};startSpecificQuiz()`);
  await a.flush();
  assert.equal(a.run("quizWords[0].de"), words[1].de);
  assert.equal(db(a).read().history.length, 1);
  a.run("recordVocabAnswer(quizWords[0],true)");
  await a.flush();
  assert.equal(db(a).read().history[0].result, "correct");
  assert.deepEqual(a.alerts, []);
});
test("two browser tabs cannot display the same target concurrently", async () => {
  let tail = Promise.resolve();
  const shared = {
    data: new Map(),
    locks: {
      request: (_name, fn) => {
        const p = tail.then(fn);
        tail = p.catch(() => {});
        return p;
      },
    },
  };
  const a = app({}, true, shared),
    b = app({}, true, shared);
  await a.flush();
  await b.flush();
  const word = a.run("getAllUniqueVocabWords()[0]");
  for (const t of [a, b])
    t.run(`flashcardWords=[${JSON.stringify(word)}];startSpecificQuiz()`);
  await a.flush();
  await b.flush();
  assert.equal(db(a).read().history.length, 1);
  assert.equal(
    [a, b].filter((t) => t.document.getElementById("vokabelInput")).length,
    1,
  );
});
test("ChatGPT cooldown also excludes live gate backlog and context listening", async () => {
  const a = app({
    kapi_hoer_words_v1:
      '[{"de":"same phrase","vi":"same","context":{"audio":"audio/test.mp3","dialogue":"same phrase"}}]',
    kapi_livetalk_diary_v1:
      '{"sessions":[{"id":"s1","date":"2026-09-29","rows":[{"id":"r1","target":"same phrase","source":"sprechen"}]}]}',
  });
  await a.flush();
  const id = db(a).byTerm("same phrase", "sprechen")[0].id;
  db(a).markChatGPT([id], "correct");
  assert.equal(a.run("getLiveTalkGateBacklog().length"), 0);
  a.run(
    "hoerContextSession={keys:['same phrase'],index:0};renderHoerContextPractice()",
  );
  await a.flush();
  assert.equal(db(a).read().history.length, 1);
  assert.deepEqual(a.alerts, []);
});
test("gate retries keep one receipt and preserve three-try mercy workflow", async () => {
  const a = app();
  await a.flush();
  db(a).add({
    term: "in Betracht ziehen",
    skill: "sprechen",
    fromChatGPT: false,
  });
  a.run(
    `liveTalkGate={currentRow:{id:'r',target:'in Betracht ziehen',source:'sprechen'},pool:[],challenge:{prompt:'A complete scenario',instruction:'Try your own sentence',constraints:[]},loading:false,attempts:0};renderLiveTalkGate()`,
  );
  await a.flush();
  const h = db(a).read().history[0];
  db(a).finish(h.owner, false, { amend: true });
  a.run("liveTalkGate.evaluation=null;renderLiveTalkGate()");
  await a.flush();
  assert.equal(a.run("liveTalkGate.currentRow.id"), "r");
  assert.equal(db(a).read().history.length, 1);
  assert.deepEqual(a.alerts, []);
});
test("ancient shows one card at a time, stops at three even after reopening", async () => {
  const a = app();
  await a.flush();
  await a.sandbox.KapiFish.ancient();
  for (let i = 0; i < 3; i++) {
    assert.match(
      a.document.getElementById("feedback-area").textContent,
      new RegExp(`Cá cổ đại ${i + 1}/3`),
    );
    await click(a, "Nhớ và dùng được").onclick();
    await a.flush();
  }
  assert.equal(db(a).ancientRemaining(), 0);
  assert.match(
    a.document.getElementById("feedback-area").textContent,
    /không kéo thêm/,
  );
  await a.sandbox.KapiFish.ancient();
  assert.match(
    a.document.getElementById("feedback-area").textContent,
    /Hết 3 con/,
  );
  assert.equal(Object.keys(db(a).read().fish).length, 0);
});
test("ancient mini-task notes do not enroll a fish without the explicit opt-in button", async () => {
  const a = app();
  await a.flush();
  await a.sandbox.KapiFish.ancient();
  click(a, "Quen nhưng").onclick();
  a.document.querySelector(".fish-panel textarea").value =
    "My practice sentence";
  await click(a, "Lưu câu").onclick();
  await a.flush();
  assert.equal(db(a).read().history[0].note, "My practice sentence");
  assert.equal(Object.keys(db(a).read().fish).length, 0);
});
test("Voi fish correction is saved; repeated clicks do not advance twice", async () => {
  const a = app();
  await a.flush();
  db(a).add({ term: "am Ball bleiben", skill: "sprechen", fromChatGPT: false });
  a.sandbox.fetch = async () => ({
    ok: true,
    json: async () => ({
      evaluation: {
        verdict: "pass",
        targetCheck: "Đạt",
        betterAnswer: "Ich bleibe am Ball.",
        issues: [],
      },
    }),
  });
  await a.sandbox.KapiFish.start("sprechen");
  a.document.querySelector(".fish-panel textarea").value =
    "Ich bleibe am Ball.";
  await click(a, "Gửi Voi").onclick();
  await a.flush();
  assert.equal(db(a).read().history[0].result, "correct");
  assert.equal(db(a).read().history[0].note, "Ich bleibe am Ball.");
  const b = app();
  await b.flush();
  for (const term of ["eins", "zwei", "drei"])
    db(b).add({ term, skill: "hoeren", fromChatGPT: false });
  await b.sandbox.KapiFish.start("hoeren");
  click(b, "Hiện chữ").onclick();
  const rate = click(b, "✅ Nghe ra");
  await Promise.all([rate.onclick(), rate.onclick()]);
  await b.flush();
  assert.equal(db(b).read().history.length, 2);
});
test("old Hören active-learning button can add only to Sprechen, never Vokabeln", async () => {
  const a = app({
    kapi_hoer_words_v1: '[{"de":"my phrase","vi":"my note","active":false}]',
  });
  await a.flush();
  await a.run("hoerPromote('my phrase')");
  await a.flush();
  assert.equal(db(a).byTerm("my phrase", "sprechen").length, 1);
  assert.equal(a.run("vokabelGruppen.hoerenAktiv.woerter.length"), 0);
  assert.equal(a.run("typeof vokabelGruppen.fishPromoted"), "undefined");
});

test('legacy rows with equivalent canonical spelling retain separate source references',async()=>{
 const a=app({kapi_hoer_words_v1:'[{"de":"My phrase","vi":"first"},{"de":"My phrase.","vi":"second"}]'});await a.flush();
 const rows=db(a).byTerm('my phrase','hoeren');assert.equal(rows.length,2);assert.notEqual(rows[0].id,rows[1].id);assert.deepEqual(plain(rows.map(f=>db(a).word(f.id).vi).sort()),['first','second']);assert.equal(db(a).queue('hoeren').length,1);
});
