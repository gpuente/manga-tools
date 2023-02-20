module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom'],
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
