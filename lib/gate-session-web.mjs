import { SESSION_TOKEN_PURPOSE, SESSION_TOKEN_VERSION } from './gate-policy.mjs';

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function decodeBase64Url(value) {
  const normalized = String(value).replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

/** @returns {Record<string, string>} */
export function parseWebCookies(cookieHeader = '') {
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

async function sessionVerificationKey(password) {
  const material = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(`kapi-house-gate\0${password}`)
  );
  return crypto.subtle.importKey(
    'raw',
    material,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

async function readWebSignedToken(token, password, purpose, expectedVersion) {
  if (!token || !password) return null;

  const [version, payload, signature, extra] = String(token).split('.');
  if (version !== expectedVersion || !payload || !signature || extra) return null;

  try {
    const key = await sessionVerificationKey(password);
    const validSignature = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(signature),
      encoder.encode(`${purpose}\0${payload}`)
    );
    if (!validSignature) return null;

    return JSON.parse(decoder.decode(decodeBase64Url(payload)));
  } catch (_) {
    return null;
  }
}

export async function verifyWebSessionToken(token, password, nowMs = Date.now()) {
  const session = await readWebSignedToken(token, password, SESSION_TOKEN_PURPOSE, SESSION_TOKEN_VERSION);
  return Boolean(session && Number.isSafeInteger(session.expiresAt)
    && session.expiresAt > Math.floor(nowMs / 1000));
}

export async function verifyWebEntryToken(token, password, path, nowMs = Date.now()) {
  const entry = await readWebSignedToken(token, password, 'entry', 'v1');
  return Boolean(entry && entry.path === path && Number.isSafeInteger(entry.expiresAt)
    && entry.expiresAt > Math.floor(nowMs / 1000));
}
