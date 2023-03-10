import { BrowserWindow, ipcMain, nativeTheme } from 'electron';
import { ReqMessage, ResMessage } from '../../common';

import { getOSTheme } from './theme';

export const attachMessageHandler = (win: BrowserWindow) => {
  ipcMain.on(ReqMessage.CheckOSTheme, () => {
    win.webContents.send(ResMessage.OSTheme, getOSTheme());
  });

  return () => {
    ipcMain.removeAllListeners();
  };
};

export const attachListeners = (win: BrowserWindow) => {
  nativeTheme.on('updated', () => {
    win.webContents.send(ResMessage.OSTheme, getOSTheme());
  });

  return () => {
    nativeTheme.removeAllListeners();
  };
};
