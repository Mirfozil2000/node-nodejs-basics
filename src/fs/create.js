import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');
    const content = 'I am fresh and young';

    try {
        if (fs.existsSync(filePath)) {
            throw new Error('FS operation failed');
        }
        fs.writeFileSync(filePath, content);
        console.log('Файл успешно создан!');
    } catch (error) {
        console.error(error.message);
    }
};

await create();
