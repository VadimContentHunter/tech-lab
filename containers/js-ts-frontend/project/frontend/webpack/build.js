import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';

import { createWebpackConfig } from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entriesPath = path.resolve(__dirname, '../src/entries');

async function getEntries() {
    try {
        const entries = await fs.readdir(entriesPath, {
            withFileTypes: true,
        });

        const projects = [];

        for (const entry of entries) {
            if (!entry.isDirectory()) {
                continue;
            }

            const entryPath = path.join(entriesPath, entry.name);
            const mainTs = path.join(entryPath, 'main.ts');
            const mainTsx = path.join(entryPath, 'main.tsx');
            let mainPath;
            try {
                await fs.access(mainTs);
                mainPath = mainTs;
            } catch {
                try {
                    await fs.access(mainTsx);
                    mainPath = mainTsx;
                } catch {
                    continue;
                }
            }

            projects.push({
                name: entry.name,
                entryPath,
                mainPath,
                distPath: path.join(entryPath, 'dist'),
            });
        }

        return projects;
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

async function buildProject(project) {
    await fs.mkdir(project.distPath, {
        recursive: true,
    });

    const compiler = webpack(createWebpackConfig(project));
    await new Promise((resolve, reject) => {
        compiler.run((error, stats) => {
            compiler.close(() => {});

            if (error) {
                reject(error);
                return;
            }

            if (!stats) {
                reject(new Error(`Webpack returned no stats for "${project.name}".`));

                return;
            }

            if (stats.hasErrors()) {
                console.error(
                    stats.toString({
                        colors: true,
                        errors: true,
                        warnings: true,
                    })
                );

                reject(new Error(`Webpack build failed: ${project.name}`));
                return;
            }

            console.log(`Webpack build completed: ${project.name}`);
            resolve();
        });
    });
}

async function buildAll() {
    const projects = await getEntries();
    for (const project of projects) {
        await buildProject(project);
    }
}

await buildAll();
console.log('Webpack build completed.');
