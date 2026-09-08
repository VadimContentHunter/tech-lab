import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';

import { getProjects, renderProjects } from './project-list.js';

const app = express();
const port = 9701;

const projectPath = process.cwd();
const publicPath = path.join(projectPath, 'frontend', 'dist');
const entriesPath = path.join(publicPath, 'entries');
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

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    console.log(`Public directory: ${publicPath}`);
});
