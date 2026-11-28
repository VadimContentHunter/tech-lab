import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element was not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <h1>Routing React Lesson</h1>
        <p>This is the starting page for the React routing lesson.</p>
    </StrictMode>
);
