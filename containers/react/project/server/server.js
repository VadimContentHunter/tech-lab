/* eslint-env node */
/* global process, console */
/* cspell:ignore lesson */

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT) || 9702;
const projectPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'app', 'dist');
const indexPath = path.join(projectPath, 'index.html');
const routingPagePath = path.join(projectPath, 'routing-react-lesson.html');

app.get('/base-react-lesson', (_request, response) => {
    response.sendFile(indexPath);
});

app.get('/routing-react-lesson', (_request, response) => {
  response.sendFile(routingPagePath);
});

app.use('/base-react-lesson', express.static(projectPath, { index: false }));
app.use('/routing-react-lesson', express.static(projectPath, { index: false }));
app.use('/assets', express.static(path.join(projectPath, 'assets')));

app.use((_request, response) => {
  response.status(404).type('text').send('Page not found');
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}/base-react-lesson`);
});

