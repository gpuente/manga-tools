import { Command } from 'commander';
import cliProgress from 'cli-progress';
import { createSpinner } from 'nanospinner';
import { FullChapter, InMangaProvider } from 'manga-providers';
import figlet from 'figlet';
import gradient from 'gradient-string';
import path from 'path';

import config from './config';
import { i18n, I18N } from './i18n';
import { getFileName, sleep } from './utils';
import {
  openFile,
  clearCache,
  imagesToPDF,
  downloadImage,
  promptAndSearch,
  printDonationBox,
  getChaptersPrompt,
  getDownloadPathPrompt,
  getMangaSelectionPrompt,
} from './features';

global.debugEnabled = false;

const program = new Command();

program
  .description(
    'CLI tool to download mangas from internet and store them in PDF files'
  )
  .option('-c, --clear-cache ', 'Clear downloaded chapters cache', false)
  .option(
    '--clear-after-download',
    'Clear downloaded chapters cache after download completes',
    false
  )
  .option('-d, --debug', 'Enable debug mode')
  .option(
    '-s, --skip-open',
    'Skip open downloaded file after download completes',
    false
  )
  .option('--lang <language>', 'Set CLI language (available "en" and "es")')
  .parse(process.argv);

async function main() {
  const options = program.opts();

  if (options.debug) {
    global.debugEnabled = true;
  }

  if (options.clearCache) {
    await clearCache();
    return;
  }

  figlet.text(
    'Manga CLI',
    {
      font: 'ANSI Regular',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
    },
    (err, data) => {
      if (err) return;
      console.clear();
      console.log(gradient('red', 'blue')(data));
    }
  );

  await sleep(1000);

  if (
    options.lang &&
    Object.values(I18N.AVAILABLE_LANGUAGES).includes(options.lang.toLowerCase())
  ) {
    i18n.changeLanguage(options.lang);
  }

  const inMangaProvider = new InMangaProvider();

  const results = await promptAndSearch(inMangaProvider);

  const { selectedManga } = await getMangaSelectionPrompt(results);
  const { id: mangaId } = selectedManga;

  const chaptersSpinner = createSpinner(
    i18n.translate('spinners.getChaptersInfo')
  ).start();
  const chapters = await inMangaProvider.getChaptersInfo(mangaId);

  chaptersSpinner.success();

  console.log(
    gradient.instagram(
      i18n.translate('general.chaptersAvailable', { chapters: chapters.length })
    )
  );

  const { chaptersFrom, chaptersTo } = await getChaptersPrompt(chapters.length);
  const { downloadPath } = await getDownloadPathPrompt();

  const chaptersToDownload = chapters.filter(
    (chapter) => chapter.number >= chaptersFrom && chapter.number <= chaptersTo
  );

  const promises = chaptersToDownload.map(
    async (chapter): Promise<FullChapter> => {
      const pages = await inMangaProvider.getChapterPages(chapter.id);

      return {
        ...chapter,
        pagesMetadata: pages,
      };
    }
  );

  const chaptersPagesSpinner = createSpinner(
    i18n.translate('spinners.getChapterPages')
  ).start();
  const result = await Promise.all(promises);
  chaptersPagesSpinner.success();

  const filePaths: string[] = [];

  const bar = new cliProgress.SingleBar(
    {
      format: `${i18n.translate(
        'general.progress'
      )} {bar} {percentage}% | Downloading ({value}/{total}) ${i18n.translate(
        'general.pages'
      )}`,
    },
    cliProgress.Presets.shades_classic
  );

  const totalFiles = result.reduce(
    (acc, chapter) => acc + chapter.pagesMetadata.length,
    0
  );

  if (!global.debugEnabled) {
    bar.start(totalFiles, 0);
  }

  for (let chapterIndex = 0; chapterIndex < result.length; chapterIndex++) {
    const chapter = result[chapterIndex];

    for (
      let pageIndex = 0;
      pageIndex < chapter.pagesMetadata.length;
      pageIndex++
    ) {
      const { url } = chapter.pagesMetadata[pageIndex];
      const filepath = `${config.cache.directory}/${mangaId}/${chapter.number}/${chapter.pagesMetadata[pageIndex].number}`;

      const filePath = await downloadImage(url, filepath);
      bar.increment();
      filePaths.push(filePath);
    }
  }

  bar.stop();

  const fileName = getFileName({
    ext: 'pdf',
    to: chaptersTo,
    from: chaptersFrom,
    title: selectedManga.name,
  });

  const outputPath = path.join(downloadPath, fileName);

  await imagesToPDF(filePaths, outputPath);

  if (options.clearAfterDownload) {
    await clearCache();
  }

  if (!options.skipOpen) {
    openFile(path.resolve(downloadPath), false);
  }

  if (!global.debugEnabled) {
    printDonationBox();
  }
}

main();
