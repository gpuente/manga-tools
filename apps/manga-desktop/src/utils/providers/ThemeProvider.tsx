import React, { createContext, useMemo, useEffect, useState } from 'react';
import { lightTheme, darkTheme, Themes } from '@ui/Theme';
import { ipcRenderer, IpcRendererEvent } from 'electron';
import { useLocalStorage } from '@utils/hooks/localStorage';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { ReqMessage, ResMessage, OSTheme } from '../../../electron/types';

export const THEME_KEY = 'theme';

export interface ThemeContextValue {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Themes.Light,
  setTheme: () => {},
});

const getThemeFromConfig = (config: Themes, osTheme: OSTheme) => {
  if (config === Themes.System) {
    return osTheme === 'dark' ? darkTheme : lightTheme;
  }

  if (config === Themes.Dark) {
    return darkTheme;
  }

  return lightTheme;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [osTheme, setOsTheme] = useState<OSTheme>('light');
  const [theme, setTheme] = useLocalStorage(THEME_KEY, Themes.Light);

  useEffect(() => {
    const osThemeListener = (event: IpcRendererEvent, _osTheme: OSTheme) => {
      setOsTheme(_osTheme);
    };

    ipcRenderer.on(ResMessage.OSTheme, osThemeListener);
    ipcRenderer.send(ReqMessage.CheckOSTheme);

    return () => {
      ipcRenderer.removeListener(ResMessage.OSTheme, osThemeListener);
    };
  }, []);

  const muiTheme = getThemeFromConfig(theme, osTheme);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider value={themeContextValue}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
