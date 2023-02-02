import React, {useState} from 'react';

const Counter = () => {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }

    function decrement() {
        setCount(count - 1)
    }

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={increment}>Inc</button>
            <button onClick={decrement}>Drc</button>
        </div>
    );
};

export default Counter;