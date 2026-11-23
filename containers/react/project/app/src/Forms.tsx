import { JSX, useState } from 'react';

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
            <input type="submit" value="Отправить" />
        </form>
    );
}

export default Forms;
