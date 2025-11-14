import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default defineConfig([
  js.configs.recommended,
  // Next.js + React + React Hooks + Core Web Vitals
  ...nextCoreWebVitals,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // svarer til env: { jest: true }
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'prettier/prettier': 'warn', // advarer om prettier-formatfejl

      'no-var': 'error', // brug let/const i stedet for var
      'prefer-const': 'warn', // brug const, når variablen ikke ændres
      'no-duplicate-imports': 'error', // forbyder duplikerede imports
      'no-console': 'warn', // advarer om console.log
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // advarer om ubrugte variabler, ignorerer parametre der starter med _
      eqeqeq: ['error', 'always'], // kræver brug af === og !== istedet for == og !=

      'react/jsx-boolean-value': ['warn', 'never'], // advarer om at boolean props ikke behøver en værdi
      'react/jsx-no-useless-fragment': 'warn', // advarer om unødvendige fragments
      'react/self-closing-comp': 'warn', // advarer om komponenter der kan self-close
      'react/react-in-jsx-scope': 'off', // Next behøver ikke import React

      'react-hooks/rules-of-hooks': 'error', // sikrer korrekt brug af hooks
      'react-hooks/exhaustive-deps': 'warn', // advarer om manglende dependencies i useEffect
    },
  },

  // Prettier-integration (skal være sidst, så den kan overskrive andre configs)
  eslintPluginPrettierRecommended,
]);
