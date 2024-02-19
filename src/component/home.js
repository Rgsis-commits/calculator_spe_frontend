import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';

function Home() {
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleOperation = async (selectedOperation) => {
        try {
            setResult('');
            setOperation(selectedOperation);
            setLoading(true);
            setError('');
    
            const handleOperation = async (selectedOperation) => {
        try {
            setResult('');
            setOperation(selectedOperation);
            setLoading(true);
            setError('');

            let response;
            if (selectedOperation === 'power') {
                response = await axios.get(`http://172.31.35.22:8084/${selectedOperation}/${parseFloat(firstValue)}/${parseFloat(secondValue)}`);
            } else {
                response = await axios.get(`http://172.31.35.22:8084/${selectedOperation}/${parseFloat(firstValue)}`);
            }
            

            setResult(response.data);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <h3>Calculator</h3>
            <form>
                <div>
                    <label htmlFor="first">Enter Number: </label>
                    <input
                        type='number'
                        id='first'
                        className='first'
                        value={firstValue || ''}
                        onChange={(e) => setFirstValue(e.target.value)}
                    />
                </div>
                {['power'].includes(operation) && (
                    <div>
                        <label htmlFor="second">Enter Exponent: </label>
                        <input
                            type='number'
                            id='second'
                            name='second'
                            value={secondValue || ''}
                            onChange={(e) => setSecondValue(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    Result: <input
                        type='text'
                        id='result'
                        value={result || ''}
                        readOnly
                    />
                </div>
                <div className="error-message">{error}</div>
                {loading && <div className="loading-indicator">Loading...</div>}
            </form>

            <div className="functions-box">
                <button onClick={() => handleOperation('factorial')}>Factorial</button>
                <button onClick={() => handleOperation('logarithmic')}>Logarithmic</button>
                <button onClick={() => handleOperation('sqrt')}>Square Root</button>
                <button onClick={() => handleOperation('power')}>Power</button>
            </div>
        </div>
    );
}

export default Home;
