import { Styles } from '@types';
import { alpha } from '@mui/material/styles';

export const tableToolbar = (selectedItems: number): Styles => ({
  pl: { sm: 2 },
  pr: { xs: 1, sm: 1 },
  ...(selectedItems > 0 && {
    bgcolor: (theme) =>
      alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
  }),
});

export const title: Styles = { flex: '1 1 100%' };
