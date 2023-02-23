import { Themes } from '@ui/Theme';
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
      options: [Themes.Light, Themes.System, Themes.Dark],
      defaultValue: 'light',
    },
    labels: { control: 'object' },
    onChange: { action: 'onChange' },
  },
} as ComponentMeta<typeof ThemeToggleButton>;

export const Default = Template.bind({});
Default.args = {
  value: Themes.Light,
  labels: {
    dark: 'Dark',
    light: 'Light',
    system: 'System',
  },
};
