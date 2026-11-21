import type { CSSProperties } from 'react';

import Sidebar from './Sidebar';

const layoutStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
    boxSizing: 'border-box',
    background: '#eef3f8',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#172033',
};

function Layout() {
    return (
        <main aria-label="User layout" style={layoutStyle}>
            <Sidebar />
        </main>
    );
}

export default Layout;
