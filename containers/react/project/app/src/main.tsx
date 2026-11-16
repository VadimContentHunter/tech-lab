import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Counter from './Counter';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element was not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
        <hr />
        <Counter />
    </StrictMode>
);
