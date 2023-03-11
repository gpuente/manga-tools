import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card, { CardProps } from '@mui/material/Card';
import ArticleIcon from '@mui/icons-material/Article';
import { MangaCardRow } from '@ui/MangaCardRow';
import CardActionArea from '@mui/material/CardActionArea';
import AssesmentIcon from '@mui/icons-material/Assessment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import RotateRightIcon from '@mui/icons-material/RotateRight';

import * as styles from './styles';

export interface RowProps {
  label: string;
  value?: React.ReactNode;
  color?: string;
}
export interface MangaCardProps {
  title: string;
  thumbnail?: string;
  onClick: CardProps['onClick'];
  config: {
    status: RowProps;
    lastRelesae: RowProps;
    frequency: RowProps;
    chapters: RowProps;
  };
}

export const MangaCard: React.FC<MangaCardProps> = (props) => {
  const { title, config, onClick, thumbnail } = props;

  return (
    <Card onClick={onClick} sx={styles.card} elevation={6}>
      <CardActionArea sx={styles.actionArea}>
        {thumbnail && (
          <CardMedia
            component="img"
            sx={styles.cardMedia}
            image={thumbnail}
            alt={title}
          />
        )}
        <CardContent sx={styles.content}>
          <Typography variant="h6" align="left" sx={styles.title}>
            {title}
          </Typography>
          <Box sx={styles.cardRowContainer}>
            <MangaCardRow
              icon={<AssesmentIcon fontSize="small" />}
              label={config.status.label}
              color={config.status.color || '#52b69a'}
              chipLabel={config.status.value}
            />
            <MangaCardRow
              icon={<WatchLaterIcon fontSize="small" />}
              label={config.lastRelesae.label}
              color={config.lastRelesae.color || '#34a0a4'}
              chipLabel={config.lastRelesae.value}
            />
            <MangaCardRow
              icon={<RotateRightIcon fontSize="small" />}
              label={config.frequency.label}
              color={config.frequency.color || '#168aad'}
              chipLabel={config.frequency.value}
            />
            <MangaCardRow
              icon={<ArticleIcon fontSize="small" />}
              label={config.chapters.label}
              color={config.chapters.color || '#1a759f'}
              chipLabel={config.chapters.value}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
