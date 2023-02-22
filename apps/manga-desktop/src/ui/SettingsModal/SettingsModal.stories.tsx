import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsModal } from './SettingsModal';

const Template: ComponentStory<typeof SettingsModal> = (args) => (
  <SettingsModal {...args} />
);

export default {
  title: 'Manga-Desktop/SettingsModal',
  component: SettingsModal,
  argTypes: {
    open: { type: 'boolean' },
    version: { type: 'string' },
    texts: { control: 'object' },
    handleClose: { action: 'handleClose' },
    availableLanguages: { control: 'object' },
    handleLangChange: { action: 'handleLangChange' },
    handleThemeChange: { action: 'handleThemeChange' },
  },
} as ComponentMeta<typeof SettingsModal>;

export const Default = Template.bind({});
Default.args = {
  open: true,
  version: 'v1.0.2',
  availableLanguages: [
    {
      id: 'en',
      label: 'English',
      value: 'en',
      isSelected: true,
    },
    {
      id: 'es',
      label: 'Español',
      value: 'es',
      isSelected: false,
    },
  ],
  texts: {
    title: 'Settings',
    theme: {
      label: 'Theme',
      description: 'Changes the theme color for the app',
      toggle: { dark: 'Dark', light: 'Light', system: 'System' },
    },
    language: {
      label: 'Language',
      description: 'Changes the language for the app',
    },
    version: {
      label: 'Version',
      description: 'Current version of Manga Desktop',
    },
  },
};
