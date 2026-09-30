export const SESSION_COOKIE = '__Host-kapi_house';
export const ENTRY_COOKIE = '__Host-kapi_entry';
export const SESSION_TOKEN_VERSION = 'v2';
export const SESSION_TOKEN_PURPOSE = 'session-v2';
export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60;
export const ENTRY_MAX_AGE_SECONDS = 60;

// Only a local path may be used for the redirect and the entry cookie.
export function normalizeEntryPath(candidate) {
  if (typeof candidate !== 'string' || !candidate.startsWith('/')
    || candidate.startsWith('//') || /[\\\u0000-\u0020]/.test(candidate)) return '/';

  try {
    const url = new URL(candidate, 'https://kapi.invalid');
    if (url.origin !== 'https://kapi.invalid' || url.pathname.startsWith('/gate')) return '/';
    return `${url.pathname}${url.search}`;
  } catch (_) {
    return '/';
  }
}
