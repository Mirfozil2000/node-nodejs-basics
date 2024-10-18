import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files/fileToRemove.txt');

    try {
        await access(filePath, fs.constants.F_OK);
        await unlink(filePath);
        console.log('Файл успешно удалён!');
    } catch (error) {
        console.error('FS operation failed');
    }
};

await remove();
