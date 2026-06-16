export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { tuViet, tuDuc, cauVidu } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // Prompt B2 "Khó tính": Ép AI tập trung vào lỗi cấu trúc câu (Satzbau)
    const prompt = cauVidu 
        ? `Bạn là gia sư tiếng Đức trình độ B2/C1. Học sinh đặt câu: "${cauVidu}" với từ "${tuDuc}".
           Hãy:
           1. Phân tích ngữ pháp (đặc biệt là chia đuôi tính từ, mạo từ và vị trí động từ).
           2. Nếu sai, viết lại thành câu B2 hoàn chỉnh.
           3. Đưa ra 1 mẹo ngữ pháp (Grammatik-Tipp) liên quan đến lỗi này.
           Trả lời ngắn gọn bằng tiếng Việt kèm câu tiếng Đức đúng. Trả về dạng HTML sạch.`
        : `Bạn là gia sư tiếng Đức. Từ "${tuViet}" có nghĩa là "${tuDuc}" không? Hãy kiểm tra và xác nhận, kèm ví dụ B2. Trả về dạng HTML sạch.`;

    try {
        // Sửa lỗi cú pháp: Phải có 'await' và gọi fetch đúng cách
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0].content) {
            return res.status(500).json({ error: "Gemini không phản hồi: " + JSON.stringify(data) });
        }

        let html = data.candidates[0].content.parts[0].text
            .replace(/```html/g, '').replace(/```/g, '')
            .trim();
            
        res.status(200).json({ result: html });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
