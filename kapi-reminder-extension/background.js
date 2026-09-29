'use strict';

importScripts('scheduler.js');

const SETTINGS_KEY = 'valiReminderSettings';
const STATE_KEY = 'valiReminderState';
const DAILY_ALARM = 'vali-daily-reminder';
const SNOOZE_ALARM = 'vali-snooze-reminder';
const KAPI_URL = 'https://kapi-german.vercel.app/?open=today';
const ALL_SITE_ORIGINS = ['http://*/*', 'https://*/*'];
const NOTIFICATION_PREFIX = 'vali-reminder-';
const NOTIFICATION_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAACZUExURf/46Pvz49rLt6qPeH9bQG1FKNC+qv725qWKctzNuvXr2vz05P735/Lo1sy6paCDa31YPXtXO5+Da826pvPq2e/k05x/Zp6Bae7k0su5pMq3o7qjjY1VL3VJKaJpM86JPNmQP9aOPr9+OcaBO82IPKFpM8aDO7Z4N/Lo15ZiMNiPPs2HPMyHPNePPr19OZpkMXpOKtiQP040LkXrqaUAAAAHdElNRQfqCR0JFjjvI0mxAAABmUlEQVRYw+2WW3OCMBCFI4h3QEDAW3WxKoL3/v8fV7OxCkmgYXxox+E8hbN7PqPByRLyxmpoetNgaupao3K+ZeTVqhZvdwxenXYVgJi/EV7Yf9Vv0WCB7sPoMkP5l9SwvZdxeuhoqgA9//mPPeiqADz/fs7q4/ugCsD9DnLWAD2FrGnZQ6NYjuuNyuJ+YPyucFyYnyjEqaYF+Zli3jBm0vxU1jqfzz8k9kSSH7PSYgkQseUKAG6AT4AVMyKA9YYtfREQYmELVLF0BzHWtrgOhPwukwdIJIDkXmMEkwd41N3ceyBNBECS/hQX9NHiAS519/BQzAHiZ+lAn20e4FD3+OyC6HS+3AGX8ynKVFLaOpS+/1fgxU6Bk/R/gSbUAAR8ZYWAvFMDFAB/f4w14F8BhPfnjQBXKQDHilQJcKStDg+wqXtQOoU9bXV5gIVXsxIAL2iPB5i5y7UMwC7XHQ8ggZQgAlg+FPLEZ7fpZl0KWC5Ym2zQko5YBSOOfMx6dcgqGLMkmpAijUOFeOCTEo081ykJD23LJLXeT9/dDr/kaBp59gAAAABJRU5ErkJggg==';

const DEFAULT_SETTINGS = Object.freeze({
  enabled: true,
  time: '19:00',
  days: [0, 1, 2, 3, 4, 5, 6],
  overlayEnabled: false
});

const REMINDER_LINES = [
  mission => `${mission.icon} ${mission.skillName} đã nằm trên bàn. Tôi thì vẫn phải đứng đây.`,
  mission => `${mission.minutes} phút. Ít hơn thời gian bạn dùng để thương lượng với chính mình.`,
  () => 'Mr. Efa đã chọn hồ sơ. Tôi chỉ đến giao quyết định.',
  () => 'Tôi không thúc giục. Tôi chỉ xuất hiện đúng giờ và gây áp lực bằng ánh mắt.',
  () => 'Nhà Kapi đang mở cửa. Động lực của bạn đang để chế độ máy bay.',
  () => 'Một nhiệm vụ thôi. Tôi đã giảm khối lượng công việc đến mức không thể kiện được nữa.',
  () => 'Tôi đã đến. Đây không phải biểu hiện của tình cảm.'
];

const handledNotificationIds = new Set();

function normalizeSettings(value) {
  const source = value && typeof value === 'object' ? value : {};
  return {
    enabled: source.enabled !== false,
    time: /^([01]\d|2[0-3]):[0-5]\d$/.test(source.time || '') ? source.time : DEFAULT_SETTINGS.time,
    days: ValiScheduler.normalizeDays(source.days),
    overlayEnabled: source.overlayEnabled === true
  };
}

function normalizeMission(value) {
  if (!value || typeof value !== 'object' || !/^\d{4}-\d{2}-\d{2}$/.test(value.date || '')) return null;
  const validSkills = new Set(['hoeren', 'lesen', 'sprechen', 'schreiben', 'vokabeln']);
  if (!validSkills.has(value.skill)) return null;
  return {
    date: value.date,
    skill: value.skill,
    skillName: String(value.skillName || value.skill).slice(0, 30),
    icon: String(value.icon || '📚').slice(0, 4),
    minutes: Math.min(90, Math.max(1, Number(value.minutes) || 30)),
    completed: value.completed === true,
    completedAt: typeof value.completedAt === 'string' ? value.completedAt.slice(0, 40) : null
  };
}

async function getSettings() {
  const stored = await chrome.storage.sync.get(SETTINGS_KEY);
  return normalizeSettings(stored[SETTINGS_KEY]);
}

async function getState() {
  const stored = await chrome.storage.local.get(STATE_KEY);
  const state = stored[STATE_KEY];
  return state && typeof state === 'object' ? state : {};
}

async function patchState(patch) {
  const current = await getState();
  const next = { ...current, ...patch };
  await chrome.storage.local.set({ [STATE_KEY]: next });
  return next;
}

async function ensureDefaults() {
  const stored = await chrome.storage.sync.get(SETTINGS_KEY);
  if (!stored[SETTINGS_KEY]) {
    await chrome.storage.sync.set({ [SETTINGS_KEY]: { ...DEFAULT_SETTINGS } });
  }
}

async function scheduleNextDailyAlarm() {
  await chrome.alarms.clear(DAILY_ALARM);
  const settings = await getSettings();
  if (!settings.enabled || !settings.days.length) return null;
  const next = ValiScheduler.nextOccurrence(new Date(), settings.time, settings.days);
  if (!next) return null;
  await chrome.alarms.create(DAILY_ALARM, { when: next.getTime() });
  return next;
}

function makeReminderPayload(mission, state, test = false) {
  const today = ValiScheduler.localDateKey();
  const currentMission = mission || {
    skill: 'unknown',
    skillName: 'Nhiệm vụ hôm nay',
    icon: '📚',
    minutes: 30
  };
  const lineFactory = REMINDER_LINES[Math.floor(Math.random() * REMINDER_LINES.length)];
  return {
    skill: currentMission.skill,
    skillName: currentMission.skillName,
    icon: currentMission.icon,
    minutes: currentMission.minutes,
    line: lineFactory(currentMission),
    canSnooze: !test && state.snoozeUsedDate !== today,
    test
  };
}

async function injectValiOverlay(tabId, payload) {
  try {
    const existing = await chrome.tabs.sendMessage(tabId, { type: 'VALI_REMINDER_PING' });
    if (!existing || existing.ready !== true) throw new Error('Overlay listener is not ready');
  } catch (_) {
    await chrome.scripting.insertCSS({ target: { tabId }, files: ['overlay.css'] });
    await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
  }
  const result = await chrome.tabs.sendMessage(tabId, { type: 'VALI_REMINDER_SHOW', payload });
  return Boolean(result && result.shown);
}

async function showSystemNotification(payload, test = false) {
  const id = test ? `${NOTIFICATION_PREFIX}test-${Date.now()}` : `${NOTIFICATION_PREFIX}${ValiScheduler.localDateKey()}`;
  await chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: NOTIFICATION_ICON,
    title: test ? '🧳 Vali đang thử micro' : `🧳 Đến giờ ${payload.skillName}`,
    message: payload.line,
    contextMessage: test ? 'Bản xem thử · không tính là một lần nhắc' : 'Nhà Kapi · một kỹ năng duy nhất',
    priority: 2,
    requireInteraction: true,
    buttons: test ? [{ title: '📖 Mở Nhà Kapi' }] : [
      { title: '📖 Vào Nhà Kapi' },
      { title: payload.canSnooze ? '⏰ 10 phút nữa' : '⏰ Đã hoãn hôm nay' }
    ]
  });
  return id;
}

async function showReminder({ test = false, snooze = false } = {}) {
  const settings = await getSettings();
  const state = await getState();
  const today = ValiScheduler.localDateKey();
  const mission = state.mission && state.mission.date === today ? state.mission : null;

  if (!test) {
    if (!settings.enabled || !settings.days.includes(new Date().getDay())) return { shown: false, reason: 'disabled' };
    if (mission && mission.completed) return { shown: false, reason: 'completed' };
    if (state.sulkDate === today) return { shown: false, reason: 'sulking' };
    if (!snooze && state.lastShownDate === today) return { shown: false, reason: 'already-shown' };
  }

  const payload = makeReminderPayload(mission, state, test);
  let overlayShown = false;
  if (settings.overlayEnabled) {
    try {
      const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      const tab = tabs[0];
      if (tab && Number.isInteger(tab.id)) overlayShown = await injectValiOverlay(tab.id, payload);
    } catch (_) {
      overlayShown = false;
    }
  }

  if (!overlayShown) await showSystemNotification(payload, test);
  if (!test) await patchState({ lastShownDate: today, lastShownAt: new Date().toISOString() });
  return { shown: true, mode: overlayShown ? 'overlay' : 'notification' };
}

async function openKapi() {
  await chrome.tabs.create({ url: KAPI_URL });
}

async function snoozeReminder() {
  const today = ValiScheduler.localDateKey();
  const state = await getState();
  if (state.snoozeUsedDate === today) return { ok: false, reason: 'already-used' };
  await patchState({ snoozeUsedDate: today, snoozedAt: new Date().toISOString() });
  await chrome.alarms.create(SNOOZE_ALARM, { when: Date.now() + 10 * 60000 });
  return { ok: true };
}

async function dismissForToday() {
  const today = ValiScheduler.localDateKey();
  await chrome.alarms.clear(SNOOZE_ALARM);
  await patchState({ sulkDate: today, dismissedAt: new Date().toISOString() });
  return { ok: true };
}

async function handleValiAction(message) {
  const action = message.action;
  if (message.test) {
    if (action === 'open') await openKapi();
    return { ok: true, test: true };
  }
  if (action === 'open') {
    await openKapi();
    return { ok: true };
  }
  if (action === 'snooze') return snoozeReminder();
  if (action === 'dismiss') return dismissForToday();
  return { ok: false, reason: 'unknown-action' };
}

async function saveMissionState(payload) {
  const mission = normalizeMission(payload);
  if (!mission) return { ok: false };
  await patchState({ mission });
  if (mission.completed && mission.date === ValiScheduler.localDateKey()) {
    await chrome.alarms.clear(SNOOZE_ALARM);
    await chrome.notifications.clear(`${NOTIFICATION_PREFIX}${mission.date}`);
  }
  return { ok: true };
}

async function getPublicStatus() {
  const [settings, state, alarm, overlayPermission] = await Promise.all([
    getSettings(),
    getState(),
    chrome.alarms.get(DAILY_ALARM),
    chrome.permissions.contains({ origins: ALL_SITE_ORIGINS })
  ]);
  return {
    settings,
    state,
    nextAlarmAt: alarm ? alarm.scheduledTime : null,
    overlayPermission
  };
}

async function initialize({ catchUp = false } = {}) {
  await ensureDefaults();
  await scheduleNextDailyAlarm();
  if (!catchUp) return;
  const settings = await getSettings();
  const state = await getState();
  const today = ValiScheduler.localDateKey();
  if (ValiScheduler.isCatchUpDue(new Date(), settings.time, settings.days, 180)
      && state.lastShownDate !== today && state.sulkDate !== today
      && !(state.mission && state.mission.date === today && state.mission.completed)) {
    await showReminder();
  }
}

chrome.runtime.onInstalled.addListener(details => {
  void initialize();
  if (details.reason === 'install') void chrome.runtime.openOptionsPage();
});

chrome.runtime.onStartup.addListener(() => {
  void initialize({ catchUp: true });
});

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === DAILY_ALARM) {
    void scheduleNextDailyAlarm().then(() => showReminder());
  } else if (alarm.name === SNOOZE_ALARM) {
    void showReminder({ snooze: true });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const task = (async () => {
    if (!message || typeof message !== 'object') return { ok: false };
    if (message.type === 'KAPI_STATE_UPDATE') return saveMissionState(message.payload);
    if (message.type === 'SETTINGS_UPDATED') {
      const next = await scheduleNextDailyAlarm();
      return { ok: true, nextAlarmAt: next ? next.getTime() : null };
    }
    if (message.type === 'GET_REMINDER_STATUS') return getPublicStatus();
    if (message.type === 'TEST_REMINDER') return showReminder({ test: true });
    if (message.type === 'VALI_ACTION') return handleValiAction(message);
    return { ok: false };
  })();
  task.then(sendResponse).catch(error => sendResponse({ ok: false, error: String(error && error.message || error) }));
  return true;
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if (!notificationId.startsWith(NOTIFICATION_PREFIX)) return;
  handledNotificationIds.add(notificationId);
  const test = notificationId.includes('test-');
  const action = buttonIndex === 0 ? 'open' : 'snooze';
  void handleValiAction({ action, test }).finally(() => chrome.notifications.clear(notificationId));
});

chrome.notifications.onClicked.addListener(notificationId => {
  if (!notificationId.startsWith(NOTIFICATION_PREFIX)) return;
  handledNotificationIds.add(notificationId);
  const test = notificationId.includes('test-');
  void handleValiAction({ action: 'open', test }).finally(() => chrome.notifications.clear(notificationId));
});

chrome.notifications.onClosed.addListener((notificationId, byUser) => {
  if (!notificationId.startsWith(NOTIFICATION_PREFIX) || !byUser || notificationId.includes('test-')) return;
  if (handledNotificationIds.has(notificationId)) {
    handledNotificationIds.delete(notificationId);
    return;
  }
  void dismissForToday();
});
