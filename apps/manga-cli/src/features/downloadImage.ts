import axios from 'axios';
import fs from 'fs';
import path from 'path';

const imageContentTypeToExtension = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/gif': '.gif',
  'image/bmp': '.bmp',
};


export const downloadImage = async (url: string, filepath: string): Promise<string> => {
  const dirName = path.dirname(filepath);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  } else {
    const files = fs.readdirSync(dirName);
    const expectedFileName = path.basename(filepath, path.extname(filepath));

    const file = files.find((file) => {
      const existingFileName = path.basename(file, path.extname(file));
      return existingFileName === expectedFileName;
    });

    if (file) {
      const existingFileFullPath = path.resolve(path.join(dirName, file));
      if (global.debugEnabled) {
        console.log(`File ${existingFileFullPath} already exists, skipping download`);
      }

      return existingFileFullPath;
    }
  }

  if (debugEnabled) {
    console.log(`Downloading image from ${url} to ${filepath}`);
  }

  const res = await axios.get(url, { responseType: 'arraybuffer' });

  const contentType = res.headers['content-type'];
  const extension = imageContentTypeToExtension[contentType as keyof typeof imageContentTypeToExtension] || null;

  if (!extension) {
    throw new Error(`Unknown content type: ${contentType}`);
  }

  const fileName = path.basename(filepath, path.extname(filepath)) + extension;
  const fullPath = path.join(dirName, fileName);

  fs.writeFileSync(fullPath, res.data);

  return path.resolve(fullPath);
};
