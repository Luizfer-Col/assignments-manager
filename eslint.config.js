const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const js = require('@eslint/js');
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const reactHooks = require('eslint-plugin-react-hooks');
const typescriptParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: [
      'dist/*',
      'web-build/*',
      '*.config.js',
      'expo-env.d.ts',
      'app-example/**/*',
      '.prettierrc.js',
    ],
  },
  js.configs.recommended,
  reactRecommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.config.js', '.prettierrc.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-native': require('eslint-plugin-react-native'),
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-native/no-unused-styles': 2,
      'react-native/no-inline-styles': 1,
      'react-native/no-color-literals': 1,
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    },
  },
  prettierConfig,
]);
