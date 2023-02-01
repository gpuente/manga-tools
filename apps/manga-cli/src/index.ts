import { InMangaSDK } from 'in-manga-sdk';
import inquirer from 'inquirer';
import { Command } from 'commander';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { createSpinner } from 'nanospinner';

const program = new Command();

program
  .option('-i, --init', 'Start manga downloader assistant')
  .parse(process.argv);


async function main() {
  const inMangaSDK = new InMangaSDK();

  const { searchValue } = await inquirer.prompt([
    {
      type: 'input',
      name: 'searchValue',
      message: 'What manga do you want to download?',
    },
  ]);

  const spinner = createSpinner(`Searching for "${searchValue}"...`).start();
  const results = await inMangaSDK.search(searchValue);

  spinner.success();

  const { mangaId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mangaId',
      message: 'Select the manga you want to download',
      choices: results.map((result) => ({
        name: `${result.name} (${result.status})`,
        value: result.id,
      })),
    },
  ]);

  const chaptersSpinner = createSpinner(`Getting chapters info...`).start();
  const chapters = await inMangaSDK.getChaptersInfo(mangaId);

  chaptersSpinner.success();

  console.log('there are', chapters.length, 'chapters available');

  const { chaptersFrom, chaptersTo } = await inquirer.prompt([
    {
      type: 'number',
      name: 'chaptersFrom',
      message: 'From which chapter do you want to download?',
      default: 1,
    },
    {
      type: 'number',
      name: 'chaptersTo',
      message: 'To which chapter do you want to download?',
      default: chapters.length,
    }
  ]);

  console.log('chaptersFrom', chaptersFrom);
  console.log('chapterFrom', chapters[chaptersFrom - 1]);
  console.log('chaptersTo', chaptersTo);
  console.log('chapterTo', chapters[chaptersTo - 1]);
}

main();

const createPDF = () => {
  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  doc.pipe(fs.createWriteStream('output.pdf'));

  // Add another page
  doc
    .addPage()
    .fontSize(25)
    .text('Here is some vector graphics...', 100, 100);

  // Draw a triangle
  doc
    .save()
    .moveTo(100, 150)
    .lineTo(100, 250)
    .lineTo(200, 250)
    .fill('#FF3300');

  // Add some text with annotations
  doc
    .addPage()
    .fillColor('blue')
    .text('Here is a link!', 100, 100)
    .underline(100, 100, 160, 27, { color: '#0000FF' })
    .link(100, 100, 160, 27, 'http://google.com/');

  // Finalize PDF file
  doc.end();
}
