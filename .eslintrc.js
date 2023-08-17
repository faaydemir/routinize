module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'react-app', TODO!!
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "jsx-a11y/anchor-is-valid": 0
  },
};
