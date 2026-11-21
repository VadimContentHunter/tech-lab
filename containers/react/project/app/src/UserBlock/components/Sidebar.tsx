import type { CSSProperties } from 'react';

import UserProfile from './UserProfile';

const sidebarStyle: CSSProperties = {
    width: 'min(100%, 280px)',
    padding: 16,
    border: '1px solid #dbe4f0',
    borderRadius: 16,
    background: 'linear-gradient(160deg, #ffffff 0%, #f3f7fc 100%)',
    boxShadow: '0 6px 16px rgba(31, 41, 55, 0.08)',
    boxSizing: 'border-box',
};

function Sidebar() {
    return (
        <aside aria-label="User sidebar" style={sidebarStyle}>
            <UserProfile />
        </aside>
    );
}

export default Sidebar;
