import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 9701;

// Получаем путь к текущему файлу в ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesPath = path.join(__dirname, 'pages');

// Раздача статических файлов тестовых страниц
app.use(express.static(pagesPath));

// Главная страница
app.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(pagesPath, 'home.html'));
});

// Тестовая страница React
app.get('/react', (_req: Request, res: Response) => {
    res.sendFile(path.join(pagesPath, 'react', 'index.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
