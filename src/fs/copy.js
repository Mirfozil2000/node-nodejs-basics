import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files_copy');

    try {
        if (!fs.existsSync(sourceDir)) {
            throw new Error('FS operation failed');
        }

        if (fs.existsSync(targetDir)) {
            throw new Error('FS operation failed');
        }

        await mkdir(targetDir);

        const files = await readdir(sourceDir);

        for (const file of files) {
            const sourceFile = path.join(sourceDir, file);
            const targetFile = path.join(targetDir, file);

            const fileStat = await stat(sourceFile);
            if (fileStat.isFile()) {
                await copyFile(sourceFile, targetFile);
            }
        }

        console.log('Файлы успешно скопированы!');
    } catch (error) {
        console.error(error.message);
    }
};

await copy();
