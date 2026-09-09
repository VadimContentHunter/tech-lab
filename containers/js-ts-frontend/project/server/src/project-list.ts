import fs from 'node:fs/promises';
import path from 'node:path';

export interface Project {
    name: string;
    updatedAt: Date;
}

export async function getProjects(appsPath: string): Promise<Project[]> {
    try {
        const apps = await fs.readdir(appsPath, {
            withFileTypes: true,
        });

        const projects: Project[] = [];

        for (const app of apps) {
            if (!app.isDirectory()) {
                continue;
            }

            const indexPath = path.join(appsPath, app.name, 'index.html');

            try {
                const stats = await fs.stat(indexPath);

                projects.push({
                    name: app.name,
                    updatedAt: stats.mtime,
                });
            } catch {
                // Каталог без index.html не является проектом.
            }
        }

        projects.sort((first, second) => second.updatedAt.getTime() - first.updatedAt.getTime());

        return projects;
    } catch (error) {
        if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
            return [];
        }

        throw error;
    }
}

function escapeHtml(value: string): string {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

export function renderProjects(projects: Project[]): string {
    if (projects.length === 0) {
        return '<p class="empty">No projects found.</p>';
    }

    const items = projects
        .map(
            (project) => `
                <li class="project">
                    <a href="/apps/${encodeURIComponent(project.name)}/">
                        <span class="project-name">
                            ${escapeHtml(project.name)}
                        </span>
                        <span class="project-date">
                            ${project.updatedAt.toLocaleString()}
                        </span>
                    </a>
                </li>
            `
        )
        .join('');

    return `<ul class="projects">${items}</ul>`;
}
