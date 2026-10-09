import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {parseHTML} from 'linkedom';
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
function app(){
 const {document,HTMLElement}=parseHTML('<div id="message"></div><div id="buttons"></div><div id="feedback-area"></div>');
 HTMLElement.prototype.pause=function(){};
 const data=new Map();const s={document,Intl,Date,Math:Object.create(Math),setLearningFocus(){},alert:m=>{throw Error(m);},localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)}};s.window=s;
 vm.createContext(s);vm.runInContext(read('goethe-listening-data.js'),s);vm.runInContext(read('goethe-listening.js'),s);
 const click=t=>[...document.querySelectorAll('button')].find(b=>b.textContent.includes(t)).onclick();return {s,document,data,click};
}
const keys={'buergerbuero-2026-10-09':[1,2],'rufbus-2026-10-09':[1,0,2,0,1,1]};
for(const [id,key] of Object.entries(keys))test(id+' preserves key and grades both correct/incorrect answers, then replays full translation',()=>{
 const a=app(),l=a.s.KapiGoetheListeningLessons.find(l=>l.id===id);assert.deepEqual(Array.from(l.questions,q=>q.answer),key);
 assert.equal(l.audio,id.startsWith('buerger')?'audio/buergerbuero-oeffnungszeiten-2026-10-09.m4a':'audio/rufbus-2026-10-09.m4a');
 for(const correct of [true,false]){
 a.s.KapiGoetheReplay.start(id);assert.equal(a.document.querySelector('audio').src,l.audio);
 assert.equal(a.document.querySelectorAll('.gl-transcript').length,0);
 [...a.document.querySelectorAll('fieldset')].forEach((f,i)=>f.querySelectorAll('input')[correct?key[i]:(key[i]+1)%l.questions[i].options.length].onchange());
 a.click('Chấm bài');assert.equal(a.document.querySelectorAll(correct?'.gl-correct':'.gl-wrong').length,key.length);
 a.click('Nghe lại cùng');assert.equal(a.document.querySelectorAll('fieldset').length,0);
 assert.deepEqual([...a.document.querySelectorAll('[lang=de]')].map(p=>p.textContent),Array.from(l.transcript,t=>t.de));
 assert.deepEqual([...a.document.querySelectorAll('[lang=vi]')].map(p=>p.textContent),Array.from(l.transcript,t=>t.vi));
 }
});
test('new entries eligible for random choice and shelves; original Teil 4 still grades',()=>{
 const a=app(),ls=a.s.KapiGoetheReplay.lessons();assert.equal(ls.filter(l=>l.teil===1).length,1);assert.equal(ls.filter(l=>l.teil===2).length,1);assert.equal(ls.filter(l=>l.teil===4).length,1);
 for(let i=0;i<ls.length;i++){a.data.clear();a.s.Math.random=()=> (i+.1)/ls.length;assert.equal(a.s.KapiGoetheReplay.chooseToday().id,ls[i].id);}
 const l=ls.find(l=>l.teil===4);a.s.KapiGoetheReplay.start(l.id);
 [...a.document.querySelectorAll('fieldset')].forEach((f,i)=>f.querySelectorAll('input')[l.questions[i].answer].onchange());a.click('Chấm bài');assert.equal(a.document.querySelectorAll('.gl-correct').length,8);
});
