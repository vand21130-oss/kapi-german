import assert from 'node:assert/strict';
import test from 'node:test';
import { routeGateRequest } from '../lib/gate-routing.mjs';
import { ENTRY_COOKIE, SESSION_COOKIE, createEntryToken, createSessionToken } from '../lib/gate-auth.mjs';

const PASSWORD = 'routing test secret';

function request(path, cookies = {}, headers = {}, method = 'GET') {
  return new Request(`https://kapi.example${path}`, {
    method,
    headers: { ...headers, cookie: Object.entries(cookies).map(([name, value]) => `${name}=${value}`).join('; ') }
  });
}

test('gate and its chicken stay public while the protected site and APIs fail closed', async () => {
  for (const path of ['/gate.html', '/gate.js?v=login-on-open', '/gate.css', '/assets/gate/chick-moods.png', '/api/gate']) {
    const response = await routeGateRequest(request(path), '');
    assert.equal(response.headers.get('x-middleware-next'), '1', path);
    if (path === '/gate.html') assert.match(response.headers.get('cache-control'), /no-store/);
  }
  for (const password of ['', PASSWORD]) {
    const page = await routeGateRequest(request('/'), password);
    assert.equal(page.status, 307);
    assert.equal(new URL(page.headers.get('location')).pathname, '/gate.html');
    const api = await routeGateRequest(request('/api/check'), password);
    assert.equal(api.status, 401);
    assert.equal((await api.json()).code, 'KAPI_GATE_REQUIRED');
  }
});

test('active and legacy cookies cannot silently open or reload a document', async () => {
  const session = createSessionToken(PASSWORD);
  for (const token of [session, session.replace(/^v2\./, 'v1.')]) {
    for (const path of ['/', '/index', '/index.html', '/index.html?from=reminder']) {
      const page = await routeGateRequest(request(path, { [SESSION_COOKIE]: token }), PASSWORD);
      assert.equal(page.status, 307, path);
      assert.equal(new URL(page.headers.get('location')).searchParams.get('next'), path);
    }
  }
});

test('entry requires a valid session and cannot admit a different path or an expired ticket', async () => {
  const session = createSessionToken(PASSWORD);
  const entry = createEntryToken(PASSWORD);
  const expired = createEntryToken(PASSWORD, '/', Date.now() - 61000);
  for (const cookies of [
    { [ENTRY_COOKIE]: entry },
    { [SESSION_COOKIE]: session, [ENTRY_COOKIE]: `${entry}x` },
    { [SESSION_COOKIE]: session, [ENTRY_COOKIE]: expired },
    { [SESSION_COOKIE]: session, [ENTRY_COOKIE]: createEntryToken(PASSWORD, '/index.html') }
  ]) {
    assert.equal((await routeGateRequest(request('/', cookies), PASSWORD)).status, 307);
  }
});

test('study assets stay available without consuming entry permission', async () => {
  const cookies = { [SESSION_COOKIE]: createSessionToken(PASSWORD), [ENTRY_COOKIE]: createEntryToken(PASSWORD) };
  for (const path of ['/kapi-logic.js', '/vokabel-data.js', '/audio/listening.mp3', '/bg-pattern.jpg', '/api/check']) {
    const response = await routeGateRequest(request(path, cookies), PASSWORD);
    assert.equal(response.headers.get('x-middleware-next'), '1', path);
    assert.equal(response.headers.get('set-cookie'), null, path);
  }
  const disguisedDocument = await routeGateRequest(request('/download.pdf', {
    [SESSION_COOKIE]: cookies[SESSION_COOKIE]
  }, { 'sec-fetch-dest': 'document' }), PASSWORD);
  assert.equal(disguisedDocument.status, 307);
});
