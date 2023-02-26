import { Styles } from '@types';

export const container: Styles = {
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const label: Styles = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  paddingRight: '40px',
};

export const description: Styles = {
  lineHeight: 1.2,
};

export const children: Styles = {
  display: 'flex',
  flex: 2,
};
