import os from 'os';
import path from 'path';

export default {
  cache: {
    directory: path.join(os.homedir(), '.manga-cli-cache'),
    hideDirectory: process.platform === 'win32',
  },
  requests: {
    defaultTimeout: 5000,
    attemptsPerFile: 5,
  },
};
