import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';

function Home() {
    // State variables and functions for handling inputs and result
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Function to handle calculation based on operation
    const handleOperation = async (selectedOperation) => {
        try {
            // Reset error state
            setError('');
            // Set loading state to true
            setLoading(true);
    
            // Define the response variable
            let response;
    
            // Make the appropriate axios request based on the selected operation
            if (selectedOperation === 'power') {
                response = await axios.get(`http://16.171.153.220:8084/${selectedOperation}/${parseFloat(firstValue)}/${parseFloat(secondValue)}`);
            } else {
                response = await axios.get(`http://16.171.153.220:8084/${selectedOperation}/${parseFloat(firstValue)}`);
            }
    
            // Update result state with the response data
            setResult(response.data);
        } catch (error) {
            // Set error state
            setError('An error occurred. Please try again later.');
            console.error('Error:', error);
        } finally {
            // Set loading state to false
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
                        name='first' 
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
            </form>

            <div className="functions-box">
                <button onClick={() => handleOperation('factorial')} disabled={loading}>Factorial</button>
                <button onClick={() => handleOperation('logarithmic')} disabled={loading}>Logarithmic</button>
                <button onClick={() => handleOperation('sqrt')} disabled={loading}>Square Root</button>
                <button onClick={() => handleOperation('power')} disabled={loading}>Power</button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-indicator">Loading...</div>}
        </div>
    );
}

export default Home;
