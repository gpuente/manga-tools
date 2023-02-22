import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsRow } from './SettingsRow';

const Template: ComponentStory<typeof SettingsRow> = (args) => (
  <div>
    <SettingsRow {...args} />
  </div>
);

export default {
  title: 'Manga-Desktop/SettingsRow',
  component: SettingsRow,
  argTypes: {
    label: { type: 'string' },
    description: { type: 'string' },
    children: { type: 'string' },
  },
} as ComponentMeta<typeof SettingsRow>;

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
  description: 'Some description',
  children: 'Children',
};
