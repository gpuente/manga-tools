import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from '@utils/hooks/localStorage';
import { lightTheme, darkTheme, Themes } from '@ui/Theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export const THEME_KEY = 'theme';

export interface ThemeContextValue {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: Themes.Light,
  setTheme: () => {},
});

const themesByName = {
  [Themes.Dark]: darkTheme,
  [Themes.Light]: lightTheme,
  [Themes.System]: lightTheme,
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, Themes.Light);

  const muiTheme = themesByName[theme];

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
