import {
  ATTEMPT_COOKIE,
  ATTEMPT_MAX_AGE_SECONDS,
  ENTRY_COOKIE,
  SESSION_COOKIE,
  createAttemptToken,
  createEntryToken,
  createSessionToken,
  nextAttemptState,
  parseCookies,
  passwordMatches,
  readAttemptState,
  remainingLockSeconds,
  serializeCookie
} from '../lib/gate-auth.mjs';
import { ENTRY_MAX_AGE_SECONDS, normalizeEntryPath } from '../lib/gate-policy.mjs';

function noStore(res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

function json(res, status, payload) {
  noStore(res);
  return res.status(status).json(payload);
}

function readJsonBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  try {
    return JSON.parse(Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body);
  } catch (_) {
    return {};
  }
}

function clearCookie(name) {
  return serializeCookie(name, '', {
    maxAge: 0,
    expires: new Date(0)
  });
}

export default async function handler(req, res) {
  const gatePassword = process.env.KAPI_GATE_PASSWORD;
  if (!gatePassword) {
    return json(res, 503, {
      ok: false,
      code: 'GATE_NOT_CONFIGURED',
      message: 'Gà chưa được giao chìa khóa KAPI_GATE_PASSWORD.'
    });
  }

  const cookies = parseCookies(req.headers.cookie || '');
  const attemptState = readAttemptState(cookies[ATTEMPT_COOKIE], gatePassword);
  const waitSeconds = remainingLockSeconds(attemptState);

  if (req.method === 'GET') {
    return json(res, 200, {
      ok: true,
      // Visiting the gate always requires the password again. A session from
      // another tab must not silently open this one (including old gate.js).
      authenticated: false,
      attempts: attemptState.count,
      lockedUntil: waitSeconds ? attemptState.lockedUntil : 0,
      waitSeconds
    });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', [
      clearCookie(SESSION_COOKIE), clearCookie(ENTRY_COOKIE), clearCookie(ATTEMPT_COOKIE)
    ]);
    return json(res, 200, { ok: true, authenticated: false });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST, DELETE');
    return json(res, 405, { ok: false, code: 'METHOD_NOT_ALLOWED' });
  }

  if (waitSeconds > 0) {
    return json(res, 429, {
      ok: false,
      code: 'GATE_LOCKED',
      attempts: attemptState.count,
      lockedUntil: attemptState.lockedUntil,
      waitSeconds
    });
  }

  const { password, returnTo } = readJsonBody(req);
  const candidate = typeof password === 'string' ? password.slice(0, 512) : '';

  if (passwordMatches(candidate, gatePassword)) {
    const nextPath = normalizeEntryPath(returnTo);
    res.setHeader('Set-Cookie', [
      // No Max-Age/Expires: do not remember authentication for 30 days.
      serializeCookie(SESSION_COOKIE, createSessionToken(gatePassword)),
      serializeCookie(ENTRY_COOKIE, createEntryToken(gatePassword, nextPath), {
        maxAge: ENTRY_MAX_AGE_SECONDS
      }),
      clearCookie(ATTEMPT_COOKIE)
    ]);
    return json(res, 200, {
      ok: true,
      authenticated: true,
      next: nextPath,
      message: 'À, người nhà. Mời vào Nhà Kapi ♡'
    });
  }

  const nextState = nextAttemptState(attemptState);
  res.setHeader('Set-Cookie', serializeCookie(
    ATTEMPT_COOKIE,
    createAttemptToken(nextState, gatePassword),
    { maxAge: ATTEMPT_MAX_AGE_SECONDS }
  ));

  return json(res, nextState.lockSeconds ? 429 : 401, {
    ok: false,
    code: nextState.lockSeconds ? 'GATE_LOCKED' : 'WRONG_PASSWORD',
    attempts: nextState.count,
    lockedUntil: nextState.lockedUntil,
    waitSeconds: nextState.lockSeconds
  });
}
