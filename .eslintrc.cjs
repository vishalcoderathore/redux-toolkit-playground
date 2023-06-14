module.exports = {
  env: {
    browser: true, // This project runs in a browser environment
    es2021: true, // This project uses ECMAScript 2021 syntax
    node: true, // This project runs in a Node.js environment
  },
  extends: [
    'eslint:recommended', // Use the recommended ESLint rules
    'plugin:@typescript-eslint/recommended', // Use recommended rules from the TypeScript plugin
    'plugin:import/recommended', // Use recommended rules for ES6+ import/export syntax
    'plugin:import/typescript', // Use TypeScript rules for ES6+ import/export syntax
    'plugin:jsx-a11y/recommended', // Use recommended rules for accessible JSX
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
    'plugin:react-hooks/recommended', // Rules of Hooks and exhaustive deps
    'plugin:react/recommended', // Use recommended rules for React
    'prettier', // Turns off all rules that are unnecessary or might conflict with Prettier
  ],
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
  parserOptions: {
    ecmaFeatures: {
      jsx: true, // Enable JSX syntax
    },
    ecmaVersion: 2021, // Use ECMAScript 2021 syntax
    project: './tsconfig.json', // Specify the TypeScript configuration file
    sourceType: 'module', // Treat code as ECMAScript modules
    tsconfigRootDir: __dirname, // Specify the root directory for the TypeScript configuration
  },
  plugins: ['@typescript-eslint', 'import', 'prettier', 'react', 'react-hooks'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error', // Require explicit return types on functions and class methods
    '@typescript-eslint/explicit-module-boundary-types': 'off', // No need to always enforce explicit module boundary types
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'all', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // Warn on variables defined but never used
    '@typescript-eslint/triple-slash-reference': 'off', // Don't use /// <reference>
    'import/default': 'off', // Allow import of default exports even when not present
    'prettier/prettier': 'error', // Mark prettier formatting issues as errors
    'react/jsx-uses-react': 'off', // Not necessary with the new JSX Transform introduced in React 17
    'react/jsx-uses-vars': 'error', // Prevent variables used in JSX to be marked as unused
    'react/prop-types': 'off', // Disable prop-types enforcement in favor of TypeScript types/interfaces
    'react/react-in-jsx-scope': 'off', // Not necessary with the new JSX Transform introduced in React 17
  },
  settings: {
    'import/resolver': {
      typescript: {}, // Use TypeScript for module resolution
    },
    react: {
      version: 'detect', // Automatically detect the version of React
    },
  },
};
