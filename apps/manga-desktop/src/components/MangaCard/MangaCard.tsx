import React from 'react';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card, { CardProps } from '@mui/material/Card';
import ArticleIcon from '@mui/icons-material/Article';
import { MangaCardRow } from '@components/MangaCardRow';
import CardActionArea from '@mui/material/CardActionArea';
import AssesmentIcon from '@mui/icons-material/Assessment';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import RotateRightIcon from '@mui/icons-material/RotateRight';

import * as styles from './styles';

export interface MangaCardProps {
  title: string;
  status?: string;
  chapters?: number;
  thumbnail?: string;
  frequency?: string;
  lastRelease?: string;
  onClick: CardProps['onClick'];
}

export const MangaCard: React.FC<MangaCardProps> = (props) => {
  const {
    title,
    status,
    onClick,
    chapters,
    thumbnail,
    frequency,
    lastRelease,
  } = props;

  return (
    <Card onClick={onClick} sx={styles.card}>
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
              label="Status:"
              color="#52b69a"
              chipLabel={status}
            />
            <MangaCardRow
              icon={<WatchLaterIcon fontSize="small" />}
              label="Last Release:"
              color="#34a0a4"
              chipLabel={lastRelease}
            />
            <MangaCardRow
              icon={<RotateRightIcon fontSize="small" />}
              label="Frequency:"
              color="#168aad"
              chipLabel={frequency}
            />
            <MangaCardRow
              icon={<ArticleIcon fontSize="small" />}
              label="Chapters:"
              color="#1a759f"
              chipLabel={chapters}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
