import { useState } from 'react';
import Layout from './components/Layout';
import { UserContext, UserProfile } from './context/UserContext';

function UserBlock() {
    const [userProfile, updateUserProfile] = useState<UserProfile>({
        id: 12,
        name: 'Alex',
        email: 'al.Dik.123@gmail.com',
    });

    return (
        <UserContext.Provider value={{ userProfile, updateUserProfile }}>
            <Layout />
        </UserContext.Provider>
    );
}

export default UserBlock;
