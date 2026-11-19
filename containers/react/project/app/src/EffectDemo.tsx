import { JSX, useEffect, useState } from 'react';

function EffectDemo({ nameBlockId = 'effectDemo' }: { nameBlockId?: string }): JSX.Element {
    const [name, setName] = useState('Tom');
    const [age, setAge] = useState(36);

    useEffect(() => {
        // Изменяем заголовок html-страницы
        document.title = `Привет ${name}`;
        console.log('useEffect');
    }, [name]); // эффект срабатывает только при изменении name

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const changeAge = (event: React.ChangeEvent<HTMLInputElement>) => setAge(Number(event.target.value));
    const unmount = () => {
        const rootElement = document.getElementById(nameBlockId);
        if (rootElement) {
            rootElement.innerHTML = '';
        }
    };

    useEffect(() => {
        const unmountBtn = document.getElementById('unmountBtn');
        // подписываемся на событие onclick кнопки unmountBtn
        if (unmountBtn) {
            unmountBtn.addEventListener('click', unmount);
            console.log('EventListener added');
        }

        return () => {
            // отписываемся от события
            if (unmountBtn) {
                unmountBtn.removeEventListener('click', unmount);
                console.log('EventListener removed');
            }
        };
    });

    return (
        <div style={{ border: '1px solid black', padding: '10px' }} id={nameBlockId}>
            <h3>Имя: {name}</h3>
            <h3>Возраст: {age}</h3>

            <div>
                <p>
                    Имя: <input type="text" value={name} onChange={changeName} />
                </p>
                <p>
                    Возраст: <input type="number" value={age} onChange={changeAge} />
                </p>
                <button id="unmountBtn">Unmount</button>
            </div>
        </div>
    );
}

export default EffectDemo;
