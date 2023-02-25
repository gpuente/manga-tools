import { OSTheme } from 'common-utils';
import { nativeTheme } from 'electron';

export const getOSTheme = (): OSTheme => {
  let osTheme: OSTheme = 'light';

  if (nativeTheme.shouldUseDarkColors) {
    osTheme = 'dark';
  }

  return osTheme;
};
