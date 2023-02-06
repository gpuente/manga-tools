import { exec } from 'child_process';
import gradient from 'gradient-string';

import { i18n } from '../i18n';

export const openFile = (path: string): void => {
  if (global.debugEnabled) {
    console.log('Opening file...');
  }

  console.log(gradient.vice(i18n.translate('general.openFile', { filePath: path })));

  switch (process.platform) {
    case 'darwin':
      exec(`open ${path}`);
      break;

    case 'win32':
      exec(`start ${path}`);

    case 'linux':
      exec(`xdg-open ${path}`);

    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
      break;
  }
};
