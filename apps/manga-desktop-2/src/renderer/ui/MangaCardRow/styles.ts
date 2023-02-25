import { Styles } from '@types';

export const content: Styles = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

export const container: Styles = {
  ...content,
  justifyContent: 'space-between',
};

export const label: Styles = {
  marginLeft: '2px',
};
