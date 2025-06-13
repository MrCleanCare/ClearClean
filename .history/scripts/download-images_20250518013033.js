const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&q=80',
    filename: 'hero-bg.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    filename: 'residential.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
    filename: 'commercial.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    filename: 'deep-cleaning.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    filename: 'move-cleaning.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    filename: 'why-choose-us.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80',
    filename: 'og-image.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '..', 'public', 'images', filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  try {
    for (const image of images) {
      await downloadImage(image.url, image.filename);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
};

downloadAllImages(); 