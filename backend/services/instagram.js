const { execSync } = require('child_process');
const path = require('path');

const INSTAGRAM_REGEX = /instagram\.com\/(?:p|reel|reels|tv)\/([a-zA-Z0-9_-]+)/;

const fetchMedia = async (url) => {
    try {
        const trimmedUrl = url.trim().split('?')[0];
        const match = trimmedUrl.match(INSTAGRAM_REGEX);

        if (!match) {
            throw new Error('Invalid Instagram URL. Only Posts and Reels are supported.');
        }

        const shortcode = match[1];
        console.log(`Fetching media for shortcode: ${shortcode}`);

        // Use Instaloader WITHOUT login for public posts
        const pythonScript = path.join(__dirname, 'instagram_nologin.py');
        const command = `python3 "${pythonScript}" "${trimmedUrl}"`;

        console.log('✨ Fetching PUBLIC post (NO LOGIN - NO IP BLACKLIST!)...');
        const output = execSync(command, { encoding: 'utf-8', timeout: 30000 });

        const result = JSON.parse(output);

        if (result.success) {
            console.log(`✅ Successfully fetched ${result.type}`);
        } else {
            console.log(`❌ Error: ${result.message}`);
        }

        return result;

    } catch (error) {
        console.error('Error:', error.message);
        return {
            success: false,
            message: error.message
        };
    }
};

module.exports = { fetchMedia };
