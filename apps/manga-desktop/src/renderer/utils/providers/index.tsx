import React from 'react';

import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ThemeProvider>
    <ModalProvider>{children}</ModalProvider>
  </ThemeProvider>
);
