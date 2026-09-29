(function connectKapiHouseToVali() {
  'use strict';

  if (window.__kapiValiSiteBridgeInstalled) return;
  window.__kapiValiSiteBridgeInstalled = true;

  const PAGE_SOURCE = 'kapi-house';
  const EXTENSION_SOURCE = 'kapi-vali-extension';

  function requestCurrentState() {
    window.postMessage({
      source: EXTENSION_SOURCE,
      type: 'KAPI_REMINDER_REQUEST_STATE'
    }, window.location.origin);
  }

  window.addEventListener('message', event => {
    if (event.source !== window || event.origin !== window.location.origin) return;
    const data = event.data;
    if (!data || data.source !== PAGE_SOURCE || data.type !== 'KAPI_REMINDER_STATE') return;
    chrome.runtime.sendMessage({
      type: 'KAPI_STATE_UPDATE',
      payload: data.payload
    }).catch(() => {});
  });

  requestCurrentState();
  document.addEventListener('DOMContentLoaded', requestCurrentState, { once: true });
  window.addEventListener('pageshow', requestCurrentState);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') requestCurrentState();
  });
})();
