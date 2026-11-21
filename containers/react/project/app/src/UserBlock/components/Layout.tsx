import { useContext, useState, type CSSProperties, type FormEvent } from 'react';

import Sidebar from './Sidebar';
import { UserContext } from '../context/UserContext';

const layoutStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
    gap: 16,
    justifyContent: 'flex-start',
    padding: 16,
    boxSizing: 'border-box',
    background: '#eef3f8',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#172033',
};

const formStyle: CSSProperties = {
    display: 'grid',
    gap: 10,
    width: 'min(100%, 320px)',
    padding: 16,
    border: '1px solid #dbe4f0',
    borderRadius: 16,
    backgroundColor: '#fff',
    boxSizing: 'border-box',
};

const inputStyle: CSSProperties = {
    width: '100%',
    padding: '8px 10px',
    border: '1px solid #cbd5e1',
    borderRadius: 6,
    boxSizing: 'border-box',
};

function UserForm() {
    const userContext = useContext(UserContext);
    const [name, setName] = useState(userContext?.userProfile.name ?? '');
    const [email, setEmail] = useState(userContext?.userProfile.email ?? '');

    if (!userContext) {
        return null;
    }

    const context = userContext;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        context.updateUserProfile({ ...context.userProfile, name, email });
    }

    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Edit user</h2>

            <label>
                Name
                <input style={inputStyle} value={name} onChange={(event) => setName(event.target.value)} />
            </label>

            <label>
                Email
                <input style={inputStyle} type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>

            <button type="submit">Save</button>
        </form>
    );
}

function Layout() {
    return (
        <main aria-label="User layout" style={layoutStyle}>
            <Sidebar />
            <UserForm />
        </main>
    );
}

export default Layout;
