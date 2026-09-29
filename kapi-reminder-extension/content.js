(function installValiReminderOverlay() {
  'use strict';

  if (globalThis.__kapiValiOverlayInstalled) return;
  globalThis.__kapiValiOverlayInstalled = true;

  const ROOT_ID = 'kapi-vali-reminder-host';

  function sendAction(action, test) {
    return chrome.runtime.sendMessage({ type: 'VALI_ACTION', action, test: Boolean(test) });
  }

  function removeOverlay(root, delay = 0) {
    window.setTimeout(() => root.remove(), delay);
  }

  function buildOverlay(payload) {
    document.getElementById(ROOT_ID)?.remove();

    const root = document.createElement('section');
    root.id = ROOT_ID;
    root.setAttribute('aria-live', 'assertive');
    root.setAttribute('aria-label', 'Vali nhắc học Nhà Kapi');
    root.innerHTML = `
      <div class="kvr-card" role="dialog" aria-modal="false" aria-labelledby="kvr-title">
        <button class="kvr-close" type="button" aria-label="Đuổi Vali">×</button>
        <div class="kvr-mascot" aria-hidden="true">
          <span class="kvr-handle"></span>
          <span class="kvr-seam"></span>
          <span class="kvr-eye kvr-eye-left"><i></i></span>
          <span class="kvr-eye kvr-eye-right"><i></i></span>
          <span class="kvr-bag kvr-bag-left"></span>
          <span class="kvr-bag kvr-bag-right"></span>
          <span class="kvr-mouth"></span>
          <span class="kvr-wheel kvr-wheel-left"></span>
          <span class="kvr-wheel kvr-wheel-right"></span>
        </div>
        <div class="kvr-copy">
          <div class="kvr-eyebrow">${payload.test ? 'BẢN XEM THỬ · KHÔNG TÍNH' : 'VALI ĐÃ TỚI ĐÚNG GIỜ'}</div>
          <h2 id="kvr-title"></h2>
          <p class="kvr-line"></p>
          <div class="kvr-actions">
            <button class="kvr-button kvr-open" type="button">📖 Vào Nhà Kapi</button>
            ${payload.canSnooze ? '<button class="kvr-button kvr-snooze" type="button">⏰ 10 phút nữa</button>' : ''}
          </div>
        </div>
      </div>`;

    const title = root.querySelector('#kvr-title');
    const line = root.querySelector('.kvr-line');
    title.textContent = payload.test
      ? 'Tôi có thể lòi xuống như thế này.'
      : `${payload.icon || '📚'} Đến giờ ${payload.skillName || 'học rồi'}`;
    line.textContent = payload.line || 'Một nhiệm vụ thôi. Tôi đã mang hồ sơ tới tận đây.';

    root.querySelector('.kvr-open').addEventListener('click', async () => {
      root.classList.add('kvr-is-leaving');
      line.textContent = 'Cuối cùng quy trình cũng được tôn trọng.';
      await sendAction('open', payload.test).catch(() => {});
      removeOverlay(root, 550);
    });

    root.querySelector('.kvr-snooze')?.addEventListener('click', async () => {
      const result = await sendAction('snooze', payload.test).catch(() => ({ ok: false }));
      root.classList.add('kvr-is-leaving');
      line.textContent = result && result.ok
        ? 'Mười phút. Tôi đã ghi vào biên bản.'
        : 'Quyền hoãn hôm nay đã được dùng. Tôi có bằng chứng.';
      removeOverlay(root, 900);
    });

    root.querySelector('.kvr-close').addEventListener('click', async () => {
      root.classList.add('kvr-is-sulking');
      title.textContent = 'Bạn đuổi tôi.';
      line.textContent = payload.test
        ? 'Tạm biệt. Bản xem thử không làm tôi dỗi thật.'
        : 'Tạm biệt. Tôi sẽ không nói nữa.';
      root.querySelector('.kvr-actions').remove();
      root.querySelector('.kvr-close').disabled = true;
      await sendAction('dismiss', payload.test).catch(() => {});
      removeOverlay(root, 1900);
    });

    (document.body || document.documentElement).appendChild(root);
    window.requestAnimationFrame(() => root.classList.add('kvr-is-visible'));
    return root;
  }

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message && message.type === 'VALI_REMINDER_PING') {
      sendResponse({ ready: true });
      return false;
    }
    if (message && message.type === 'VALI_REMINDER_SHOW') {
      buildOverlay(message.payload || {});
      sendResponse({ shown: true });
      return false;
    }
    return false;
  });
})();
