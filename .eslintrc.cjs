module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true, // klar til tests senere
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'next',
    'next/core-web-vitals',
    'plugin:prettier/recommended', // kobler Prettier på
  ],
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': 'warn', // viser Prettier-fejl som ESLint-warnings
    'react/react-in-jsx-scope': 'off', // Next.js behøver ikke import React
    'no-var': 'error', // forbyder brug af var
    'prefer-const': 'warn', // opfordrer til brug af const når muligt
    'no-duplicate-imports': 'error', // forbyder duplikerede imports
    'no-console': 'warn', // advarer ved brug af console.log
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // advarer ved ubrugte variabler
    eqeqeq: ['error', 'always'], // kræver brug af === og !== istedet for == og !=

    'react/jsx-boolean-value': ['warn', 'never'], // undgå {true} i props
    'react/jsx-no-useless-fragment': 'warn', // undgå unødvendige fragments
    'react/self-closing-comp': 'warn', // brug selv-lukkende tags når muligt
    'react/react-in-jsx-scope': 'off', // Next.js behøver ikke import React

    'react-hooks/rules-of-hooks': 'error', // sikrer korrekt brug af hooks
    'react-hooks/exhaustive-deps': 'warn', // sikrer dependency array i hooks
  },
};
