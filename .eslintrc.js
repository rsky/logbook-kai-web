module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
  ],
  rules: {
    "comma-dangle": ["error", "only-multiline"],
    "eol-last": ["error", "unix"],
    indent: ["error", 4],
    "react/jsx-uses-vars": "warn",
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "@typescript-eslint/explicit-function-return-type": ["warn", {
      "allowExpressions": true,
    }],
  }
}
