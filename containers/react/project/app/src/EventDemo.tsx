import { CSSProperties } from 'react';

function EventDemo() {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: 'fit-content',
        padding: '18px 22px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        boxShadow: '0 10px 24px rgba(79, 70, 229, 0.28)',
        color: '#fff',
        fontFamily: 'sans-serif',
        userSelect: 'none',
        cursor: 'pointer',
    };

    return (
        <div
            style={style}
            onClick={() => console.log('Clicked!')}
            onMouseEnter={() => console.log('Mouse Entered!')}
            onMouseLeave={() => console.log('Mouse Left!')}
        >
            <strong>Event Demo</strong>
            <span style={{ fontSize: '13px', opacity: 0.85 }}>A little standout element</span>
        </div>
    );
}

export default EventDemo;
