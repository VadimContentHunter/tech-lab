import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entriesPath = path.resolve(__dirname, '../src/entries');
const outputPath = path.resolve(__dirname, '../dist/entries');

const entries = Object.fromEntries(
    fs.readdirSync(entriesPath, {
            withFileTypes: true,
        })
        .filter((entry) => entry.isDirectory())
        .map((entry) => {
            const entryPath = path.resolve(entriesPath, entry.name);
            const files = fs.readdirSync(entryPath);
            const mainFile = files.find((file) => file === 'main.ts' || file === 'main.tsx');

            if (!mainFile) {
                throw new Error(`Entry "${entry.name}" does not contain main.ts or main.tsx`);
            }

            return [entry.name, path.resolve(entryPath, mainFile)];
        })
);

const htmlPlugins = Object.keys(entries).map(
    (entryName) =>
        new HtmlWebpackPlugin({
            template: path.resolve(entriesPath, entryName, 'index.html'),
            filename: `${entryName}/index.html`,
            chunks: [entryName],
        })
);

export default {
    mode: 'development',

    entry: entries,

    output: {
        path: outputPath,
        filename: '[name]/webpack.bundle.js',
        clean: true,
    },

    watchOptions: {
        poll: 1000,
        ignored: /node_modules/,
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, '../tsconfig.webpack.json'),
                    },
                },
            },
        ],
    },

    plugins: htmlPlugins,

    devtool: 'source-map',
};
