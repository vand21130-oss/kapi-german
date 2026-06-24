module.exports = async function handler(req, res) {
    // 1. Chỉ nhận request dạng POST
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    // 2. Lấy dữ liệu Vịt gửi lên
    const { tuViet, tuDuc, cauVidu } = req.body;
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    // 3. Chuẩn bị "Văn mẫu" (Prompt) cho AI
    const prompt = cauVidu 
        ? `Bạn là gia sư tiếng Đức trình độ B2/C1. Học sinh viết đoạn/câu này: "${cauVidu}".
           Hãy:
           1. Phân tích ngữ pháp (đặc biệt là chia đuôi tính từ, mạo từ và vị trí động từ).
           2. Nếu sai, viết lại thành câu B2 hoàn chỉnh.
           3. Đưa ra 1 mẹo ngữ pháp (Grammatik-Tipp) liên quan đến lỗi này.
           Trả lời ngắn gọn bằng tiếng Việt kèm câu tiếng Đức đúng. Trả về dạng HTML sạch (chỉ dùng thẻ <b>, <i>, <br>, <ul>, <li>). Không dùng markdown.`
        : `Bạn là gia sư tiếng Đức. Từ "${tuViet}" có nghĩa là "${tuDuc}" không? Hãy kiểm tra và xác nhận, kèm ví dụ B2. Trả về dạng HTML sạch.`;

    try {
        // 4. Gọi điện cho OpenRouter (Gemma 3)
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://kapi-deutsch.vercel.app", 
                "X-Title": "Kapi Deutsch"
            },
            body: JSON.stringify({
                "model": "google/gemma-3-27b-it:free",
                "messages": [
                    { "role": "system", "content": "Bạn là một gia sư tiếng Đức cực kỳ nghiêm khắc, giỏi giải thích ngữ pháp bằng tiếng Việt." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        
        // 5. Kiểm tra AI có trả lời đàng hoàng không
        if (!data.choices || !data.choices[0].message) {
            return res.status(500).json({ error: "OpenRouter không phản hồi: " + JSON.stringify(data) });
        }

        // 6. Xóa các ký tự rác của Markdown (Cách mới an toàn tuyệt đối)
        let html = data.choices[0].message.content
            .split('```html').join('')
            .split('```').join('')
            .trim();
        // 7. Trả kết quả về cho web
        res.status(200).json({ result: html });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
