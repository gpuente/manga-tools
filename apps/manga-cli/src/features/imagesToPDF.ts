import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import PDFDocument from 'pdfkit';
import gradient from 'gradient-string';
import { createSpinner } from 'nanospinner';

import { i18n } from '../i18n';

export const imagesToPDF = (images: string[], filePath: string): Promise<void> => new Promise((resolve, reject) => {
  const spinner = createSpinner(i18n.translate('spinners.generatePDF')).start();

  const doc = new PDFDocument({
    autoFirstPage: false,
  });

  images.forEach((image) => {
    const { width, height } = sizeOf(image);

    if (width && height) {
      doc.addPage({ size: [width, height] });
      doc.image(image, 0, 0, { width, height });
    }
  });

  if (doc.length < 1) {
    throw new Error('No images to convert');
  }

  const stream = fs.createWriteStream(filePath);

  stream.on('finish', () => {
    spinner.success();
    console.log(gradient.vice(i18n.translate('general.fileStored', { filePath: path.resolve(filePath) })));
    resolve();
  });
  stream.on('error', (err) => {
    spinner.error({ text: i18n.translate('spinners.generatePDFError') });

    if (global.debugEnabled) {
      console.error(`Error while generating PDF: ${err}`);
    }

    reject();
  });

  doc.pipe(stream);
  doc.end();
});
