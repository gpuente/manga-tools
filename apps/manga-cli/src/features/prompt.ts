import { SearchResult } from 'in-manga-sdk';
import inquirer from 'inquirer';

interface SearchValueAnswer {
  searchValue: string;
}

interface SelectedMangaAnswer {
  selectedManga: SearchResult;
}

interface ChaptersAnswers {
  chaptersTo: number;
  chaptersFrom: number;
}

export const searchValuePrompt = inquirer.prompt<SearchValueAnswer>([
  {
    type: 'input',
    name: 'searchValue',
    message: 'What manga do you want to download?',
  },
]);

export const getMangaSelectionPrompt = (mangaList: SearchResult[]) => inquirer.prompt<SelectedMangaAnswer>([
  {
    type: 'list',
    name: 'selectedManga',
    message: 'Select the manga you want to download',
    choices: mangaList.map((manga) => ({
      name: `${manga.name} (${manga.status})`,
      value: manga,
    })),
  },
]);

export const getChaptersPrompt = (totalChapters: number) => inquirer.prompt<ChaptersAnswers>([
  {
    type: 'number',
    name: 'chaptersFrom',
    message: 'From which chapter do you want to download?',
    default: 1,
    validate: (input: number) => {
      if (input < 1 || input > totalChapters) {
        return `Please enter a number between 1 and ${totalChapters}`;
      }

      return true;
    },
  },
  {
    type: 'number',
    name: 'chaptersTo',
    message: 'To which chapter do you want to download?',
    default: totalChapters,
    validate: (input: number, answers: ChaptersAnswers) => {
      if (input < answers.chaptersFrom) {
        return `Please enter a number greater than your previous selection: ${answers.chaptersFrom}`;
      }

      if (input > totalChapters) {
        return `Please enter a number less than the total of chapters: ${totalChapters}`;
      }

      return true;
    },
  }
]);
