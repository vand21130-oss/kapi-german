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
const keys={"teil1-stadtbibliothek-autorenlesung-2026-10-11": [0, 1], "teil1-durchsage-bahnhof-koeln-2026-10-11": [1, 2], "teil1-durchsage-hallenbad-2026-10-11": [0, 1], "teil1-stadtwerke-wasserversorgung-2026-10-11": [1, 1], "teil3-wochenende-berghuette-2026-10-11": [0, 1, 2, 0, 1, 2]};
const counts={"teil1-stadtbibliothek-autorenlesung-2026-10-11": 9, "teil1-durchsage-bahnhof-koeln-2026-10-11": 8, "teil1-durchsage-hallenbad-2026-10-11": 9, "teil1-stadtwerke-wasserversorgung-2026-10-11": 7, "teil3-wochenende-berghuette-2026-10-11": 50};
for(const [id,key] of Object.entries(keys))test(id+' preserves key and grades both correct/incorrect answers, then replays full translation',()=>{
 const a=app(),l=a.s.KapiGoetheListeningLessons.find(l=>l.id===id);assert.deepEqual(Array.from(l.questions,q=>q.answer),key);
 assert.equal(l.audio,'audio/'+id+'.m4a');
 assert.equal(l.transcript.length,counts[id]);
 for(const correct of [true,false]){
 a.s.KapiGoetheReplay.start(id);assert.equal(a.document.querySelector('audio').src,l.audio);
 assert.equal(a.document.querySelectorAll('.gl-transcript').length,0);
 [...a.document.querySelectorAll('fieldset')].forEach((f,i)=>f.querySelectorAll('input')[correct?key[i]:(key[i]+1)%l.questions[i].options.length].onchange());
 a.click('Chấm bài');assert.equal(a.document.querySelectorAll(correct?'.gl-correct':'.gl-wrong').length,key.length);
 a.click('Nghe lại cùng');assert.equal(a.document.querySelector('audio').src,l.audio);
 if(l.teil===3){assert.deepEqual([...a.document.querySelectorAll('.gl-speaker')].map(p=>p.textContent),Array.from(l.transcript,t=>t.speaker));}assert.equal(a.document.querySelectorAll('fieldset').length,0);
 assert.deepEqual([...a.document.querySelectorAll('[lang=de]')].map(p=>p.textContent),Array.from(l.transcript,t=>t.de));
 assert.deepEqual([...a.document.querySelectorAll('[lang=vi]')].map(p=>p.textContent),Array.from(l.transcript,t=>t.vi));
 }
});
test('Oct 11 has exactly five entries, one Stadtbibliothek, and preserves speaker turns',()=>{
 const {s}=app(),ls=s.KapiGoetheReplay.lessons(),fresh=ls.filter(l=>l.id.endsWith('2026-10-11'));
 assert.equal(fresh.length,5);assert.equal(new Set(ls.map(l=>l.id)).size,ls.length);
 assert.equal(fresh.filter(l=>l.title.includes('Stadtbibliothek')).length,1);
 const l=fresh.find(l=>l.teil===3);
 l.questions.forEach(q=>assert.deepEqual(Array.from(q.options),['A. Mara','B. Jonas','C. Leila']));
 const turns=l.transcript.filter((t,i)=>!i||t.speaker!==l.transcript[i-1].speaker).map(t=>t.speaker);
 assert.deepEqual(Array.from(turns),['Mara','Jonas','Leila','Mara','Jonas','Leila','Mara','Jonas','Leila']);
 assert.match(l.instructions,/Wer sagt was/);
});
