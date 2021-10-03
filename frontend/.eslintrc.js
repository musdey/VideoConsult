module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  //plugins: ['react', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['off', 'never'],
    'max-len': ['error', { code: 120, ignoreComments: true }],
  },
}
