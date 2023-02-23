import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../i18n';
import './samples/node-api';
import './styles.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { RootProvider } from '@utils/providers';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootProvider>
      <CssBaseline />
      <App />
    </RootProvider>
  </React.StrictMode>
);

postMessage({ payload: 'removeLoading' }, '*');
