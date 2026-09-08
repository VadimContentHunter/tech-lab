import { execSync } from 'child_process';
import path from 'path';

const repoRoot = execSync('git rev-parse --show-toplevel').toString().trim();

// Принудительно используем UTF-8 для вывода в Windows
if (process.platform === 'win32') {
    try {
        execSync('chcp 65001 > nul');
    } catch {
        // Игнорируем ошибку смены кодовой страницы
    }
}

const containers = [
    {
        name: 'js-ts-frontend',
        enabled: true,
        path: 'containers/js-ts-frontend/project',
        command: 'npm run lint',
    },
    // {
    //     name: 'php',
    //     enabled: false,
    //     path: 'containers/php/project',
    //     command: '',
    // },
    // {
    //     name: 'python',
    //     enabled: false,
    //     path: 'containers/python/project',
    //     command: '',
    // },
];

const stagedFiles = execSync('git diff --cached --name-only')
    .toString()
    .trim()
    .split('\n')
    .filter(Boolean);

for (const container of containers) {
    if (!container.enabled) {
        continue;
    }

    const containerChanged = stagedFiles.some((file) =>
        file.startsWith(`${container.path}/`),
    );

    if (!containerChanged) {
        continue;
    }

    console.log(`\nRunning ${container.name} checks...`);

    try {
        execSync(container.command, {
            cwd: path.join(repoRoot, container.path),
            stdio: 'inherit',
        });
    } catch {
        console.error(`\n${container.name} checks failed.`);
        process.exit(1);
    }
}

console.log('\nAll checks passed.');