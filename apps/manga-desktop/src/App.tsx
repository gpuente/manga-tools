/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { MangaCard } from '@components';

import nodeLogo from './assets/node.svg';
import './App.scss';

console.log(
  '[App.tsx]',
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  const [count, setCount] = useState(0);

  const result = count + 3;
  console.log(result);

  return (
    <div className="App">
      <div>
        <a
          href="https://github.com/electron-vite/electron-vite-react"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="./electron-vite.svg"
            className="logo"
            alt="Electron + Vite logo"
          />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className="card">
        <Button
          variant="contained"
          onClick={() => setCount((_count) => _count + 1)}
          type="button"
        >
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Electron + Vite logo to learn more
      </p>
      <div className="flex-center">
        Place static files into the
        <code>/public</code> folder{' '}
        <img style={{ width: '5em' }} src={nodeLogo} alt="Node logo" />
      </div>
      <MangaCard
        title="Hunter x Hunter"
        thumbnail="https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/cbb55a6382682bf71e91f685c6473c5a.jpe"
        chapters={10}
        frequency="Monthly"
        lastRelease="24/01/2023"
        status="Finished"
        onClick={() => {}}
      />
    </div>
  );
}

export default App;
