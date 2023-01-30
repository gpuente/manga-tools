module.exports = {
  extends: ['next', 'turbo', 'prettier', 'airbnb'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
  },
};
