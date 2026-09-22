import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        ignores: ['node_modules/**', 'app/dist/**'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['app/src/**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2024,
            },
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            prettier: eslintPluginPrettier,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat['jsx-runtime'].rules,
            ...reactHooks.configs['recommended-latest'].rules,
            ...eslintConfigPrettier.rules,
            ...eslintPluginPrettier.configs.recommended.rules,
            'prefer-const': 'error',
            '@typescript-eslint/no-unused-vars': 'off',
        },
    },
]);
