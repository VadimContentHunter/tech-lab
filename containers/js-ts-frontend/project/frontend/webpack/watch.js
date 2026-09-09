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

async function createProjectCompiler(project) {
    await fs.mkdir(project.distPath, {
        recursive: true,
    });

    const compiler = webpack(createWebpackConfig(project));
    const watching = compiler.watch(
        {
            poll: 1000,
            aggregateTimeout: 300,
        },
        (error, stats) => {
            if (error) {
                console.error(`Webpack error: ${project.name}`, error);

                return;
            }

            if (!stats) {
                return;
            }

            if (stats.hasErrors()) {
                console.error(`Webpack build failed: ${project.name}`);

                console.error(
                    stats.toString({
                        colors: true,
                        errors: true,
                        warnings: true,
                    })
                );

                return;
            }

            console.log(`Webpack build completed: ${project.name}`);
        }
    );

    console.log(`Watching: ${project.name}`);

    return {
        compiler,
        watching,
    };
}

async function watchEntries() {
    const contexts = new Map();

    async function syncEntries() {
        const projects = await getEntries();

        const actualProjects = new Map(projects.map((project) => [project.name, project]));

        // Добавляем новые проекты.
        for (const project of projects) {
            if (contexts.has(project.name)) {
                continue;
            }

            const context = await createProjectCompiler(project);
            contexts.set(project.name, context);
            console.log(`Entry added: ${project.name}`);
        }

        // Удаляем проекты, которых больше нет.
        for (const [projectName, context] of contexts) {
            if (actualProjects.has(projectName)) {
                continue;
            }

            await new Promise((resolve) => {
                context.watching.close(() => {
                    resolve();
                });
            });

            context.compiler.close(() => {});
            contexts.delete(projectName);
            const projectPath = path.join(entriesPath, projectName);
            const distPath = path.join(projectPath, 'dist');
            await fs.rm(distPath, {
                recursive: true,
                force: true,
            });

            console.log(`Entry removed: ${projectName}`);
        }
    }

    await syncEntries();

    setInterval(async () => {
        try {
            await syncEntries();
        } catch (error) {
            console.error('Failed to sync entries:', error);
        }
    }, 500);

    console.log('Webpack is watching frontend entries...');
}

await watchEntries();
