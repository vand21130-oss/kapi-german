module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        mode,
        teil,
        thema,
        punkte = [],
        transcript,
        replyTranscript,
        counterargument,
        durationSeconds,
        text,
        wordCount,
        challenge,
        answer,
        source,
        usedChallenges = [],
        nonce,
        tuViet,
        tuDuc,
        cauVidu
    } = req.body || {};

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!geminiApiKey && !openRouterApiKey) {
        return res.status(500).json({
            error: 'Voi chưa có đường dây AI: hãy thêm GEMINI_API_KEY hoặc OPENROUTER_API_KEY'
        });
    }

    const isSprechen = mode === 'sprechen';
    const isSchreiben = mode === 'schreiben';
    const isSchreibenChallenge = mode === 'schreiben_challenge';
    const isLiveTalkChallenge = mode === 'livetalk_challenge';
    const isLiveTalkEvaluate = mode === 'livetalk_evaluate';
    const isHoerSuggestions = mode === 'hoeren_vocab_suggest';
    let liveTalkCard = {};
    let prompt;

    if (isLiveTalkEvaluate) {
        const card = source && typeof source === 'object' ? source : {};
        const task = challenge && typeof challenge === 'object' ? challenge : {};
        const learnerAnswer = String(answer || '').trim().slice(0,2400);
        if (!learnerAnswer) return res.status(400).json({error:'Câu trả lời đang trống'});
        if (!String(task.prompt || '').trim()) return res.status(400).json({error:'Thiếu đề bài để chấm'});
        liveTalkCard = card;
        prompt = `Bạn là Voi, giáo viên tiếng Đức B2 đang chấm MỘT câu trả lời chuyển giao. Hãy đọc đúng nhiệm vụ, không chấm theo đáp án mẫu một cách máy móc và tuyệt đối không bịa lỗi.

CỤM TIẾNG ĐỨC BẮT BUỘC PHẢI DÙNG:
- Cấu trúc: ${String(card.target || '')}
- Câu sửa cũ: ${String(card.correction || '')}
- Cách nói cũ: ${String(card.native || '')}
- Câu Voi đã chữa gần nhất: ${String(card.lastCorrectedAnswer || '')}
- Ghi nhớ: ${String(card.reminder || '')}

THỬ THÁCH:
- Dạng: ${String(task.type || '')}
- Chủ đề: ${String(task.topic || '')}
- Yêu cầu bằng tiếng Việt: ${String(task.instruction || '')}
- Tình huống: ${String(task.prompt || '')}
- Điều kiện: ${Array.isArray(task.constraints) ? task.constraints.join(' | ') : ''}

CÂU TRẢ LỜI CỦA NGƯỜI HỌC:
${learnerAnswer}

Hãy kiểm tra theo thứ tự:
1. Câu có thực sự trả lời đúng tình huống và hành động giao tiếp được yêu cầu không?
2. Câu có dùng cụm tiếng Đức bắt buộc trong ngữ cảnh mới không? Nếu thẻ dùng dạng từ điển như "sich ...", "jdm.", "jdn.", "etw." hoặc động từ nguyên mẫu thì cho phép chia động từ, đổi đại từ và thay chỗ trống cho đúng câu. Dùng một từ đồng nghĩa để né hoàn toàn cụm bắt buộc thì chưa đạt.
3. Câu có dễ hiểu và không có lỗi nghiêm trọng làm đổi nghĩa không? Vẫn ghi nhận lỗi ngữ pháp, kết hợp từ, trật tự từ và register, nhưng không đòi câu phải hoàn hảo.
4. Nếu câu đúng, phải công nhận là đúng; không tạo lỗi giả chỉ để có nhận xét.
5. Đây là kiểm tra KHẢ NĂNG DÙNG CỤM, không phải bài thi viết câu hoàn hảo. Hãy đặt ba cờ độc lập:
   - targetUsedCorrectly=true khi cụm bắt buộc được dùng đúng nghĩa và đúng cấu trúc; cho phép biến đổi ngữ pháp hợp lệ.
   - taskCompleted=true khi câu thực hiện đúng hành động giao tiếp trong tình huống.
   - meaningClear=true khi người đọc hiểu ngay ý định dù còn một vài lỗi nhỏ.
6. Bắt buộc trả verdict "pass" khi cả ba cờ trên đều true. Lỗi nhỏ ở mạo từ, đuôi từ, chính tả, thì hoặc cách diễn đạt không liên quan trực tiếp đến cụm mục tiêu KHÔNG được hạ xuống "almost"; hãy vẫn ghi lỗi vào issues và sửa trong betterAnswer.
7. Dùng "almost" khi đã cố dùng đúng cụm nhưng chính cụm còn lỗi nhỏ, nhiệm vụ mới hoàn thành một phần hoặc ý cần đoán thêm. Chỉ dùng "retry" khi thiếu/sai chính cụm, sai nghĩa/ngữ cảnh, lạc nhiệm vụ hoặc câu khó hiểu.
8. Chỉ chọn tối đa 2 vấn đề quan trọng. betterAnswer phải bám đúng chủ đề, tình huống và cũng dùng cụm bắt buộc; nếu câu người học đã tự nhiên thì có thể giữ gần nguyên. Một verdict "pass" vẫn được và nên có issues nếu thật sự còn lỗi.

Chỉ trả JSON hợp lệ, không Markdown, theo schema:
{"verdict":"pass|almost|retry","targetUsedCorrectly":true,"taskCompleted":true,"meaningClear":true,"taskFulfillment":"nhận xét tiếng Việt cụ thể về việc có làm đúng nhiệm vụ hay không","whatWorked":["1-3 điểm làm tốt, tiếng Việt"],"issues":[{"original":"phần cần sửa","correction":"cách sửa","why":"giải thích ngắn bằng tiếng Việt"}],"betterAnswer":"một phiên bản tiếng Đức tự nhiên, đúng chính nhiệm vụ","targetCheck":"đã dùng/chưa dùng điểm mục tiêu như thế nào","nextStep":"một việc rất cụ thể cho lần thử sau"}`;
    } else if (isHoerSuggestions) {
        const cleanTranscript = String(transcript || '').trim().slice(0,11000);
        if (cleanTranscript.length < 30) return res.status(400).json({error:'Transcript quá ngắn'});
        prompt = `Bạn là Voi, giúp học viên B1+/B2 luyện nghe tiếng Đức. Từ TRANSCRIPT sau, gợi ý tối đa 8 cụm từ thực sự hữu ích cho việc nghe hiểu.
Quy tắc: mỗi de là một từ/cụm ngắn có mặt NGUYÊN VĂN trong transcript, không bịa từ, ưu tiên cụm có nghĩa trong ngữ cảnh; vi là nghĩa tiếng Việt ngắn gọn. Không đưa đáp án bài thi hay lời giải. Chỉ trả JSON hợp lệ dạng {"suggestions":[{"de":"...","vi":"..."}]}.
TRANSCRIPT:
${cleanTranscript}`;
    } else if (isLiveTalkChallenge) {
        const card = source && typeof source === 'object' ? source : {};
        liveTalkCard = card;
        const requiredPhrase = String(card.target || '').split('=')[0].split(' – ')[0].split(' — ')[0].trim();
        const learningMaterial = [card.target, card.said, card.correction, card.native, card.lastCorrectedAnswer].filter(Boolean).join('\n').trim();
        if (!learningMaterial) return res.status(400).json({ error:'Thẻ LiveTalk trống' });
        if (!requiredPhrase) return res.status(400).json({ error:'Thẻ này chưa có Từ mục tiêu để Voi giao ôn' });
        const recent = Array.isArray(usedChallenges) ? usedChallenges.slice(0, 60).map(String) : [];
        const lifeScenarios = [
            'đổi hoặc trả một món đồ mua nhầm',
            'hàng xóm gây ồn vào buổi tối',
            'tàu hoặc xe buýt bị trễ',
            'xin đổi ca với đồng nghiệp',
            'cuộc hẹn khám bệnh bị dời',
            'quên đồ ở quán cà phê',
            'chia việc nhà trong WG',
            'đặt nhầm ngày khách sạn',
            'điện thoại hỏng đúng lúc cần liên lạc',
            'một người bạn hủy kế hoạch vào phút cuối',
            'mua đồ second-hand và hỏi về bảo hành',
            'quản lý tiền vào cuối tháng',
            'nhận nhầm món ăn hoặc đơn giao hàng',
            'lên kế hoạch cho chuyến đi cuối tuần',
            'mạng Internet hỏng khi đang làm việc',
            'hỏi việc trong ngày đầu đi làm',
            'giải quyết hiểu lầm nhỏ với đồng nghiệp',
            'chọn quà sinh nhật cho một người khó tính',
            'trả sách thư viện muộn',
            'bưu kiện báo đã giao nhưng chưa nhận được',
            'rủ bạn tham gia một sở thích mới',
            'thống nhất cách tiết kiệm điện trong nhà',
            'xin lỗi vì đến muộn một cuộc hẹn',
            'nhờ ai đó trông thú cưng trong hai ngày'
        ];
        const scenarioKey = String(nonce || Date.now());
        const scenarioSeed = Array.from(scenarioKey).reduce((value,char) => ((value * 31) + char.charCodeAt(0)) >>> 0,0);
        const requiredLifeScenario = lifeScenarios[scenarioSeed % lifeScenarios.length];
        prompt = `Bạn là Voi, người tạo bài tập chuyển giao tiếng Đức Goethe B2. Từ MỘT lỗi/cấu trúc cũ, hãy tạo MỘT thử thách mới khó vừa đủ, tự nhiên và không lặp.

THẺ GỐC (chỉ dùng để hiểu điểm ngôn ngữ; không chép nguyên):
- Cấu trúc mục tiêu: ${String(card.target || '')}
- Câu người học đã nói: ${String(card.said || '')}
- Câu sửa: ${String(card.correction || '')}
- Cách nói tự nhiên: ${String(card.native || '')}
- Câu Voi đã chữa gần nhất: ${String(card.lastCorrectedAnswer || '')}
- Ghi nhớ: ${String(card.reminder || '')}
- Nhãn chủ đề: ${String(card.tags || '')}

CÁC THỬ THÁCH GẦN ĐÂY BỊ CẤM LẶP LẠI HOẶC DIỄN ĐẠT LẠI QUÁ GIỐNG:
${recent.length ? recent.map((item,index) => `${index+1}. ${item}`).join('\n') : '(chưa có)'}

MÃ NGẪU NHIÊN: ${String(nonce || Date.now())}
BỐI CẢNH ĐỜI SỐNG BẮT BUỘC LẦN NÀY: ${requiredLifeScenario}

YÊU CẦU:
- Trình độ B2 thực, không nâng lên C1 không cần thiết.
- Độ khó B2 phải nằm ở cách diễn đạt, lập luận và phản ứng; KHÔNG biến đề thành chủ đề học thuật, nghiên cứu, chính sách vĩ mô hay hội thảo.
- Dùng đúng bối cảnh đời sống bắt buộc ở trên. Nếu thẻ gốc trừu tượng, hãy chuyển điểm ngôn ngữ sang một sự việc hằng ngày cụ thể.
- Tạo MỘT tình huống giao tiếp cụ thể, có câu chuyện nhỏ và một mục đích nói rõ ràng; không ghép ngẫu nhiên những mảnh không liên quan.
- Chủ đề, tình huống, yêu cầu và modelAnswer phải nhất quán hoàn toàn.
- prompt gồm 2–4 câu, cho biết chuyện gì vừa xảy ra/người kia vừa nói gì và người học cần phản hồi để làm gì.
- instruction viết bằng tiếng Việt thật dễ hiểu: nói chính xác người học phải tạo loại câu nào và nhằm mục đích gì; KHÔNG tự ghi số câu hoặc số từ.
- Độ dài được hệ thống tự gắn theo dạng bài: Umformulierung/Lückentext/Fehlerdetektiv/Satzbau = 1–2 câu, 20–35 từ; spontane Reaktion/formelle Situation/Registerwechsel = 2–4 câu, 35–60 từ; Präsentation/Diskussion = 4–6 câu, 60–90 từ.
- constraints không được tự tạo thêm giới hạn số câu hoặc số từ.
- Giao diện sẽ tự hiện riêng cụm tiếng Đức bắt buộc lấy nguyên từ ô "Từ mục tiêu". Vì vậy instruction chỉ cần nói thật rõ người học phải phản hồi điều gì và nhằm mục đích gì.
- Không viết câu mơ hồ như "hãy dùng mẫu câu đã học". Không nhét thêm từ/cụm đồng nghĩa mới để thay thế cụm bắt buộc.
- modelAnswer phải trực tiếp trả lời prompt, nhắc đến đúng nội dung của topic và chuyển được điểm ngôn ngữ cũ sang ngữ cảnh mới.
- modelAnswer phải sử dụng đúng cấu trúc mục tiêu; được phép chia động từ, đổi đại từ và thay etw./jdm./jdn. cho phù hợp.
- modelAnswer TUYỆT ĐỐI không được chép lại câu sửa, câu native hay câu mục tiêu cũ.
- Luân phiên giữa: Umformulierung, Lückentext không lộ từ khóa, spontane Reaktion, Präsentation, Diskussion, formelle Situation, Fehlerdetektiv, Satzbau, Registerwechsel.
- Ngoài ô "Cụm bắt buộc" do hệ thống tự gắn, phần hiện trước khi làm không được chép câu sửa, câu native hay câu đáp án mẫu.
- explanation phải giải thích cụ thể vì sao modelAnswer vừa khớp tình huống vừa luyện đúng điểm mục tiêu; cấm câu chung chung kiểu "dùng cấu trúc trong ngữ cảnh mới".
- Trước khi xuất JSON, tự kiểm tra lại sự ăn khớp giữa prompt và modelAnswer. Nếu đáp án không trả lời đúng prompt, hãy viết lại.
- Không dùng Markdown. Chỉ trả về JSON hợp lệ, không thêm bất kỳ chữ nào bên ngoài.

SCHEMA CHÍNH XÁC:
{"type":"tên dạng bài ngắn bằng tiếng Đức","topic":"chủ đề ngắn","instruction":"hướng dẫn bằng tiếng Việt","prompt":"đề bài/tình huống, có thể xen tiếng Đức","constraints":["2 hoặc 3 ràng buộc ngắn"],"modelAnswer":"một đáp án mẫu tiếng Đức","explanation":"giải thích tiếng Việt tối đa 2 câu","fingerprint":"mã ngắn phân biệt thử thách"}`;
    } else if (isSprechen) {
        const cleanTranscript = String(transcript || cauVidu || '').trim();
        if (!cleanTranscript) return res.status(400).json({ error: 'Transcript trống' });

        prompt = `Bạn đang chấm một bài nói Goethe B2, Teil ${Number(teil) === 2 ? 2 : 1}.

AUFGABE:
${String(thema || '')}
${Array.isArray(punkte) && punkte.length ? `CÁC Ý PHẢI ĐỀ CẬP:\n- ${punkte.join('\n- ')}` : ''}

TRANSCRIPT BÀI NÓI:
${cleanTranscript}

${Number(teil) === 2 ? `Ý KIẾN PHẢN BIỆN CỦA BẠN CÙNG THI:
${String(counterargument || '')}

PHẦN TRẢ LỜI PHẢN BIỆN:
${String(replyTranscript || '(chưa trả lời)')}` : ''}

THỜI LƯỢNG GHI ÂM: ${Number(durationSeconds) || 0} giây.

Hãy đánh giá công bằng như một giáo viên luyện thi, nhưng giải thích ngắn gọn bằng tiếng Việt.
- Không coi mọi lỗi trong transcript là lỗi phát âm: máy nhận giọng nói có thể nghe nhầm.
- Không chấm phát âm vì bạn chỉ nhận transcript.
- Không bịa lỗi nếu câu đã đúng.
- Ưu tiên cách diễn đạt tiếng Đức tự nhiên mà người bản xứ thực sự dùng.
- Teil 1: kiểm tra Aufgabenerfüllung, bố cục, liên kết ý, từ vựng và ngữ pháp.
- Teil 2: ngoài các mục trên, kiểm tra lập trường, khả năng phản hồi và tương tác.
- Chỉ nêu tối đa 3 lỗi quan trọng nhất để người học không bị ngợp.

Chỉ trả về HTML sạch, không Markdown, theo đúng khung:
<h4>🎯 Aufgabe</h4><p>[Đã đáp ứng bao nhiêu ý; thiếu ý nào]</p>
<h4>📊 Einschätzung</h4><ul><li><b>Nội dung:</b> ...</li><li><b>Mạch nói:</b> ...</li><li><b>Từ vựng:</b> ...</li><li><b>Ngữ pháp:</b> ...</li>${Number(teil) === 2 ? '<li><b>Tương tác:</b> ...</li>' : ''}</ul>
<h4>🔧 3 điểm cần sửa</h4><ul><li><s>[phần sai]</s> → <b>[phần đúng]</b>: [giải thích ngắn]</li></ul>
<h4>🇩🇪 Người bản xứ có thể nói</h4><p><i>[Một phiên bản tự nhiên hơn nhưng vẫn đúng trình độ B2]</i></p>
<p><b>🐘 Nhiệm vụ lần sau:</b> [một mục tiêu cụ thể]</p>`;
    } else if (isSchreiben) {
        const cleanText = String(text || cauVidu || '').trim();
        if (!cleanText) return res.status(400).json({ error: 'Bài viết trống' });
        prompt = `Bạn là Mr. Efa, giám khảo kiêm biên tập viên Goethe B2. Hãy chấm bài viết sau bằng tiếng Việt, chính xác nhưng hơi hài hước.

DẠNG BÀI: Teil ${Number(teil) === 2 ? 2 : 1} – ${Number(teil) === 2 ? 'Formelle Nachricht' : 'Forumsbeitrag'}
ĐỀ: ${String(thema || '')}
YÊU CẦU:
- ${Array.isArray(punkte) ? punkte.join('\n- ') : ''}

BÀI VIẾT (${Number(wordCount) || 0} từ):
${cleanText}

QUY TẮC CHẤM:
- Xét Aufgabenerfüllung, Aufbau/Kohärenz, Wortschatz, Grammatik và Register.
- Teil 1 cần quan điểm, lập luận/ví dụ, liên kết ý và kết luận hợp lý.
- Teil 2 cần đúng văn phong, Anrede, Betreff nếu phù hợp, đủ nội dung và Grußformel.
- Không bịa lỗi khi câu đã đúng. Chỉ ưu tiên tối đa 3 lỗi quan trọng nhất.
- Khi sửa, trích ngắn phần sai bằng <s> và đặt cách sửa trong <b>.
- Không viết lại toàn bộ bài thay người học. Chỉ đưa một đoạn mẫu tự nhiên ngắn.
- Giọng Mr. Efa điềm tĩnh, khô khan, thỉnh thoảng có một câu nhận xét hài nhẹ.

Chỉ xuất HTML sạch trước, theo cấu trúc:
<h3>🐘 Phiếu biên tập của Mr. Efa</h3>
<h4>🎯 Aufgabenerfüllung</h4><p>...</p>
<h4>📊 Fünf Stempel</h4><ul><li><b>Nội dung:</b> ...</li><li><b>Bố cục:</b> ...</li><li><b>Từ vựng:</b> ...</li><li><b>Ngữ pháp:</b> ...</li><li><b>Văn phong:</b> ...</li></ul>
<h4>🖍️ Ba vết bút đỏ</h4><ul><li><s>...</s> → <b>...</b>: ...</li></ul>
<h4>🇩🇪 Một đoạn tự nhiên hơn</h4><p><i>...</i></p>
<p><b>Mr. Efa:</b> ...</p>

Sau HTML, ghi đúng dấu phân cách |||CHALLENGE||| rồi viết MỘT thử thách ngắn bằng tiếng Việt, yêu cầu học sinh tự viết lại một câu nhằm sửa đúng lỗi nổi bật nhất. Không đưa đáp án.`;
    } else if (isSchreibenChallenge) {
        prompt = `Bạn là Mr. Efa. Học sinh vừa làm bài tập sửa lỗi.
Yêu cầu: ${String(challenge || '')}
Câu trả lời: ${String(answer || '')}

Hãy xác nhận câu tiếng Đức có đúng và tự nhiên không. Nếu sai, sửa đúng và giải thích bằng tiếng Việt trong tối đa 3 câu. Nếu đúng, khen ngắn theo phong cách khô khan hài hước của Mr. Efa. Chỉ trả HTML sạch bằng <p>, <b>, <s>, <i>.`;
    } else if (cauVidu) {
        prompt = `Bạn là gia sư tiếng Đức B2/C1. Học sinh viết:
"${String(cauVidu)}"

Hãy chỉ ra lỗi thật sự, sửa thành câu B2 tự nhiên và cho một Grammatik-Tipp ngắn bằng tiếng Việt. Không bịa lỗi nếu câu đúng. Chỉ trả về HTML sạch, dùng <b>, <i>, <br>, <ul>, <li>, <s>. Không dùng Markdown.`;
    } else {
        prompt = `Kiểm tra cặp từ Việt–Đức sau: "${String(tuViet || '')}" = "${String(tuDuc || '')}". Xác nhận hoặc sửa, rồi cho một ví dụ B2 tự nhiên. Trả lời ngắn bằng tiếng Việt và HTML sạch.`;
    }

    const wantsJson = isLiveTalkChallenge || isLiveTalkEvaluate || isHoerSuggestions;
    const temperature = isLiveTalkChallenge ? 0.72 : (isLiveTalkEvaluate ? 0.2 : 0.35);
    const maxOutputTokens = isSchreiben ? 1500 : (isSprechen ? 1100 : (wantsJson ? 1100 : 700));
    const geminiJsonSchema = isHoerSuggestions ? {
        type:'object',
        properties:{
            suggestions:{
                type:'array',
                items:{
                    type:'object',
                    properties:{de:{type:'string'},vi:{type:'string'}},
                    required:['de','vi']
                }
            }
        },
        required:['suggestions']
    } : isLiveTalkEvaluate ? {
        type:'object',
        properties:{
            verdict:{type:'string',enum:['pass','almost','retry']},
            targetUsedCorrectly:{type:'boolean'},
            taskCompleted:{type:'boolean'},
            meaningClear:{type:'boolean'},
            taskFulfillment:{type:'string'},
            whatWorked:{type:'array',items:{type:'string'}},
            issues:{
                type:'array',
                items:{
                    type:'object',
                    properties:{original:{type:'string'},correction:{type:'string'},why:{type:'string'}},
                    required:['original','correction','why']
                }
            },
            betterAnswer:{type:'string'},
            targetCheck:{type:'string'},
            nextStep:{type:'string'}
        },
        required:['verdict','targetUsedCorrectly','taskCompleted','meaningClear','taskFulfillment','whatWorked','issues','betterAnswer','targetCheck','nextStep']
    } : isLiveTalkChallenge ? {
        type:'object',
        properties:{
            type:{type:'string'},
            topic:{type:'string'},
            instruction:{type:'string'},
            prompt:{type:'string'},
            constraints:{type:'array',items:{type:'string'}},
            modelAnswer:{type:'string'},
            explanation:{type:'string'},
            fingerprint:{type:'string'}
        },
        required:['type','topic','instruction','prompt','constraints','modelAnswer','explanation','fingerprint']
    } : null;
    const systemInstruction = isHoerSuggestions
        ? 'Bạn là Voi, trợ lý chọn cụm từ để luyện nghe. Chỉ xuất JSON object hợp lệ.'
        : (isLiveTalkChallenge || isLiveTalkEvaluate)
        ? 'Bạn là Voi, chuyên gia tiếng Đức Goethe B2. Bạn tạo và chấm bài tập chuyển giao có ngữ cảnh rõ ràng, nhất quán, tự nhiên; cụm mục tiêu được nêu rõ để ôn nhưng câu đáp án mẫu phải được giấu trước khi học viên làm; không bịa lỗi. Chỉ xuất một JSON object hợp lệ.'
        : 'Bạn là Mr. Efa, một chú voi giám khảo tiếng Đức B2 chính xác, điềm tĩnh và hơi hài hước. Bạn phân biệt văn nói với văn viết, không soi vụn vặt và luôn ưu tiên tiếng Đức tự nhiên. Chỉ xuất HTML sạch; riêng khi prompt yêu cầu dấu phân cách thì giữ đúng dấu đó.';

    const cleanProviderMessage = value => String(value || '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 260);

    const providerError = (provider, status, detail) => {
        const suffix = cleanProviderMessage(detail) || 'không trả về nội dung hợp lệ';
        const error = new Error(`${provider}${status ? ` ${status}` : ''}: ${suffix}`);
        error.provider = provider;
        error.status = Number(status) || 502;
        return error;
    };

    const stripModelFences = value => String(value || '')
        .replace(/^\uFEFF/, '')
        .replace(/```(?:html|json)?/gi, '')
        .replace(/```/g, '')
        .trim();

    const parseProviderJson = (content, provider) => {
        const normalized = stripModelFences(content);
        const firstBrace = normalized.indexOf('{');
        const lastBrace = normalized.lastIndexOf('}');
        const candidates = [normalized];
        if (firstBrace >= 0 && lastBrace > firstBrace) {
            const extracted = normalized.slice(firstBrace,lastBrace + 1);
            if (extracted !== normalized) candidates.push(extracted);
        }
        for (const candidate of candidates) {
            try {
                let parsed = JSON.parse(candidate);
                if (typeof parsed === 'string') parsed = JSON.parse(parsed);
                if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
            } catch (_) {}
        }
        throw providerError(provider,502,'trả về JSON sai định dạng');
    };

    const validateProviderPayload = (parsed,provider) => {
        if (isHoerSuggestions && !Array.isArray(parsed?.suggestions)) {
            throw providerError(provider,502,'JSON gợi ý nghe thiếu danh sách suggestions');
        }
        if (isLiveTalkEvaluate && (!String(parsed?.taskFulfillment || '').trim() || !String(parsed?.betterAnswer || '').trim() || !String(parsed?.targetCheck || '').trim())) {
            throw providerError(provider,502,'JSON phiếu chấm thiếu trường bắt buộc');
        }
        if (isLiveTalkChallenge && (!String(parsed?.prompt || '').trim() || !String(parsed?.instruction || '').trim() || !String(parsed?.modelAnswer || '').trim())) {
            throw providerError(provider,502,'JSON đề luyện thiếu trường bắt buộc');
        }
        return parsed;
    };

    async function fetchProviderJson(provider, url, options) {
        const timeoutMs = Math.max(5000, Math.min(25000, Number(process.env.AI_TIMEOUT_MS) || 14000));
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const response = await fetch(url, {...options, signal:controller.signal});
            const raw = await response.text();
            let data = {};
            try { data = raw ? JSON.parse(raw) : {}; }
            catch (_) { data = {message:raw}; }
            if (!response.ok) {
                const detail = data?.error?.message || data?.error || data?.message || response.statusText;
                throw providerError(provider, response.status, detail);
            }
            return data;
        } catch (error) {
            if (error?.provider) throw error;
            if (error?.name === 'AbortError') {
                throw providerError(provider, 504, `quá ${Math.round(timeoutMs / 1000)} giây chưa trả lời`);
            }
            throw providerError(provider, 502, error?.message || 'lỗi kết nối');
        } finally {
            clearTimeout(timeout);
        }
    }

    async function callGemini() {
        const data = await fetchProviderJson(
            'Gemini',
            'https://generativelanguage.googleapis.com/v1beta/interactions',
            {
                method:'POST',
                headers:{
                    'x-goog-api-key':geminiApiKey,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    model:process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite',
                    store:false,
                    input:`${systemInstruction}\n\nYÊU CẦU:\n${prompt}`,
                    ...(wantsJson ? {response_format:{
                        type:'text',
                        mime_type:'application/json',
                        schema:geminiJsonSchema
                    }} : {})
                })
            }
        );
        const stepText = (Array.isArray(data?.steps) ? data.steps : [])
            .filter(step => step?.type === 'model_output')
            .flatMap(step => Array.isArray(step?.content) ? step.content : [])
            .filter(block => block?.type === 'text' && block?.text)
            .map(block => String(block.text))
            .join('\n')
            .trim();
        const content = cleanProviderMessage(data?.output_text) ? String(data.output_text).trim() : stepText;
        if (!content) throw providerError('Gemini', 502, 'phản hồi không có phần văn bản');
        return {content, provider:'Gemini'};
    }

    async function callOpenRouter() {
        const data = await fetchProviderJson(
            'OpenRouter',
            'https://openrouter.ai/api/v1/chat/completions',
            {
                method:'POST',
                headers:{
                    Authorization:`Bearer ${openRouterApiKey}`,
                    'Content-Type':'application/json',
                    'HTTP-Referer':'https://kapi-deutsch.vercel.app',
                    'X-Title':'Kapi Deutsch'
                },
                body:JSON.stringify({
                    model:process.env.OPENROUTER_MODEL || 'openrouter/free',
                    temperature,
                    max_tokens:maxOutputTokens,
                    ...(wantsJson ? {response_format:{type:'json_object'}} : {}),
                    messages:[
                        {role:'system',content:systemInstruction},
                        {role:'user',content:prompt}
                    ]
                })
            }
        );
        const content = String(data?.choices?.[0]?.message?.content || '').trim();
        if (!content) throw providerError('OpenRouter', 502, 'phản hồi không có phần văn bản');
        return {content, provider:'OpenRouter'};
    }

    async function callVoi() {
        const failures = [];
        const accept = async request => {
            const response = await request();
            if (wantsJson) {
                response.parsed = validateProviderPayload(
                    parseProviderJson(response.content,response.provider),
                    response.provider
                );
            }
            return response;
        };
        if (geminiApiKey) {
            try { return await accept(callGemini); }
            catch (error) {
                failures.push(error);
                console.warn('Kapi AI fallback:', error.message);
            }
        }
        if (openRouterApiKey) {
            try { return await accept(callOpenRouter); }
            catch (error) {
                failures.push(error);
                console.warn('Kapi AI failed:', error.message);
            }
        }
        const finalError = new Error(failures.map(item => item.message).join(' · ') || 'Không có nhà cung cấp AI khả dụng');
        finalError.status = failures.some(item => item.status === 429) ? 429 : 502;
        throw finalError;
    }

    try {
        const aiResponse = await callVoi();
        if (typeof res.setHeader === 'function') res.setHeader('X-Kapi-AI-Provider', aiResponse.provider);
        const cleaned = aiResponse.content
            .replace(/```html/gi, '')
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();
        if (isHoerSuggestions) {
            const parsed = aiResponse.parsed;
            const original = String(transcript || '').toLocaleLowerCase('de-DE').replace(/\s+/g,' ');
            const suggestions = (Array.isArray(parsed.suggestions) ? parsed.suggestions : [])
                .slice(0,20)
                .map(item => ({de:String(item?.de || '').trim().slice(0,180),vi:String(item?.vi || '').trim().slice(0,260)}))
                .filter(item => item.de && item.vi && original.includes(item.de.toLocaleLowerCase('de-DE').replace(/\s+/g,' ')))
                .filter((item,index,all) => all.findIndex(other => other.de.toLocaleLowerCase('de-DE') === item.de.toLocaleLowerCase('de-DE')) === index)
                .slice(0,8);
            return res.status(200).json({suggestions});
        }
        if (isLiveTalkEvaluate) {
            const parsed = aiResponse.parsed;
            const rawVerdict = ['pass','almost','retry'].includes(parsed.verdict) ? parsed.verdict : 'almost';
            const hasFunctionalCriteria = ['targetUsedCorrectly','taskCompleted','meaningClear']
                .every(field => typeof parsed[field] === 'boolean');
            const functionalPass = hasFunctionalCriteria
                && parsed.targetUsedCorrectly
                && parsed.taskCompleted
                && parsed.meaningClear;
            let verdict = functionalPass ? 'pass' : rawVerdict;
            if (hasFunctionalCriteria && rawVerdict === 'pass' && !functionalPass) {
                verdict = parsed.targetUsedCorrectly && parsed.meaningClear ? 'almost' : 'retry';
            }
            const issues = (Array.isArray(parsed.issues) ? parsed.issues : []).slice(0,2).map(item => ({
                original:String(item?.original || '').trim().slice(0,300),
                correction:String(item?.correction || '').trim().slice(0,500),
                why:String(item?.why || '').trim().slice(0,500)
            })).filter(item => item.correction || item.why);
            const evaluation = {
                verdict,
                criteria:hasFunctionalCriteria ? {
                    targetUsedCorrectly:parsed.targetUsedCorrectly,
                    taskCompleted:parsed.taskCompleted,
                    meaningClear:parsed.meaningClear
                } : null,
                taskFulfillment:String(parsed.taskFulfillment || '').trim().slice(0,700),
                whatWorked:(Array.isArray(parsed.whatWorked) ? parsed.whatWorked : []).slice(0,3).map(item => String(item).trim().slice(0,350)).filter(Boolean),
                issues,
                betterAnswer:String(parsed.betterAnswer || '').trim().slice(0,1200),
                targetCheck:String(parsed.targetCheck || '').trim().slice(0,600),
                nextStep:String(parsed.nextStep || '').trim().slice(0,500)
            };
            if (!evaluation.taskFulfillment || !evaluation.betterAnswer || !evaluation.targetCheck) {
                return res.status(502).json({error:'Phiếu chấm của Voi còn thiếu phần quan trọng'});
            }
            return res.status(200).json({evaluation});
        }
        if (isLiveTalkChallenge) {
            const parsed = aiResponse.parsed;
            const result = {
                type:String(parsed.type || 'B2-Transfer').slice(0,80),
                topic:String(parsed.topic || liveTalkCard.tags || 'Alltag').slice(0,120),
                requiredPhrase:String(liveTalkCard.target || '').split('=')[0].split(' – ')[0].split(' — ')[0].trim().slice(0,300),
                instruction:String(parsed.instruction || 'Hoàn thành nhiệm vụ sau.').slice(0,500),
                prompt:String(parsed.prompt || '').slice(0,1200),
                constraints:Array.isArray(parsed.constraints) ? parsed.constraints.slice(0,4).map(item => String(item).slice(0,150)) : [],
                modelAnswer:String(parsed.modelAnswer || '').slice(0,1200),
                explanation:String(parsed.explanation || '').slice(0,600),
                fingerprint:String(parsed.fingerprint || parsed.prompt || '').toLowerCase().replace(/\s+/g,' ').slice(0,500)
            };
            const typeForLength = result.type.toLocaleLowerCase('de-DE');
            const lengthGuide = /präsentation|diskussion/.test(typeForLength)
                ? '4–6 câu, khoảng 60–90 từ'
                : /umformulierung|lückentext|fehlerdetektiv|satzbau/.test(typeForLength)
                    ? '1–2 câu, khoảng 20–35 từ'
                    : '2–4 câu, khoảng 35–60 từ';
            const lengthMarkers = [' từ','wörter','worte',' câu','sätze','sätzen','satz lang'];
            result.constraints = result.constraints
                .filter(item => !lengthMarkers.some(marker => item.toLocaleLowerCase('de-DE').includes(marker)))
                .slice(0,2);
            result.constraints.unshift(`Độ dài: ${lengthGuide}`);
            const hiddenBeforeAnswer = [liveTalkCard.target,liveTalkCard.correction,liveTalkCard.native,liveTalkCard.lastCorrectedAnswer]
                .map(item => String(item || '').trim())
                .filter(item => item.length >= 4)
                .sort((a,b) => b.length - a.length);
            const redactSecret = (value,secret) => {
                let current = String(value || '');
                const needle = String(secret || '').toLocaleLowerCase('de-DE');
                if (!needle) return current;
                let lowered = current.toLocaleLowerCase('de-DE');
                let from = 0;
                let index = lowered.indexOf(needle,from);
                while (index >= 0) {
                    current = `${current.slice(0,index)}_____${current.slice(index + needle.length)}`;
                    lowered = current.toLocaleLowerCase('de-DE');
                    from = index + 5;
                    index = lowered.indexOf(needle,from);
                }
                return current;
            };
            const redactBeforeAnswer = value => hiddenBeforeAnswer.reduce(
                (current,secret) => redactSecret(current,secret),
                String(value || '')
            );
            ['type','topic','instruction','prompt'].forEach(field => {
                result[field] = redactBeforeAnswer(result[field]);
            });
            result.constraints = result.constraints.map(redactBeforeAnswer);
            const normalize = value => String(value || '').toLocaleLowerCase('de-DE').replace(/[“”„"'.,!?;:()[\]{}]/g,'').replace(/\s+/g,' ').trim();
            const oldAnswers = [liveTalkCard.native,liveTalkCard.correction,liveTalkCard.target,liveTalkCard.lastCorrectedAnswer].map(normalize).filter(Boolean);
            const answerWasCopied = oldAnswers.includes(normalize(result.modelAnswer));
            const genericExplanation = /dùng cấu trúc mục tiêu trong (một )?ngữ cảnh mới/i.test(result.explanation);
            if (result.prompt.length < 80 || result.instruction.length < 35 || result.modelAnswer.length < 18 || result.explanation.length < 30 || answerWasCopied || genericExplanation) {
                return res.status(422).json({error:'Voi tự kiểm tra thấy đề chưa đủ rõ hoặc đáp án chưa khớp; hãy gọi lại'});
            }
            return res.status(200).json({ challenge:result });
        }
        if (isSchreiben) {
            const [html, ...challengeParts] = cleaned.split('|||CHALLENGE|||');
            return res.status(200).json({
                result: html.trim(),
                challenge: challengeParts.join('|||CHALLENGE|||').replace(/<[^>]*>/g, '').trim()
            });
        }
        return res.status(200).json({ result: cleaned });
    } catch (error) {
        console.error('check.js:', error);
        const status = Number(error?.status);
        return res.status(status >= 400 && status <= 599 ? status : 500).json({
            error:error?.message || 'Voi gặp lỗi chưa xác định'
        });
    }
};
