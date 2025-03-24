const https = require('https');
const fs = require('fs');
const path = require('path');

// Create img directory if it doesn't exist
if (!fs.existsSync('img')) {
    fs.mkdirSync('img');
}

// Function to download image
const downloadImage = (url, filename) => {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const filePath = path.join('img', filename);
                const writeStream = fs.createWriteStream(filePath);
                response.pipe(writeStream);
                writeStream.on('finish', () => {
                    writeStream.close();
                    console.log(`Downloaded: ${filename}`);
                    resolve();
                });
            } else {
                reject(`Failed to download ${filename}: ${response.statusCode}`);
            }
        }).on('error', (err) => {
            reject(`Error downloading ${filename}: ${err.message}`);
        });
    });
};

// Download placeholder images
const images = [
    {
        url: 'https://picsum.photos/1920/1080',
        filename: 'hero-bg.jpg'
    },
    {
        url: 'https://picsum.photos/800/600',
        filename: 'about-image.jpg'
    }
];

// Download all images
Promise.all(images.map(img => downloadImage(img.url, img.filename)))
    .then(() => console.log('All images downloaded successfully'))
    .catch(err => console.error('Error:', err));