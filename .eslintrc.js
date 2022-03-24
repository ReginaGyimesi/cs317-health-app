module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {"react/prop-types": "off"},
};
