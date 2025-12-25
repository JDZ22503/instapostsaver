const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { fetchMedia } = require('./services/instagram');

const app = express();
const PORT = process.env.PORT || 3001;

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// JSON Parsing
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Instagram Media Downloader API is Running');
});

// API Endpoint: Fetch Media
app.get('/api/v1/fetch', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ success: false, message: 'URL parameter is required' });
    }

    try {
        const result = await fetchMedia(url);

        if (result.success) {
            res.json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
const axios = require('axios'); // Ensure axios is required for the proxy
const fs = require('fs');
const path = require('path');

// API Endpoint: Proxy Download
app.get('/api/v1/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        console.log(`Proxying download for: ${url}`);

        const response = await axios({
            url: url,
            method: 'GET',
            responseType: 'stream',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // Forward important headers
        res.setHeader('Content-Type', response.headers['content-type']);
        if (response.headers['content-length']) {
            res.setHeader('Content-Length', response.headers['content-length']);
        }

        // Force download
        const extension = (response.headers['content-type'] && response.headers['content-type'].includes('video')) ? 'mp4' : 'jpg';
        res.setHeader('Content-Disposition', `attachment; filename="instagram_media_${Date.now()}.${extension}"`);

        response.data.pipe(res);

    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).send('Failed to download media');
    }
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`📡 Listening on all network interfaces (0.0.0.0)`);
    console.log(`🌐 Local: http://localhost:${PORT}`);
    console.log(`🔗 Network: Check your server IP`);
});
