import { SxProps, Theme } from '@mui/material';

export type StyleObject = { [key: string]: SxProps<Theme> };
export type Styles = SxProps<Theme>;
export type Order = 'asc' | 'desc';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Comparator<T extends keyof any> = (
  a: { [key in T]: any },
  b: { [key in T]: any }
) => number;
