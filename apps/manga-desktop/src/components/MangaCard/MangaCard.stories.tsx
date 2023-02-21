import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MangaCard } from './MangaCard';

const Template: ComponentStory<typeof MangaCard> = (args) => (
  <MangaCard {...args} />
);

export default {
  title: 'Manga-Desktop/MangaCard',
  component: MangaCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: { control: 'text' },
    thumbnail: { control: 'text' },
    onClick: { action: 'clicked' },
    config: { control: 'object' },
  },
} as ComponentMeta<typeof MangaCard>;

export const Default = Template.bind({});
Default.args = {
  title: 'Hunter x Hunter',
  thumbnail:
    'https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/cbb55a6382682bf71e91f685c6473c5a.jpe',
  config: {
    status: {
      label: 'Status:',
      value: 'Finished',
      color: '#52b69a',
    },
    lastRelesae: {
      label: 'Last Release:',
      value: '24/01/2023',
      color: '#34a0a4',
    },
    frequency: {
      label: 'Frequency:',
      value: 'Monthly',
      color: '#168aad',
    },
    chapters: {
      label: 'Chapters:',
      value: 10,
      color: '#1a759f',
    },
  },
};
