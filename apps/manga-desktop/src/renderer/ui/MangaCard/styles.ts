import { Styles } from '@types';

export const actionArea: Styles = {
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

export const cardMedia: Styles = {
  maxWidth: 130,
  height: 200,
};

export const card: Styles = {
  height: 200,
};

export const content: Styles = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
};

export const title: Styles = {
  marginBottom: '10px',
};

export const cardRowContainer: Styles = {
  '& > *:not(:last-child)': {
    marginBottom: '8px',
  },
};
