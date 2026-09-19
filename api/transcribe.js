module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Thiếu GEMINI_API_KEY' });

    try {
        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = Buffer.concat(chunks);
        const contentType = req.headers['content-type'] || '';
        const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
        if (!boundaryMatch) return res.status(400).json({ error: 'Không tìm thấy multipart boundary' });

        const boundary = Buffer.from(`--${boundaryMatch[1] || boundaryMatch[2]}`);
        let audioBuffer = null;
        let audioMimeType = 'audio/webm';
        let cursor = 0;

        while (cursor < body.length) {
            const boundaryStart = body.indexOf(boundary, cursor);
            if (boundaryStart === -1) break;
            const partStart = boundaryStart + boundary.length + 2;
            const nextBoundary = body.indexOf(boundary, partStart);
            if (nextBoundary === -1) break;
            const part = body.subarray(partStart, Math.max(partStart, nextBoundary - 2));
            cursor = nextBoundary;

            const headerEnd = part.indexOf(Buffer.from('\r\n\r\n'));
            if (headerEnd === -1) continue;
            const headers = part.subarray(0, headerEnd).toString('utf8');
            if (!/name="audio"/i.test(headers)) continue;

            const mimeMatch = headers.match(/Content-Type:\s*([^\r\n]+)/i);
            if (mimeMatch) audioMimeType = mimeMatch[1].trim();
            audioBuffer = part.subarray(headerEnd + 4);
            break;
        }

        if (!audioBuffer || !audioBuffer.length) {
            return res.status(400).json({ error: 'Không tìm thấy file audio' });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            {
                                inline_data: {
                                    mime_type: audioMimeType,
                                    data: audioBuffer.toString('base64')
                                }
                            },
                            {
                                text: 'Transkribiere exakt, was auf Deutsch gesagt wurde. Korrigiere keine Grammatik und erfinde keine fehlenden Wörter. Gib nur den gesprochenen Text ohne Erklärung zurück.'
                            }
                        ]
                    }],
                    generationConfig: { temperature: 0 }
                })
            }
        );

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts
            ?.map(part => part.text || '')
            .join('')
            .trim();

        if (!response.ok || !text) {
            return res.status(response.status || 502).json({
                error: data.error?.message || 'Gemini không trả transcript'
            });
        }

        return res.status(200).json({ text });
    } catch (error) {
        console.error('transcribe.js:', error);
        return res.status(500).json({ error: error.message });
    }
};

