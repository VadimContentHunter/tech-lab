import path from 'node:path';
import { fileURLToPath } from 'node:url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development',

    entry: path.resolve(__dirname, '../src/main.ts'),

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'webpack.bundle.js',
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

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),
    ],

    devtool: 'source-map',
};