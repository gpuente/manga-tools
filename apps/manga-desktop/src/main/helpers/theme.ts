import { nativeTheme } from 'electron';
import { OSTheme } from '../../common';

export const getOSTheme = (): OSTheme => {
  let osTheme: OSTheme = 'light';

  if (nativeTheme.shouldUseDarkColors) {
    osTheme = 'dark';
  }

  return osTheme;
};
