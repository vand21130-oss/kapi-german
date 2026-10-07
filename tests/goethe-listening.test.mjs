import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {parseHTML} from 'linkedom';
const src=readFileSync(new URL('../goethe-listening.js',import.meta.url),'utf8');
const lesson=(id='demo',teil=4)=>({id,teil,title:id,audio:'audio/demo.mp3',questions:[{prompt:'Question',options:['A','B'],answer:1,explanation:'Because B'}],transcript:[{de:'German transcript',vi:'Vietnamese transcript'}]});
function app(rows=[]){
 const {document,HTMLElement,Event}=parseHTML('<div id="message"></div><div id="buttons"></div><div id="feedback-area"></div>');
 HTMLElement.prototype.pause=function(){};
 const data=new Map([['existing-fish','untouched']]),alerts=[];
 const s={document,console,Intl,Date,Math,alert:x=>alerts.push(x),setLearningFocus(){},showHoerenMenu(){},showGoetheHoerenMenu(){},KapiGoetheListeningLessons:rows,localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)}};
 s.window=s;vm.runInNewContext(src,s);document.dispatchEvent(new Event('DOMContentLoaded'));
 const click=text=>{const b=[...document.querySelectorAll('button')].find(b=>b.textContent.includes(text));assert.ok(b,text);b.onclick();};
 return {s,document,data,alerts,click};
}
test('empty library has four shelves and preserves access to old lessons',()=>{
 const a=app();a.s.showGoetheHoerenMenu();assert.equal(a.document.querySelectorAll('.gl-teile button').length,4);assert.match(a.document.body?.textContent||a.document.toString(),/Kho đề cũ/);assert.equal(a.data.size,1);
});
test('incomplete packages are excluded; repeated IDs are not duplicated',()=>{
 const a=app([lesson(),lesson(),{...lesson('bad'),transcript:[]}]);assert.equal(a.s.KapiGoetheReplay.lessons().length,1);
});
test('answers hidden until complete submission; replay only shows audio and bilingual transcript',()=>{
 const a=app([lesson()]);a.s.KapiGoetheReplay.start('demo');assert.doesNotMatch(a.document.toString(),/Because B|German transcript|Đáp án:/);
 a.click('Chấm bài');assert.equal(a.alerts.length,1);assert.equal(a.data.size,1);
 a.document.querySelectorAll('input')[0].onchange();a.click('Chấm bài');assert.match(a.document.toString(),/✗ Sai/);assert.match(a.document.toString(),/Because B/);
 a.click('Nghe lại cùng');assert.equal(a.document.querySelectorAll('fieldset').length,0);assert.equal(a.document.querySelectorAll('audio').length,1);assert.match(a.document.toString(),/German transcript/);assert.match(a.document.toString(),/Vietnamese transcript/);assert.equal(a.data.get('existing-fish'),'untouched');
 a.click('Kết quả');assert.equal(JSON.parse(a.data.get('kapi_goethe_replay_v1')).history.demo.attempts,1);
});
test('daily random pick stays stable on repeated openings',()=>{
 const a=app([lesson('one',1),lesson('four',4)]);const id=a.s.KapiGoetheReplay.chooseToday().id;for(let i=0;i<20;i++)assert.equal(a.s.KapiGoetheReplay.chooseToday().id,id);
});
