import { SxProps, Theme } from '@mui/material';
import { StyleObject } from '../types';

export function createStyles<T extends StyleObject>(
  styles: T
): { [K in keyof T]: SxProps<Theme> } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const output: { [K in keyof T]: SxProps<Theme> } = {} as any;

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in styles) {
    output[key] = styles[key];
  }

  return output;
}
