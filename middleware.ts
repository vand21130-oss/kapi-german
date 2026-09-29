import { next } from '@vercel/functions';
import { parseCookies, SESSION_COOKIE, verifySessionToken } from './lib/gate-auth.mjs';

declare const process: {
  env: Record<string, string | undefined>;
};

export const config = {
  runtime: 'nodejs'
};

const PUBLIC_PATHS = new Set([
  '/gate.html',
  '/gate.css',
  '/gate.js',
  '/api/gate',
  '/favicon.ico'
]);

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.has(pathname)
    || pathname.startsWith('/_vercel/')
    || pathname.startsWith('/.well-known/');
}

function unauthorizedApiResponse() {
  return new Response(JSON.stringify({
    error: 'Cổng Nhà Kapi đang khóa.',
    code: 'KAPI_GATE_REQUIRED'
  }), {
    status: 401,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': 'application/json; charset=utf-8',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}

export default function kapiGate(request: Request) {
  const url = new URL(request.url);
  if (isPublicPath(url.pathname)) return next();

  const gatePassword = process.env.KAPI_GATE_PASSWORD || '';
  const cookies = parseCookies(request.headers.get('cookie') || '');
  if (gatePassword && verifySessionToken(cookies[SESSION_COOKIE], gatePassword)) return next();

  if (url.pathname.startsWith('/api/')) return unauthorizedApiResponse();

  const gateUrl = new URL('/gate.html', url.origin);
  gateUrl.searchParams.set('next', `${url.pathname}${url.search}`);
  return new Response(null, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      Location: gateUrl.toString()
    }
  });
}
