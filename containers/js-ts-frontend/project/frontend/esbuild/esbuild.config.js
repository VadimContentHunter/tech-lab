import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, context } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWatch = process.argv.includes('--watch');
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

function createBuildOptions(project) {
    return {
        entryPoints: [project.mainPath],
        bundle: true,
        sourcemap: true,
        outfile: path.join(project.distPath, 'esbuild.bundle.js'),
        platform: 'browser',
        format: 'esm',
        target: 'es2024',
    };
}

async function buildEntry(project) {
    await fs.mkdir(project.distPath, {
        recursive: true,
    });

    await build(createBuildOptions(project));
}

async function buildAll() {
    const projects = await getEntries();

    for (const project of projects) {
        await buildEntry(project);
    }
}

async function watchEntry(project) {
    const ctx = await context(createBuildOptions(project));
    await ctx.watch();

    console.log(`Watching: ${project.name}`);
    return ctx;
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

            const ctx = await watchEntry(project);
            contexts.set(project.name, ctx);
            console.log(`Entry added: ${project.name}`);
        }

        // Удаляем проекты, которых больше нет.
        for (const [projectName, ctx] of contexts) {
            if (actualProjects.has(projectName)) {
                continue;
            }
            await ctx.dispose();
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

    console.log('esbuild is watching frontend entries...');
}

if (isWatch) {
    await watchEntries();
} else {
    await buildAll();
    console.log('esbuild build completed.');
}
