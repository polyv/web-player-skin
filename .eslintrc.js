const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },

  env: {
    browser: true,
    es6: true,
    node: true
  },

  extends: 'eslint:recommended',
  rules: {
    // 调试
    'no-console': [
      isProd ? 'error' : 'off',
      { 'allow': ['info', 'warn', 'error', 'time', 'timeEnd'] }
    ],
    'no-debugger': isProd ? 'error' : 'off',

    // 基本
    'semi': ['error', 'always'],
    'indent': ['error', 2, {
      'SwitchCase': 1
    }],
    'brace-style': ['error', '1tbs', {
      'allowSingleLine': true
    }],
    'quotes': ['error', 'single'],

    // 变量
    'new-cap': 'error',
    // 'camelcase': 'error',
    'camelcase': [2, {
      'properties': 'never',
      'allow': [
        'zh_CN'
      ]
    }],
    'no-use-before-define': ['error', {
      'functions': false,
      'classes': false,
      'variables': true
    }],

    // 空白与换行
    'semi-spacing': 'error',
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'computed-property-spacing': 'error',
    'comma-spacing': 'error',
    'func-call-spacing': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'no-trailing-spaces': 'error',
    'no-whitespace-before-property': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'space-in-parens': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always', {
      'block': {
        'markers': ['!'],
        'balanced': true
      }
    }],
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: true
    }],
    'operator-linebreak': ['error', 'after'],
    'eol-last': ['error', 'always'],

    // 逗号
    'comma-dangle': isProd ? 'error' : 'warn',
    'comma-style': 'error',

    // 其他
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-floating-decimal': 'error',
    'no-implied-eval': 'error',
    'no-iterator': 'error',
    'no-loop-func': 'error',
    'no-multi-spaces': 'error',
    'no-proto': 'error',
    'no-script-url': 'error',
    'no-throw-literal': 'error',
    'no-useless-call': 'error',
    'no-with': 'error',
    'no-constant-condition': isProd ? 'error' : 'warn',
    'no-empty': [isProd ? 'error' : 'warn', {
      'allowEmptyCatch': true
    }],
    'curly': ['error', 'multi'],
    'wrap-iife': ['error', 'inside'],

    // ES6
    'no-var': 'error',
    'arrow-spacing': 'error',
    'no-duplicate-imports': 'error',
    'prefer-promise-reject-errors': 'error'
  }
};
