import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
function shop() {
  const {document} = parseHTML(html);
  const timers = new Map(), data = new Map(); let next = 0;
  const ctx = {document, console, localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)}, setInterval(){},setTimeout(fn){timers.set(++next,fn);return next},clearTimeout(id){timers.delete(id)}};
  ctx.window=ctx; vm.createContext(ctx);
  const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].find(m=>m[1].includes("const STORAGE_KEY = 'kapi_eco_system'"))[1];
  const run = code=>vm.runInContext(code,ctx); run(script);
  for(const img of document.querySelectorAll('.kapi-scene-image, .kapi-sleep-image')) {img.complete=true;img.naturalWidth=560;}
  run('sysData.inventory=["item_glass","item_glass_mint","item_pillow"];sysData.equippedItems.face="item_glass";sysData.activeDisplayItemId="item_glass";');
  return {run,document,timers,data};
}
test('activity preview overrides active fashion, restores outfit without changing saved state',()=>{
  const s=shop(), before=s.run('JSON.stringify(sysData)');
  s.run('previewKapiItem("item_pillow",true)');
  assert.ok(s.document.querySelector('.kapi-container').classList.contains('kapi-scene-sleep'));
  assert.equal(s.run('JSON.stringify(sysData)'),before);
  [...s.timers.values()].forEach(fn=>fn());
  assert.ok(s.document.querySelector('.kapi-container').classList.contains('kapi-scene-sunglasses'));
});
test('colour variants retain own accessory instead of black full-body artwork',()=>{
  const s=shop(); s.run('equipItem("item_glass_mint")');
  assert.ok(s.document.getElementById('kapi-accessory').classList.contains('mint'));
  assert.equal(s.document.querySelector('.kapi-container').classList.contains('kapi-full-scene'),false);
});
test('purchase uses catalogue price, repeated purchase does not debit again',()=>{
  const s=shop();s.run('sysData.totalLeaves=50;sysData.studyCompletions=10;buyItem("item_hat",1);buyItem("item_hat",1)');
  assert.equal(s.run('sysData.totalLeaves'),38);
  assert.equal(s.run('sysData.inventory.filter(id=>id==="item_hat").length'),1);
});
test('equipping during demo cancels old timer and keeps newly selected outfit',()=>{
  const s=shop();s.run('previewKapiItem("item_pillow",true);equipItem("item_glass_mint")');
  assert.equal(s.timers.size,0);
  assert.equal(s.run('sysData.activeDisplayItemId'),'item_glass_mint');
});
test('failed scene does not consume demo and unavailable sleep keeps Kapi visible',()=>{
  const s=shop();s.document.getElementById('kapi-sleep-image').naturalWidth=0;
  s.run('sysData.inventory=[];previewKapiItem("item_pillow")');
  assert.equal(s.run('hasPreviewedKapiActivity("item_pillow")'),false);
  s.run('sysData.inventory=["item_pillow"];equipItem("item_pillow")');
  assert.equal(s.document.querySelector('.kapi-container').classList.contains('kapi-scene-sleep'),false);
});
test('shop shows complete names and explicit used-demo labels',()=>{
 const s=shop();s.run('localStorage.setItem(KAPI_PREVIEW_KEY,JSON.stringify(["item_cocoa"]))');
 const row=s.run('renderShopItem(shopItems.find(i=>i.id==="item_cocoa"))');
 assert.match(row,/Đã xem thử/);assert.match(row,/Chưa mở khóa/);assert.doesNotMatch(row,/>✓</);
 assert.match(html,/\.shop-item-name \{[^}]*white-space: normal/);
});
