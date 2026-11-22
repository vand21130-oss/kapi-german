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
test('owned replay persists the selected GIF and never schedules an expiry',()=>{
 const s=shop();s.run('previewKapiItem("item_pillow",true)');
 assert.equal(s.run('sysData.activeDisplayItemId'),'item_pillow');
 assert.match(s.document.getElementById('kapi-gif-image').src,/kapi-sleep.gif$/);
 assert.equal(s.timers.size,0);
 s.run('restoreKapiAnimatedOutfit();updateKapiAppearance()');
 assert.match(s.document.getElementById('kapi-gif-image').src,/kapi-sleep.gif$/);
});
test('all colour variants have GIFs and preserve purchases',()=>{
 const s=shop();s.run('sysData.totalLeaves=17;equipItem("item_glass_mint");restoreKapiAnimatedOutfit();updateKapiAppearance()');
 assert.equal(s.run('sysData.activeDisplayItemId'),'item_glass_mint');
 assert.equal(s.run('sysData.totalLeaves'),17);
 assert.match(s.document.getElementById('kapi-gif-image').src,/sunglasses-mint.gif$/);
});
test('only the visible full-body outfit is marked equipped',()=>{
 const s=shop();s.run('sysData.inventory.push("item_flower");equipItem("item_flower")');
 assert.doesNotMatch(s.run('renderShopItem(shopItems.find(i=>i.id==="item_glass"))'),/class="equipped"/);
 assert.match(s.run('renderShopItem(shopItems.find(i=>i.id==="item_flower"))'),/class="equipped"/);
});
test('unowned preview consumes its ticket only after load, then restores saved GIF',()=>{
 const s=shop(),before=s.run('JSON.stringify(sysData)');
 s.run('previewKapiItem("item_cocoa")');
 assert.equal(s.run('hasPreviewedKapiActivity("item_cocoa")'),false);
 s.document.getElementById('kapi-gif-image').onload();
 assert.equal(s.run('hasPreviewedKapiActivity("item_cocoa")'),true);
 [...s.timers.values()].forEach(fn=>fn());
 assert.equal(s.run('JSON.stringify(sysData)'),before);
 assert.match(s.document.getElementById('kapi-gif-image').src,/sunglasses.gif$/);
});
test('removing visible outfit selects animated default rather than a hidden old slot',()=>{
 const s=shop();s.run('sysData.equippedItems.activity="item_pillow";equipItem("item_glass");restoreKapiAnimatedOutfit();updateKapiAppearance()');
 assert.equal(s.run('sysData.activeDisplayItemId'),null);
 assert.match(s.document.getElementById('kapi-gif-image').src,/default.gif$/);
});
test('purchase uses catalogue price, repeated purchase does not debit again',()=>{
  const s=shop();s.run('sysData.totalLeaves=50;sysData.studyCompletions=10;buyItem("item_hat",1);buyItem("item_hat",1)');
  assert.equal(s.run('sysData.totalLeaves'),38);
  assert.equal(s.run('sysData.inventory.filter(id=>id==="item_hat").length'),1);
});
test('equipping during demo cancels old timer and keeps newly selected outfit',()=>{
  const s=shop();s.run('previewKapiItem("item_pillow",true);sysData.inventory.push("item_hat");equipItem("item_hat")');
  assert.equal(s.timers.size,0);
  assert.equal(s.run('sysData.activeDisplayItemId'),'item_hat');
});
test('failed GIF falls back without consuming a demo or deleting inventory',()=>{
 const s=shop();s.run('previewKapiItem("item_cocoa")');
 s.document.getElementById('kapi-gif-image').onerror();
 assert.match(s.document.getElementById('kapi-gif-image').src,/cocoa-still.png$/);
 assert.equal(s.run('hasPreviewedKapiActivity("item_cocoa")'),false);
 assert.equal(s.run('sysData.inventory.length'),3);
});
test('stale load callback cannot steal the selected outfit',()=>{
 const s=shop();s.run('previewKapiItem("item_cocoa")');
 const stale=s.document.getElementById('kapi-gif-image').onload;
 s.run('equipItem("item_glass_mint")');stale();
 assert.equal(s.timers.size,0);
 assert.equal(s.run('hasPreviewedKapiActivity("item_cocoa")'),false);
});
test('reduced motion requests a still and catalogue assets are real animated GIFs',()=>{
 const s=shop();s.run('window.matchMedia=()=>({matches:true});updateKapiAppearance()');
 assert.match(s.document.getElementById('kapi-gif-image').src,/sunglasses-still.png$/);
 const names=JSON.parse(s.run('JSON.stringify(["default",...shopItems.map(kapiGifName)])'));
 for(const name of names){
  const bytes=readFileSync(new URL('../assets/kapi-actions/gifs/kapi-'+name+'.gif',import.meta.url));
  assert.equal(bytes.subarray(0,6).toString(),'GIF89a');
  assert.ok(bytes.includes(Buffer.from('NETSCAPE2.0')));
 }
});
test('shop shows complete names and explicit used-demo labels',()=>{
 const s=shop();s.run('localStorage.setItem(KAPI_PREVIEW_KEY,JSON.stringify(["item_cocoa"]))');
 const row=s.run('renderShopItem(shopItems.find(i=>i.id==="item_cocoa"))');
 assert.match(row,/Đã xem thử/);assert.match(row,/Chưa mở khóa/);assert.doesNotMatch(row,/>✓</);
 assert.match(html,/\.shop-item-name \{[^}]*white-space: normal/);
});
