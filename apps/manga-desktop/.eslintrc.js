module.exports = {
  root: true,
  extends: ['custom'],
  rules: {
    'import/prefer-default-export': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'turbo/no-undeclared-env-vars': 'off',
  },
  env: {
    browser: true,
  },
};
