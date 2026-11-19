import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Counter from './Counter';
import EventDemo from './EventDemo';
import UserCard from './UserCard';
import UserCardClass from './UserCardClass';
import EffectDemo from './EffectDemo';
import Timer from './Timer';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element was not found');
}

createRoot(rootElement).render(
    <StrictMode>
        <UserCard />
        <hr />
        <Counter />
        <hr />
        <EventDemo />
        <hr />
        <UserCardClass />
        <hr />
        <EffectDemo />
        <hr />
        <Timer />
    </StrictMode>
);
