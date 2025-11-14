import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
// import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'; // når Next tilføjes
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export default defineConfig([
  js.configs.recommended,

  // Next (tilføjes senere)
  // ...nextCoreWebVitals,

  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },

    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'prettier/prettier': 'warn', // Integrerer Prettier som en ESLint-regel

      'no-var': 'error', // tillader ikke var
      'prefer-const': 'warn', // bruger const fremfor let hvor muligt
      'no-duplicate-imports': 'error', // forbyder duplikerede imports
      'no-console': 'warn', // advarer ved brug af console.log
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // advarer ved manglende brug af variabler (ignorerer variabler der starter med _)
      eqeqeq: ['error', 'always'], // kræver brug af === og !== istedetfor == og !=

      // React
      'react/jsx-boolean-value': ['warn', 'never'], // advarer ved brug af boolean attributter i JSX (f.eks. <Component disabled={true} />)
      'react/jsx-no-useless-fragment': 'warn', // advarer ved unødvendige fragments
      'react/self-closing-comp': 'warn', // advarer ved komponenter der kan self-close
      'react/react-in-jsx-scope': 'off', // Next behøver ikke import React ved brug af JSX

      // Hooks
      'react-hooks/rules-of-hooks': 'error', // sikrer korrekt brug af hooks
      'react-hooks/exhaustive-deps': 'warn', // advarer ved manglende afhængigheder i useEffect
    },
  },

  // Prettier (skal være sidst)
  eslintPluginPrettierRecommended,
]);
