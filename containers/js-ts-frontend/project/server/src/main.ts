import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

import { getProjects, renderProjects } from './project-list.js';

const app = express();
const port = 9701;

const projectPath = process.cwd();
const entriesPath = path.join(projectPath, 'frontend', 'src', 'entries');
const templatePath = path.join(projectPath, 'server', 'templates', 'index.html');

async function generateIndexPage(): Promise<string> {
    const [template, projects] = await Promise.all([fs.readFile(templatePath, 'utf8'), getProjects(entriesPath)]);

    return template.replace('{{PROJECTS}}', renderProjects(projects));
}

app.get('/', async (_request, response) => {
    try {
        const html = await generateIndexPage();

        response.type('html').send(html);
    } catch (error) {
        console.error(error);

        response.status(500).type('text').send('Failed to generate project index.');
    }
});

app.get('/entries/:project', async (request, response) => {
    const projectName = request.params.project;
    const indexPath = path.join(entriesPath, projectName, 'index.html');

    try {
        await fs.access(indexPath);

        response.sendFile(indexPath);
    } catch {
        response.status(404).type('text').send('Project not found.');
    }
});

app.use('/entries/:project', (request, response, next) => {
    const projectName = request.params.project;
    const projectPath = path.join(entriesPath, projectName);

    if (request.path.endsWith('.ts') || request.path.endsWith('.tsx')) {
        response.status(404).type('text').send('File not found.');
        return;
    }

    express.static(projectPath)(request, response, next);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Entries directory: ${entriesPath}`);
});
