import fs from 'fs';
import sizeOf from 'image-size';
import PDFDocument from 'pdfkit';

export const imagesToPDF = (images: string[], path: string): void => {
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

  doc.pipe(fs.createWriteStream(path));
  doc.end();
};
