import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

import * as styles from './styles';

export interface MangaCardRowProps {
  label: string;
  color?: string;
  icon?: React.ReactNode;
  chipLabel?: React.ReactNode;
}

export const MangaCardRow: React.FC<MangaCardRowProps> = ({
  icon,
  label,
  color,
  chipLabel,
}) => (
  <Box sx={styles.container}>
    <Box sx={styles.content}>
      {icon}
      <Typography sx={styles.label} variant="body2">
        {label}
      </Typography>
    </Box>
    <Box>
      <Chip
        size="small"
        variant="filled"
        label={chipLabel}
        {...(color && { sx: { backgroundColor: color } })}
      />
    </Box>
  </Box>
);
