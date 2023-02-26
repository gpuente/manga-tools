import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import * as styles from './styles';

const { Search, SearchIconWrapper, StyledInputBase } = styles;

export interface AppBarProps {
  title: string;
  placeholder?: string;
  onSearch: (searchValue: string) => void;
  onClickMenu?: IconButtonProps['onClick'];
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  onSearch,
  placeholder,
  onClickMenu,
}) => {
  const [value, setValue] = useState('');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" noWrap sx={styles.title}>
            {title}
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSearch(value);
                }
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton
            size="large"
            edge="end"
            sx={{ ml: 2 }}
            color="inherit"
            onClick={onClickMenu}
            aria-label="open drawer"
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
