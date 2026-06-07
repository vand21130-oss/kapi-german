// File: api/chat.js
module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text } = req.body;
    // Lấy chìa khóa bí mật từ "két sắt" của Vercel (không lộ ra ngoài public)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

    const prompt = `
    Bạn là một giáo viên tiếng Đức. Học sinh B2 vừa nói câu sau: "${text}".
    Hãy sửa lỗi ngữ pháp, giải thích lỗi sai ngắn gọn bằng tiếng Việt, và đưa ra một câu thay thế chuẩn B2/C1.
    Trình bày trả về CHỈ BẰNG mã HTML thuần túy như cấu trúc sau (KHÔNG dùng markdown \`\`\`html):
    <h4 style="margin-bottom: 5px;">Korrektur:</h4>
    <p style="font-size: 18px; margin-top:0;">[Viết lại câu đúng. Từ sai gạch ngang <s> màu đỏ, từ đúng màu xanh lá cây]</p>
    <p><b>Erklärung:</b> [Giải thích bằng tiếng Việt]</p>
    <h4 style="margin-bottom: 5px;">Bessere Alternative (B2):</h4>
    <p style="font-size: 18px; margin-top:0;"><i>[Câu nâng cao]</i></p>
    `;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        console.error("Gemini response:", JSON.stringify(data));
        let aiHtml = data.candidates[0].content.parts[0].text;
        
        // Dọn dẹp rác markdown nếu AI lỡ viết thêm
        aiHtml = aiHtml.replace(/```html/g, "").replace(/```/g, "");

        // Trả kết quả về cho file HTML
        res.status(200).json({ result: aiHtml });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi mạng khi kết nối não bộ Kapi' });
    }
}
