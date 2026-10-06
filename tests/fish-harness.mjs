import { readFileSync } from "node:fs";
import vm from "node:vm";
import { parseHTML } from "linkedom";
import core from "../vocab-links-core.js";

const source = (name) =>
  readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
class FixedDate extends Date {
  constructor(...args) {
    super(...(args.length ? args : ["2026-09-30T12:00:00Z"]));
  }
  static now() {
    return new Date("2026-09-30T12:00:00Z").getTime();
  }
}

export function app(initial = {}, withBridge = true, shared = null) {
  const { document, window, Event, HTMLElement } = parseHTML(
    source("index.html"),
  );
  // DOM test library shims for browser APIs outside the integration's responsibility.
  Object.defineProperty(HTMLElement.prototype, "innerText", {
    get() {
      return this.textContent;
    },
    set(value) {
      this.textContent = value;
    },
    configurable: true,
  });
  HTMLElement.prototype.scrollIntoView = function () {};
  HTMLElement.prototype.pause = function () {};
  const data = shared?.data || new Map(Object.entries(initial));
  const alerts = [];
  let lockTail = Promise.resolve();
  const sandbox = {
    document,
    console,
    Date: FixedDate,
    URL,
    localStorage: {
      getItem: (key) => data.get(key) || null,
      setItem: (key, value) => data.set(key, String(value)),
      removeItem: (key) => data.delete(key),
    },
    setInterval: () => 1,
    clearInterval() {},
    setTimeout: () => 1,
    clearTimeout() {},
    queueMicrotask() {},
    postMessage() {},
    addEventListener: window.addEventListener.bind(window),
    scrollTo() {},
    navigator: {
      locks: shared?.locks || {
        request: (_name, fn) => {
          const result = lockTail.then(fn);
          lockTail = result.catch(() => {});
          return result;
        },
      },
    },
    location: { href: "https://kapi.test/", pathname: "/" },
    alert: (value) => alerts.push(value),
    confirm: () => true,
    fetch: async () => ({ ok: true, json: async () => ({ suggestions: [] }) }),
    speechSynthesis: { cancel() {}, getVoices: () => [], speak() {} },
    SpeechSynthesisUtterance: class {
      constructor(text) {
        this.text = text;
      }
    },
  };
  sandbox.window = sandbox;
  const context = vm.createContext(sandbox);
  const run = (code) => vm.runInContext(code, context);
  for (const name of [
    "vokabel-data.js",
    "horen-data.js",
    "lesen-data.js",
    "lesen-review-data.js",
    "daily-story-review-data.js",
    "lesen-review.js",
  ])
    vm.runInContext(source(name), context, { filename: name });
  const snapshot = run("JSON.stringify(vokabelGruppen)");
  const sourceKeys = run("Object.keys(vokabelGruppen)");
  run(
    "for (const g of Object.values(vokabelGruppen)) { g.woerter.forEach(Object.freeze); Object.freeze(g.woerter); Object.freeze(g); }",
  );
  if (withBridge)
    for (const name of ["vocab-links-core.js", "vocab-links.js"])
      vm.runInContext(source(name), context, { filename: name });
  vm.runInContext(source("kapi-logic.js"), context, {
    filename: "kapi-logic.js",
  });
  for (const name of ["fish-core.js", "fish-ui.js"])
    vm.runInContext(source(name), context, { filename: name });
  document.dispatchEvent(new Event("DOMContentLoaded"));
  const state = () => JSON.parse(data.get(core.STORAGE_KEY) || '{"words":{}}');
  return {
    run,
    document,
    sandbox,
    data,
    state,
    alerts,
    snapshot,
    sourceKeys,
    flush: async () => {
      for (let i = 0; i < 8; i++) {
        await sandbox.navigator.locks.request("kapi-fish-ledger", () => {});
        await new Promise((resolve) => setImmediate(resolve));
      }
    },
  };
}
