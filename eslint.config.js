import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';
import stylistic from '@stylistic/eslint-plugin';
import pinia from 'eslint-plugin-pinia';
import pluginVue from 'eslint-plugin-vue';
import { globalIgnores } from 'eslint/config';

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
  rules: {
    'antfu/consistent-chaining': 'off',
    'antfu/if-newline': 'off',
    'style/lines-around-comment': 'off',
    'vue/block-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],
  },
  ignores: ['**/*.d.ts', 'src/service-worker/', '**.md'],
})
  .prepend(stylistic.configs.all)
  .append(...compat.config(pinia.configs.all))
  .append(...pluginVue.configs['flat/strongly-recommended'])
  .append({
    rules: {
      'antfu/consistent-list-newline': 'off',
      'style/object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: true },
      ],
      'style/array-element-newline': ['error', { consistent: true }],
      'style/array-bracket-newline': ['error', 'consistent'],
      'style/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            consistent: true,
          },
          ObjectPattern: {
            consistent: true,
          },
          ImportDeclaration: 'never',
          ExportDeclaration: {
            multiline: true,
            minProperties: 3,
          },
        },
      ],
      'style/function-call-argument-newline': ['error', 'consistent'],
      'style/function-paren-newline': ['error', 'consistent'],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
    },
  })
  .append({
    files: ['src/pages/**/*.{vue,js,ts}', 'src/layouts/**/*.{vue,js,ts}', 'src/components/ui/*.{vue,js,ts}'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  })
  // ignore shadcn ui components
  .append({
    files: ['src/components/ui/*.{vue,js,ts}'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-parsing-error': 'off',
    },
  })
  .append(globalIgnores(['src/api/**/*', 'playwright.config.ts']));
