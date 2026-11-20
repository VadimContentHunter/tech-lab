import { useRef, useState } from 'react';

function RefCounter() {
    const countRef = useRef(0);
    const [, forceRender] = useState(0);

    function increment() {
        console.log('Было: ' + countRef.current);
        countRef.current += 1;
        console.log('Текущее значение: ' + countRef.current);
    }

    function decrement() {
        console.log('Было: ' + countRef.current);
        countRef.current -= 1;
        console.log('Текущее значение: ' + countRef.current);
    }

    function reset() {
        countRef.current = 0;
        console.log('Текущее значение: ' + countRef.current);
    }

    return (
        <div>
            <p>Count: {countRef.current}</p>
            <div>
                <button onClick={() => forceRender((render) => render + 1)}>Show Count</button>
                <button onClick={increment}>+1</button>
                <button onClick={decrement}>-1</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default RefCounter;
