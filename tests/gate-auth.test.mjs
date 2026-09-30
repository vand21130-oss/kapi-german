import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash, createHmac } from 'node:crypto';

import {
  ATTEMPT_COOKIE,
  LOCK_SCHEDULE_SECONDS,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createAttemptToken,
  createEntryToken,
  createSessionToken,
  nextAttemptState,
  parseCookies,
  passwordMatches,
  readAttemptState,
  remainingLockSeconds,
  serializeCookie,
  verifySessionToken
} from '../lib/gate-auth.mjs';
import { parseWebCookies, verifyWebEntryToken, verifyWebSessionToken } from '../lib/gate-session-web.mjs';
import { ENTRY_MAX_AGE_SECONDS, normalizeEntryPath } from '../lib/gate-policy.mjs';

const PASSWORD = 'a-long-secret-that-never-enters-browser-code';
const NOW = Date.UTC(2026, 8, 29, 12, 0, 0);

test('session token is valid until expiry and rejects tampering', () => {
  const token = createSessionToken(PASSWORD, NOW);
  assert.equal(verifySessionToken(token, PASSWORD, NOW), true);
  assert.equal(verifySessionToken(token, 'wrong-secret', NOW), false);
  assert.equal(verifySessionToken(`${token}x`, PASSWORD, NOW), false);
  assert.equal(verifySessionToken(token, PASSWORD, NOW + (SESSION_MAX_AGE_SECONDS - 1) * 1000), true);
  assert.equal(verifySessionToken(token, PASSWORD, NOW + SESSION_MAX_AGE_SECONDS * 1000), false);
});

test('edge-compatible verifier accepts the Node-issued session token', async () => {
  const token = createSessionToken(PASSWORD, NOW);
  assert.equal(await verifyWebSessionToken(token, PASSWORD, NOW), true);
  assert.equal(await verifyWebSessionToken(token, 'wrong-secret', NOW), false);
  assert.equal(await verifyWebSessionToken(`${token}x`, PASSWORD, NOW), false);
  assert.equal(
    await verifyWebSessionToken(token, PASSWORD, NOW + SESSION_MAX_AGE_SECONDS * 1000),
    false
  );
  assert.equal(parseWebCookies(`hello=world; ${SESSION_COOKIE}=${encodeURIComponent(token)}`)[SESSION_COOKIE], token);
});

test('legacy v1 session cookies no longer authenticate the site', async () => {
  // Generate a genuine 30-day token using the previous release's wire format.
  const payload = Buffer.from(JSON.stringify({ expiresAt: Math.floor(NOW / 1000) + 30 * 86400 })).toString('base64url');
  const key = createHash('sha256').update(`kapi-house-gate\0${PASSWORD}`).digest();
  const signature = createHmac('sha256', key).update(`session\0${payload}`).digest('base64url');
  const legacyToken = `v1.${payload}.${signature}`;
  assert.equal(verifySessionToken(legacyToken, PASSWORD, NOW), false);
  assert.equal(await verifyWebSessionToken(legacyToken, PASSWORD, NOW), false);
  const changedPrefix = legacyToken.replace(/^v1\./, 'v2.');
  assert.equal(verifySessionToken(changedPrefix, PASSWORD, NOW), false);
  assert.equal(await verifyWebSessionToken(changedPrefix, PASSWORD, NOW), false);
});

test('entry token expires quickly, binds the destination and cannot be a session', async () => {
  const path = '/?kapi-reminder=lesen';
  const entry = createEntryToken(PASSWORD, path, NOW);
  assert.equal(await verifyWebEntryToken(entry, PASSWORD, path, NOW), true);
  assert.equal(await verifyWebEntryToken(entry, PASSWORD, '/', NOW), false);
  assert.equal(await verifyWebEntryToken(entry, 'wrong-secret', path, NOW), false);
  assert.equal(await verifyWebEntryToken(`${entry}x`, PASSWORD, path, NOW), false);
  assert.equal(await verifyWebEntryToken(entry, PASSWORD, path, NOW + ENTRY_MAX_AGE_SECONDS * 1000), false);
  assert.equal(await verifyWebSessionToken(entry, PASSWORD, NOW), false);
  assert.equal(await verifyWebEntryToken(createSessionToken(PASSWORD, NOW), PASSWORD, path, NOW), false);
});

test('entry redirects stay local and preserve reminder parameters', () => {
  assert.equal(normalizeEntryPath('/?kapi-reminder=lesen#section'), '/?kapi-reminder=lesen');
  for (const path of ['https://evil.example', '//evil.example', '/\\evil.example', '/gate.html', '/a/../gate.html', '/\n/evil.example', null]) {
    assert.equal(normalizeEntryPath(path), '/');
  }
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
