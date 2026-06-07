const formidable = require('formidable');
const fs = require('fs');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: err.message });

        const audioFile = files.audio[0] || files.audio;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('file', fs.createReadStream(audioFile.filepath), {
            filename: 'audio.webm',
            contentType: 'audio/webm'
        });
        formData.append('model', 'whisper-1');
        formData.append('language', 'de');

        try {
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    ...formData.getHeaders()
                },
                body: formData
            });
            const data = await response.json();
            res.status(200).json({ text: data.text });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
