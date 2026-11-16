import { CSSProperties, useState } from 'react';

function Counter() {
    // const style: CSSProperties = {
    //     display: 'flex',
    //     flexDirection: 'column',
    // };

    const [count, setCount] = useState(0);
    // console.log('Render:', count);

    function testIncrement() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

    function testIncrement3() {
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
        setCount((prev) => prev + 1);
    }

    function increment() {
        setCount((prev) => prev + 1);
    }

    function decrement() {
        setCount(count - 1);
    }

    function reset() {
        setCount(0);
    }

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
            <button onClick={reset}>Reset</button>
            <hr></hr>
            <button onClick={testIncrement}>Test Increment</button>
            <button onClick={testIncrement3}>Test Increment 3</button>
        </div>
    );
}

export default Counter;
