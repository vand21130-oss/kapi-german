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
const keys={
 'teil1-verkehrsunfall-lokalradio-2026-10-10':[1,0],
 'teil1-durchsage-museum-2026-10-10':[1,1],
 'teil1-telefonansage-arztpraxis-2026-10-10':[1,1],
 'teil4-schloss-falkenried-2026-10-10':[0,1,1,0,1,1,1,2]
};
for(const [id,key] of Object.entries(keys))test(id+' exact path, answer key, grading and bilingual replay',()=>{
 const a=app(),l=a.s.KapiGoetheListeningLessons.find(l=>l.id===id);
 assert.deepEqual(Array.from(l.questions,q=>q.answer),key);assert.equal(l.audio,'audio/'+id+'.m4a');
 for(const correct of [true,false]){
 a.s.KapiGoetheReplay.start(id);assert.equal(a.document.querySelector('audio').src,l.audio);
 assert.equal(a.document.querySelectorAll('.gl-transcript').length,0);
 [...a.document.querySelectorAll('fieldset')].forEach((f,i)=>f.querySelectorAll('input')[correct?key[i]:(key[i]+1)%l.questions[i].options.length].onchange());
 a.click('Chấm bài');assert.equal(a.document.querySelectorAll(correct?'.gl-correct':'.gl-wrong').length,key.length);
 a.click('Nghe lại cùng');assert.equal(a.document.querySelectorAll('fieldset').length,0);
 assert.equal(a.document.querySelector('audio').src,l.audio);
 assert.deepEqual([...a.document.querySelectorAll('[lang=de]')].map(p=>p.textContent),Array.from(l.transcript,t=>t.de));
 assert.deepEqual([...a.document.querySelectorAll('[lang=vi]')].map(p=>p.textContent),Array.from(l.transcript,t=>t.vi));
 }
});
test('only corrected Laborproben sentence is used',()=>{
 const a=app(),l=a.s.KapiGoetheListeningLessons.find(l=>l.id.includes('arztpraxis'));
 assert.ok(l.transcript.some(t=>t.de==='Morgen endet die Blutabnahme jedoch bereits um 10 Uhr, da die Laborproben früher abgeholt werden.'));
 assert.ok(!JSON.stringify(l).includes('da das Labor früher abgeholt wird'));
});
