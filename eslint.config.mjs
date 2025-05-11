// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/explicit-function-return-type': 0,
      '@typescript-eslint/no-namespace': 0,
      '@typescript-eslint/parsers': 0,
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false },
      ],
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
);
