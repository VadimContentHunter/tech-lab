import { useEffect, useState } from 'react';

function TimerApp() {
    const [seconds, setSeconds] = useState(1);
    const [tickCount, setTickCount] = useState(0);

    useEffect(() => {
        console.log('Mounted');

        return () => {
            console.log('Unmounted');
        };
    }, []);

    useEffect(() => {
        console.log('Timer started:', seconds);

        const intervalId = setInterval(() => {
            console.log('Tick:', seconds);
            setTickCount((prev) => prev + 1);
        }, seconds * 1000);

        return () => {
            console.log('Timer stopped:', seconds);
            clearInterval(intervalId);
        };
    }, [seconds]);

    const resetTimer = () => {
        setSeconds(1);
        setTickCount(0);
    };
    const increaseTimer = () => setSeconds((prev) => prev + 1);

    return (
        <div id="timerApp">
            <h3>Tick count: {tickCount}</h3>
            <p>Interval: {seconds} seconds</p>
            <button onClick={resetTimer}>Reset Timer</button>
            <button onClick={increaseTimer}>Increase interval</button>
        </div>
    );
}

function Timer() {
    const [isMounted, setIsMounted] = useState(true);

    const unmount = () => {
        setIsMounted(false);
    };

    return (
        <div>
            <h2>Timer App</h2>

            {isMounted && <TimerApp />}

            <button onClick={unmount}>Delete Timer</button>
        </div>
    );
}

export default Timer;
