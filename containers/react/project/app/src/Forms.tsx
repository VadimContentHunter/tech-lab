import { createContext, JSX, useState } from 'react';

function Terms(): JSX.Element {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        setIsChecked((prev) => !prev);
    };

    return (
        <div>
            <label>Принять условия:</label>
            <input type="checkbox" checked={isChecked} onChange={handleChange} />
            <p>{isChecked ? 'Условия приняты' : 'Необходимо принять условия'}</p>
        </div>
    );
}

function Language(): JSX.Element {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSelectedOption(e.target.value);

    return (
        <div>
            <input type="radio" value="JavaScript" checked={selectedOption === 'JavaScript'} onChange={handleChange} />
            JavaScript
            <br />
            <input type="radio" value="TypeScript" checked={selectedOption === 'TypeScript'} onChange={handleChange} />
            TypeScript
            <br />
            <input type="radio" value="Python" checked={selectedOption === 'Python'} onChange={handleChange} />
            Python
            <br />
            <p>Selected Option: {selectedOption}</p>
        </div>
    );
}

function CitySelect(): JSX.Element {
    const [selectedCity, setSelectedCity] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCity(e.target.value);

    return (
        <div>
            <select value={selectedCity} onChange={handleChange}>
                <option value="">Выберите город</option>
                <option value="Киев">Киев</option>
                <option value="Львов">Львов</option>
                <option value="Одесса">Одесса</option>
            </select>
            <p>Выбранный город: {selectedCity === '' ? 'Не выбрано' : selectedCity}</p>
        </div>
    );
}

function EmailForm(): JSX.Element {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // регулярное выражение на проверку email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // устанавливаем новое значение (нужно ли устанавливать при наличии ошибки - вопрос дискуссионный)
        setEmail(e.target.value);
        // проверяем соответствие введенных данных регулярному выражению
        if (!emailRegex.test(email)) {
            // если не соответствует, устанавливаем ошибку
            setError('Invalid email address');
        }
        // иначе сбрасываем ошибку
        else setError('');
    };

    return (
        <div>
            <label>Email</label>
            <br />
            <input type="email" value={email} onChange={handleChange} placeholder="Email" />
            {error ? <p style={{ color: 'red' }}>{error}</p> : <p style={{ color: 'green' }}>{email}</p>}
        </div>
    );
}

function Forms(): JSX.Element {
    const [formData, setFormData] = useState({ username: '', userage: 18 });

    // обработчик полей формы
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    // обработчик отправки формы
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault(); // блокируем стандартную отправку формы
        console.log('Name: ', formData?.username, 'Age: ', formData?.userage);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                Name: {formData.username} <br /> Age: {formData.userage}
            </p>
            <p>
                <label>Name</label>
                <br />
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </p>
            <p>
                <label>Age</label>
                <br />
                <input type="number" name="userage" value={formData.userage} onChange={handleChange} />
            </p>
            <EmailForm />
            <CitySelect />
            <Terms />
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default Forms;
