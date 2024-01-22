/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  plugins: ["no-relative-import-paths", "simple-import-sort"],
  rules: {
    "vue/multi-word-component-names": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "vue/block-order": [
      "error",
      {
        order: ["script", "template", "style"],
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true, rootDir: "src/", prefix: "@/" },
    ],
    "vue/padding-line-between-blocks": 2,
    "vue/padding-line-between-tags": [
      "error",
      [{ blankLine: "always", prev: "*", next: "*" }],
    ],
    "vue/no-undef-components": [
      "error",
      { ignorePatterns: ["router-link", "router-view", "i18n-t"] },
    ],
    "vue/custom-event-name-casing": ["error", "camelCase"],
    "newline-before-return": "error",
  },
};
