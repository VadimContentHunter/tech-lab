import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from 'lightningcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appsPath = path.resolve(__dirname, '../apps');
const ignoredDirectories = ['dist', 'node_modules', '.git', '.idea', '.vscode'];
const isWatch = process.argv.includes('--watch');

async function getProjects() {
    const entries = await fs.readdir(appsPath, {
        withFileTypes: true,
    });

    const projects = [];

    for (const entry of entries) {
        if (!entry.isDirectory()) {
            continue;
        }

        const projectPath = path.join(appsPath, entry.name);
        const inputPath = path.join(projectPath, 'main.css');

        try {
            await fs.access(inputPath);
        } catch {
            continue;
        }

        projects.push({
            name: entry.name,
            projectPath,
            inputPath,
            outputPath: path.join(projectPath, 'dist', 'main.min.css'),
        });
    }

    return projects;
}

async function buildProject(project) {
    const { code } = bundle({
        filename: project.inputPath,
        minify: true,
        sourceMap: false,
    });

    await fs.mkdir(path.dirname(project.outputPath), {
        recursive: true,
    });

    await fs.writeFile(project.outputPath, code);

    console.log(`CSS built: ${project.name}`);
}

async function buildAll() {
    const projects = await getProjects();

    for (const project of projects) {
        await buildProject(project);
    }

    return projects;
}

async function watchProject(project) {
    let lastModified = new Map();

    async function getCssFiles(directory) {
        const entries = await fs.readdir(directory, {
            withFileTypes: true,
        });

        const files = [];

        for (const entry of entries) {
            if (ignoredDirectories.includes(entry.name)) {
                continue;
            }

            const entryPath = path.join(directory, entry.name);

            if (entry.isDirectory()) {
                files.push(...(await getCssFiles(entryPath)));
                continue;
            }

            if (entry.isFile() && entry.name.endsWith('.css')) {
                files.push(entryPath);
            }
        }

        return files;
    }

    async function getSnapshot() {
        const files = await getCssFiles(project.projectPath);
        const snapshot = new Map();

        for (const file of files) {
            const stat = await fs.stat(file);
            snapshot.set(file, stat.mtimeMs);
        }

        return snapshot;
    }

    lastModified = await getSnapshot();

    console.log(`CSS watching: ${project.name}`);

    setInterval(async () => {
        try {
            const currentModified = await getSnapshot();

            let changed = false;

            if (currentModified.size !== lastModified.size) {
                changed = true;
            }

            for (const [file, mtime] of currentModified) {
                if (lastModified.get(file) !== mtime) {
                    changed = true;
                    break;
                }
            }

            if (!changed) {
                return;
            }

            lastModified = currentModified;

            await buildProject(project);
        } catch (error) {
            console.error(`CSS watch failed: ${project.name}`);
            console.error(error);
        }
    }, 500);
}

async function watchAll() {
    const projects = await buildAll();

    await Promise.all(projects.map((project) => watchProject(project)));
}

if (isWatch) {
    await watchAll();
} else {
    await buildAll();
}
