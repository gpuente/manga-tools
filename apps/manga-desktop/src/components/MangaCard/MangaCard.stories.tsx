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
    chapters: { control: 'number' },
    onClick: { action: 'clicked' },
    frequency: { control: 'text' },
    lastRelease: { control: 'text' },
    status: { control: 'text' },
  },
} as ComponentMeta<typeof MangaCard>;

export const Default = Template.bind({});
Default.args = {
  title: 'Hunter x Hunter',
  thumbnail:
    'https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/cbb55a6382682bf71e91f685c6473c5a.jpe',
  chapters: 10,
  frequency: 'Monthly',
  lastRelease: '24/01/2023',
  status: 'Finished',
};
