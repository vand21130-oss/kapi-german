export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const { tuViet, tuDuc, cauVidu } = req.body;
    
    // ĐỔI TÊN BIẾN: Giờ tụi mình xài OpenRouter nha!
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

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
        // Cú pháp gọi API của OpenRouter (chuẩn OpenAI)
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                // 2 header này OpenRouter khuyến nghị để theo dõi, Vịt cứ để tên app vô tư
                "HTTP-Referer": "https://kapi-deutsch.vercel.app", 
                "X-Title": "Kapi Deutsch"
            },
            body: JSON.stringify({
                // Đỉnh cao ở đây: Chọn model miễn phí siêu xịn (ví dụ Gemma 3 27B free)
                "model": "google/gemma-3-27b-it:free",
                "messages": [
                    { "role": "system", "content": "Bạn là một gia sư tiếng Đức cực kỳ nghiêm khắc, giỏi giải thích ngữ pháp bằng tiếng Việt." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        
        // OpenRouter trả kết quả ở dạng choices[0].message.content
        if (!data.choices || !data.choices[0].message) {
            return res.status(500).json({ error: "OpenRouter không phản hồi: " + JSON.stringify(data) });
        }

        let html = data.choices[0].message.content
            .replace(/```html/g, '')
            .replace(/
```/g, '')
            .trim();
            
        res.status(200).json({ result: html });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
