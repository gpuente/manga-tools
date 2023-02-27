/* eslint-disable no-console */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { MangaCard, AppBar } from '@ui';
import { useTranslation } from 'react-i18next';
import { useModal, ModalKey } from '@utils/hooks';
import { Modal } from '@components/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useSelector, useDispatch } from 'react-redux';
import { counterSelector, counterActions } from '@redux';

import nodeLogo from '../../assets/node.svg';

function Hello() {
  const { t, i18n } = useTranslation();
  const { openModal } = useModal(ModalKey.Settings);
  const counter = useSelector(counterSelector);
  const dispatch = useDispatch();

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
        onSearch={(val) => console.log(val)}
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
