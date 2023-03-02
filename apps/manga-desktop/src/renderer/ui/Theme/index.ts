import { createTheme, ThemeOptions } from '@mui/material/styles';

export enum Themes {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    primary: {
      main: '#A162F7',
      light: '#549cfd',
    },
    secondary: {
      main: '#ff6370',
      contrastText: '#ffffff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'inherit',
      },
      styleOverrides: {
        colorInherit: {
          backgroundColor: '#FFFFFF',
          color: '#1F2128',
        },
      },
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#1f2128',
      paper: '#242731',
    },
    primary: {
      main: '#a162f7',
      light: '#549cfd',
    },
    secondary: {
      main: '#ff6370',
      contrastText: '#ffffff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        color: 'inherit',
      },
      styleOverrides: {
        colorInherit: {
          backgroundColor: '#242731',
          color: '#FFFFFF',
        },
      },
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
};

export const darkTheme = createTheme(darkThemeOptions);
export const lightTheme = createTheme(lightThemeOptions);
