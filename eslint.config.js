import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

import pinia from 'eslint-plugin-pinia';

const compat = new FlatCompat();

export default antfu({
  formatters: true,
  vue: true,
  stylistic: {
    // See: https://google.github.io/styleguide/jsguide.html#formatting-semicolons-are-required
    semi: true,
    // See: https://google.github.io/styleguide/jsguide.html#features-strings-use-single-quotes
    quotes: 'single',
  },
}).append(...compat.config(pinia.configs.all)).append({
  ignores: ['src/api/'],
});
