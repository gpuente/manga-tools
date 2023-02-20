import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AssesmentIcon from '@mui/icons-material/Assessment';

export interface MangaCardRowProps {
  children?: React.ReactNode;
}

export const MangaCardRow: React.FC<MangaCardRowProps> = ({ children }) => (
  <Box>
    <AssesmentIcon />
    <Typography>label</Typography>
    <Box>{children}</Box>
  </Box>
);
