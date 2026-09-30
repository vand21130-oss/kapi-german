(() => {
  'use strict';

  const card = document.querySelector('.gate-card');
  const form = document.getElementById('gate-form');
  const passwordInput = document.getElementById('gate-password');
  const submitButton = document.getElementById('enter-button');
  const buttonLabel = submitButton.querySelector('.button-label');
  const peekButton = document.getElementById('peek-button');
  const message = document.getElementById('gate-message');
  const note = document.getElementById('gate-note');
  const countdown = document.getElementById('countdown');
  const countdownValue = document.getElementById('countdown-value');

  const DEFAULT_BUTTON_LABEL = 'Cốc cốc, cho tớ vào';
  const MOOD_CLASSES = ['is-confused', 'is-angry', 'is-locked', 'is-open'];
  let lockedUntil = 0;
  let countdownTimer = null;

  const lines = {
    confused: [
      'Ủa… chìa này hình như không mở cửa Nhà Kapi.',
      'Gà nằm dài, chứ gà chưa ngủ. Gõ lại xem nào.',
      'Cốc cốc nghe quen đấy, nhưng mật khẩu thì chưa.',
      'Gà nghiêng đầu rồi. Cậu có nhớ đúng chìa không đó?'
    ],
    tenSeconds: [
      'Ba lần rồi. Gà cần 10 giây để nhìn cậu bằng ánh mắt có chiều sâu.',
      'Gà vừa đếm đến ba. Đứng ngoài cửa 10 giây nhé.'
    ],
    thirtySeconds: [
      'Gà bắt đầu thấy câu chuyện này đáng ngờ. Nghỉ 30 giây.',
      'Lần bốn. Gà nằm chắn cửa thêm 30 giây.'
    ],
    twoMinutes: [
      'Gà đã úp mặt xuống sàn. Hai phút nữa hãy thương lượng tiếp.',
      'Năm chìa đều sai. Gà xin hai phút bình tâm.'
    ],
    tenMinutes: [
      'Gà không cãi nữa. Mười phút sau quay lại nói chuyện với bảo vệ.',
      'Sáu lần. Gà chuyển sang chế độ bất động 10 phút.'
    ],
    oneDay: [
      'Bạn đã làm tổn thương một con gà nằm dài. Hẹn ngày mai.',
      'Cổng đóng 24 giờ. Gà cần một ngày để lấy lại niềm tin.'
    ]
  };

  function pick(list, seed = Date.now()) {
    return list[Math.abs(Number(seed) || 0) % list.length];
  }

  function safeNextPath() {
    const candidate = new URLSearchParams(window.location.search).get('next') || '/';
    if (!candidate.startsWith('/') || candidate.startsWith('//') || candidate.startsWith('/gate')) {
      return '/';
    }
    return candidate;
  }

  function setMood(mood) {
    card.classList.remove(...MOOD_CLASSES);
    if (mood) card.classList.add(`is-${mood}`);
  }

  function setBusy(isBusy) {
    card.classList.toggle('is-busy', isBusy);
    passwordInput.disabled = isBusy || lockedUntil > Date.now();
    submitButton.disabled = isBusy || lockedUntil > Date.now();
    peekButton.disabled = isBusy || lockedUntil > Date.now();
    if (!isBusy) buttonLabel.textContent = DEFAULT_BUTTON_LABEL;
  }

  function formatDuration(totalSeconds) {
    const seconds = Math.max(0, Math.ceil(totalSeconds));
    if (seconds >= 3600) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const rest = seconds % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
    }
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
  }

  function lockLine(attempts, waitSeconds) {
    if (attempts >= 7 || waitSeconds > 600) return pick(lines.oneDay, attempts + waitSeconds);
    if (attempts === 6 || waitSeconds > 120) return pick(lines.tenMinutes, attempts + waitSeconds);
    if (attempts === 5 || waitSeconds > 30) return pick(lines.twoMinutes, attempts + waitSeconds);
    if (attempts === 4 || waitSeconds > 10) return pick(lines.thirtySeconds, attempts + waitSeconds);
    return pick(lines.tenSeconds, attempts + waitSeconds);
  }

  function stopCountdown() {
    if (countdownTimer) window.clearInterval(countdownTimer);
    countdownTimer = null;
  }

  function beginCountdown(untilEpochSeconds, attempts) {
    stopCountdown();
    lockedUntil = Math.max(Date.now(), Number(untilEpochSeconds) * 1000);
    setMood(attempts >= 7 ? 'locked' : 'angry');
    message.textContent = lockLine(attempts, Math.ceil((lockedUntil - Date.now()) / 1000));
    countdown.hidden = false;
    note.textContent = 'Trong lúc Gà dỗi, ô mật khẩu sẽ tự mở lại khi đồng hồ về 0.';

    const tick = () => {
      const secondsLeft = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
      countdownValue.textContent = formatDuration(secondsLeft);
      passwordInput.disabled = secondsLeft > 0;
      submitButton.disabled = secondsLeft > 0;
      peekButton.disabled = secondsLeft > 0;

      if (secondsLeft <= 0) {
        stopCountdown();
        lockedUntil = 0;
        countdown.hidden = true;
        setMood('confused');
        message.textContent = 'Gà đã ngó lại. Lần này nhớ mang đúng chìa nhé.';
        note.textContent = 'Chìa khóa chỉ được đối chiếu ở phía server. Gà không cất nó trong trình duyệt.';
        passwordInput.disabled = false;
        submitButton.disabled = false;
        peekButton.disabled = false;
        passwordInput.focus();
      }
    };

    tick();
    countdownTimer = window.setInterval(tick, 1000);
  }

  function showWrongPassword(attempts) {
    setMood('confused');
    message.textContent = pick(lines.confused, attempts + Date.now());
    note.textContent = attempts === 1
      ? 'Sai lần đầu. Gà vẫn đang rất kiên nhẫn.'
      : 'Sai lần hai. Lần tiếp theo Gà sẽ nằm chắn cửa 10 giây.';
    passwordInput.value = '';
    passwordInput.focus();
  }

  async function readStatus() {
    try {
      const response = await fetch('/api/gate', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { Accept: 'application/json' }
      });
      const data = await response.json();

      if (data.waitSeconds > 0 && data.lockedUntil) {
        beginCountdown(data.lockedUntil, data.attempts || 0);
      }
    } catch (_) {
      note.textContent = 'Gà chưa gọi được đường dây ở cổng. Có thể deployment vẫn đang khởi động.';
    }
  }

  peekButton.addEventListener('click', () => {
    const showing = passwordInput.type === 'text';
    passwordInput.type = showing ? 'password' : 'text';
    peekButton.setAttribute('aria-pressed', String(!showing));
    peekButton.setAttribute('aria-label', showing ? 'Hiện mật khẩu' : 'Ẩn mật khẩu');
    passwordInput.focus();
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (lockedUntil > Date.now()) return;

    const password = passwordInput.value;
    if (!password) {
      setMood('confused');
      message.textContent = 'Cậu đưa cho Gà… không khí à? Mật khẩu đâu?';
      passwordInput.focus();
      return;
    }

    setBusy(true);
    buttonLabel.textContent = 'Gà đang soi chìa';

    try {
      const response = await fetch('/api/gate', {
        method: 'POST',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, returnTo: safeNextPath() })
      });
      const data = await response.json();

      if (response.ok && data.authenticated) {
        stopCountdown();
        lockedUntil = 0;
        countdown.hidden = true;
        setMood('open');
        message.textContent = data.message || 'À, người nhà. Mời vào Nhà Kapi ♡';
        note.textContent = 'Cửa mở rồi. Gà xin phép nằm sang một bên.';
        passwordInput.value = '';
        window.setTimeout(() => window.location.replace(data.next || safeNextPath()), 900);
        return;
      }

      if (data.waitSeconds > 0 && data.lockedUntil) {
        passwordInput.value = '';
        beginCountdown(data.lockedUntil, data.attempts || 0);
        return;
      }

      if (data.code === 'WRONG_PASSWORD') {
        showWrongPassword(data.attempts || 1);
        return;
      }

      setMood('locked');
      message.textContent = data.message || 'Gà chưa mở được cổng. Thử lại sau một chút nhé.';
    } catch (_) {
      setMood('confused');
      message.textContent = 'Đường dây tới ổ Gà bị rối. Cậu thử lại một lần nhé.';
      note.textContent = 'Nếu vừa deploy, đợi Vercel hoàn tất rồi tải lại trang.';
    } finally {
      if (!card.classList.contains('is-open')) setBusy(false);
    }
  });

  readStatus();
})();
