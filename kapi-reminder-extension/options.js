'use strict';

const SETTINGS_KEY = 'valiReminderSettings';
const ALL_SITE_ORIGINS = ['http://*/*', 'https://*/*'];
const DEFAULT_SETTINGS = {
  enabled: true,
  time: '19:00',
  days: [0, 1, 2, 3, 4, 5, 6],
  overlayEnabled: false
};

const enabledInput = document.getElementById('enabled');
const timeInput = document.getElementById('reminder-time');
const overlayInput = document.getElementById('overlay-enabled');
const saveButton = document.getElementById('save');
const testButton = document.getElementById('test');
const feedback = document.getElementById('feedback');
const statusCard = document.getElementById('status-card');

function selectedDays() {
  return [...document.querySelectorAll('input[name="day"]:checked')].map(input => Number(input.value));
}

function setSelectedDays(days) {
  const selected = new Set(Array.isArray(days) ? days.map(Number) : DEFAULT_SETTINGS.days);
  document.querySelectorAll('input[name="day"]').forEach(input => {
    input.checked = selected.has(Number(input.value));
  });
}

function formatDateTime(timestamp) {
  if (!timestamp) return 'chưa có lịch kế tiếp';
  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
  }).format(new Date(timestamp));
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function renderStatus(status) {
  const state = status.state || {};
  const mission = state.mission && state.mission.date === localDateKey() ? state.mission : null;
  let headline = '📚 Hôm nay Vali chưa nhận được hồ sơ kỹ năng.';
  if (mission) {
    headline = mission.completed
      ? `✅ ${mission.skillName} hôm nay đã hoàn thành. Vali được im.`
      : `${mission.icon} Hồ sơ hôm nay: ${mission.skillName} · ${mission.minutes} phút.`;
  }
  const title = document.createElement('strong');
  title.textContent = headline;
  const schedule = document.createTextNode(`Lần nhắc kế tiếp: ${formatDateTime(status.nextAlarmAt)}.`);
  statusCard.replaceChildren(title, schedule);
  if (state.sulkDate === localDateKey()) {
    statusCard.append(document.createElement('br'), document.createTextNode('🫩 Vali đang dỗi và sẽ không nói thêm hôm nay.'));
  }
}

async function readStatus() {
  const status = await chrome.runtime.sendMessage({ type: 'GET_REMINDER_STATUS' });
  renderStatus(status);
  return status;
}

async function loadSettings() {
  const stored = await chrome.storage.sync.get(SETTINGS_KEY);
  const settings = { ...DEFAULT_SETTINGS, ...(stored[SETTINGS_KEY] || {}) };
  const hasOverlayPermission = await chrome.permissions.contains({ origins: ALL_SITE_ORIGINS });
  enabledInput.checked = settings.enabled !== false;
  timeInput.value = settings.time || DEFAULT_SETTINGS.time;
  overlayInput.checked = settings.overlayEnabled === true && hasOverlayPermission;
  setSelectedDays(settings.days);
  await readStatus();
}

async function requestOverlayPermission() {
  if (!overlayInput.checked) {
    await chrome.permissions.remove({ origins: ALL_SITE_ORIGINS }).catch(() => false);
    return false;
  }
  const granted = await chrome.permissions.request({ origins: ALL_SITE_ORIGINS });
  if (!granted) {
    overlayInput.checked = false;
    feedback.textContent = 'Vali chưa được phép thò vào website. Hắn sẽ dùng thông báo Windows.';
  }
  return granted;
}

async function persistSettings(showMessage = true) {
  const days = selectedDays();
  if (!days.length) {
    feedback.textContent = 'Chọn ít nhất một ngày để Vali còn có lịch làm việc.';
    return false;
  }
  const settings = {
    enabled: enabledInput.checked,
    time: timeInput.value || DEFAULT_SETTINGS.time,
    days,
    overlayEnabled: overlayInput.checked
  };
  await chrome.storage.sync.set({ [SETTINGS_KEY]: settings });
  await chrome.runtime.sendMessage({ type: 'SETTINGS_UPDATED' });
  if (showMessage) feedback.textContent = 'Đã lưu. Vali ghi lịch bằng vẻ mặt không cảm xúc.';
  await readStatus();
  return true;
}

overlayInput.addEventListener('change', async () => {
  overlayInput.disabled = true;
  try {
    await requestOverlayPermission();
    await persistSettings(false);
  } finally {
    overlayInput.disabled = false;
  }
});

saveButton.addEventListener('click', async () => {
  saveButton.disabled = true;
  try {
    await persistSettings(true);
  } catch (error) {
    feedback.textContent = `Chưa lưu được: ${error.message}`;
  } finally {
    saveButton.disabled = false;
  }
});

testButton.addEventListener('click', async () => {
  testButton.disabled = true;
  try {
    const saved = await persistSettings(false);
    if (!saved) return;
    const result = await chrome.runtime.sendMessage({ type: 'TEST_REMINDER' });
    feedback.textContent = result && result.mode === 'overlay'
      ? 'Vali vừa thò xuống trang đang mở. Đừng đóng popup quá nhanh :vvvv'
      : 'Trang hiện tại không cho thò vào; Vali đã chuyển sang thông báo Windows.';
  } catch (error) {
    feedback.textContent = `Vali vấp bánh xe: ${error.message}`;
  } finally {
    testButton.disabled = false;
  }
});

void loadSettings().catch(error => {
  feedback.textContent = `Không đọc được lịch: ${error.message}`;
});
