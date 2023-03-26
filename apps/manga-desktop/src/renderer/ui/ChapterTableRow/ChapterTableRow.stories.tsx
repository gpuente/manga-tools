import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ChapterTableRow } from './ChapterTableRow';

const Template: ComponentStory<typeof ChapterTableRow> = (args) => (
  <ChapterTableRow {...args} />
);

export default {
  title: 'Manga-Desktop/ChapterTableRow',
  component: ChapterTableRow,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    handleRowSelection: { action: 'handleRowSelection' },
    id: { control: 'text' },
    name: { control: 'text' },
    number: { control: 'number' },
    pages: { control: 'number' },
    selected: { control: 'boolean' },
  },
} as ComponentMeta<typeof ChapterTableRow>;

export const Default = Template.bind({});
Default.args = {
  id: '1da6731d2-91b4-4669-bcc7-7ac62ae94d22',
  name: 'Chapter Title',
  number: 1,
  pages: 37,
  selected: false,
};
