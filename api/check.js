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

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Thiếu OPENROUTER_API_KEY' });

    const isSprechen = mode === 'sprechen';
    const isSchreiben = mode === 'schreiben';
    const isSchreibenChallenge = mode === 'schreiben_challenge';
    const isLiveTalkChallenge = mode === 'livetalk_challenge';
    let liveTalkCard = {};
    let prompt;

    if (isLiveTalkChallenge) {
        const card = source && typeof source === 'object' ? source : {};
        liveTalkCard = card;
        const learningMaterial = [card.target, card.said, card.correction, card.native].filter(Boolean).join('\n').trim();
        if (!learningMaterial) return res.status(400).json({ error:'Thẻ LiveTalk trống' });
        const recent = Array.isArray(usedChallenges) ? usedChallenges.slice(0, 60).map(String) : [];
        prompt = `Bạn là Voi, người tạo bài tập chuyển giao tiếng Đức Goethe B2. Từ MỘT lỗi/cấu trúc cũ, hãy tạo MỘT thử thách mới khó vừa đủ, tự nhiên và không lặp.

THẺ GỐC (chỉ dùng để hiểu điểm ngôn ngữ; không chép nguyên):
- Cấu trúc mục tiêu: ${String(card.target || '')}
- Câu người học đã nói: ${String(card.said || '')}
- Câu sửa: ${String(card.correction || '')}
- Cách nói tự nhiên: ${String(card.native || '')}
- Ghi nhớ: ${String(card.reminder || '')}
- Nhãn chủ đề: ${String(card.tags || '')}

CÁC THỬ THÁCH GẦN ĐÂY BỊ CẤM LẶP LẠI HOẶC DIỄN ĐẠT LẠI QUÁ GIỐNG:
${recent.length ? recent.map((item,index) => `${index+1}. ${item}`).join('\n') : '(chưa có)'}

MÃ NGẪU NHIÊN: ${String(nonce || Date.now())}

YÊU CẦU:
- Trình độ B2 thực, không nâng lên C1 không cần thiết.
- Mỗi lần đổi ít nhất 3 yếu tố: chủ đề, tình huống, dạng nhiệm vụ, register, ngữ pháp phụ hoặc ràng buộc.
- Luân phiên giữa: Umformulierung, Lückentext không lộ từ khóa, spontane Reaktion, Präsentation, Diskussion, formelle Situation, Fehlerdetektiv, Satzbau, Registerwechsel.
- Phần hiện trước khi làm TUYỆT ĐỐI không được chứa cấu trúc mục tiêu, câu sửa, câu native hay từ khóa làm lộ đáp án.
- prompt phải có đủ ngữ cảnh để người học tự viết một câu trả lời.
- modelAnswer phải là một đáp án tiếng Đức đúng, tự nhiên, thỏa điều kiện và thực sự luyện điểm trong thẻ gốc.
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

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://kapi-deutsch.vercel.app',
                'X-Title': 'Kapi Deutsch'
            },
            body: JSON.stringify({
                model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
                temperature: isLiveTalkChallenge ? 0.9 : 0.35,
                max_tokens: isSchreiben ? 1500 : (isSprechen ? 1100 : (isLiveTalkChallenge ? 900 : 700)),
                messages: [
                    {
                        role: 'system',
                        content: isLiveTalkChallenge
                            ? 'Bạn là Voi, chuyên gia thiết kế bài tập chuyển giao Goethe B2. Bạn tạo đề khó vừa đủ, tự nhiên, không lặp và không làm lộ đáp án. Chỉ xuất một JSON object hợp lệ.'
                            : 'Bạn là Mr. Efa, một chú voi giám khảo tiếng Đức B2 chính xác, điềm tĩnh và hơi hài hước. Bạn phân biệt văn nói với văn viết, không soi vụn vặt và luôn ưu tiên tiếng Đức tự nhiên. Chỉ xuất HTML sạch; riêng khi prompt yêu cầu dấu phân cách thì giữ đúng dấu đó.'
                    },
                    { role: 'user', content: prompt }
                ]
            })
        });

        const data = await response.json();
        if (!response.ok || !data.choices?.[0]?.message?.content) {
            return res.status(response.status || 502).json({
                error: data.error?.message || 'OpenRouter không phản hồi'
            });
        }

        const cleaned = data.choices[0].message.content
            .replace(/```html/gi, '')
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();
        if (isLiveTalkChallenge) {
            let parsed;
            try { parsed = JSON.parse(cleaned); }
            catch (_) {
                const match = cleaned.match(/\{[\s\S]*\}/);
                if (!match) return res.status(502).json({ error:'Voi gửi sai định dạng đề' });
                try { parsed = JSON.parse(match[0]); }
                catch (_) { return res.status(502).json({ error:'Voi gửi JSON bị móp' }); }
            }
            const result = {
                type:String(parsed.type || 'B2-Transfer').slice(0,80),
                topic:String(parsed.topic || liveTalkCard.tags || 'Alltag').slice(0,120),
                instruction:String(parsed.instruction || 'Hoàn thành nhiệm vụ sau.').slice(0,500),
                prompt:String(parsed.prompt || '').slice(0,1200),
                constraints:Array.isArray(parsed.constraints) ? parsed.constraints.slice(0,4).map(item => String(item).slice(0,150)) : [],
                modelAnswer:String(parsed.modelAnswer || '').slice(0,1200),
                explanation:String(parsed.explanation || '').slice(0,600),
                fingerprint:String(parsed.fingerprint || parsed.prompt || '').toLowerCase().replace(/\s+/g,' ').slice(0,500)
            };
            if (!result.prompt || !result.modelAnswer) return res.status(502).json({ error:'Voi làm rơi mất đề hoặc đáp án' });
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
        return res.status(500).json({ error: error.message });
    }
};
