import { useParams } from 'react-router';

function UserPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>User Profile</h1>
            <p>User ID: {id}</p>
        </div>
    );
}

export default UserPage;
