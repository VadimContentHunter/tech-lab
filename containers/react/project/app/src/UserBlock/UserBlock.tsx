import Layout from './components/Layout';
import { UserContext, UserProfile } from './context/UserContext';

function UserBlock() {
    const user: UserProfile = {
        id: 12,
        name: 'Alex',
        email: 'al.Dik.123@gmail.com',
    };

    return (
        <UserContext.Provider value={user}>
            <Layout />
        </UserContext.Provider>
    );
}

export default UserBlock;
