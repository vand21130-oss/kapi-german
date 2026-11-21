import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';

const source=fs.readFileSync('kapi-logic.js','utf8');
function fixture(){
 const storage=new Map();
 const ctx=vm.createContext({
  localStorage:{getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)},
  todayDateKey:()=> '2026-11-21', shuffleArray:items=>[...items].reverse(),
  escapeVocabHtml:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'),
  window:{scrollTo(){}}, clearInterval(){},
  document:{getElementById:()=>null},
  completeTodayStudyMission(){},recordLearnedWord(){},
  alert:message=>{throw Error(message)}
 });
 for(const file of ['lesen-data.js','lesen-review-data.js','lesen-review.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
 vm.runInContext(source.slice(source.indexOf('const LESEN_DAILY_KEY ='),source.indexOf('function startLesenVocabGame()')),ctx);
 vm.runInContext('lesenBuildReviewWords=()=>[]; renderLesenTask=()=>{};',ctx);
 return {run:s=>vm.runInContext(s,ctx),storage};
}
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
test('the ten original tasks and their review metadata remain unchanged',()=>{
 const f=fixture();
 assert.equal(hash(f.run('LESEN_B2_TASKS.slice(0,10)')),'bba61d71151bc98ef77f20e118722953c31abe2d336f1858939136b236f7a49f');
 assert.equal(hash(f.run('Object.fromEntries(Object.entries(LESEN_REVIEW_DATA).filter(([id])=>LESEN_B2_TASKS.slice(0,10).some(t=>t.id===id)))')),'157bb4d317089ed59fadbc4c0c0783766cd1e520f13f984b1c725d27418019cc');
});
test('both new packs have all five formats, 60 questions, unique IDs and complete review coverage',()=>{
 const f=fixture(),tasks=f.run('LESEN_B2_TASKS');
 assert.equal(new Set(tasks.map(t=>t.id)).size,20);
 const keys=['cbdabcdab','fgeacb','bacbca','dcfbge','bec','dcabdacbd','ebfadc','cabacb','dcbgfe','bde'];
 for(const [i,t] of tasks.slice(10).entries()){
  assert.equal(t.teil,i%5+1);
  assert.equal(tasks.filter(x=>x.teil===t.teil).length,4);
  assert.equal(t.questions.map(q=>q.answer).join(''),keys[i]);
  assert.match(t.instruction,/kein offizieller Prüfungssatz/);
  const starts=[1,10,16,22,28];
  t.questions.forEach((q,index)=>assert.equal(q.number,starts[i%5]+index));
  const meta=f.run(`LESEN_REVIEW_DATA['${t.id}']`);
  const passages=t.people?.map(x=>'people.'+x.id) || t.segments?.map((_,i)=>'segments.'+i) || t.article?.map((_,i)=>'article.'+i) || t.opinions?.map(x=>'opinions.'+x.id) || t.sections.map(x=>'sections.'+x.number);
  for(const field of ['options','headings'])for(const item of t[field]||[])passages.push(field+'.'+item.id);
  if(t.example)passages.push('example');
  assert.equal(JSON.stringify(Object.keys(meta.passages).sort()),JSON.stringify(passages.sort()));
  if(t.teil===2)assert.equal(t.options.filter(x=>!t.questions.some(q=>q.answer===x.id)).length,2);
  if(t.teil===4||t.teil===5){
   assert.ok(t.questions.every(q=>q.answer!==t.example.answer));
   assert.equal(new Set(t.questions.map(q=>q.answer)).size,t.questions.length);
  }
 }
});
test('pack two preserves all fifteen previously published tasks and explanations',()=>{
 const f=fixture();
 assert.equal(hash(f.run('LESEN_B2_TASKS.slice(0,15)')),'305c7f7b1dd7566feaff9b0600ef2da13db8d7f0d144a6b0a27ecec7c389e63a');
 assert.equal(hash(f.run('Object.fromEntries(Object.entries(LESEN_REVIEW_DATA).filter(([id])=>LESEN_B2_TASKS.slice(0,15).some(t=>t.id===id)))')),'07fd0594ac2fa5af3d09353335e3d5f53814866196156c6ffa8dd1f6c2f7171e');
});
test('each new task is selectable, while a saved daily plan is preserved',()=>{
 const f=fixture();
 for(const task of f.run('LESEN_B2_TASKS.slice(10)')){
  const chosen=f.run(`lesenPickTaskForTeil(${task.teil}, LESEN_B2_TASKS.filter(t=>t.id!==${JSON.stringify(task.id)}).map(t=>t.id))`);
  assert.equal(chosen.id,task.id);
 }
 const saved={date:'2026-11-21',required:'lesen_t1_hybridarbeit',bonus:'lesen_t2_stadtverkehr'};
 f.storage.set('kapi_lesen_daily_plan_v1',JSON.stringify(saved));
 assert.equal(JSON.stringify(f.run('lesenGetDailyPlan()')),JSON.stringify(saved));
 f.storage.delete('kapi_lesen_daily_plan_v1');
 const plan=f.run('lesenGetDailyPlan()');
 assert.ok(plan.required.endsWith('_20261121b'));
 assert.ok(plan.bonus.endsWith('_20261121b'));
 assert.notEqual(plan.required,plan.bonus);
});
test('real renderers hide solutions until submission; real grading accepts keys and rejects wrong choices',()=>{
 const f=fixture();
 for(let i=10;i<20;i++){
  f.run(`lesenCurrent={task:LESEN_B2_TASKS[${i}],answers:{},submitted:false};`);
  let html=f.run('lesenTaskBody(lesenCurrent.task)');
  assert.doesNotMatch(html,/lesen-vi-sentence|data-lesen-proof/);
  f.run('for(const q of lesenCurrent.task.questions) lesenSaveAnswer(q.number,q.answer); submitLesenTask();');
  assert.equal(f.run('lesenCurrent.result.score'),f.run('lesenCurrent.task.questions.length'));
  html=f.run('lesenTaskBody(lesenCurrent.task)');
  assert.match(html,/lesen-vi-sentence/);
  assert.match(html,/data-lesen-proof/);
  assert.equal(f.run('lesenHistory()[0].taskId'),f.run('lesenCurrent.task.id'));
  f.run(`lesenCurrent={task:LESEN_B2_TASKS[${i}],answers:{},submitted:false}; for(const q of lesenCurrent.task.questions)lesenSaveAnswer(q.number,q.answer==='a'?'b':'a'); submitLesenTask();`);
  assert.equal(f.run('lesenCurrent.result.score'),0);
 }
});
