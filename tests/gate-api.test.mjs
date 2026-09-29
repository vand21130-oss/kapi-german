import assert from 'node:assert/strict';
import test from 'node:test';

import handler from '../api/gate.mjs';
import { ATTEMPT_COOKIE, SESSION_COOKIE, parseCookies } from '../lib/gate-auth.mjs';

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

test('correct key returns an HttpOnly session and clears the attempt cookie', async () => {
  const oldPassword = process.env.KAPI_GATE_PASSWORD;
  process.env.KAPI_GATE_PASSWORD = TEST_PASSWORD;

  try {
    const res = await request('POST', { body: { password: TEST_PASSWORD } });
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.authenticated, true);

    const sessionPair = cookiePair(res.headers['set-cookie'], SESSION_COOKIE);
    const sessionCookie = parseCookies(sessionPair)[SESSION_COOKIE];
    assert.ok(sessionCookie);

    const status = await request('GET', { cookie: sessionPair });
    assert.equal(status.body.authenticated, true);

    const cookies = res.headers['set-cookie'].join('\n');
    assert.match(cookies, /HttpOnly/);
    assert.match(cookies, /Secure/);
    assert.match(cookies, new RegExp(`${ATTEMPT_COOKIE}=;`));
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
