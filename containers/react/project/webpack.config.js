import path from 'node:path';
import { fileURLToPath } from 'node:url';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => ({
    mode: argv.mode ?? 'development',
    entry: path.resolve(projectRoot, 'app/src/main.tsx'),
    output: {
        path: path.resolve(projectRoot, 'app/dist'),
        filename: 'assets/[name].[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(projectRoot, 'app/public/index.html'),
        }),
    ],
    devtool: argv.mode === 'production' ? 'source-map' : 'eval-source-map',
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
    },
    devServer: {
        host: '0.0.0.0',
        port: 9702,
        watchFiles: {
            paths: ['app/public/**/*.html'],
            options: {
                usePolling: true,
                interval: 1000,
            },
        },
        static: {
            directory: path.resolve(projectRoot, 'app/public'),
        },
        hot: true,
        open: false,
    },
});
