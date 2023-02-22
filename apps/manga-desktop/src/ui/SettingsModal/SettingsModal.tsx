import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SettingsRow } from '@ui/SettingsRow';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  ThemeToggleButton,
  ThemeToggleButtonProps,
} from '@ui/ThemeToggleButton';

import * as styles from './styles';

export interface SettingsModalProps {
  open?: boolean;
  handleClose: () => void;
  handleThemeChange: ThemeToggleButtonProps['onChange'];
  handleLangChange: (event: SelectChangeEvent) => void;
  availableLanguages?: {
    id: string;
    label: string;
    value: string;
    isSelected?: boolean;
  }[];
  version?: string;
  texts?: {
    title: string;
    theme: {
      label: string;
      description: string;
      toggle: ThemeToggleButtonProps['labels'];
    };
    language: {
      label: string;
      description: string;
    };
    version: {
      label: string;
      description: string;
    };
  };
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  texts,
  version,
  handleClose,
  open = false,
  handleLangChange,
  handleThemeChange,
  availableLanguages,
}) => {
  const selectedLang = availableLanguages?.find((lng) => lng.isSelected);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={styles.paper}>
        <Box sx={styles.topContainer}>
          <Box sx={styles.titleContainer}>
            <SettingsIcon fontSize="small" />
            <Typography>{texts?.title}</Typography>
          </Box>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                handleClose();
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={styles.content}>
          <SettingsRow
            label={texts?.theme.label}
            description={texts?.theme.description}
          >
            <ThemeToggleButton
              value="light"
              labels={texts?.theme.toggle}
              onChange={handleThemeChange}
            />
          </SettingsRow>

          {availableLanguages && (
            <SettingsRow
              label={texts?.language.label}
              description={texts?.language.description}
            >
              <FormControl sx={{ m: 1, minWidth: 120, margin: 0 }} size="small">
                <Select
                  value={selectedLang?.id}
                  id="lng-select"
                  displayEmpty
                  onChange={handleLangChange}
                >
                  {availableLanguages.map((lng) => (
                    <MenuItem key={lng.id} value={lng.value}>
                      {lng.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SettingsRow>
          )}

          <SettingsRow
            label={texts?.version.label}
            description={texts?.version.description}
          >
            <Typography color="text.secondary" variant="body2">
              {version}
            </Typography>
          </SettingsRow>
        </Box>
      </Paper>
    </Modal>
  );
};
