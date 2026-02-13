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
const QUALITY = 80;

async function processDirectory(directory) {
    if (!fs.existsSync(directory)) {
        console.log(`Directory not found: ${directory}`);
        return;
    }

    const files = fs.readdirSync(directory);

    for (const file of files) {
        if (!file.match(/\.(jpg|jpeg|png)$/i)) continue;

        const filePath = path.join(directory, file);
        const tempPath = path.join(directory, `temp-${file}`);

        try {
            const metadata = await sharp(filePath).metadata();

            if (metadata.width > MAX_WIDTH) {
                console.log(`Resizing ${file} (${metadata.width}px -> ${MAX_WIDTH}px)...`);

                await sharp(filePath)
                    .resize({ width: MAX_WIDTH })
                    .jpeg({ quality: QUALITY, mozjpeg: true })
                    .png({ quality: QUALITY, compressionLevel: 8 })
                    .toFile(tempPath);

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
