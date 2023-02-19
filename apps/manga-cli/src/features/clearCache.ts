import fs from 'fs';
import { createSpinner } from 'nanospinner';

import config from '../config';
import { i18n } from '../i18n';

export const clearCache = async (): Promise<void> => {
  if (global.debugEnabled) {
    console.log('Clearing cache...');
  }

  const spinner = createSpinner(i18n.translate('spinners.clearCache')).start();

  try {
    await fs.promises.rm(config.cache.directory, { recursive: true, force: true });
    spinner.success();
  } catch (error) {
    spinner.error({ text: i18n.translate('spinners.clearCacheError') });
    if (global.debugEnabled) {
      console.error(`Error while clearing cache: ${error}`);
    }
  }
};
