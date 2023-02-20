import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MangaCard } from '../apps/manga-desktop/src/components';

const Template: ComponentStory<typeof MangaCard> = (args) => <MangaCard {...args} />;

export default {
  title: 'Manga-Desktop/MangaCard',
  component: MangaCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    title: { control: 'text' },
    thumbnail: { control: 'text' },
    description: { control: 'text' },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof MangaCard>;

export const Default = Template.bind({});
Default.args = {
  title: 'Lizard',
  thumbnail: 'https://via.placeholder.com/150',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};
