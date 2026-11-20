import test from 'node:test';
import assert from 'node:assert/strict';
import {app} from './fish-harness.mjs';
test('recall accepts one alternative and small writing corrections but rejects other words',async()=>{
 const a=app();await a.flush();
 const grade=(input,expected)=>a.run(`gradeVocabRecall(${JSON.stringify(input)},${JSON.stringify(expected)})`);
 for(const [input,expected] of [['räumlich','räumlich / geräumig'],['geräumig','räumlich / geräumig'],['beziehungskette','die Beziehungskette'],['Moglichkeit','die Möglichkeit'],['Beziehugnskette','die Beziehungskette']]) assert.equal(grade(input,expected).ok,true,input);
 assert.equal(grade('räumlich','räumlich / geräumig').alternatives[0],'geräumig');
 for(const [input,expected] of [['','die Beziehungskette'],['der Beziehungskette','die Beziehungskette'],['schon','schön'],['konnte','könnte'],['freuen','sich freuen'],['zur Verfügung','zur Verfügung stehen'],['gehen','sehen']]) assert.equal(grade(input,expected).ok,false,input);
});
test('quiz awards recall and displays correction without adding a minor error to missed words',async()=>{
 const a=app();await a.flush();
 a.run(`quizWords=[{de:'die Beziehungskette',vi:'Chuỗi quan hệ'}];currentQuizIndex=0;quizScore=0;currentMissedWords=[];showQuizQuestion()`);await a.flush();
 a.document.getElementById('vokabelInput').value='beziehungskette';a.run('checkVokabelAnswer()');await a.flush();
 assert.equal(a.run('quizScore'),1);assert.equal(a.run('currentMissedWords.length'),0);
 assert.match(a.document.getElementById('feedback-area').textContent,/Dạng chuẩn: die Beziehungskette/);
 assert.match(a.document.getElementById('feedback-area').textContent,/Tiếp tục/);
});
test('Vali deduplicates phrases across records, persists today and rotates weak/old/important',async()=>{
 const a=app();await a.flush();
 a.run(`liveTalkGate={pool:[{id:'weak',target:'eine Entscheidung treffen',wrong:2},{id:'duplicate',target:' Eine   Entscheidung treffen. ',wrong:1},{id:'old',target:'zur Verfügung stehen',sessionDate:'2020-01-01'},{id:'important',target:'in Betracht ziehen',tags:'⭐',sessionDate:'2025-01-01'}],clearedCardIds:[],recentCardIds:[]}`);
 assert.equal(a.run('chooseLiveTalkGateRow().id'),'weak');
 assert.equal(a.run('chooseLiveTalkGateRow().id'),'old');
 assert.equal(a.run('chooseLiveTalkGateRow().id'),'important');
 assert.equal(a.run('chooseLiveTalkGateRow()'),null);
 a.run('liveTalkGate.recentCardIds=[]');assert.equal(a.run('chooseLiveTalkGateRow()'),null);
 a.run(`writeLiveTalkGateStorage({askedDate:'2026-09-29'})`);assert.ok(a.run('chooseLiveTalkGateRow()'));
});
test('wrong answers retain tomorrow review and mercy still permits a full 24 hours',async()=>{
 const a=app();await a.flush();
 a.run(`saveLiveTalkData({sessions:[{date:'2026-09-20',rows:[{id:'weak',target:'in Betracht ziehen',wrong:0}]}]});updateLiveTalkGateStoredRow('weak',false);grantLiveTalkGatePermit('mercy')`);
 assert.equal(a.run('getAllLiveTalkRows()[0].wrong'),1);
 assert.equal(a.run('getAllLiveTalkRows()[0].nextReview'), '2026-10-01');
 assert.equal(a.run('readLiveTalkGateStorage().permitUntil-Date.now()'),86400000);
 assert.equal(a.run('readLiveTalkGateStorage().remainingActions'),-1);
});
