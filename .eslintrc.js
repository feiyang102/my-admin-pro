module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "prettier",
    "./.eslintrc-auto-import.json",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    // '@typescript-eslint/no-unused-vars': 'off',
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index", "Header", "tag", "Tag", "Breadcrumb"], //需要忽略的组件名
      },
    ],
  },
};
