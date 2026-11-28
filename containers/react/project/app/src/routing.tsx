import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RouterAppContainer from './TestRouter/RouterAppContainer';
import { BrowserRouter } from 'react-router';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element was not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <BrowserRouter basename="/routing-react-lesson">
            <RouterAppContainer />
        </BrowserRouter>
    </StrictMode>
);
