/* eslint-disable no-console */
import { useState } from 'react';
import Box from '@mui/material/Box';
import { MangaCard, AppBar } from '@ui';
import Paper from '@mui/material/Paper';
import { Modal } from '@components/Modal';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useModal, ModalKey } from '@utils/hooks';
import Typography from '@mui/material/Typography';
import { searchMangaByName } from '@rquery/queries';
import { useSelector, useDispatch } from 'react-redux';
import { counterSelector, counterActions } from '@redux';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import nodeLogo from '../../assets/node.svg';

function Hello() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const counter = useSelector(counterSelector);
  const { openModal } = useModal(ModalKey.Settings);
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, error } = useQuery(searchMangaByName(searchValue));

  console.log('isLoading', isLoading);
  console.log('error', error);
  console.log('data', data);

  const toggleLang = () => {
    const currentLng = i18n.language.toLocaleLowerCase();
    const lng = currentLng === 'en' || currentLng === 'en-us' ? 'es' : 'en';

    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <Modal />
      <AppBar
        title={t('common.appName')}
        placeholder={t('common.searchPlaceholder') || ''}
        onSearch={(val) => setSearchValue(val)}
        onClickMenu={openModal}
      />
      <div>{t('hello')}</div>
      <MangaCard
        title="Hunter x Hunter"
        thumbnail="https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/cbb55a6382682bf71e91f685c6473c5a.jpe"
        onClick={toggleLang}
        config={{
          status: {
            label: t('mangaResult.status'),
            value: t('mangaStatus.onGoing'),
          },
          lastRelesae: {
            label: t('mangaResult.lastRelease'),
            value: '24/01/2023',
          },
          frequency: {
            label: t('mangaResult.frequency'),
            value: t('mangaFrequency.monthly'),
          },
          chapters: {
            label: t('mangaResult.chapters'),
            value: 10,
          },
        }}
      />

      <Paper sx={{ margin: '10px', padding: '20px' }}>
        <Typography variant="h6">counter: {counter}</Typography>
        <Button
          type="button"
          color="primary"
          variant="contained"
          sx={{ marginRight: '10px' }}
          onClick={() => dispatch(counterActions.increment())}
        >
          Increment
        </Button>
        <Button
          type="button"
          color="error"
          variant="contained"
          onClick={() => dispatch(counterActions.decrement())}
        >
          Decrement
        </Button>
      </Paper>
      <img style={{ width: '5em' }} src={nodeLogo} alt="Node logo" />

      <Box component="pre">{JSON.stringify(data, null, 2)}</Box>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
