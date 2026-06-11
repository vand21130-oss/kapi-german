module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const chunks = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Tách boundary từ content-type
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
        return res.status(400).json({ error: 'No boundary found' });
    }
    const boundary = boundaryMatch[1];

    // Tìm audio data trong multipart
    const boundaryBuf = Buffer.from('--' + boundary);
    const parts = [];
    let start = 0;
    for (let i = 0; i < buffer.length; i++) {
        if (buffer.slice(i, i + boundaryBuf.length).equals(boundaryBuf)) {
            if (start > 0) parts.push(buffer.slice(start, i - 2));
            start = i + boundaryBuf.length + 2;
        }
    }

    // Lấy phần audio (bỏ header)
    let audioBuffer = null;
    for (const part of parts) {
        const headerEnd = part.indexOf('\r\n\r\n');
        if (headerEnd !== -1) {
            const header = part.slice(0, headerEnd).toString();
            if (header.includes('audio')) {
                audioBuffer = part.slice(headerEnd + 4);
            }
        }
    }

    if (!audioBuffer) {
        return res.status(400).json({ error: 'No audio found' });
    }

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const formData = new FormData();
    const blob = new Blob([audioBuffer], { type: 'audio/webm' });
    formData.append('file', blob, 'audio.webm');
    formData.append('model', 'whisper-1');
    formData.append('language', 'de');

    try {
        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${OPENAI_API_KEY}` },
            body: formData
        });
        const data = await response.json();
        console.log("Whisper response:", JSON.stringify(data));
        res.status(200).json({ text: data.text, debug: data });
    } catch (error) {
        console.error("Whisper error:", error.message);
        res.status(500).json({ error: error.message });
    }
}
