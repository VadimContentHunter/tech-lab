import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const profileStyle = {
    heading: { margin: '0 0 12px', fontSize: 20, color: '#172033' },
    text: { margin: '8px 0', color: '#526176', fontSize: 14 },
};

function UserProfile() {
    const userContext = useContext(UserContext);

    if (!userContext) {
        return (
            <div>
                <p style={profileStyle.text}>No user data available.</p>
            </div>
        );
    }

    const { userProfile } = userContext;

    return (
        <div>
            <h2 style={profileStyle.heading}>User Profile</h2>
            <p style={profileStyle.text}>Name: {userProfile.name}</p>
            <p style={profileStyle.text}>Email: {userProfile.email}</p>
        </div>
    );
}

export default UserProfile;
