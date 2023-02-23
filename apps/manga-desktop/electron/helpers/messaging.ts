import { ReqMessage, ResMessage } from 'common-utils';
import { BrowserWindow, ipcMain, nativeTheme } from 'electron';

import { getOSTheme } from './theme';

export const attachMessageHandler = (win: BrowserWindow) => {
  ipcMain.on(ReqMessage.CheckOSTheme, () => {
    win.webContents.send(ResMessage.OSTheme, getOSTheme());
  });
};

export const attachListeners = (win: BrowserWindow) => {
  nativeTheme.on('updated', () => {
    win.webContents.send(ResMessage.OSTheme, getOSTheme());
  });
};
