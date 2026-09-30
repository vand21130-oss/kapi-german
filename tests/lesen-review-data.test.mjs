import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const ctx=vm.createContext({});
for(const file of ['lesen-data.js','lesen-review-data.js','daily-story-review-data.js','lesen-review.js']) vm.runInContext(fs.readFileSync(file,'utf8'),ctx);
const {tasks,meta,notes}=vm.runInContext('({tasks:LESEN_B2_TASKS,meta:LESEN_REVIEW_DATA,notes:DAILY_STORY_REVIEW_DATA})',ctx);
test('all ten reading tasks have sentence translations and exact evidence',()=>{
 assert.equal(tasks.length,10);
 for(const task of tasks){
  const data=meta[task.id]; assert.ok(data,task.id);
  for(const [key,translations] of Object.entries(data.passages)){
   const source=ctx.lesenReviewSource(task,key); assert.ok(source,`${task.id} ${key}`);
   assert.equal(translations.length,ctx.lesenSplitSentences(source).length,`${task.id} ${key}`);
   assert.ok(translations.every(x=>typeof x==='string'&&x.trim()));
  }
  for(const q of task.questions){
   const review=data.questions[q.number]; assert.ok(review?.vi&&review.link,`${task.id} ${q.number}`);
   assert.ok(review.evidence.length);
   for(const [key,index,keywords] of review.evidence){
    const sentence=ctx.lesenSplitSentences(ctx.lesenReviewSource(task,key))[index];
    assert.ok(sentence,`${task.id} ${q.number} ${key} ${index}`);
    for(const word of keywords)assert.ok(sentence.includes(word),`${task.id} ${q.number}: ${word}`);
   }
   if(task.teil===3)for(const id of Object.keys(q.options))assert.ok(review.options[id]);
  }
 }
});
test('six original reward stories have sentence translations and contextual notes',()=>{
 const source=fs.readFileSync('kapi-logic.js','utf8');
 vm.runInContext(source.slice(source.indexOf('const DAILY_KOFFER_STORIES ='),source.indexOf('function todayDateKey')),ctx);
 const stories=vm.runInContext('DAILY_KOFFER_STORIES',ctx);
 assert.equal(notes.length,stories.length);
 stories.forEach((story,i)=>{
  assert.equal(notes[i].vi.length,ctx.lesenSplitSentences(story.text.replace(/<[^>]*>/g,'')).length,story.title);
  assert.equal(notes[i].glossary.length,3);
  for(const entry of notes[i].glossary)for(const key of ['de','vi','note','example','exampleVi'])assert.ok(entry[key]);
 });
});
