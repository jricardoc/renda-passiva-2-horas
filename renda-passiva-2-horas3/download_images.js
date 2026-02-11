import fs from 'fs';
import https from 'https';
import path from 'path';

const images = [
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/hendi.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/grafico-dados.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/group.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img1.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img2.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img3.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img4.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img5.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img6.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img7.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img8.jpeg",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img9.png",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img10.png",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img11.png",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/img12.png",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-1.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-2.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-3.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-4.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-5.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-6.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-7.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-8.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-9.webp",
    "https://www.ocaradocopytrade.com/wp-content/uploads/2025/12/p-10.webp"
];

const downloadImage = (url) => {
    const filename = path.basename(url);
    const filepath = path.join('src/assets/images', filename);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
            }
        });
    });
};

(async () => {
    for (const url of images) {
        try {
            await downloadImage(url);
            console.log(`Downloaded ${url}`);
        } catch (e) {
            console.error(`Failed to download ${url}: ${e.message}`);
        }
    }
})();
