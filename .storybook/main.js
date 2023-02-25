const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../apps/manga-desktop/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../apps/manga-desktop/src/renderer'),
      '@components': path.resolve(
        __dirname,
        '../apps/manga-desktop/src/renderer/components'
      ),
      '@utils': path.resolve(
        __dirname,
        '../apps/manga-desktop/src/renderer/utils'
      ),
      '@types': path.resolve(
        __dirname,
        '../apps/manga-desktop/src/renderer/types'
      ),
      '@ui': path.resolve(__dirname, '../apps/manga-desktop/src/renderer/ui'),
    };

    return config;
  },
};
