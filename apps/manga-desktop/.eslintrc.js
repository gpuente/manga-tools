module.exports = {
  root: true,
  extends: ['erb', 'custom'],
  plugins: ['import'],
  env: {
    browser: true,
  },
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'import/no-import-module-exports': 'off',
    'react/function-component-definition': 'off',
    'import/no-unresolved': 'error',
    'import/prefer-default-export': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-param-reassign': 'off',
    'react/no-unstable-nested-components': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      // webpack: {
      //   config: require.resolve('./.erb/configs/webpack.config.eslint.ts'),
      // },
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json', 'apps/manga-desktop/tsconfig.json'],
      },
    },
  },
};
