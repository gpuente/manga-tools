import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MangaCardRow } from '../../apps/manga-desktop/src/components';

const Template: ComponentStory<typeof MangaCardRow> = (args) => <MangaCardRow {...args} />;

export default {
  title: 'Manga-Desktop/MangaCardRow',
  component: MangaCardRow,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
} as ComponentMeta<typeof MangaCardRow>;

export const Default = Template.bind({});
Default.args = {
  title: 'Lizard',
  thumbnail: 'https://via.placeholder.com/150',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
};
