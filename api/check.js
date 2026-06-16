module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { tuViet, tuDuc, cauVidu } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    const prompt = cauVidu 
        ? `Bạn là giáo viên tiếng Đức B2. Học sinh đặt câu ví dụ với từ "${tuDuc}" như sau: "${cauVidu}". Hãy kiểm tra câu có đúng ngữ pháp không, có dùng từ "${tuDuc}" không, và cho phản hồi ngắn gọn bằng tiếng Việt + tiếng Đức. Trả về CHỈ HTML thuần túy: <p>✅/❌ [nhận xét]</p><p><b>Korrektur:</b> [câu đúng nếu sai]</p><p><b>Tipp:</b> [mẹo nhỏ]</p>`
        : `Bạn là giáo viên tiếng Đức B2. Học sinh dịch từ "${tuViet}" thành "${tuDuc}". Hãy kiểm tra xem có đúng không và cho phản hồi ngắn gọn. Trả về CHỈ HTML thuần túy: <p>✅/❌ [nhận xét tiếng Việt]</p>${tuDuc ? '<p><b>Đáp án đúng:</b> [từ tiếng Đức đúng]</p>' : ''}`;

    try {
        const response = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        if (!data.candidates?.[0]) return res.status(500).json({ error: JSON.stringify(data) });
        let html = data.candidates[0].content.parts[0].text.replace(/```html/g,'').replace(/```/g,'');
        res.status(200).json({ result: html });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
