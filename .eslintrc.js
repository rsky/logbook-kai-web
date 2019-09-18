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
    "eol-last":["error", "unix"],
    "func-style": ["error", "expression"],
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    "no-console": "warn",
    "prefer-arrow-callback": "error",
    quotes: ["error", "double"],
    "react/jsx-uses-vars": "warn",
    semi: ["error", "never"],
    "@typescript-eslint/explicit-function-return-type": ["warn", {
      allowExpressions: true,
    }],
  }
}
