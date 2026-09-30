import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import fs from 'node:fs';
function fixture(){
 const elements=new Map();
 const element=()=>({innerHTML:'',innerText:'',textContent:'',style:{},dataset:{},disabled:true,classList:{add(){},remove(){},toggle(){}},scrollIntoView(){}});
 for(const id of ['timer','daily-story-pause','daily-story-audio-status'])elements.set(id,element());
 const intervals=new Set();let seq=0,canceled=0;const spoken=[];
 const synth={paused:false,getVoices:()=>[{lang:'de-DE',name:'German'}],speak(u){spoken.push(u);u.onstart?.();},cancel(){canceled++;},pause(){this.paused=true},resume(){this.paused=false}};
 const ctx=vm.createContext({console,document:{getElementById:id=>elements.get(id),querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>({set innerHTML(value){this.textContent=value.replace(/<[^>]*>/g,'')},textContent:''})},setInterval:()=>{intervals.add(++seq);return seq},clearInterval:id=>intervals.delete(id),setTimeout,clearTimeout,SpeechSynthesisUtterance:class{constructor(text){this.text=text}},getTodayStudyMission:()=>({date:'2026-10-01',completed:true}),escapeVocabHtml:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;')});
 ctx.window={speechSynthesis:synth};
 for(const file of ['lesen-data.js','lesen-review-data.js','daily-story-review-data.js','lesen-review.js'])vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
 const source=fs.readFileSync('kapi-logic.js','utf8');
 vm.runInContext(source.slice(source.indexOf('const DAILY_KOFFER_STORIES ='),source.indexOf('function todayDateKey')),ctx);
 vm.runInContext('let lesenCurrent={task:LESEN_B2_TASKS[0],submitted:false};let lesenClock=null;',ctx);
 const a=source.indexOf('function lesenStopClock()');const b=source.indexOf('\nfunction ',source.indexOf('function lesenStartClock()',a)+10);
 vm.runInContext(source.slice(a,b),ctx);
 return {ctx,elements,spoken,synth,intervals,cancels:()=>canceled,run:s=>vm.runInContext(s,ctx)};
}
test('both daily cards use hidden-before-submit bilingual proof renderer for all five parts',()=>{
 const f=fixture();
 f.run(`for(const task of LESEN_B2_TASKS){lesenCurrent={task,submitted:false};for(const key of Object.keys(LESEN_REVIEW_DATA[task.id].passages)){const html=lesenReviewPassage(lesenReviewSource(task,key),key);if(html.includes('lesen-vi-sentence')||html.includes('lesen-evidence'))throw Error('answer leak');}lesenCurrent.submitted=true;for(const key of Object.keys(LESEN_REVIEW_DATA[task.id].passages)){if(!lesenReviewPassage(lesenReviewSource(task,key),key).includes('lang="vi"'))throw Error('missing translation');}for(const q of task.questions){if(!lesenReviewEvidence(q).includes('data-lesen-proof'))throw Error('missing proof');}}`);
});
test('clock stop clears its interval and visible timer',()=>{
 const f=fixture();f.run('lesenClock=setInterval(()=>{},1000)');f.elements.get('timer').innerText='17:48';f.run('lesenStopClock()');assert.equal(f.intervals.size,0);assert.equal(f.elements.get('timer').innerText,'');assert.equal(f.run('lesenClock'),null);
});
test('story audio reads German sentence by sentence, pauses, completes and stops',()=>{
 const f=fixture();f.run('playDailyKofferStory()');assert.equal(f.spoken.length,1);assert.equal(f.spoken[0].lang,'de-DE');assert.equal(f.spoken[0].rate,.82);
 f.run('pauseDailyKofferStory()');assert.equal(f.synth.paused,true);f.run('pauseDailyKofferStory()');assert.equal(f.synth.paused,false);
 for(let i=0;i<f.spoken.length;i++){assert.ok(!f.spoken[i].text.includes('<b'));f.spoken[i].onend();}
 assert.match(f.elements.get('daily-story-audio-status').textContent,/Đã nghe hết/);
 f.run('playDailyKofferStory();stopDailyStoryAudio()');const count=f.spoken.length;f.spoken.at(-1).onend();assert.equal(f.spoken.length,count);assert.ok(f.cancels()>0);
});
test('missing German voice and speech errors produce visible status',async()=>{
 const f=fixture();f.synth.getVoices=()=>[];f.run('playDailyKofferStory()');await new Promise(r=>setTimeout(r,1900));assert.equal(f.spoken.length,0);assert.match(f.elements.get('daily-story-audio-status').textContent,/Chưa tìm thấy giọng tiếng Đức/);
 f.synth.getVoices=()=>[{lang:'de-DE'}];f.run('playDailyKofferStory()');f.spoken.at(-1).onerror({error:'audio-busy'});assert.match(f.elements.get('daily-story-audio-status').textContent,/chưa phát được/);
});

function recordingFixture(){
 const f=fixture();const recordings=[];
 f.ctx.Audio=class {
  constructor(src){this.src=src;this.paused=true;this.currentTime=0;recordings.push(this);}
  play(){this.paused=false;this.onplaying?.();return Promise.resolve();}
  pause(){this.paused=true;this.onpause?.();}
 };
 f.ctx.getTodayStudyMission=()=>({date:'2026-09-30',completed:true});
 return {...f,recordings};
}
test('pigeon story uses uploaded recording, pauses/resumes, ends and replays from zero',()=>{
 const f=recordingFixture();f.run('playDailyKofferStory()');
 assert.equal(f.spoken.length,0);assert.equal(f.recordings.length,1);
 const clip=f.recordings[0];assert.match(clip.src,/die-taube-im-bewerbungsgespraech.m4a$/);
 f.run('pauseDailyKofferStory()');assert.equal(clip.paused,true);
 f.run('pauseDailyKofferStory()');assert.equal(clip.paused,false);
 clip.currentTime=11;clip.onended();assert.equal(clip.currentTime,0);
 assert.match(f.elements.get('daily-story-audio-status').textContent,/Đã nghe hết/);
 f.run('playDailyKofferStory();stopDailyStoryAudio()');assert.equal(f.recordings[1].paused,true);assert.equal(f.recordings[1].onended,null);
});
test('recording error stays inline and cannot invoke unrelated system speech',()=>{
 const f=recordingFixture();f.run('playDailyKofferStory()');f.recordings[0].onerror();
 assert.match(f.elements.get('daily-story-audio-status').textContent,/Chưa phát được bản thu/);
 assert.equal(f.spoken.length,0);
});
