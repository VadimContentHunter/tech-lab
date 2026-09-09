import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createWebpackConfig(project) {
    return {
        mode: 'development',
        entry: project.mainPath,
        output: {
            path: project.distPath,
            filename: 'webpack.bundle.js',
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
                            configFile: path.resolve(
                                __dirname,
                                '../tsconfig.webpack.json',
                            ),
                        },
                    },
                },
            ],
        },
        devtool: 'source-map',
    };
}
