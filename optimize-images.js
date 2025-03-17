// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './temp-images';
const outputDir = './static/img';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);
  
  sharp(inputPath)
    .resize(1200) // Max width of 1200px
    .jpeg({ quality: 85 })
    .toFile(outputPath)
    .then(() => console.log(`Optimized: ${file}`))
    .catch(err => console.error(`Error with ${file}:`, err));
});