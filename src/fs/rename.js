import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const renameFile = promisify(fs.rename);
const access = promisify(fs.access);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    const oldFilePath = path.join(__dirname, 'files_copy/wrongFilename.txt');
    const newFilePath = path.join(__dirname, 'files_copy/properFilename.md');
    try {
        await access(oldFilePath, fs.constants.F_OK);
        try {
            await access(newFilePath, fs.constants.F_OK);
            throw new Error('FS operation failed');
        } catch (err) {
            if (err.code !== 'ENOENT') throw err;
        }

        await renameFile(oldFilePath, newFilePath);
        console.log('Файл успешно переименован!');
    } catch (error) {
        console.error(error.message);
    }
};

await rename();
