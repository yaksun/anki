module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  },
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
  }
   
  }
  