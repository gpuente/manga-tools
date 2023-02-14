import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import probe from 'probe-image-size';
import gradient from 'gradient-string';
import { SingleBar, Presets } from 'cli-progress';
import { createSpinner } from 'nanospinner';

import { i18n } from '../i18n';

export const imagesToPDF = (images: string[], filePath: string): Promise<void> => new Promise((resolve, reject) => {
  const bar = new SingleBar({
    format: `${i18n.translate('general.generatePDF')} {bar} {percentage}%`
  }, Presets.shades_classic);

  bar.start(images.length, 0);

  const doc = new PDFDocument({
    autoFirstPage: false,
  });

  images.forEach((image) => {
    const data = probe.sync(fs.readFileSync(image));

    if (data) {
      const { width, height } = data;
      doc.addPage({ size: [width, height] });
      doc.image(image, 0, 0, { width, height });

      bar.increment();
    } else {
      bar.stop();
      throw new Error(`unable to read image metadata for: ${image}`);
    }
  });

  bar.stop();

  if (doc.length < 1) {
    throw new Error('No images to convert');
  }

  const spinner = createSpinner(i18n.translate('spinners.savePdfFile')).start();

  const stream = fs.createWriteStream(filePath);

  stream.on('finish', () => {
    spinner.success();
    console.log(gradient.vice(i18n.translate('general.fileStored', { filePath: path.resolve(filePath) })));
    resolve();
  });
  stream.on('error', (err) => {
    spinner.error({ text: i18n.translate('spinners.savePdfFileError') });

    if (global.debugEnabled) {
      console.error(`Error while generating PDF: ${err}`);
    }

    reject();
  });

  doc.pipe(stream);
  doc.end();
});
