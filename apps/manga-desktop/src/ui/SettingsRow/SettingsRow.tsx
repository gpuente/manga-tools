import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import * as styles from './styles';

export interface SettingsRowProps {
  label?: string;
  description?: string;
  children?: React.ReactNode;
}

export const SettingsRow: React.FC<SettingsRowProps> = ({
  label,
  children,
  description,
}) => (
  <Box sx={styles.container}>
    <Box sx={styles.label}>
      <Typography variant="body1" fontWeight="bold">
        {label}
      </Typography>
      {description && (
        <Typography
          variant="caption"
          sx={styles.description}
          color="text.secondary"
        >
          {description}
        </Typography>
      )}
    </Box>
    <Box sx={styles.children}>{children}</Box>
  </Box>
);
