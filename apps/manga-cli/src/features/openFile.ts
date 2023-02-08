import { exec } from 'child_process';
import gradient from 'gradient-string';

import { i18n } from '../i18n';

export const openFile = (path: string): void => {
  if (global.debugEnabled) {
    console.log('Opening file...');
  }

  const logAndOpenFile = (command: string) => {
    console.log(gradient.vice(i18n.translate('general.openFile', { filePath: path })));
    exec(`${command} ${path}`);
  };

  switch (process.platform) {
    case 'darwin':
      logAndOpenFile('open');
      break;

    case 'win32':
      logAndOpenFile('start')
      break;

    case 'linux':
      logAndOpenFile('xdg-open');
      break;

    default:
      if (global.debugEnabled) {
        console.error(`Unsupported platform: ${process.platform}`);
      }
      break;
  }
};
