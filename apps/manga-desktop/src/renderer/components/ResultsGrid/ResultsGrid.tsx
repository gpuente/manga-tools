import React from 'react';
import { MangaCard } from '@ui';
import { useSelector } from 'react-redux';
import { searchValueSelector } from '@redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { searchMangaByName } from '@rquery/queries';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export const ResultsGrid: React.FC = () => {
  const searchValue = useSelector(searchValueSelector);
  const { t } = useTranslation();

  const { data, status, error } = useQuery(searchMangaByName(searchValue));

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        {data.map((result) => (
          <Grid key={result.id} item>
            <MangaCard
              thumbnail={result.image}
              title={result.name || ''}
              onClick={() => {}}
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
                  value: result.chapters,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
