module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module',
    ecmaFeatures: {
      "legacyDecorators": true
    }
  
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
    
  }
   
  }
  