module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const chunks = [];
    for await (const chunk of req) {
        chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) {
        return res.status(400).json({ error: 'No boundary found' });
    }
    const boundary = boundaryMatch[1];

    // Tách audio data từ multipart
    const boundaryBuf = Buffer.from('--' + boundary);
    const parts = [];
    let start = 0;
    for (let i = 0; i < buffer.length; i++) {
        if (buffer.slice(i, i + boundaryBuf.length).equals(boundaryBuf)) {
            if (start > 0) parts.push(buffer.slice(start, i - 2));
            start = i + boundaryBuf.length + 2;
        }
    }

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

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const audioBase64 = audioBuffer.toString('base64');

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            {
                                inline_data: {
                                    mime_type: 'audio/webm',
                                    data: audioBase64
                                }
                            },
                            {
                                text: 'Bitte transkribiere genau was auf Deutsch gesagt wurde. Gib NUR den gesprochenen Text zurück, ohne Erklärungen.'
                            }
                        ]
                    }]
                })
            }
        );

        const data = await response.json();
        console.log("Gemini transcribe:", JSON.stringify(data));

        if (!data.candidates || !data.candidates[0]) {
            return res.status(500).json({ error: JSON.stringify(data) });
        }

        const text = data.candidates[0].content.parts[0].text.trim();
        res.status(200).json({ text: text });

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
}
