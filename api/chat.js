module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const { text } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const prompt = `Bạn là một giáo viên tiếng Đức. Học sinh B2 vừa nói câu sau: "${text}". Hãy sửa lỗi ngữ pháp, giải thích lỗi sai ngắn gọn bằng tiếng Việt, và đưa ra một câu thay thế chuẩn B2/C1. Trình bày CHỈ BẰNG HTML thuần túy (KHÔNG dùng markdown): <h4>Korrektur:</h4><p>[Câu đúng, từ sai dùng thẻ s màu đỏ, từ đúng màu xanh]</p><p><b>Erklärung:</b> [Giải thích tiếng Việt]</p><h4>Bessere Alternative (B2):</h4><p><i>[Câu nâng cao]</i></p>`;
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        console.log("Gemini:", JSON.stringify(data));
        if (!data.candidates || !data.candidates[0]) {
            return res.status(500).json({ error: JSON.stringify(data) });
        }
        let aiHtml = data.candidates[0].content.parts[0].text;
        aiHtml = aiHtml.replace(/```html/g, "").replace(/```/g, "");
        res.status(200).json({ result: aiHtml });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
}
