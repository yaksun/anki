module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      "legacyDecorators": true
    },
    parser: "babel-eslint"
  },
  extends: [

    "plugin:vue/essential"

  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
  }
   
  }
  