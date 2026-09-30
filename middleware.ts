import { routeGateRequest } from './lib/gate-routing.mjs';

declare const process: {
  env: Record<string, string | undefined>;
};

export const config = {
  runtime: 'edge'
};

export default async function kapiGate(request: Request) {
  return routeGateRequest(request, process.env.KAPI_GATE_PASSWORD || '');
}
