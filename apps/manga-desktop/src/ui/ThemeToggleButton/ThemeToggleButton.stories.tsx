import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeToggleButton } from './ThemeToggleButton';

const Template: ComponentStory<typeof ThemeToggleButton> = (args) => (
  <div>
    <ThemeToggleButton {...args} />
  </div>
);

export default {
  title: 'Manga-Desktop/ThemeToggleButton',
  component: ThemeToggleButton,
  argTypes: {
    value: {
      control: 'select',
      options: ['light', 'system', 'dark'],
      defaultValue: 'light',
    },
    labels: { control: 'object' },
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof ThemeToggleButton>;

export const Default = Template.bind({});
Default.args = {
  value: 'light',
  labels: {
    dark: 'Dark',
    light: 'Light',
    system: 'System',
  },
};
