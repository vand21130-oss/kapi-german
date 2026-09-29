import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ATTEMPT_COOKIE,
  LOCK_SCHEDULE_SECONDS,
  SESSION_COOKIE,
  createAttemptToken,
  createSessionToken,
  nextAttemptState,
  parseCookies,
  passwordMatches,
  readAttemptState,
  remainingLockSeconds,
  serializeCookie,
  verifySessionToken
} from '../lib/gate-auth.mjs';

const PASSWORD = 'a-long-secret-that-never-enters-browser-code';
const NOW = Date.UTC(2026, 8, 29, 12, 0, 0);

test('session token is valid until expiry and rejects tampering', () => {
  const token = createSessionToken(PASSWORD, NOW);
  assert.equal(verifySessionToken(token, PASSWORD, NOW), true);
  assert.equal(verifySessionToken(token, 'wrong-secret', NOW), false);
  assert.equal(verifySessionToken(`${token}x`, PASSWORD, NOW), false);
  assert.equal(verifySessionToken(token, PASSWORD, NOW + 31 * 24 * 60 * 60 * 1000), false);
});

test('password comparison is exact', () => {
  assert.equal(passwordMatches(PASSWORD, PASSWORD), true);
  assert.equal(passwordMatches(` ${PASSWORD}`, PASSWORD), false);
  assert.equal(passwordMatches(PASSWORD.toUpperCase(), PASSWORD), false);
  assert.equal(passwordMatches('', PASSWORD), false);
});

test('wrong attempts use the requested escalating lock schedule', () => {
  let state = { count: 0, lockedUntil: 0 };
  const waits = [];
  for (let index = 0; index < 7; index += 1) {
    state = nextAttemptState(state, NOW);
    waits.push(state.lockSeconds);
  }

  assert.deepEqual(waits, [0, 0, 10, 30, 120, 600, 86400]);
  assert.equal(LOCK_SCHEDULE_SECONDS[7], 86400);
});

test('attempt state is signed and a completed 24 hour lock resets', () => {
  const locked = { count: 7, lockedUntil: Math.floor(NOW / 1000) + 86400 };
  const token = createAttemptToken(locked, PASSWORD);

  assert.deepEqual(readAttemptState(token, PASSWORD, NOW), locked);
  assert.equal(remainingLockSeconds(locked, NOW), 86400);
  assert.deepEqual(readAttemptState(`${token}tampered`, PASSWORD, NOW), {
    count: 0,
    lockedUntil: 0
  });
  assert.deepEqual(readAttemptState(token, PASSWORD, NOW + 86401 * 1000), {
    count: 0,
    lockedUntil: 0
  });
});

test('cookie helpers preserve signed values and security attributes', () => {
  const session = createSessionToken(PASSWORD, NOW);
  const serialized = serializeCookie(SESSION_COOKIE, session, { maxAge: 60 });
  const parsed = parseCookies(`${serialized}; theme=cute`);

  assert.equal(parsed[SESSION_COOKIE], session);
  assert.match(serialized, /HttpOnly/);
  assert.match(serialized, /Secure/);
  assert.match(serialized, /SameSite=Lax/);
  assert.equal(parsed.theme, 'cute');
  assert.equal(ATTEMPT_COOKIE.startsWith('__Host-'), true);
});
