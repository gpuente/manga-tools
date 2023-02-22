import { nativeTheme } from 'electron';
import { OSTheme } from '../types';

export const getOSTheme = (): OSTheme => {
  let osTheme: OSTheme = 'light';

  if (nativeTheme.shouldUseDarkColors) {
    osTheme = 'dark';
  }

  return osTheme;
};
