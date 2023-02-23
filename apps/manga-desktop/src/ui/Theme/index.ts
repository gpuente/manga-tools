import { createTheme } from '@mui/material/styles';

export enum Themes {
  Dark = 'dark',
  Light = 'light',
  System = 'system',
}

export const darkTheme = createTheme({ palette: { mode: 'dark' } });
export const lightTheme = createTheme({ palette: { mode: 'light' } });
