import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import type { Linter } from 'eslint';

const config: Linter.Config[] = [
  {
    ignores: [
      'node_modules',
      'dist',
      'postcss.config.js',
      'webpack.config.js',
      'eslint.config.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    rules: {},
  },
  eslintConfigPrettier,
];

export default config;
