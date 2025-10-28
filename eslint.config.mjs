import { createConfigForNuxt } from '@nuxt/eslint-config';
import prettierConfig from 'eslint-config-prettier';

export default createConfigForNuxt()
  .append(prettierConfig)
  .append({
    files: ['**/*.ts', '**/*.vue', '**/*.js'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  });
