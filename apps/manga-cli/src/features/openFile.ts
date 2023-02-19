import { exec } from 'child_process';
import gradient from 'gradient-string';

import { i18n } from '../i18n';

export const openFile = (path: string, isFile = false): void => {
  if (global.debugEnabled) {
    console.log('Opening file...');
  }

  const logAndOpenFile = (command: string) => {
    const i18nKey = isFile ? 'general.openFile' : 'general.openFolder';

    console.log(gradient.vice(i18n.translate(i18nKey, { filePath: path })));
    exec(`${command} ${path}`);
  };

  switch (process.platform) {
    case 'darwin':
      logAndOpenFile('open');
      break;

    case 'win32':
      // eslint-disable-next-line no-case-declarations
      const command = isFile ? 'start' : 'explorer';
      logAndOpenFile(command);
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
