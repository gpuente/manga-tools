import AssesmentIcon from '@mui/icons-material/Assessment';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MangaCardRow } from './MangaCardRow';

const Template: ComponentStory<typeof MangaCardRow> = (args) => (
  <div style={{ width: 300 }}>
    <MangaCardRow {...args} />
  </div>
);

export default {
  title: 'Manga-Desktop/MangaCardRow',
  component: MangaCardRow,
  argTypes: {
    chipLabel: { type: 'string' },
    icon: { type: 'string' },
    label: { type: 'string' },
    color: { type: 'string' },
  },
} as ComponentMeta<typeof MangaCardRow>;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  icon: <AssesmentIcon />,
  color: '#168aad',
  chipLabel: 'Chip Label',
};
