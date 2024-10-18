import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const access = promisify(fs.access);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    const dirPath = path.join(__dirname, 'files');

    try {
        await access(dirPath, fs.constants.F_OK);
        const files = await readdir(dirPath);
        console.log(files);
    } catch (error) {
        console.error('FS operation failed');
    }
};

await list();
