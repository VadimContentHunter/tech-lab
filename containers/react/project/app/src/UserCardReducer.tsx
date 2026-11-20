import { CSSProperties, useReducer } from 'react';

interface UserState {
    name: string;
    age: number;
    isActive: boolean;
}

type Action =
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_AGE'; payload: number }
    | { type: 'SET_ACTIVE'; payload: boolean }
    | { type: 'TOGGLE_ACTIVE' }
    | { type: 'RESET' };

function UserCardReducer(state: UserState, action: Action): UserState {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_AGE': {
            if (!Number.isFinite(action.payload) || action.payload <= 0) {
                return state;
            }

            return { ...state, age: action.payload };
        }
        case 'SET_ACTIVE':
            return { ...state, isActive: action.payload };
        case 'TOGGLE_ACTIVE':
            return { ...state, isActive: !state.isActive };
        case 'RESET':
            return { name: '', age: 0, isActive: false };
        default:
            return state;
    }
}

function UserCardReducerComponent() {
    const [userState, dispatchUserState] = useReducer(UserCardReducer, { name: '', age: 0, isActive: false });

    const activeColor = userState.isActive ? '#16a34a' : '#64748b';
    const styles: {
        wrapper: CSSProperties;
        card: CSSProperties;
        header: CSSProperties;
        title: CSSProperties;
        subtitle: CSSProperties;
        status: CSSProperties;
        dot: CSSProperties;
        info: CSSProperties;
        infoItem: CSSProperties;
        infoLabel: CSSProperties;
        infoValue: CSSProperties;
        field: CSSProperties;
        label: CSSProperties;
        input: CSSProperties;
        actions: CSSProperties;
        toggle: CSSProperties;
        reset: CSSProperties;
    } = {
        wrapper: {
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 18,
            padding: '32px 16px',
            backgroundColor: '#f5f5f5',
        },
        card: {
            width: '100%',
            maxWidth: 460,
            padding: 20,
            border: '1px solid #ccc',
            backgroundColor: '#fff',
        },
        header: { display: 'flex', justifyContent: 'space-between', marginBottom: 16 },
        title: { margin: 0 },
        subtitle: { margin: '4px 0 0' },
        status: { display: 'inline-flex', gap: 5, alignItems: 'center' },
        dot: { width: 8, height: 8, borderRadius: '50%' },
        info: { display: 'flex', gap: 12, marginBottom: 16 },
        infoItem: { padding: 10, border: '1px solid #eee' },
        infoLabel: { display: 'block', fontSize: 12 },
        infoValue: { fontSize: 16 },
        field: { display: 'grid', gap: 4, marginBottom: 12 },
        label: { fontWeight: 600 },
        input: { padding: 8, border: '1px solid #bbb' },
        actions: { display: 'flex', gap: 8, marginTop: 16 },
        toggle: { padding: '8px 14px', cursor: 'pointer' },
        reset: { padding: '8px 14px', cursor: 'pointer' },
    };

    return (
        <main style={styles.wrapper}>
            <article style={styles.card}>
                <header style={styles.header}>
                    <div>
                        <h2 style={styles.title}>User Card</h2>
                        <p style={styles.subtitle}>Manage user profile status</p>
                    </div>
                    <span style={{ ...styles.status, color: activeColor, backgroundColor: userState.isActive ? '#dcfce7' : '#f1f5f9' }}>
                        <span style={{ ...styles.dot, backgroundColor: activeColor }} />
                        {userState.isActive ? 'Active' : 'Deactivated'}
                    </span>
                </header>
                <div style={styles.info}>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Name</span>
                        <strong style={styles.infoValue}>{userState.name || '—'}</strong>
                    </div>
                    <div style={styles.infoItem}>
                        <span style={styles.infoLabel}>Age</span>
                        <strong style={styles.infoValue}>{userState.age || '—'}</strong>
                    </div>
                </div>
            </article>
            <section
                style={{
                    width: '100%',
                    maxWidth: 460,
                    padding: 24,
                    borderRadius: 20,
                    backgroundColor: 'rgba(255, 255, 255, .78)',
                    border: '1px solid rgba(148, 163, 184, .25)',
                }}
            >
                <h3 style={{ margin: '0 0 12px' }}>Edit user data</h3>
                <section>
                    <div style={styles.field}>
                        <label htmlFor="user-name" style={styles.label}>
                            Name
                        </label>
                        <input
                            id="user-name"
                            type="text"
                            value={userState.name}
                            onChange={(e) => dispatchUserState({ type: 'SET_NAME', payload: e.target.value })}
                            placeholder="Enter name"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.field}>
                        <label htmlFor="user-age" style={styles.label}>
                            Age
                        </label>
                        <input
                            id="user-age"
                            type="number"
                            min="1"
                            value={userState.age || ''}
                            onChange={(e) => dispatchUserState({ type: 'SET_AGE', payload: parseInt(e.target.value, 10) || 0 })}
                            placeholder="Enter age"
                            style={styles.input}
                        />
                    </div>
                </section>
                <div style={styles.actions}>
                    <button type="button" onClick={() => dispatchUserState({ type: 'TOGGLE_ACTIVE' })} style={styles.toggle}>
                        {userState.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button type="button" onClick={() => dispatchUserState({ type: 'RESET' })} style={styles.reset}>
                        Reset
                    </button>
                </div>
            </section>
        </main>
    );
}

export default UserCardReducerComponent;
