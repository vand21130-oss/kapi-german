/* Independent fish pools and fixed archive. Canonical keys compare quiz targets only. */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.KapiFishCore = api;
})(globalThis, () => {
  "use strict";
  const KEY = "kapi_fish_pools_v1";
  const SKILLS = ["hoeren", "sprechen"];
  const DAY = 86400000;
  const canonical = (value) =>
    String(value || "")
      .normalize("NFKC")
      .toLocaleLowerCase("de-DE")
      .trim()
      .replace(/[.!?,;:…。！？]+$/u, "")
      .trim()
      .replace(/\s+/g, " ");
  const day = (time) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date(time));
  const text = (value) =>
    typeof value === "string" ? value : value?.de || value?.target || "";
  function create(index, storage, clock = () => Date.now(), options = {}) {
    const legacy = () => options.legacy?.() || [];
    const archiveKeys = new Set(
      [...index.entries.values()].map((e) => canonical(e.word.de)),
    );
    const blank = () => ({
      version: 1,
      fish: {},
      history: [],
      archive: {},
      bootstrapped: false,
    });
    function read() {
      const raw = storage.getItem(KEY);
      if (!raw) return blank();
      const s = JSON.parse(raw);
      if (s.version !== 1 || !s.fish || !s.archive || !Array.isArray(s.history))
        throw Error("Không đọc được lịch ôn. Dữ liệu cũ được giữ nguyên.");
      return s;
    }
    const write = (s) => storage.setItem(KEY, JSON.stringify(s));
    function word(id, s = read()) {
      const f = s.fish[id];
      if (f)
        return (
          f.word || legacy().find((row) => row.id === f.sourceRef)?.word || null
        );
      return index.entries.get(id)?.word || null;
    }
    function progress(seed = {}) {
      return {
        status: seed.status || "new",
        seenCount: 1,
        correctCount: Number(seed.correctCount) || 0,
        wrongCount: Number(seed.wrongCount) || 0,
        streak: Number(seed.streak) || 0,
        usedCount: 0,
        chatGPTReviewCount: 0,
        kapiReviewCount: 0,
        lastChatGPTReview: null,
        lastKapiReview: seed.lastReview || null,
        chatGPTResult: null,
        nextKapiEligibleAt: null,
        nextDue: seed.nextDue || day(clock()),
        lastReview: seed.lastReview || null,
      };
    }
    function matches(s, term, skill) {
      const key = canonical(text(term));
      return Object.values(s.fish).filter(
        (f) =>
          (!skill || f.skill === skill) &&
          f.canonicalKey === key &&
          word(f.id, s),
      );
    }
    const identity = (term, skill) =>
      matches(read(), term, skill)[0]?.id || null;
    function byTerm(term, skill) {
      return matches(read(), term, skill);
    }
    // Read legacy pool content by reference. Never copy the original archive or rewrite a legacy key.
    function syncLegacy() {
      const s = read();
      let changed = !s.bootstrapped;
      for (const row of legacy()) {
        if (!SKILLS.includes(row.skill) || !canonical(row.word?.de)) continue;
        if (!s.fish[row.id]) {
          s.fish[row.id] = {
            id: row.id,
            sourceRef: row.id,
            skill: row.skill,
            canonicalKey: canonical(row.word.de),
            source: row.source || "Hồ đã lưu",
            caughtAt: row.added || new Date(clock()).toISOString(),
            progress: progress(row.seed),
          };
          if (s.bootstrapped) chatReview(s, s.fish[row.id], "reviewed");
          else if (row.seed?.lastReview) {
            const at = Date.parse(row.seed.lastReview);
            if (Number.isFinite(at))
              s.history.push({
                canonicalKey: canonical(row.word.de),
                poolId: row.id,
                source: "kapi-legacy",
                skill: row.skill,
                day: day(at),
                time: new Date(at).toISOString(),
                owner: "legacy:" + row.id,
                result: "reviewed",
              });
          }
          changed = true;
        } else if (s.fish[row.id].canonicalKey !== canonical(row.word.de)) {
          s.fish[row.id].canonicalKey = canonical(row.word.de);
          changed = true;
        }
      }
      s.bootstrapped = true;
      if (changed) write(s);
    }
    function applyReview(f, h, result, source, note = "", used = false) {
      const p = f.progress;
      // Retrying the same live question or correcting a batch result must not count as new quizzes.
      const fields = [
        "status",
        "correctCount",
        "wrongCount",
        "streak",
        "usedCount",
        "chatGPTReviewCount",
        "kapiReviewCount",
        "nextDue",
        "nextKapiEligibleAt",
      ];
      if (!h.progressBefore)
        h.progressBefore = Object.fromEntries(fields.map((k) => [k, p[k]]));
      else for (const k of fields) p[k] = h.progressBefore[k];
      const now = clock();
      let delay;
      if (result === "correct") {
        p.correctCount++;
        p.streak++;
        p.status = p.streak >= 3 ? "stable" : "learning";
        if (used) p.usedCount++;
        delay =
          source === "chatgpt"
            ? Math.max(3, [1, 3, 7, 14, 30][Math.min(p.streak - 1, 4)])
            : [1, 3, 7, 14, 30][Math.min(p.streak - 1, 4)];
      } else if (result === "wrong") {
        p.wrongCount++;
        p.streak = 0;
        p.status = "weak";
        delay = 1;
      } else {
        if (p.status === "new") p.status = "learning";
        delay = 2;
      }
      p.lastReview = new Date(now).toISOString();
      if (source === "chatgpt") {
        p.lastChatGPTReview = p.lastReview;
        p.chatGPTResult = result;
        p.chatGPTReviewCount++;
      } else {
        p.lastKapiReview = p.lastReview;
        p.kapiReviewCount++;
      }
      let due = now + delay * DAY;
      if (result !== "wrong")
        due = Math.max(
          due,
          Date.parse(p.nextKapiEligibleAt) || 0,
          Date.parse((p.nextDue || day(now)) + "T00:00:00+07:00") || 0,
        );
      p.nextKapiEligibleAt = new Date(due).toISOString();
      p.nextDue = day(due);
      h.result = result;
      h.completedAt = p.lastReview;
      h.note = String(note || "").slice(0, 2400);
    }
    function chatReview(s, f, result = "reviewed") {
      if (!["correct", "wrong", "reviewed"].includes(result))
        throw Error("Kết quả ChatGPT không hợp lệ.");
      const owner = `chatgpt:${f.id}:${day(clock())}`;
      let h = s.history.find((h) => h.owner === owner);
      if (h && h.result === result) return false;
      if (!h) {
        h = {
          canonicalKey: f.canonicalKey,
          poolId: f.id,
          source: "chatgpt",
          skill: f.skill,
          day: day(clock()),
          time: new Date(clock()).toISOString(),
          owner,
          result: null,
          quizType: "external-review",
        };
        s.history.push(h);
      }
      applyReview(f, h, result, "chatgpt");
      return true;
    }
    function add({
      term,
      meaning = "",
      skill,
      source = "ChatGPT",
      fromChatGPT = true,
      result = "reviewed",
      seed = null,
    }) {
      if (!SKILLS.includes(skill) || !canonical(term))
        throw Error("Chọn Hören/Sprechen và nhập cụm tiếng Đức.");
      const s = read(),
        same = matches(s, term, skill);
      // Existing entries stay independent; exact match only prevents creating an unnecessary extra row.
      if (same.length) {
        if (fromChatGPT) for (const f of same) chatReview(s, f, result);
        write(s);
        return { kind: "existing", id: same[0].id };
      }
      const id = "fish:" + skill + ":" + encodeURIComponent(canonical(term));
      const f = {
        id,
        word: { de: String(term).trim(), vi: String(meaning).trim() },
        skill,
        canonicalKey: canonical(term),
        source,
        caughtAt: new Date(clock()).toISOString(),
        progress: progress(seed || {}),
      };
      s.fish[id] = f;
      if (fromChatGPT) chatReview(s, f, result);
      write(s);
      return { kind: "added", id };
    }
    function markChatGPT(ids, result = "reviewed") {
      const s = read();
      for (const id of new Set(ids)) {
        const f = s.fish[id];
        if (!f || !word(id, s))
          throw Error("Có cá không còn trong hồ. Tải lại danh sách nhé.");
        chatReview(s, f, result);
      }
      write(s);
    }
    function reviewed(term, s = read()) {
      const key = canonical(text(term));
      return s.history.some(
        (h) => h.canonicalKey === key && h.day === day(clock()),
      );
    }
    function active(term, s = read()) {
      return matches(s, term).some((f) => f.progress.status !== "dormant");
    }
    function eligibleState(
      s,
      term,
      skill,
      { archive = false, poolId = null } = {},
    ) {
      const key = canonical(text(term)),
        now = clock();
      if (!key || reviewed(term, s)) return false;
      if (
        matches(s, term, archive ? null : skill).some(
          (f) =>
            f.progress.lastChatGPTReview &&
            f.progress.nextKapiEligibleAt &&
            Date.parse(f.progress.nextKapiEligibleAt) > now,
        )
      )
        return false;
      if (archive) {
        if (!archiveKeys.has(key)) return false;
        if (active(term, s)) return false;
        const a = s.archive[key];
        if (a?.sleeping || (a?.nextDue && Date.parse(a.nextDue) > now))
          return false;
        const events = s.history.filter(
          (h) => h.canonicalKey === key && h.source !== "chatgpt",
        );
        const last = events
          .map((h) => Date.parse(h.time))
          .filter(Number.isFinite)
          .sort((a, b) => b - a)[0];
        return a?.nextDue
          ? Date.parse(a.nextDue) <= now
          : !last || now - last >= 30 * DAY;
      }
      const fish = poolId
        ? [s.fish[poolId]].filter(Boolean)
        : matches(s, term, skill);
      return (
        !fish.length ||
        fish.every(
          (f) =>
            f.progress.status !== "dormant" &&
            (!f.progress.nextDue || f.progress.nextDue <= day(now)) &&
            (!f.progress.nextKapiEligibleAt ||
              Date.parse(f.progress.nextKapiEligibleAt) <= now),
        )
      );
    }
    function eligible(term, skill, opts = {}) {
      return eligibleState(read(), term, skill, opts);
    }
    function claim(
      term,
      skill,
      surface,
      type,
      owner,
      { archive = false, poolId = null } = {},
    ) {
      const s = read(),
        key = canonical(text(term)),
        today = day(clock()),
        prior = s.history.find(
          (h) => h.canonicalKey === key && h.day === today,
        );
      if (prior)
        return {
          ok: prior.owner === owner && prior.result === null,
          event: prior,
        };
      if (!eligibleState(s, term, skill, { archive, poolId }))
        return { ok: false };
      if (
        surface === "ancient" &&
        s.history.filter((h) => h.source === "ancient" && h.day === today)
          .length >= 3
      )
        return { ok: false };
      if (
        surface === "fish-pool" &&
        s.history.filter(
          (h) =>
            h.source === "kapi-fish" && h.skill === skill && h.day === today,
        ).length >= 8
      )
        return { ok: false };
      const event = {
        canonicalKey: key,
        poolId:
          poolId || (!archive ? matches(s, term, skill)[0]?.id : null) || null,
        source:
          surface === "ancient"
            ? "ancient"
            : SKILLS.includes(skill)
              ? "kapi-fish"
              : "kapi-legacy",
        day: today,
        time: new Date(clock()).toISOString(),
        skill,
        surface,
        quizType: type,
        owner,
        result: null,
      };
      s.history.push(event);
      write(s);
      return { ok: true, event };
    }
    function finish(
      owner,
      correct,
      { used = false, note = "", amend = false } = {},
    ) {
      const s = read(),
        h = s.history.find((h) => h.owner === owner);
      if (!h || (h.result !== null && !amend)) return false;
      const result = correct ? "correct" : "wrong";
      h.attempts = h.attempts || [];
      h.attempts.push({ time: new Date(clock()).toISOString(), result, note });
      const f = s.fish[h.poolId];
      if (f) applyReview(f, h, result, "kapi-fish", note, used);
      else {
        h.result = result;
        h.completedAt = new Date(clock()).toISOString();
        h.note = String(note || "").slice(0, 2400);
      }
      write(s);
      return true;
    }
    function queue(skill, limit = 8) {
      const s = read();
      const groups = [[], [], []];
      for (const f of Object.values(s.fish))
        if (
          f.skill === skill &&
          word(f.id, s) &&
          eligibleState(s, word(f.id, s), skill, { poolId: f.id })
        ) {
          const p = f.progress;
          groups[p.status === "weak" ? 0 : p.status === "new" ? 1 : 2].push(f);
        }
      for (const group of groups)
        group.sort(
          (a, b) =>
            (a.progress.nextDue || "").localeCompare(
              b.progress.nextDue || "",
            ) || a.caughtAt.localeCompare(b.caughtAt),
        );
      if (Number.isFinite(limit))
        limit = Math.min(
          limit,
          Math.max(
            0,
            8 -
              s.history.filter(
                (h) =>
                  h.source === "kapi-fish" &&
                  h.skill === skill &&
                  h.day === day(clock()),
              ).length,
          ),
        );
      const picked = [],
        keys = new Set();
      while (picked.length < limit && groups.some((g) => g.length))
        for (const group of groups) {
          const f = group.shift();
          if (f && !keys.has(f.canonicalKey) && picked.length < limit) {
            keys.add(f.canonicalKey);
            picked.push(f.id);
          }
        }
      return picked;
    }
    function archive(limit = 3) {
      const s = read(),
        seen = new Set();
      const rows = [...index.entries.values()].filter((e) => {
        const key = canonical(e.word.de);
        if (seen.has(key) || !eligibleState(s, e.word, null, { archive: true }))
          return false;
        seen.add(key);
        return true;
      });
      const last = (e) =>
        s.history
          .filter((h) => h.canonicalKey === canonical(e.word.de))
          .reduce((v, h) => Math.max(v, Date.parse(h.time) || 0), 0);
      rows.sort(
        (a, b) =>
          last(a) - last(b) ||
          (options.priority?.(b) || 0) - (options.priority?.(a) || 0) ||
          a.id.localeCompare(b.id),
      );
      return rows.slice(0, limit);
    }
    function ancientRemaining() {
      return Math.max(
        0,
        3 -
          read().history.filter(
            (h) => h.source === "ancient" && h.day === day(clock()),
          ).length,
      );
    }
    function archiveDisposition(owner, disposition, note = "") {
      const s = read(),
        h = s.history.find((h) => h.owner === owner && h.source === "ancient");
      if (!h || h.result !== null) return false;
      if (!["remembered", "practice", "useful", "sleep"].includes(disposition))
        throw Error("Phản hồi không hợp lệ.");
      h.result = disposition;
      h.note = String(note).slice(0, 2400);
      h.completedAt = new Date(clock()).toISOString();
      s.archive[h.canonicalKey] = {
        lastReview: h.completedAt,
        sleeping: disposition === "sleep",
        nextDue: new Date(
          clock() + (disposition === "useful" ? 7 : 30) * DAY,
        ).toISOString(),
      };
      write(s);
      return true;
    }
    function status(id, status) {
      const s = read(),
        f = s.fish[id];
      if (!f) return;
      if (!["new", "learning", "weak", "stable", "dormant"].includes(status))
        throw Error("Trạng thái không hợp lệ.");
      f.progress.status = status;
      write(s);
    }
    return {
      read,
      word,
      identity,
      byTerm,
      syncLegacy,
      add,
      markChatGPT,
      reviewed,
      active,
      eligible,
      claim,
      finish,
      queue,
      archive,
      ancientRemaining,
      archiveDisposition,
      status,
      day: () => day(clock()),
    };
  }
  return { KEY, SKILLS, canonical, day, create };
});
