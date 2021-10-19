module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb', 'airbnb/hooks'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    camelcase: ['warn', { properties: 'always' }],
    'space-before-function-paren': ['error', 'always'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-tag-spacing': ['error', {
      beforeSelfClosing: 'always', closingSlash: 'never', afterOpening: 'never', beforeClosing: 'never',
    }],
    'react/jsx-curly-spacing': ['error', 'always'],
    'comma-spacing': ['error', { before: false, after: true }],
    'object-curly-spacing': ['error', 'always', { objectsInObjects: true, arraysInObjects: true }],
    'space-in-parens': ['error', 'always'],
    'template-curly-spacing': ['error', 'always'],
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': ['error', { builtinGlobals: false, hoist: 'functions', allow: [] }],
    'no-plusplus': ['off', { allowForLoopAfterthoughts: true }],
    'no-continue': 'off',
    'import/no-cycle': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-props-no-spreading': 'off',
    'class-methods-use-this': 'off',
    'jsx-a11y/label-has-associated-control': [2, {
      labelComponents: ['label'],
      labelAttributes: ['htmlFor'],
      controlComponents: ['Text'],
    }],
  },
};
