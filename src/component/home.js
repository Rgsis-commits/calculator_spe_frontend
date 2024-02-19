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

    const handleOperation = (selectedOperation) => {
        setOperation(selectedOperation);
        setResult(''); // Clear result when operation changes
        // Remove selected-operation class from all buttons
        document.querySelectorAll('.functions-box button').forEach(btn => {
            btn.classList.remove('selected-operation');
        });
        // Add selected-operation class to the clicked button
        document.getElementById(selectedOperation).classList.add('selected-operation');
    };

    const handleCalculate = async () => {
        try {
            setLoading(true);
            setError('');

            let response;
            if (operation === 'power') {
                response = await axios.get(`http://13.51.168.92:8086/${operation}/${parseFloat(firstValue)}/${parseFloat(secondValue)}`);
            } else {
                response = await axios.get(`http://13.51.168.92:8086/${operation}/${parseFloat(firstValue)}`);
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
                <button id="factorial" onClick={() => handleOperation('factorial')}>Factorial</button>
                <button id="logarithmic" onClick={() => handleOperation('logarithmic')}>Logarithmic</button>
                <button id="sqrt" onClick={() => handleOperation('sqrt')}>Square Root</button>
                <button id="power" onClick={() => handleOperation('power')}>Power</button>
            </div>

            <button onClick={handleCalculate}>Calculate</button>
        </div>
    );
}

export default Home;
