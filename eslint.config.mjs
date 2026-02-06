import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import next from '@next/eslint-plugin-next';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  // Ignores
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'build/',
      'dist/',
      'coverage/',
      'public/',
      'src/animations/',
    ],
  },

  // Base config
  js.configs.recommended,

  // React config
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@next/next': next,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2022,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React rules
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      'react/no-unescaped-entities': 'off',

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // JSX A11y rules
      ...jsxA11y.configs.recommended.rules,
      'jsx-a11y/anchor-is-valid': 'off',

      // Next.js rules
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,

      // General rules
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    },
  },

  // Jest test files config
  {
    files: ['**/*.test.js', '**/*.test.jsx', '**/*.spec.js', '**/*.spec.jsx', 'jest.setup.js'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },

  // Prettier config (must be last)
  prettier,
];
