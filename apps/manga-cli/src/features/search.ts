import { createSpinner } from 'nanospinner';
import { Provider, SearchResult } from 'manga-providers';

import { i18n } from '../i18n';
import { getSearchValuePrompt } from './prompt';

export const promptAndSearch = async (
  provider: Provider
): Promise<SearchResult[]> => {
  const { searchValue } = await getSearchValuePrompt();
  const spinner = createSpinner(
    i18n.translate('spinners.searching', { searchValue })
  ).start();

  const results = await provider.search(searchValue);

  if (results.length < 1) {
    spinner.error({
      text: i18n.translate('spinners.searchingNotFound', { searchValue }),
    });
    const res = await promptAndSearch(provider);
    return res;
  }

  spinner.success();
  return results;
};
