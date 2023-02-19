import { createSpinner } from 'nanospinner';
import { InMangaSDK, SearchResult } from 'in-manga-sdk';

import { i18n } from '../i18n';
import { getSearchValuePrompt } from './prompt';

export const promptAndSearch = async (
  inMangaSDK: InMangaSDK
): Promise<SearchResult[]> => {
  const { searchValue } = await getSearchValuePrompt();
  const spinner = createSpinner(
    i18n.translate('spinners.searching', { searchValue })
  ).start();

  const results = await inMangaSDK.search(searchValue);

  if (results.length < 1) {
    spinner.error({
      text: i18n.translate('spinners.searchingNotFound', { searchValue }),
    });
    const res = await promptAndSearch(inMangaSDK);
    return res;
  }

  spinner.success();
  return results;
};
