import { useContext } from 'react';
import { Themes } from '@ui/Theme';
import { ThemeContext } from '@utils/providers/ThemeProvider';

/**
A React hook that provides access to the setTheme function and Themes object from the ThemeContext.
@returns {{setTheme: (theme: string) => void, theme: Themes, Themes: {[key: string]: {[key: string]: string}}}} An object containing the setTheme function and Themes object from the ThemeContext.
*/
export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return {
    theme,
    Themes,
    setTheme,
  };
};
