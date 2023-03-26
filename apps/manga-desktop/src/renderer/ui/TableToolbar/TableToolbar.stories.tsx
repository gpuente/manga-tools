import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TableToolbar } from './TableToolbar';

const Template: ComponentStory<typeof TableToolbar> = (args) => (
  <TableToolbar {...args} />
);

export default {
  title: 'Manga-Desktop/TableToolbar',
  component: TableToolbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    i18n: { control: 'object' },
    selectedItems: { control: 'number' },
    onDownloadHandler: { action: 'onDownloadHandler' },
  },
} as ComponentMeta<typeof TableToolbar>;

export const Default = Template.bind({});
Default.args = {
  selectedItems: 1,
  i18n: {
    title: 'Available Chapters',
    download: 'Download',
    selectedItems: {
      singular: 'selected item',
      plural: 'selected items',
    },
  },
};
