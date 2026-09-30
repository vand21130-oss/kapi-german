import { next } from '@vercel/functions';
import { ENTRY_COOKIE, SESSION_COOKIE } from './gate-policy.mjs';
import {
  parseWebCookies,
  verifyWebEntryToken,
  verifyWebSessionToken
} from './gate-session-web.mjs';

const NO_STORE = { 'Cache-Control': 'no-store, max-age=0' };
const PUBLIC_PATHS = new Set([
  '/gate.html', '/gate.css', '/gate.js', '/assets/gate/chick-moods.png',
  '/api/gate', '/favicon.ico'
]);

function isDocumentRequest(request, pathname) {
  const destination = request.headers.get('sec-fetch-dest');
  const filename = pathname.split('/').at(-1);
  return destination === 'document' || destination === 'iframe'
    || !filename.includes('.') || /\.html?$/i.test(filename);
}

export async function routeGateRequest(request, gatePassword) {
  const url = new URL(request.url);
  if (PUBLIC_PATHS.has(url.pathname) || url.pathname.startsWith('/_vercel/')
    || url.pathname.startsWith('/.well-known/')) {
    return url.pathname === '/gate.html' ? next({ headers: NO_STORE }) : next();
  }

  const cookies = parseWebCookies(request.headers.get('cookie') || '');
  const authenticated = await verifyWebSessionToken(cookies[SESSION_COOKIE], gatePassword);
  const isApi = url.pathname.startsWith('/api/');

  if (authenticated) {
    // Assets and API calls keep working throughout the current SPA study session.
    if (isApi || !isDocumentRequest(request, url.pathname)) return next();

    // A correct password grants the next document load. Opening/reloading the
    // site afterwards must go through Gà again, even if the session is active.
    if (request.method === 'GET' && await verifyWebEntryToken(
      cookies[ENTRY_COOKIE], gatePassword, `${url.pathname}${url.search}`
    )) {
      return next({ headers: {
        ...NO_STORE,
        'Set-Cookie': `${ENTRY_COOKIE}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax`
      } });
    }
  }

  if (isApi) {
    return new Response(JSON.stringify({
      error: 'Cổng Nhà Kapi đang khóa.', code: 'KAPI_GATE_REQUIRED'
    }), {
      status: 401,
      headers: { ...NO_STORE, 'Content-Type': 'application/json; charset=utf-8',
        'X-Content-Type-Options': 'nosniff' }
    });
  }

  const gateUrl = new URL('/gate.html', url.origin);
  gateUrl.searchParams.set('next', `${url.pathname}${url.search}`);
  return new Response(null, {
    status: 307, headers: { ...NO_STORE, Location: gateUrl.toString() }
  });
}
