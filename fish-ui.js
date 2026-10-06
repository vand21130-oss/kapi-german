/* Two independent systems: fixed Vokabeln and skill fish. No promotion or archive migration. */
(function () {
  "use strict";
  const C = window.KapiFishCore,
    index = window.KapiVocabLinks.createIndex(vokabelGruppen);
  let legacyRows = [];
  const db = C.create(index, localStorage, () => Date.now(), {
    legacy: () => legacyRows,
    priority: (e) =>
      classifyGermanUsage(e.word, e.locations[0]?.groupKey).icon === "😸"
        ? 2
        : classifyGermanUsage(e.word, e.locations[0]?.groupKey).icon === "😺"
          ? 1
          : 0,
  });
  const labels = { hoeren: "🎧 Hören", sprechen: "🗣️ Sprechen" },
    esc = (v) =>
      String(v ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  const sessions = new Map();
  let seq = 0,
    quiz = null,
    screen = 0,
    navigation = 0;
  const tabId =
    globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
  const lock = (fn) =>
    navigator.locks?.request
      ? navigator.locks.request("kapi-fish-ledger", fn)
      : Promise.reject(
          Error(
            "Cần trình duyệt hỗ trợ Web Locks để tránh quiz trùng giữa các tab.",
          ),
        );
  const fail = (e) =>
    alert(
      e?.message || "Chưa lưu được lịch ôn. Hãy thử lại; dữ liệu cũ vẫn còn.",
    );
  const term = (w) => (typeof w === "string" ? w : w?.de || w?.target || "");
  const eligible = (w, skill, archive = false) =>
    !!term(w) && db.eligible(term(w), skill, { archive });
  function wrap(name, fn) {
    const old = window[name];
    if (typeof old === "function")
      window[name] = function (...args) {
        return fn(old.bind(this), args);
      };
  }
  function after(name, fn) {
    wrap(name, (old, args) => {
      const result = old(...args);
      if (result?.then)
        return result.then((value) => {
          fn(args, value);
          return value;
        });
      fn(args, result);
      return result;
    });
  }
  function refreshLegacy() {
    const seed = (w) => ({
      status: w.retired
        ? "dormant"
        : w.status === "graduated"
          ? "stable"
          : w.wrong > w.right
            ? "weak"
            : w.right || w.streak
              ? "learning"
              : "new",
      correctCount: w.right || w.streak || 0,
      wrongCount: w.wrong || 0,
      streak: w.level || w.streak || 0,
      nextDue: w.nextReview,
      lastReview: w.lastReviewedAt || w.lastAttempt || null,
    });
    legacyRows = [
      ...hoerReadWords().map((w) => ({
        id: "hoer:" + encodeURIComponent(w.de),
        skill: "hoeren",
        word: { de: w.de, vi: w.vi },
        source: "Hör-Wortschatz",
        seed: seed(w),
      })),
      ...getAllLiveTalkRows()
        .filter((w) => term(w))
        .map((w) => ({
          id: "livetalk:" + w.id,
          skill: getLiveTalkSource(w),
          word: { de: term(w), vi: w.meaning || "", audioUrl: w.audioUrl },
          source: w.sessionTitle || "Kịch bản đã lưu",
          seed: seed(w),
        })),
    ];
    db.syncLegacy();
  }
  function message() {
    alert(
      "🐟 Cá đang nghỉ sau lượt ôn hoặc được hồ khác chăm. Kapi sẽ gọi lại đúng lịch nhé.",
    );
  }
  function empty() {
    message();
    showVokabelHauptmenu();
  }
  function button(label, fn) {
    const b = document.createElement("button");
    b.className = "btn-kapi";
    b.textContent = label;
    b.onclick = fn;
    return b;
  }
  function mount(title) {
    screen++;
    navigation++;
    clearInterval(countdown);
    document.getElementById("timer").textContent = "";
    hoerStopContextAudio();
    stopLiveTalkListeningAudio();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    setLearningFocus(true);
    document.getElementById("message").textContent = title;
    const box = document.getElementById("feedback-area");
    box.style.display = "block";
    box.innerHTML = "";
    const buttons = document.getElementById("buttons");
    buttons.style.display = "block";
    buttons.replaceChildren(button("⬅ Vokabeln", showVokabelHauptmenu));
    return box;
  }
  function panel(box) {
    const p = document.createElement("section");
    p.className = "fish-panel";
    box.append(p);
    return p;
  }
  function optionSelect(options) {
    const s = document.createElement("select");
    for (const [value, label] of options) {
      const o = document.createElement("option");
      o.value = value;
      o.textContent = label;
      s.append(o);
    }
    return s;
  }
  const resultOptions = [
    ["reviewed", "Đã quiz · chưa ghi đúng/sai"],
    ["correct", "✅ Đúng · nghỉ ít nhất 3 ngày"],
    ["wrong", "🔁 Sai / yếu · sớm nhất ngày mai"],
  ];
  async function add(input) {
    try {
      return await lock(() => db.add(input));
    } catch (e) {
      fail(e);
      return null;
    }
  }
  function open(skill = "hoeren") {
    if (!C.SKILLS.includes(skill)) skill = "hoeren";
    const box = mount("🐟 Cá Béo · hồ riêng từng kỹ năng"),
      p = panel(box),
      s = db.read(),
      rows = Object.values(s.fish).filter(
        (f) => f.skill === skill && db.word(f.id),
      );
    const intro = document.createElement("p");
    intro.textContent =
      "ChatGPT kiểm tra lúc mới học; Kapi nhắc lại sau vài ngày. Hồ cá và kho 200 trang được giữ riêng.";
    p.append(intro);
    const tabs = document.createElement("div");
    tabs.className = "fish-tabs";
    for (const sk of C.SKILLS)
      tabs.append(
        button(`${labels[sk]} · ${db.queue(sk, Infinity).length} đến hạn`, () =>
          open(sk),
        ),
      );
    p.append(tabs);
    const counts = document.createElement("p");
    counts.textContent = `${rows.length} cá đã lưu · ${rows.filter((f) => f.progress.status === "weak").length} yếu · ${rows.filter((f) => f.progress.status === "stable").length} stable`;
    p.append(counts);
    p.append(button("▶ Ôn cá đến hạn · tối đa 8", () => start(skill)));
    const form = document.createElement("form");
    form.className = "fish-add";
    form.innerHTML =
      '<h3>+ Nhập cá đã học từ ChatGPT</h3><label>Mỗi dòng: cụm tiếng Đức | nghĩa tiếng Việt<textarea name="terms" rows="4" placeholder="zur Verfügung stehen | có sẵn" required></textarea></label><p>Lưu đủ mọi dòng. Mặc định đã quiz ở ChatGPT, không hỏi lại ngay.</p>';
    const result = optionSelect(resultOptions),
      save = button("🐟 Nhập cả danh sách", () => {});
    save.type = "submit";
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    form.append(result, save, status);
    form.onsubmit = async (event) => {
      event.preventDefault();
      save.disabled = true;
      const input = form.querySelector("textarea"),
        lines = input.value.split("\n").filter((x) => x.trim());
      let added = 0;
      try {
        await lock(() => {
          for (const line of lines) {
            const [de, ...vi] = line.split("|");
            db.add({
              term: de.trim(),
              meaning: vi.join("|").trim(),
              skill,
              result: result.value,
            });
            added++;
          }
        });
        status.textContent = `Đã xử lý ${added} dòng. 🐟 Vừa bị ChatGPT gọi lên bảng rồi — nghỉ một chút nhé.`;
        input.value = "";
        form.append(button("Xem hồ đã cập nhật", () => open(skill)));
      } catch (e) {
        fail(e);
      } finally {
        save.disabled = false;
      }
    };
    p.append(form);
    const batch = document.createElement("details");
    batch.open = true;
    batch.innerHTML =
      '<summary>🐟 Đã quiz ở ChatGPT hôm nay</summary><p>Tick cá trong danh sách bên dưới, hoặc dán cụm đã ôn (mỗi dòng một cụm). Chỉ cập nhật hồ đang chọn.</p><textarea rows="3" placeholder="eine Entscheidung treffen\nzur Verfügung stehen"></textarea>';
    const batchResult = optionSelect(resultOptions),
      batchStatus = document.createElement("p"),
      chosen = new Set();
    batchStatus.setAttribute("role", "status");
    batch.append(
      batchResult,
      button("🐟 Đã quiz ở ChatGPT hôm nay", async (e) => {
        const b = e.currentTarget;
        b.disabled = true;
        try {
          const names = batch
              .querySelector("textarea")
              .value.split("\n")
              .map((x) => x.trim())
              .filter(Boolean),
            ids = new Set(chosen),
            missing = [];
          for (const name of names) {
            const found = db.byTerm(name, skill);
            if (!found.length) missing.push(name);
            for (const f of found) ids.add(f.id);
          }
          if (missing.length) {
            batchStatus.textContent =
              "Chưa có trong hồ: " +
              missing.join(" · ") +
              ". Nhập ở ô phía trên trước nhé.";
            return;
          }
          if (!ids.size) {
            batchStatus.textContent = "Chọn cá hoặc dán danh sách trước nhé.";
            return;
          }
          await lock(() => db.markChatGPT([...ids], batchResult.value));
          batchStatus.textContent = `Đã tính review thật cho ${ids.size} cá. Kapi sẽ đợi hết cooldown.`;
          batch.append(button("Cập nhật danh sách", () => open(skill)));
        } catch (error) {
          fail(error);
        } finally {
          b.disabled = false;
        }
      }),
      batchStatus,
    );
    p.append(batch);
    let page = 0;
    const list = document.createElement("div");
    p.append(list);
    function render() {
      list.innerHTML = "";
      for (const f of rows.slice(page * 20, page * 20 + 20)) {
        const w = db.word(f.id),
          q = f.progress,
          card = document.createElement("article");
        card.className = "fish-card";
        const label = document.createElement("label"),
          check = document.createElement("input");
        check.type = "checkbox";
        check.checked = chosen.has(f.id);
        check.onchange = () =>
          check.checked ? chosen.add(f.id) : chosen.delete(f.id);
        label.append(check, document.createTextNode(" " + w.de));
        card.append(label);
        const detail = document.createElement("div");
        detail.innerHTML = `<p>${esc(w.vi)}</p><p>${esc(q.status)} · Đúng ${q.correctCount} / Sai ${q.wrongCount}</p><small>ChatGPT: ${esc(q.lastChatGPTReview ? C.day(q.lastChatGPTReview) : "Chưa ghi")} · Kapi: ${esc(q.lastKapiReview ? C.day(q.lastKapiReview) : "Chưa")}<br>Kapi gọi lại từ: ${esc(q.nextKapiEligibleAt ? new Date(q.nextKapiEligibleAt).toLocaleString("vi-VN", { timeZone: "Asia/Bangkok" }) : q.nextDue || "Đang nghỉ")}</small>`;
        card.append(
          detail,
          button(
            q.status === "dormant" ? "Cho học lại" : "Cho nghỉ",
            async () => {
              try {
                await lock(() =>
                  db.status(
                    f.id,
                    q.status === "dormant" ? "learning" : "dormant",
                  ),
                );
                open(skill);
              } catch (e) {
                fail(e);
              }
            },
          ),
        );
        const notes = s.history
          .filter((h) => h.poolId === f.id && h.note)
          .slice(-5);
        if (notes.length) {
          const d = document.createElement("details");
          d.innerHTML =
            "<summary>📝 Câu đã được Voi chữa</summary>" +
            notes.map((h) => `<p>${esc(h.day)} · ${esc(h.note)}</p>`).join("");
          card.append(d);
        }
        list.append(card);
      }
      if (page > 0)
        list.append(
          button("←", () => {
            page--;
            render();
          }),
        );
      if ((page + 1) * 20 < rows.length)
        list.append(
          button("→", () => {
            page++;
            render();
          }),
        );
    }
    render();
  }
  async function start(skill) {
    const ids = db.queue(skill, 8);
    if (!ids.length) {
      message();
      return open(skill);
    }
    quiz = { skill, ids, index: 0 };
    return next();
  }
  async function next() {
    if (!quiz || quiz.index >= quiz.ids.length) {
      const skill = quiz?.skill || "hoeren";
      quiz = null;
      return open(skill);
    }
    const q = quiz,
      id = q.ids[q.index],
      w = db.word(id);
    if (!w) {
      q.index++;
      return next();
    }
    const owner = `${tabId}:fish:${++seq}`;
    try {
      const r = await lock(() =>
        db.claim(
          w,
          q.skill,
          "fish-pool",
          q.skill === "hoeren" ? "audio-recall" : "sentence",
          owner,
          { poolId: id },
        ),
      );
      if (!r.ok) {
        q.index++;
        return next();
      }
    } catch (e) {
      fail(e);
      return;
    }
    const box = mount(`${labels[q.skill]} · ${q.index + 1}/${q.ids.length}`),
      p = panel(box),
      answer = document.createElement("div"),
      input = document.createElement("textarea");
    input.placeholder =
      q.skill === "hoeren"
        ? "Nghe rồi tự đoán…"
        : "Tự viết câu dùng cụm này. Ngữ cảnh do cậu chọn.";
    if (q.skill === "hoeren")
      p.append(
        button("🔊 Nghe / nghe lại", () => {
          if (w.audioUrl) {
            hoerStopContextAudio();
            hoerContextAudio = new Audio(w.audioUrl);
            hoerContextAudio.play().catch(fail);
          } else hoerSpeak(w.de);
        }),
      );
    else {
      const h = document.createElement("h3");
      h.textContent = w.de;
      p.append(h);
    }
    p.append(input, answer);
    if (q.skill === "hoeren")
      p.append(
        button("👀 Hiện chữ + nghĩa", () => {
          answer.innerHTML = `<h3>${esc(w.de)}</h3><p>${esc(w.vi || "Tự đối chiếu với ghi chú trong hồ nhé.")}</p>`;
          for (const [label, ok] of [
            ["✅ Nghe ra", true],
            ["🔁 Chưa nghe ra", false],
          ])
            answer.append(
              button(label, async () => {
                try {
                  if (q !== quiz) return;
                  answer
                    .querySelectorAll("button")
                    .forEach((b) => (b.disabled = true));
                  if (!(await lock(() => db.finish(owner, ok)))) return;
                  q.index++;
                  await next();
                } catch (e) {
                  fail(e);
                }
              }),
            );
        }),
      );
    else {
      const send = button("🐘 Gửi Voi chấm", async () => {
        if (!input.value.trim()) return;
        send.disabled = true;
        const turn = screen;
        try {
          const response = await fetch("/api/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mode: "livetalk_evaluate",
              source: { target: w.de },
              challenge: {
                type: "Freies Schreiben",
                prompt: "Tự chọn ngữ cảnh hợp lý để dùng cụm bắt buộc.",
                instruction: "Tự viết theo ý của cậu.",
                constraints: [],
              },
              answer: input.value,
            }),
          });
          const data = await response.json();
          if (!response.ok || !data.evaluation)
            throw Error(data.error || "Voi chưa phản hồi.");
          const e = data.evaluation;
          await lock(() =>
            db.finish(owner, e.verdict === "pass", {
              used: true,
              note: e.betterAnswer,
            }),
          );
          if (turn !== screen) return;
          answer.innerHTML = `<p>${esc(e.targetCheck)}</p><p>${esc(e.betterAnswer)}</p>${(e.issues || []).map((i) => `<p>${esc(i.original)} → ${esc(i.correction)}: ${esc(i.why)}</p>`).join("")}`;
          answer.append(
            button("Tiếp →", async (event) => {
              event.currentTarget.disabled = true;
              if (q !== quiz) return;
              q.index++;
              await next();
            }),
          );
        } catch (e) {
          if (turn === screen) {
            fail(e);
            send.disabled = false;
          }
        }
      });
      p.append(send);
    }
  }
  async function ancient() {
    const left = db.ancientRemaining(),
      box = mount("🏺 Cá cổ đại · 3–5 phút"),
      p = panel(box);
    if (!left) {
      p.textContent = "Hết 3 con hôm nay rồi. Vali đóng cửa bảo tàng 🫩";
      return;
    }
    const candidates = db.archive(left);
    if (!candidates.length) {
      p.textContent =
        "Hôm nay không có cá cổ đại phù hợp. Không cần học bù nhé.";
      return;
    }
    const nav = navigation;
    let i = 0;
    async function show() {
      if (navigation !== nav) return;
      if (i >= candidates.length) {
        p.textContent = "Xong rồi. Vài con cũ thôi, không kéo thêm. 🏺";
        return;
      }
      const entry = candidates[i],
        owner = `${tabId}:ancient:${++seq}`;
      try {
        const r = await lock(() =>
          db.claim(entry.word, "archive", "ancient", "rediscovery", owner, {
            archive: true,
          }),
        );
        if (!r.ok) {
          i++;
          return show();
        }
      } catch (e) {
        fail(e);
        return;
      }
      if (navigation !== nav) return;
      p.innerHTML = `<small>Cá cổ đại ${3 - db.ancientRemaining()}/3 · Fen còn nhớ không?</small><h3>${esc(entry.word.de)}</h3>`;
      const reveal = document.createElement("p");
      p.append(
        button("👀 Xem nghĩa", () => {
          reveal.textContent = entry.word.vi;
        }),
        reveal,
      );
      const actions = document.createElement("div");
      p.append(actions);
      async function done(disposition, note = "") {
        try {
          if (
            !(await lock(() => db.archiveDisposition(owner, disposition, note)))
          )
            return;
          i++;
          await show();
        } catch (e) {
          fail(e);
        }
      }
      actions.append(
        button("✅ Nhớ và dùng được", () => done("remembered")),
        button("🤔 Quen nhưng chưa dùng được", () => {
          actions.innerHTML =
            "<p>Đặt một câu ngắn dùng cụm trên. Không cần hoàn hảo.</p>";
          const input = document.createElement("textarea");
          actions.append(
            input,
            button("Lưu câu · tiếp", () => done("practice", input.value)),
          );
          const choose = optionSelect(C.SKILLS.map((sk) => [sk, labels[sk]]));
          actions.append(
            choose,
            button("Tự chọn thêm vào hồ này", async (e) => {
              e.currentTarget.disabled = true;
              const r = await add({
                term: entry.word.de,
                meaning: entry.word.vi,
                skill: choose.value,
                source: "Tự chọn từ Cá cổ đại",
                fromChatGPT: false,
              });
              if (r) await done("practice", input.value);
            }),
          );
        }),
        button("🫩 Quên sạch", () => {
          actions.replaceChildren(
            button("Hữu ích · hẹn ôn lại sau 7 ngày", () => done("useful")),
            button("Chưa cần · để ngủ tiếp", () => done("sleep")),
          );
        }),
      );
    }
    await show();
  }
  function protect(name, get, skip, skill, archive = false) {
    wrap(name, async (old, args) => {
      const info = get();
      if (!info?.w) return old(...args);
      const surface = name;
      let state = sessions.get(surface);
      if (state?.marker === info.marker && state.pending) return state.pending;
      if (
        state?.marker === info.marker &&
        (info.answered ||
          name === "renderLiveTalkGate" ||
          name === "renderKofferTypingQuestion")
      )
        return old(...args);
      const nav = navigation;
      const actualSkill = typeof skill === "function" ? skill(info.w) : skill;
      if (!state || state.marker !== info.marker)
        state = {
          marker: info.marker,
          owner: `${tabId}:${surface}:${++seq}`,
          word: term(info.w),
          skill: actualSkill,
        };
      sessions.set(surface, state);
      state.pending = (async () => {
        try {
          const receipt = await lock(() =>
            db.claim(state.word, actualSkill, surface, name, state.owner, {
              archive,
            }),
          );
          if (!receipt.ok) {
            sessions.delete(surface);
            return skip();
          }
          // Do not paint a stale asynchronous render after leaving the lesson.
          if (navigation !== nav || get()?.marker !== info.marker) return;
          sessions.set(surface, state);
          return old(...args);
        } catch (e) {
          fail(e);
        } finally {
          state.pending = null;
        }
      })();
      return state.pending;
    });
  }
  function finishWord(w, correct) {
    const state = [...sessions.values()]
      .reverse()
      .find((s) => C.canonical(s.word) === C.canonical(term(w)));
    if (state)
      lock(() =>
        db.finish(state.owner, correct, {
          used: state.skill === "sprechen" || state.skill === "schreiben",
        }),
      ).catch(fail);
  }
  function install() {
    for (const name of [
      "showVokabelHauptmenu",
      "showHoerenMenu",
      "showHoerWortschatz",
      "showLesenMenu",
      "showLiveTalkMenu",
      "showLessons",
      "showLevels",
      "initSystem",
      "showSchreibenMenu",
    ])
      wrap(name, (old, args) => {
        navigation++;
        screen++;
        quiz = null;
        return old(...args);
      });
    lock(refreshLegacy).catch(fail);
    after("hoerWriteWords", () => lock(refreshLegacy).catch(fail));
    after("saveLiveTalkData", () => lock(refreshLegacy).catch(fail));
    after("showVokabelHauptmenu", () =>
      document.getElementById("buttons").prepend(
        button("🐟 Cá Béo · Hören / Sprechen", () => open()),
        button("🏺 Cá cổ đại · 3 con hôm nay", ancient),
      ),
    );
    for (const [name, sk] of [
      ["showHoerenMenu", "hoeren"],
      ["showHoerWortschatz", "hoeren"],
      ["showLiveTalkMenu", "sprechen"],
    ])
      after(name, () =>
        document
          .getElementById("buttons")
          .prepend(
            button("🐟 " + labels[sk] + " · hồ & ChatGPT cooldown", () =>
              open(sk),
            ),
          ),
      );
    wrap("startHoerPractice", () => start("hoeren"));
    wrap("hoerAddWord", async (old, args) => {
      const result = old(...args);
      await lock(refreshLegacy);
      if (result)
        hoerSuggestionMessage(
          "🐟 Đã lưu. Cá mới vừa học ở ChatGPT, Kapi sẽ hỏi lại sau cooldown.",
        );
      return result;
    });
    wrap("hoerManualAdd", async () => {
      const de = document.getElementById("hoer-new-de").value,
        vi = document.getElementById("hoer-new-vi").value;
      try {
        if (await hoerAddWord(de, vi)) showHoerWortschatz();
        else alert("Điền đủ từ và nghĩa; cụm này có thể đã có trong hồ.");
      } catch (e) {
        fail(e);
      }
    });
    // This old star now opts into the independent speaking pool, never the fixed archive.
    wrap("hoerPromote", async (old, args) => {
      const w = hoerReadWords().find(
        (w) => C.canonical(w.de) === C.canonical(args[0]),
      );
      if (!w) return;
      const r = await add({
        term: w.de,
        meaning: w.vi,
        skill: "sprechen",
        source: "Tự chọn từ hồ Hören",
        fromChatGPT: false,
      });
      if (r) alert("Đã thêm vào hồ Sprechen riêng. Kho 200 trang giữ nguyên.");
    });
    for (const name of [
      "getMiniGamePool",
      "getKofferPool",
      "getKofferReviewWords",
    ])
      wrap(name, (old, args) =>
        old(...args).filter((w) => eligible(w, null, true)),
      );
    wrap("startSpecificQuiz", (old, args) => {
      flashcardWords = flashcardWords.filter((w) => eligible(w, null, true));
      if (!flashcardWords.length) return empty();
      return old(...args);
    });
    wrap("startChoiceMiniGame", (old, args) => {
      miniGame.words = miniGame.words.filter((w) => eligible(w, null, true));
      if (!miniGame.words.length) return empty();
      return old(...args);
    });
    wrap("startSentenceGame", (old, args) => {
      miniGame.words = miniGame.words.filter((w) => eligible(w, null, true));
      if (!miniGame.words.length) return empty();
      return old(...args);
    });
    protect(
      "showQuizQuestion",
      () => ({
        w: quizWords[currentQuizIndex],
        marker: `quiz:${currentQuizIndex}:${term(quizWords[currentQuizIndex])}`,
      }),
      () => {
        quizWords.splice(currentQuizIndex, 1);
        return quizWords.length ? showQuizQuestion() : empty();
      },
      "archive",
      true,
    );
    for (const name of ["startSpecificQuiz", "startDailyMissionQuiz"])
      wrap(name, (old, args) => {
        sessions.delete("showQuizQuestion");
        return old(...args);
      });
    protect(
      "showMiniChoiceQuestion",
      () => ({
        w: miniGame.questions[miniGame.index]?.word,
        marker: miniGame.questions[miniGame.index],
      }),
      () => {
        miniGame.questions.splice(miniGame.index, 1);
        return miniGame.questions.length ? showMiniChoiceQuestion() : empty();
      },
      "archive",
      true,
    );
    protect(
      "showSentenceGame",
      () => ({
        w: miniGame.questions[miniGame.index],
        marker: miniGame.questions[miniGame.index],
      }),
      () => {
        miniGame.questions.splice(miniGame.index, 1);
        return miniGame.questions.length ? showSentenceGame() : empty();
      },
      "archive",
      true,
    );
    protect(
      "renderKofferQuestion",
      () => ({
        w: kofferGame.questions[kofferGame.index]?.word,
        marker: kofferGame.questions[kofferGame.index],
        answered: kofferGame.answered,
      }),
      () => {
        kofferGame.questions.splice(kofferGame.index, 1);
        return kofferGame.questions.length ? renderKofferQuestion() : empty();
      },
      "archive",
      true,
    );
    wrap("startKofferTypingLevel", (old, args) => {
      sessions.delete("renderKofferTypingQuestion");
      const saved = kofferGame.questions,
        fresh = getAllUniqueVocabWords()
          .filter((w) => eligible(w, null, true))
          .slice(0, 8);
      if (!fresh.length) return finishKofferGame(true);
      kofferGame.questions = fresh.map((word) => ({ word }));
      try {
        return old(...args);
      } finally {
        kofferGame.questions = saved;
      }
    });
    protect(
      "renderKofferTypingQuestion",
      () => ({
        w: kofferGame.typingWords[kofferGame.typedIndex],
        marker: `typing:${kofferGame.typedIndex}:${term(kofferGame.typingWords[kofferGame.typedIndex])}`,
        answered: kofferGame.answered,
      }),
      () => {
        kofferGame.typingWords.splice(kofferGame.typedIndex, 1);
        return kofferGame.typingWords.length
          ? renderKofferTypingQuestion()
          : empty();
      },
      "archive",
      true,
    );
    after("recordVocabAnswer", (args) => finishWord(args[0], args[1]));
    wrap("getDueLiveTalkRows", (old, args) =>
      old(...args).filter((w) => eligible(w, getLiveTalkSource(w))),
    );
    wrap("getLiveTalkGateBacklog", (old, args) =>
      old(...args).filter((w) => eligible(w, getLiveTalkSource(w))),
    );
    wrap("chooseLiveTalkGateRow", (old, args) => {
      if (liveTalkGate)
        liveTalkGate.pool = liveTalkGate.pool.filter((w) =>
          eligible(w, getLiveTalkSource(w)),
        );
      return old(...args);
    });
    protect(
      "prepareLiveTalkChallenge",
      () => ({
        w: liveTalkPractice?.rows[liveTalkPractice.index],
        marker: liveTalkPractice?.rows[liveTalkPractice.index],
      }),
      () => {
        liveTalkPractice.index++;
        return prepareLiveTalkChallenge();
      },
      getLiveTalkSource,
    );
    protect(
      "renderLiveTalkGate",
      () =>
        liveTalkGate?.loading || liveTalkGate?.completed
          ? null
          : {
              w: liveTalkGate?.currentRow,
              marker: liveTalkGate?.currentRow,
              answered: !!liveTalkGate?.evaluation,
            },
      () => {
        liveTalkGate.currentRow = null;
        return prepareLiveTalkGateCard(false);
      },
      getLiveTalkSource,
    );
    after("updateLiveTalkGateStoredRow", (args) => {
      const state = sessions.get("renderLiveTalkGate");
      if (state)
        lock(() =>
          db.finish(state.owner, args[1], {
            used: true,
            note: liveTalkGate?.evaluation?.betterAnswer || "",
            amend: true,
          }),
        ).catch(fail);
    });
    wrap("rateLiveTalkCard", (old, args) => {
      finishWord(liveTalkPractice?.rows[liveTalkPractice.index], args[0]);
      return old(...args);
    });
    // Keep Lesen's source and links; apply overlap checks before choosing its three old words.
    wrap("lesenBuildGateQuestions", (old, args) =>
      old({
        ...args[0],
        reviewWords: (args[0].reviewWords || []).filter((w) =>
          eligible(w, "lesen", true),
        ),
      }),
    );
    protect(
      "lesenRenderReviewGate",
      () => ({
        w: lesenReviewGate?.questions[lesenReviewGate.index]?.word,
        marker: lesenReviewGate?.questions[lesenReviewGate.index],
        answered:
          lesenReviewGate?.questions[lesenReviewGate.index]?.selected >= 0,
      }),
      () => {
        const id = lesenReviewGate.taskId;
        lesenReviewGate = null;
        return launchLesenTask(id);
      },
      "lesen",
      true,
    );
    protect(
      "renderHoerPractice",
      () => ({
        w: hoerReadWords().find(
          (w) => hoerKey(w.de) === hoerSession?.keys[hoerSession.index],
        ),
        marker: hoerSession?.keys[hoerSession.index],
      }),
      () => {
        hoerSession.index++;
        return renderHoerPractice();
      },
      "hoeren",
    );
    wrap("hoerMark", (old, args) => {
      const w = hoerReadWords().find(
        (w) => hoerKey(w.de) === hoerSession?.keys[hoerSession.index],
      );
      finishWord(w, args[0]);
      return old(...args);
    });
    protect(
      "renderHoerContextPractice",
      () => ({
        w: hoerReadWords().find(
          (w) =>
            hoerKey(w.de) ===
            hoerContextSession?.keys[hoerContextSession.index],
        ),
        marker: hoerContextSession?.keys[hoerContextSession.index],
      }),
      () => {
        hoerContextSession.index++;
        return renderHoerContextPractice();
      },
      "hoeren",
    );
    after("hoerRevealContext", () => {
      const box = document.getElementById("hoer-context-answer");
      if (!box || !hoerContextSession?.revealed) return;
      const w = hoerReadWords().find(
        (w) =>
          hoerKey(w.de) === hoerContextSession.keys[hoerContextSession.index],
      );
      for (const [label, ok] of [
        ["✅ Nghe ra", true],
        ["🔁 Chưa nghe ra", false],
      ])
        box.append(
          button(label, () => {
            finishWord(w, ok);
            hoerNextContext();
          }),
        );
    });
    window.KapiFish = { db, open, add, start, ancient };
  }
  document.addEventListener("DOMContentLoaded", install, { once: true });
})();
