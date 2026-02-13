import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDirs = [
    path.join(__dirname, '../src/assets/images'),
    path.join(__dirname, '../../renda-passiva-2-horas2/src/assets/images'),
    path.join(__dirname, '../../renda-passiva-2-horas3/src/assets/images'),
];

const MAX_WIDTH = 800;
const QUALITY = 60;

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`Directory not found: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        // Updated regex to include webp
        if (!file.match(/\.(jpg|jpeg|png|webp)$/i)) continue;

        const filePath = path.join(directory, file);
        const tempPath = path.join(directory, `temp-${file}`);
        const ext = path.extname(file).toLowerCase(); // Get file extension

        try {
            const stats = fs.statSync(filePath);
            const metadata = await sharp(filePath).metadata();

            if (metadata.width > MAX_WIDTH || stats.size > 100000) {
                console.log(`Resizing/Compressing ${file} (${metadata.width}px, ${(stats.size / 1024).toFixed(2)}KB)...`);

                // New conditional logic for different file types
                if (ext === '.jpg' || ext === '.jpeg') {
                    await sharp(filePath)
                        .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // Added withoutEnlargement
                        .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true }) // Added progressive: true, used QUALITY constant
                        .toFile(tempPath);
                } else if (ext === '.png') {
                    await sharp(filePath)
                        .resize({ width: MAX_WIDTH, withoutEnlargement: true }) // Added withoutEnlargement
                        .png({ quality: QUALITY, compressionLevel: 8 }) // Used QUALITY constant
                        .toFile(tempPath);
                } else if (ext === '.webp') { // Added webp support
                    await sharp(filePath)
                        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                        .webp({ quality: QUALITY }) // Used QUALITY constant
                        .toFile(tempPath);
                }

                // Replace original with optimized version
                fs.unlinkSync(filePath);
                fs.renameSync(tempPath, filePath);
                console.log(`✅ Optimized ${file}`);
            } else {
                console.log(`Skipping ${file} (${metadata.width}px <= ${MAX_WIDTH}px)`);
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
    }
}

(async () => {
    console.log('Starting image optimization...');
    for (const dir of targetDirs) {
        await processDirectory(dir);
    }
    console.log('Done!');
})();
