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
