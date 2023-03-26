import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';

import * as styles from './styles';

export interface TableToolbarProps {
  selectedItems?: number;
  onDownloadHandler: () => void;
  i18n: {
    title: string;
    download: string;
    selectedItems: {
      singular: string;
      plural: string;
    };
  };
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  i18n,
  onDownloadHandler,
  selectedItems = 0,
}) => (
  <Toolbar sx={styles.tableToolbar(selectedItems)}>
    {selectedItems > 0 ? (
      <Typography
        sx={styles.title}
        color="inherit"
        variant="subtitle1"
        component="div"
      >
        {`${selectedItems} ${
          selectedItems > 1
            ? i18n.selectedItems.plural
            : i18n.selectedItems.singular
        }`}
      </Typography>
    ) : (
      <Typography
        sx={styles.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {i18n.title}
      </Typography>
    )}
    {selectedItems > 0 && (
      <Tooltip title={i18n.download}>
        <IconButton onClick={onDownloadHandler}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);
