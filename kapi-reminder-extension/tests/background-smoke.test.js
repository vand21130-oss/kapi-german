'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

test('service worker boots, schedules an alarm and accepts Kapi state', async () => {
  const listeners = {};
  const syncStore = {};
  const localStore = {};
  const alarms = new Map();

  global.importScripts = () => {
    global.ValiScheduler = require('../scheduler.js');
  };
  global.chrome = {
    storage: {
      sync: {
        async get(key) { return { [key]: syncStore[key] }; },
        async set(value) { Object.assign(syncStore, value); }
      },
      local: {
        async get(key) { return { [key]: localStore[key] }; },
        async set(value) { Object.assign(localStore, value); }
      }
    },
    alarms: {
      async clear(name) { return alarms.delete(name); },
      async create(name, info) { alarms.set(name, { name, scheduledTime: info.when }); },
      async get(name) { return alarms.get(name); },
      onAlarm: { addListener(fn) { listeners.alarm = fn; } }
    },
    runtime: {
      onInstalled: { addListener(fn) { listeners.installed = fn; } },
      onStartup: { addListener(fn) { listeners.startup = fn; } },
      onMessage: { addListener(fn) { listeners.message = fn; } },
      async openOptionsPage() {}
    },
    notifications: {
      async create() {}, async clear() {},
      onButtonClicked: { addListener(fn) { listeners.notificationButton = fn; } },
      onClicked: { addListener(fn) { listeners.notificationClick = fn; } },
      onClosed: { addListener(fn) { listeners.notificationClosed = fn; } }
    },
    permissions: { async contains() { return false; } },
    tabs: { async query() { return []; }, async create() {}, async sendMessage() {} },
    scripting: { async insertCSS() {}, async executeScript() {} }
  };

  const backgroundPath = path.resolve(__dirname, '../background.js');
  delete require.cache[backgroundPath];
  require(backgroundPath);
  listeners.installed({ reason: 'install' });
  await new Promise(resolve => setImmediate(resolve));

  assert.ok(syncStore.valiReminderSettings);
  assert.ok(alarms.has('vali-daily-reminder'));
  assert.equal(typeof listeners.message, 'function');

  const response = await new Promise(resolve => {
    listeners.message({
      type: 'KAPI_STATE_UPDATE',
      payload: {
        date: '2026-09-29', skill: 'lesen', skillName: 'Lesen', icon: '📖', minutes: 40, completed: false
      }
    }, {}, resolve);
  });

  assert.equal(response.ok, true);
  assert.equal(localStore.valiReminderState.mission.skill, 'lesen');

  delete global.chrome;
  delete global.importScripts;
  delete global.ValiScheduler;
});
