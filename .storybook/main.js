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
      '@': path.resolve(__dirname, '../apps/manga-desktop/src'),
      '@components': path.resolve(
        __dirname,
        '../apps/manga-desktop/src/components'
      ),
      '@utils': path.resolve(__dirname, '../apps/manga-desktop/src/utils'),
      '@types': path.resolve(__dirname, '../apps/manga-desktop/src/types'),
      '@ui': path.resolve(__dirname, '../apps/manga-desktop/src/ui'),
    };

    return config;
  },
};
