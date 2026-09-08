import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    // Игнорируем зависимости, результаты сборки и конфигурационные файлы.
    {
        ignores: [
            'node_modules/**',
            'frontend/dist/**',
            'server/dist/**',
            'eslint.config.js',
            'frontend/webpack/webpack.config.js',
            'frontend/esbuild/esbuild.config.js',
        ],
    },

    // Общие настройки.
    {
        plugins: {
            js,
            prettier: eslintPluginPrettier,
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },

    // Рекомендованные правила JavaScript.
    js.configs.recommended,

    // Рекомендованные правила TypeScript.
    ...tseslint.configs.recommended,

    // Frontend: TypeScript для браузера.
    {
        files: ['frontend/**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2024,
            },
            parserOptions: {
                project: ['./frontend/tsconfig.json'],
            },
        },
        rules: {
            ...eslintPluginPrettier.configs.recommended.rules,
            ...eslintConfigPrettier.rules,

            'prefer-const': 'error',

            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
        },
    },

    // Server: TypeScript для Node.js.
    {
        files: ['server/**/*.{ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.es2024,
            },
            parserOptions: {
                project: ['./server/tsconfig.json'],
            },
        },
        rules: {
            ...eslintPluginPrettier.configs.recommended.rules,
            ...eslintConfigPrettier.rules,

            'prefer-const': 'error',

            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
        },
    },
]);