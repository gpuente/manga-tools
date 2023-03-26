import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Chapter } from 'manga-providers';

import { ChaptersTable } from './ChaptersTable';

const Template: ComponentStory<typeof ChaptersTable> = (args) => (
  <ChaptersTable {...args} />
);

const createChapter = (id: number): Chapter => ({
  id: id.toString(),
  name: `Chapter ${id}`,
  number: id,
  pages: Math.round(Math.random() * 50),
});

const generateChapters = (qty: number): Chapter[] =>
  [...Array(qty)].map((_, index) => createChapter(index + 1));

export default {
  title: 'Manga-Desktop/ChaptersTable',
  component: ChaptersTable,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    chapters: { control: 'object' },
    headCells: { control: 'object' },
    initialPage: { control: 'number' },
    initialRowsPerPage: { control: 'number' },
    initialOrder: {
      control: 'select',
      options: ['asc', 'desc'],
      defaultValue: 'asc',
    },
    initialOrderBy: { control: 'text' },
  },
} as ComponentMeta<typeof ChaptersTable>;

export const Default = Template.bind({});
Default.args = {
  initialOrder: 'desc',
  initialOrderBy: 'chapter',
  initialPage: 0,
  initialRowsPerPage: 10,
  headCells: [
    {
      id: 'id',
      label: 'ID',
    },
    {
      id: 'name',
      label: 'Title',
    },
    {
      id: 'number',
      label: 'Chapter',
    },
    {
      id: 'pages',
      label: 'Pages',
    },
  ],
  chapters: generateChapters(50),
};
