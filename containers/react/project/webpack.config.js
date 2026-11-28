import path from 'node:path';
import { fileURLToPath } from 'node:url';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => ({
    mode: argv.mode ?? 'development',
  entry: {
    main: path.resolve(projectRoot, 'app/src/main.tsx'),
    routing: path.resolve(projectRoot, 'app/src/routing.tsx'),
  },
    output: {
        path: path.resolve(projectRoot, 'app/dist'),
        filename: 'assets/[name].[contenthash].js',
      publicPath: '/',
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
      filename: 'index.html',
      template: path.resolve(projectRoot, 'app/public/index.html'),
      chunks: ['main'],
      publicPath: '/',
    }),
    new HtmlWebpackPlugin({
      filename: 'routing-react-lesson.html',
      template: path.resolve(projectRoot, 'app/public/routing-react-lesson.html'),
      chunks: ['routing'],
      publicPath: '/',
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
      historyApiFallback: {
        rewrites: [
          { from: /^\/base-react-lesson\/?$/, to: '/index.html' },
          { from: /^\/routing-react-lesson\/?$/, to: '/routing-react-lesson.html' },
        ],
      },
      static: false,
        hot: true,
        open: false,
    },
});
