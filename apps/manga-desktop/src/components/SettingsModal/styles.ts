import { Styles } from '@types';

export const paper: Styles = {
  top: '50%',
  left: '50%',
  minHeight: '200px',
  maxWidth: '800px',
  position: 'absolute',
  width: 'calc(100% - 120px)',
  transform: 'translate(-50%, -50%)',
};

export const topContainer: Styles = {
  flex: 1,
  display: 'flex',
  justifyContent: 'space-between',
};

export const titleContainer: Styles = {
  display: 'flex',
  paddingTop: '20px',
  paddingLeft: '20px',
  alignItems: 'center',
  '&>:first-child': {
    marginRight: '10px',
  },
};

export const content: Styles = {
  display: 'flex',
  padding: '20px 20px 28px 20px',
  flexDirection: 'column',
  '& > *:not(:last-child)': {
    marginBottom: '20px',
  },
};
