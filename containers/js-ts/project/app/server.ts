import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 9701;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesPath = path.join(__dirname, 'pages');
const distPath = path.join(__dirname, '../dist');

const pages = {
    mvp: {
        url: '/mvp',
        path: 'mvp',
        html: 'mvp.html',
    },

    react: {
        url: '/react',
        path: 'react',
        html: 'index.html',
    },
};

// Регистрация страниц
Object.entries(pages).forEach(([_name, page]) => {
    const pagePath = path.join(pagesPath, page.path);
    const distPagePath = path.join(distPath, 'pages', page.path);

    // HTML-страница
    app.get(page.url, (_req: Request, res: Response) => {
        res.sendFile(path.join(pagePath, page.html));
    });

    // JS-файлы страницы
    app.use(`/js${page.url}`, express.static(distPagePath));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
