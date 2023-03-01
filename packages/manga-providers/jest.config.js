/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('jest-config');

module.exports = {
  roots: ['<rootDir>/src'],
  ...baseConfig,
};
