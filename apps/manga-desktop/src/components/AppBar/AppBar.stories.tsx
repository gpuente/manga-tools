import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AppBar } from './AppBar';

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

export default {
  title: 'Manga-Desktop/AppBar',
  component: AppBar,
  argTypes: {
    onSearch: { action: 'onSeacrh' },
    onClickMenu: { action: 'onClickMenu' },
    title: { type: 'string' },
    placeholder: { type: 'string' },
  },
} as ComponentMeta<typeof AppBar>;

export const Default = Template.bind({});
Default.args = {
  title: 'Manga Desktop',
  placeholder: 'Search...',
};
