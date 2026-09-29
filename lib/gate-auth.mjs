import {
  createHash,
  createHmac,
  timingSafeEqual
} from 'node:crypto';

export const SESSION_COOKIE = '__Host-kapi_house';
export const ATTEMPT_COOKIE = '__Host-kapi_gate_attempts';
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const ATTEMPT_MAX_AGE_SECONDS = 60 * 60 * 24 * 2;

const TOKEN_VERSION = 'v1';

export const LOCK_SCHEDULE_SECONDS = Object.freeze({
  3: 10,
  4: 30,
  5: 2 * 60,
  6: 10 * 60,
  7: 24 * 60 * 60
});

function encodeBase64Url(value) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signingKey(password) {
  return createHash('sha256')
    .update('kapi-house-gate\0', 'utf8')
    .update(String(password), 'utf8')
    .digest();
}

function signatureFor(payload, password, purpose) {
  return createHmac('sha256', signingKey(password))
    .update(`${purpose}\0${payload}`, 'utf8')
    .digest('base64url');
}

function signaturesMatch(actual, expected) {
  try {
    const actualBytes = Buffer.from(String(actual), 'base64url');
    const expectedBytes = Buffer.from(String(expected), 'base64url');
    return actualBytes.length === expectedBytes.length
      && timingSafeEqual(actualBytes, expectedBytes);
  } catch (_) {
    return false;
  }
}

function createSignedToken(value, password, purpose) {
  const payload = encodeBase64Url(JSON.stringify(value));
  const signature = signatureFor(payload, password, purpose);
  return `${TOKEN_VERSION}.${payload}.${signature}`;
}

function readSignedToken(token, password, purpose) {
  if (!token || !password) return null;

  const [version, payload, signature, extra] = String(token).split('.');
  if (version !== TOKEN_VERSION || !payload || !signature || extra) return null;

  const expected = signatureFor(payload, password, purpose);
  if (!signaturesMatch(signature, expected)) return null;

  try {
    return JSON.parse(decodeBase64Url(payload));
  } catch (_) {
    return null;
  }
}

/** @returns {Record<string, string>} */
export function parseCookies(cookieHeader = '') {
  return String(cookieHeader)
    .split(';')
    .reduce((cookies, part) => {
      const separator = part.indexOf('=');
      if (separator < 1) return cookies;
      const name = part.slice(0, separator).trim();
      const rawValue = part.slice(separator + 1).trim();
      try {
        cookies[name] = decodeURIComponent(rawValue);
      } catch (_) {
        cookies[name] = rawValue;
      }
      return cookies;
    }, /** @type {Record<string, string>} */ ({}));
}

export function passwordMatches(candidate, expectedPassword) {
  if (typeof candidate !== 'string' || typeof expectedPassword !== 'string' || !expectedPassword) {
    return false;
  }

  const candidateDigest = createHash('sha256').update(candidate, 'utf8').digest();
  const expectedDigest = createHash('sha256').update(expectedPassword, 'utf8').digest();
  return timingSafeEqual(candidateDigest, expectedDigest);
}

export function createSessionToken(password, nowMs = Date.now()) {
  const expiresAt = Math.floor(nowMs / 1000) + SESSION_MAX_AGE_SECONDS;
  return createSignedToken({ expiresAt }, password, 'session');
}

export function verifySessionToken(token, password, nowMs = Date.now()) {
  const session = readSignedToken(token, password, 'session');
  return Boolean(
    session
    && Number.isSafeInteger(session.expiresAt)
    && session.expiresAt > Math.floor(nowMs / 1000)
  );
}

export function readAttemptState(token, password, nowMs = Date.now()) {
  const state = readSignedToken(token, password, 'attempts');
  const count = Number.isSafeInteger(state?.count) && state.count > 0 ? state.count : 0;
  const lockedUntil = Number.isSafeInteger(state?.lockedUntil) && state.lockedUntil > 0
    ? state.lockedUntil
    : 0;
  const now = Math.floor(nowMs / 1000);

  // Sau khi chịu đủ 24 giờ, Gà nguôi giận và cho đếm lại từ đầu.
  if (count >= 7 && lockedUntil <= now) {
    return { count: 0, lockedUntil: 0 };
  }

  return { count, lockedUntil };
}

export function createAttemptToken(state, password) {
  return createSignedToken({
    count: Math.max(0, Number(state?.count) || 0),
    lockedUntil: Math.max(0, Number(state?.lockedUntil) || 0)
  }, password, 'attempts');
}

export function nextAttemptState(previousState, nowMs = Date.now()) {
  const now = Math.floor(nowMs / 1000);
  const count = Math.min(7, Math.max(0, Number(previousState?.count) || 0) + 1);
  const lockSeconds = LOCK_SCHEDULE_SECONDS[count] || 0;
  return {
    count,
    lockedUntil: lockSeconds ? now + lockSeconds : 0,
    lockSeconds
  };
}

export function remainingLockSeconds(state, nowMs = Date.now()) {
  const now = Math.floor(nowMs / 1000);
  return Math.max(0, (Number(state?.lockedUntil) || 0) - now);
}

export function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  if (Number.isFinite(options.maxAge)) parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge))}`);
  parts.push(`Path=${options.path || '/'}`);
  if (options.httpOnly !== false) parts.push('HttpOnly');
  if (options.secure !== false) parts.push('Secure');
  parts.push(`SameSite=${options.sameSite || 'Lax'}`);
  if (options.expires instanceof Date) parts.push(`Expires=${options.expires.toUTCString()}`);
  return parts.join('; ');
}
