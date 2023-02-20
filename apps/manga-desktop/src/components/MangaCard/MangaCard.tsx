import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

import styles from './styles';

export interface MangaCardProps {
  title: string;
  thumbnail?: string;
  description?: string;
  onClick: CardProps['onClick'];
}

export const MangaCard: React.FC<MangaCardProps> = (props) => {
  const { title, thumbnail, description, onClick } = props;

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

        <CardContent>
          <Typography variant="h6" align="left">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            overflow="hidden"
            align="left"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
