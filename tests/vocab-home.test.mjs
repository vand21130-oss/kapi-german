import test from 'node:test';
import assert from 'node:assert/strict';
import {app} from './fish-harness.mjs';
test('home order is task, progress, recall, archive; all legacy destinations remain',async()=>{
 const a=app();await a.flush();a.run('showVokabelHauptmenu()');
 const home=a.document.querySelector('.vocab-home');
 assert.deepEqual([...home.children].map(e=>e.getAttribute('aria-label')||e.id||e.className),['Nhiệm vụ hôm nay','Nhật ký tuần này','vocab-quick-review','vocab-archive']);
 assert.equal(home.querySelectorAll('.is-primary').length,1);
 assert.equal(home.querySelectorAll('.vocab-review-card').length,3);
 assert.equal(home.querySelector('.vocab-journal-strip').tagName,'SECTION');
 const source=home.innerHTML;
 for(const name of ['arbeit','umwelt','kulinarik','gesundheit','technologie','gesellschaft','studium','saetze','krankheiten','diagnostik','verbandmaterial']) assert.ok(source.includes(`showLernenScreen('${name}')`),name);
 for(const name of ['showKofferIntro','showMiniGameSetup','showVocabWeeklyJournal']) assert.ok(source.includes(name),name);
 assert.doesNotMatch(home.textContent,/⚠️|Ôn \d+ từ!/);
});
test('completed task becomes quiet status while replay remains available',async()=>{
 const a=app();await a.flush();a.run('localStorage.setItem(DAILY_MISSION_KEY,JSON.stringify({date:getLocalDateKey(new Date()),completed:true}));showVokabelHauptmenu()');
 assert.equal(a.document.querySelector('.is-primary'),null);
 assert.match(a.document.querySelector('.is-complete').textContent,/Xong nhiệm vụ hôm nay/);
 assert.ok(a.document.querySelector('.is-complete button'));
});
test('no eligible archive task offers light review without starting an empty mission',async()=>{
 const a=app();await a.flush();a.sandbox.KapiFish.db.eligible=()=>false;
 a.run('showVokabelHauptmenu()');
 const c=a.document.getElementById('vocab-mission-cta');assert.ok(c.classList.contains('is-light'));
 assert.match(c.textContent,/Hôm nay chỉ cần ôn nhẹ/);assert.equal(c.getAttribute('onclick'),null);
});
test('recall counts distinguish saved fish from cooldown and highlight only due review',async()=>{
 const a=app();await a.flush();const d=a.sandbox.KapiFish.db;
 d.add({term:'cooldown fish',skill:'hoeren'});
 d.add({term:'ready fish',skill:'sprechen',fromChatGPT:false});
 a.run('showVokabelHauptmenu()');
 const f=a.document.getElementById('vocab-review-fish');assert.match(f.textContent,/1 đến hạn · 2 đã lưu/);assert.ok(f.classList.contains('is-due'));
 assert.equal(a.document.querySelectorAll('.is-primary').length,1);
 assert.match(a.document.getElementById('vocab-review-ancient').textContent,/3 hôm nay/);
});
