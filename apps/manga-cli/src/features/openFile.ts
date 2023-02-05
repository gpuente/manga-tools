import { exec } from 'child_process';

export const openFile = (path: string): void => {
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
