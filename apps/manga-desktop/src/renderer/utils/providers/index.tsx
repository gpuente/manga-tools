import React from 'react';
import { store } from '@redux';
import { Provider } from 'react-redux';

import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Provider store={store}>
    <ThemeProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  </Provider>
);
