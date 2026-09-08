import express from 'express';

const app = express();
const port = 9701;

app.use(express.json());

app.get('/', (_request, response) => {
    response.json({
        message: 'JS/TS frontend test server',
    });
});

app.get('/api/hello', (_request, response) => {
    response.json({
        message: 'Hello from Node.js + TypeScript!',
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
