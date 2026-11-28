/* Presentation only: keep navigation, storage and all review engines unchanged. */
(() => {
  const container = document.getElementById('container');
  const message = document.getElementById('message');
  const buttons = document.getElementById('buttons');
  const shop = document.getElementById('shop-widget');
  const wallet = document.querySelector('.total-leaves');
  if (wallet) document.getElementById('kapi-header-wallet').append(wallet);
  function syncWelcome() {
    const welcome = message?.textContent.trim() === 'Guten Morgen! Schön, dich kennenzulernen! 🌟'
      && !!buttons?.querySelector('[onclick="sayHallo()"]')
      && container.style.display !== 'none';
    document.body.classList.toggle('kapi-welcome', welcome);
    if (!welcome && shop) shop.open = false;
  }
  if (container) new MutationObserver(syncWelcome).observe(container, {childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['style']});
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && shop) shop.open = false; });
  document.addEventListener('click', event => { if (shop?.open && !shop.contains(event.target)) shop.open = false; });
  syncWelcome();
})();
