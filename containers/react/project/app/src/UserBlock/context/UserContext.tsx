import { createContext } from 'react';

export interface UserProfile {
    id: string | number;
    name: string;
    email: string;
}

export const UserContext = createContext<UserProfile | null>(null);
