import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EnhancedTableHead } from './EnhancedTableHead';

const Template: ComponentStory<typeof EnhancedTableHead> = (args) => (
  <EnhancedTableHead {...args} />
);

export default {
  title: 'Manga-Desktop/EnhancedTableHead',
  component: EnhancedTableHead,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    onChange: { action: 'onChange' },
    onRequestSort: { action: 'onRequestSort' },
    orderBy: { control: 'text' },
    order: { control: 'select', options: ['asc', 'desc'], defaultValue: 'asc' },
    cells: { control: 'object' },
  },
} as ComponentMeta<typeof EnhancedTableHead>;

export const Default = Template.bind({});
Default.args = {
  checked: false,
  indeterminate: false,
  orderBy: 'title',
  order: 'asc',
  cells: [
    {
      id: 'title',
      label: 'Title',
    },
    {
      id: 'chapter',
      label: 'Chapter',
    },
    {
      id: 'date',
      label: 'Date',
    },
    {
      id: 'pages',
      label: 'Pages',
    },
  ],
};
