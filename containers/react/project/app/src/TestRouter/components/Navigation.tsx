import { Link } from 'react-router';

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            {' | '}
            <Link to="/about">About</Link>
            {' | '}
            <Link to="/users/1">User 1</Link>
            {' | '}
            <Link to="/users/2">User 2</Link>
        </nav>
    );
}

export default Navigation;
