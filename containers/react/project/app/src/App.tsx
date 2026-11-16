import { useState } from 'react';

type UserInfoProps = {
    nameProp?: string;
    emailProp?: string;
    ageProp?: number;
    isActiveProp?: boolean;
};

type CardProps = {
    children: React.ReactNode;
};

function UserInfo({ nameProp, emailProp, ageProp, isActiveProp = false }: UserInfoProps) {
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState(emailProp || '-----');
    const [age, setAge] = useState(ageProp ?? 0);
    const [isActive, setIsActive] = useState(isActiveProp ?? false);

    const messageEmailError = 'Email должен содержать символ @.';
    const messageAgeError = 'Пожалуйста, введите корректный возраст. Должно быть положительное число.';

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newEmail = event.target.value;
        setEmail(newEmail);

        if (!newEmail.includes('@')) {
            setDescription(messageEmailError);
        } else {
            setDescription('');
        }
    }

    function handleAgeChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newAge = parseInt(event.target.value, 10);
        if (isNaN(newAge) || newAge < 1) {
            setDescription(messageAgeError);
            setAge(0);
        } else {
            setDescription('');
            setAge(newAge);
        }
    }

    function handleIsActiveChange(event: React.ChangeEvent<HTMLInputElement>) {
        setIsActive(event.target.checked);
    }

    function clear() {
        setEmail('');
        setAge(0);
        setIsActive(false);
        setDescription('');
    }

    return (
        <div className="user-info">
            <h2>{nameProp}</h2>
            <br></br>

            {description.trim().length > 0 && <p>{description}</p>}

            <p>
                Email: <input type="email" value={email} onChange={handleEmailChange} />
            </p>
            <p>
                Age: <input type="number" value={age} onChange={handleAgeChange} />
            </p>
            <p>
                Status: <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} /> {isActive ? 'Active' : 'Inactive'}
            </p>

            <button onClick={clear}>Clear</button>
        </div>
    );
}

function Card({ children }: CardProps) {
    return <div className="card">{children}</div>;
}

function App() {
    return (
        <Card>
            <UserInfo nameProp="John Doe" emailProp="john.doe@example.com" ageProp={30} isActiveProp={true} />
        </Card>
    );
}

export default App;
