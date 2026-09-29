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

export async function verifyWebSessionToken(token, password, nowMs = Date.now()) {
  if (!token || !password) return false;

  const [version, payload, signature, extra] = String(token).split('.');
  if (version !== 'v1' || !payload || !signature || extra) return false;

  try {
    const key = await sessionVerificationKey(password);
    const validSignature = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64Url(signature),
      encoder.encode(`session\0${payload}`)
    );
    if (!validSignature) return false;

    const session = JSON.parse(decoder.decode(decodeBase64Url(payload)));
    return Number.isSafeInteger(session?.expiresAt)
      && session.expiresAt > Math.floor(nowMs / 1000);
  } catch (_) {
    return false;
  }
}
