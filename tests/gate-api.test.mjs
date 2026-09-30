import assert from 'node:assert/strict';
import test from 'node:test';

import handler from '../api/gate.mjs';
import { ATTEMPT_COOKIE, ENTRY_COOKIE, SESSION_COOKIE, parseCookies, verifySessionToken } from '../lib/gate-auth.mjs';
import { verifyWebEntryToken } from '../lib/gate-session-web.mjs';
import { routeGateRequest } from '../lib/gate-routing.mjs';

const TEST_PASSWORD = 'correct horse capybara chick';

function makeResponse() {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    setHeader(name, value) {
      this.headers[String(name).toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    }
  };
}

async function request(method, { body, cookie = '' } = {}) {
  const req = { method, body, headers: { cookie } };
  const res = makeResponse();
  await handler(req, res);
  return res;
}

function cookiePair(setCookieHeader, name) {
  const entries = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
  const entry = entries.find(item => String(item).startsWith(`${name}=`));
  assert.ok(entry, `expected ${name} in Set-Cookie`);
  return entry.split(';', 1)[0];
}

test('gate rejects wrong keys, remembers attempts, then applies a server-signed lock', async () => {
  const oldPassword = process.env.KAPI_GATE_PASSWORD;
  process.env.KAPI_GATE_PASSWORD = TEST_PASSWORD;

  try {
    let cookie = '';
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      const res = await request('POST', {
        body: { password: `wrong-${attempt}` },
        cookie
      });
      assert.equal(res.body.attempts, attempt);
      assert.equal(res.statusCode, attempt < 3 ? 401 : 429);
      cookie = cookiePair(res.headers['set-cookie'], ATTEMPT_COOKIE);
    }

    const status = await request('GET', { cookie });
    assert.equal(status.statusCode, 200);
    assert.equal(status.body.authenticated, false);
    assert.equal(status.body.attempts, 3);
    assert.ok(status.body.waitSeconds > 0 && status.body.waitSeconds <= 10);
  } finally {
    if (oldPassword === undefined) delete process.env.KAPI_GATE_PASSWORD;
    else process.env.KAPI_GATE_PASSWORD = oldPassword;
  }
});

test('correct key grants one page load, requires the key on reopening, and keeps study APIs available', async () => {
  const oldPassword = process.env.KAPI_GATE_PASSWORD;
  process.env.KAPI_GATE_PASSWORD = TEST_PASSWORD;

  try {
    const nextPath = '/?kapi-reminder=lesen';
    const res = await request('POST', { body: { password: TEST_PASSWORD, returnTo: nextPath } });
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.authenticated, true);
    assert.equal(res.body.next, nextPath);

    const sessionPair = cookiePair(res.headers['set-cookie'], SESSION_COOKIE);
    const sessionCookie = parseCookies(sessionPair)[SESSION_COOKIE];
    assert.ok(sessionCookie);
    assert.equal(verifySessionToken(sessionCookie, TEST_PASSWORD), true);
    const entryPair = cookiePair(res.headers['set-cookie'], ENTRY_COOKIE);
    const entryToken = parseCookies(entryPair)[ENTRY_COOKIE];
    assert.equal(await verifyWebEntryToken(entryToken, TEST_PASSWORD, nextPath), true);

    const admitted = await routeGateRequest(new Request(`https://kapi.example${nextPath}`, {
      headers: { cookie: `${sessionPair}; ${entryPair}` }
    }), TEST_PASSWORD);
    assert.equal(admitted.headers.get('x-middleware-next'), '1');
    assert.match(admitted.headers.get('set-cookie'), new RegExp(`${ENTRY_COOKIE}=; Max-Age=0`));
    assert.match(admitted.headers.get('cache-control'), /no-store/);

    // The browser applies the clearing cookie, leaving only the study session.
    const reopened = await routeGateRequest(new Request(`https://kapi.example${nextPath}`, {
      headers: { cookie: sessionPair }
    }), TEST_PASSWORD);
    assert.equal(reopened.status, 307);
    assert.equal(new URL(reopened.headers.get('location')).searchParams.get('next'), nextPath);

    const studyApi = await routeGateRequest(new Request('https://kapi.example/api/check', {
      method: 'POST', headers: { cookie: sessionPair }
    }), TEST_PASSWORD);
    assert.equal(studyApi.headers.get('x-middleware-next'), '1');

    const status = await request('GET', { cookie: sessionPair });
    assert.equal(status.body.authenticated, false);
    assert.equal(status.headers['set-cookie'], undefined, 'opening a new tab must not log out the other study tab');

    const sessionHeader = res.headers['set-cookie'].find(item => item.startsWith(`${SESSION_COOKIE}=`));
    assert.doesNotMatch(sessionHeader, /Max-Age|Expires/);

    const cookies = res.headers['set-cookie'].join('\n');
    assert.match(cookies, /HttpOnly/);
    assert.match(cookies, /Secure/);
    assert.match(cookies, new RegExp(`${ATTEMPT_COOKIE}=;`));
  } finally {
    if (oldPassword === undefined) delete process.env.KAPI_GATE_PASSWORD;
    else process.env.KAPI_GATE_PASSWORD = oldPassword;
  }
});

test('correct key cannot redirect away from Nhà Kapi and logout clears the entry cookie', async () => {
  const oldPassword = process.env.KAPI_GATE_PASSWORD;
  process.env.KAPI_GATE_PASSWORD = TEST_PASSWORD;
  try {
    const res = await request('POST', { body: { password: TEST_PASSWORD, returnTo: '/\\evil.example' } });
    assert.equal(res.body.next, '/');
    const entry = parseCookies(cookiePair(res.headers['set-cookie'], ENTRY_COOKIE))[ENTRY_COOKIE];
    assert.equal(await verifyWebEntryToken(entry, TEST_PASSWORD, '/'), true);

    const logout = await request('DELETE');
    for (const name of [SESSION_COOKIE, ENTRY_COOKIE, ATTEMPT_COOKIE]) {
      const cleared = logout.headers['set-cookie'].find(item => item.startsWith(`${name}=`));
      assert.match(cleared, /Max-Age=0/);
    }
  } finally {
    if (oldPassword === undefined) delete process.env.KAPI_GATE_PASSWORD;
    else process.env.KAPI_GATE_PASSWORD = oldPassword;
  }
});

test('gate fails closed when KAPI_GATE_PASSWORD is absent', async () => {
  const oldPassword = process.env.KAPI_GATE_PASSWORD;
  delete process.env.KAPI_GATE_PASSWORD;

  try {
    const res = await request('POST', { body: { password: 'anything' } });
    assert.equal(res.statusCode, 503);
    assert.equal(res.body.code, 'GATE_NOT_CONFIGURED');
  } finally {
    if (oldPassword !== undefined) process.env.KAPI_GATE_PASSWORD = oldPassword;
  }
});
