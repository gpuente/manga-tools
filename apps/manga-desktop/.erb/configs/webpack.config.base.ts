/* eslint-disable import/no-relative-packages */
/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';

import webpackPaths from './webpack.paths';
import { dependencies as externals } from '../../release/app/package.json';

const configuration: webpack.Configuration = {
  externals: [...Object.keys(externals || {})],

  stats: 'errors-only',

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            // Remove this line to enable type checking in webpack builds
            transpileOnly: true,
            compilerOptions: {
              module: 'esnext',
            },
          },
        },
      },
    ],
  },

  output: {
    path: webpackPaths.srcPath,
    // https://github.com/webpack/webpack/issues/1114
    library: {
      type: 'commonjs2',
    },
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    alias: {
      '@': path.join(__dirname, '../../src/renderer'),
      '@components': path.join(__dirname, '../../src/renderer/components'),
      '@types': path.join(__dirname, '../../src/renderer/types'),
      '@utils': path.join(__dirname, '../../src/renderer/utils'),
      '@ui': path.join(__dirname, '../../src/renderer/ui'),
      '@common': path.join(__dirname, '../../src/common'),
      '@redux': path.join(__dirname, '../../src/renderer/redux'),
      '@rquery': path.join(__dirname, '../../src/renderer/rquery'),
      '@i18n': path.join(__dirname, '../../src/renderer/i18n'),
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};

export default configuration;
