/* Listening replay library, separate from Fish pools and legacy exercise data. */
(function () {
  'use strict';
  const KEY = 'kapi_goethe_replay_v1';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const day = () => new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  let session = null;
  let legacyMenu = null;
  function valid(lesson) {
    return lesson && typeof lesson.id === 'string' && lesson.id && [1,2,3,4].includes(lesson.teil) && typeof lesson.title === 'string' &&
      typeof lesson.audio === 'string' && /^(?:https:\/\/|audio\/|assets\/)[^\s]+$/.test(lesson.audio) &&
      Array.isArray(lesson.questions) && lesson.questions.length > 0 && lesson.questions.every(q => typeof q.prompt === 'string' && Array.isArray(q.options) && q.options.length >= 2 && q.options.every(o => typeof o === 'string') && Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length) &&
      Array.isArray(lesson.transcript) && lesson.transcript.length > 0 && lesson.transcript.every(t => typeof t.de === 'string' && t.de.trim() && typeof t.vi === 'string' && t.vi.trim());
  }
  function lessons() {
    const seen = new Set();
    return (window.KapiGoetheListeningLessons || []).filter(l => {
      if (!valid(l) || seen.has(l.id)) return false;
      seen.add(l.id); return true;
    });
  }
  function read() {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {history:{},daily:null};
    const s = JSON.parse(raw);
    if (!s || !s.history || typeof s.history !== 'object' || Array.isArray(s.history)) throw Error('Chưa đọc được lịch nghe. Dữ liệu được giữ nguyên.');
    return s;
  }
  function save(s) {localStorage.setItem(KEY,JSON.stringify(s));}
  function chooseToday() {
    const all = lessons(), s = read(), today = day();
    if (!all.length) return null;
    if (s.daily?.date === today && all.some(l => l.id === s.daily.id)) return all.find(l => l.id === s.daily.id);
    const previous = Object.entries(s.history).sort((a,b)=>(b[1].lastAt||'').localeCompare(a[1].lastAt||''))[0];
    const lastTeil = all.find(l => l.id === previous?.[0])?.teil;
    const alternatives = all.filter(l => l.teil !== lastTeil);
    const pool = alternatives.length ? alternatives : all;
    // First revisit the least recently completed group; use previous errors only as a tie-break.
    pool.sort((a,b)=>(s.history[a.id]?.lastAt||'').localeCompare(s.history[b.id]?.lastAt||'') || (s.history[b.id]?.wrong||0)-(s.history[a.id]?.wrong||0));
    const first = pool[0], stamp = s.history[first.id]?.lastAt || '', wrong = s.history[first.id]?.wrong || 0;
    const ties = pool.filter(l => (s.history[l.id]?.lastAt||'') === stamp && (s.history[l.id]?.wrong||0) === wrong);
    const selected = ties[Math.floor(Math.random()*ties.length)];
    s.daily = {date:today,id:selected.id};save(s);return selected;
  }
  function button(label, action, primary=false) {
    const b=document.createElement('button');b.type='button';b.className=primary?'gl-button gl-primary':'gl-button';b.textContent=label;
    b.onclick=()=>{try{action();}catch(e){alert(e.message || 'Chưa lưu được lượt nghe. Hãy thử lại.');}};return b;
  }
  function mount(title) {
    document.querySelectorAll('#buttons audio').forEach(a=>a.pause());
    setLearningFocus(true);
    document.getElementById('message').textContent=title;
    document.getElementById('feedback-area').style.display='none';
    const box=document.getElementById('buttons');box.innerHTML='';
    const panel=document.createElement('section');panel.className='gl-panel';box.append(panel);return panel;
  }
  function menu() {
    session=null;
    const box=mount('🎧 Goethe Hören · Nghe lại cho quen tai');
    const today=chooseToday();
    box.append(button(today?`🎧 Bài nghe hôm nay · Teil ${today.teil} · ${today.title}`:'🎧 Chọn bài nghe hôm nay',()=>today&&start(today.id),true));
    box.firstChild.disabled=!today;
    if(!today){const p=document.createElement('p');p.textContent='Bốn ngăn đã sẵn sàng. Đang chờ gói audio, câu hỏi, transcript và đáp án đầu tiên.';box.append(p);}
    const grid=document.createElement('div');grid.className='gl-teile';box.append(grid);
    for(let teil=1;teil<=4;teil++)grid.append(button(`Teil ${teil} · ${lessons().filter(l=>l.teil===teil).length} bài`,()=>shelf(teil)));
    if(legacyMenu)box.append(button('Kho đề cũ',legacyMenu));
    box.append(button('⬅ Hörtraining',()=>showHoerenMenu()));
  }
  function shelf(teil) {
    session=null;const box=mount(`🎧 Teil ${teil}`), rows=lessons().filter(l=>l.teil===teil);
    if(!rows.length){const p=document.createElement('p');p.textContent='Ngăn này chưa có bài. Không cần làm gì thêm hôm nay nhé.';box.append(p);}
    rows.forEach(l=>box.append(button(l.title,()=>start(l.id))));box.append(button('⬅ Bốn ngăn Hören',menu));
  }
  function audio(box,l) {
    const a=document.createElement('audio');a.controls=true;a.preload='metadata';a.src=l.audio;a.setAttribute('aria-label',`Audio ${l.title}`);
    const note=document.createElement('p');note.className='gl-audio-error';note.setAttribute('role','status');
    a.addEventListener('error',()=>{note.textContent='Chưa tải được audio. Kiểm tra kết nối rồi bấm thử lại.';});
    box.append(a,note,button('↻ Tải lại audio',()=>{note.textContent='';a.load();}));
  }
  function start(id) {
    const l=lessons().find(l=>l.id===id);if(!l)return;
    session={lesson:l,answers:l.questions.map(()=>null),submitted:false};exercise();
  }
  function exercise() {
    if(!session)return menu();const {lesson:l,answers,submitted}=session;
    const box=mount(`Teil ${l.teil} · ${l.title}`);audio(box,l);
    if(l.instructions){const p=document.createElement('p');p.textContent=l.instructions;box.append(p);}
    l.questions.forEach((q,i)=>{
      const field=document.createElement('fieldset');field.innerHTML=`<legend>${esc(q.prompt)}</legend>`;
      q.options.forEach((o,j)=>{
        const label=document.createElement('label'), input=document.createElement('input');input.type='radio';input.name=`gl-q-${i}`;input.value=String(j);input.checked=answers[i]===j;input.disabled=submitted;
        input.onchange=()=>{session.answers[i]=j;};label.append(input,document.createTextNode(o));field.append(label);
      });
      if(submitted){const p=document.createElement('p');p.className=answers[i]===q.answer?'gl-correct':'gl-wrong';p.textContent=`${answers[i]===q.answer?'✓ Đúng':'✗ Sai'} · Đáp án: ${q.options[q.answer]}`;field.append(p);if(q.explanation){const e=document.createElement('p');e.textContent=q.explanation;field.append(e);}}
      box.append(field);
    });
    if(!submitted)box.append(button('Chấm bài',submit,true));
    else {
      const correct=l.questions.filter((q,i)=>q.answer===answers[i]).length;
      const p=document.createElement('p');p.textContent=`${correct}/${l.questions.length} câu đúng. Nghe lại những đoạn còn hụt nhé.`;box.append(p,button('🎧 Nghe lại cùng transcript',transcript,true));
    }
    box.append(button('⬅ Bốn ngăn Hören',menu));
  }
  function submit() {
    if(!session || session.submitted)return;
    if(session.answers.some(a=>a===null)){alert('Fen tích đủ các câu rồi hãy chấm nhé.');return;}
    const s=read(),l=session.lesson, old=s.history[l.id]||{};
    s.history[l.id]={lastAt:new Date().toISOString(),attempts:(old.attempts||0)+1,wrong:l.questions.filter((q,i)=>q.answer!==session.answers[i]).length};
    save(s);session.submitted=true;exercise();
  }
  function transcript() {
    if(!session?.submitted)return;
    const l=session.lesson,box=mount(`🎧 Nghe lại · ${l.title}`);audio(box,l);
    l.transcript.forEach(t=>{const block=document.createElement('div');block.className='gl-transcript';block.innerHTML=`<p lang="de">${esc(t.de)}</p><p lang="vi">${esc(t.vi)}</p>`;box.append(block);});
    box.append(button('⬅ Kết quả',exercise));
  }
  window.KapiGoetheReplay={menu,start,chooseToday,valid,lessons};
  document.addEventListener('DOMContentLoaded',()=>{legacyMenu=window.showGoetheHoerenMenu;window.showGoetheHoerenMenu=menu;},{once:true});
})();
