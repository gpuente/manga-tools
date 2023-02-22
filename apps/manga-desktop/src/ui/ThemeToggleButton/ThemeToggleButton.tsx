import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';
import Typography from '@mui/material/Typography';

import * as styles from './styles';

type OptionsType = 'light' | 'dark' | 'system';

export interface ThemeToggleButtonProps {
  value: OptionsType;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: OptionsType) => void;
  labels?: {
    dark: string;
    light: string;
    system: string;
  };
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({
  value,
  labels,
  onChange,
}) => (
  <ToggleButtonGroup
    color="primary"
    value={value}
    exclusive
    onChange={onChange}
    aria-label="Platform"
    size="small"
    sx={styles.container}
  >
    <ToggleButton value="light">
      <LightModeOutlinedIcon color="inherit" sx={styles.icon} />
      <Typography variant="inherit" color="inherit">
        {labels?.light}
      </Typography>
    </ToggleButton>
    <ToggleButton value="system">
      <SettingsBrightnessOutlinedIcon color="inherit" sx={styles.icon} />
      <Typography variant="inherit" color="inherit">
        {labels?.system}
      </Typography>
    </ToggleButton>
    <ToggleButton value="dark">
      <DarkModeOutlinedIcon color="inherit" sx={styles.icon} />
      <Typography variant="inherit" color="inherit">
        {labels?.dark}
      </Typography>
    </ToggleButton>
  </ToggleButtonGroup>
);
