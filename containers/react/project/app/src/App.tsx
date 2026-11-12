type UserInfoProps = {
    name: string;
    email: string;
    age: number;
    isActive: boolean;
};

type CardProps = {
    children: React.ReactNode;
};

function UserInfo({ name, email, age, isActive }: UserInfoProps) {
    return (
        <div className="user-info">
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
            <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        </div>
    );
}

function Card({ children }: CardProps) {
    return <div className="card">{children}</div>;
}

function App() {
    return (
        <Card>
            <UserInfo name="John Doe" email="john.doe@example.com" age={30} isActive={true} />
        </Card>
    );
}

export default App;
