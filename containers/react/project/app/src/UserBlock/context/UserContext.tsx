import { createContext } from 'react';

export interface UserProfile {
    id: string | number;
    name: string;
    email: string;
}

export type UserProviderProps = {
    userProfile: UserProfile;
    updateUserProfile: (userProfile: UserProfile) => void;
};

export const UserContext = createContext<UserProviderProps | null>(null);
