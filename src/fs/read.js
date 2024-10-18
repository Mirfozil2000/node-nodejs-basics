import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const access = promisify(fs.access);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const filePath = path.join(__dirname, 'files/fileToRead.txt');

    try {
        await access(filePath, fs.constants.F_OK);
        const content = await readFile(filePath, 'utf8');
        console.log(content);
    } catch (error) {
        console.error('FS operation failed');
    }
};

await read();
