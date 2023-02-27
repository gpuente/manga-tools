/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  moduleDirectories: ['node_modules', 'release/app/node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/.erb/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@components(.*)$': '<rootDir>/src/renderer/components$1',
    '^@types(.*)$': '<rootDir>/src/renderer/types$1',
    '^@utils(.*)$': '<rootDir>/src/renderer/utils$1',
    '^@ui(.*)$': '<rootDir>/src/renderer/ui$1',
    '^@common(.*)$': '<rootDir>/src/common$1',
    '^@redux(.*)$': '<rootDir>/src/renderer/redux$1',
  },
  setupFiles: ['./.erb/scripts/check-build-exists.ts'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },
  testPathIgnorePatterns: ['release/app/dist', '.erb/dll'],
  transform: {
    '\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
};
