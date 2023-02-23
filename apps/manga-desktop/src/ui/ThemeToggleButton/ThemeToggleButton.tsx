import React from 'react';
import { Themes } from '@ui/Theme';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined';

import * as styles from './styles';

export interface ThemeToggleButtonProps {
  value: Themes;
  onChange?: (event: React.MouseEvent<HTMLElement>, value: Themes) => void;
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
    <ToggleButton value={Themes.Light}>
      <LightModeOutlinedIcon color="inherit" sx={styles.icon} />
      <Typography variant="inherit" color="inherit">
        {labels?.light}
      </Typography>
    </ToggleButton>
    <ToggleButton value={Themes.System}>
      <SettingsBrightnessOutlinedIcon color="inherit" sx={styles.icon} />
      <Typography variant="inherit" color="inherit">
        {labels?.system}
      </Typography>
    </ToggleButton>
    <ToggleButton value={Themes.Dark}>
      <DarkModeOutlinedIcon color="inherit" sx={styles.icon} />
      <Typography variant="inherit" color="inherit">
        {labels?.dark}
      </Typography>
    </ToggleButton>
  </ToggleButtonGroup>
);
