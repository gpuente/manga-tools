import React from 'react';
import { store } from '@redux';
import { queryClient } from '@rquery';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';

export const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider>
        <ModalProvider>{children}</ModalProvider>
      </ThemeProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
