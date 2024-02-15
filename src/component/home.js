import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';

function Home() {
    // State variables and functions for handling inputs and result
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
    const [result, setResult] = useState('');
    const [operation, setOperation] = useState('');

    // Function to handle calculation based on operation
    const handleOperation = async (selectedOperation) => {
        try {
            // Reset the result state
            setResult('');
    
            // Set the selected operation
            setOperation(selectedOperation);
    
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
            console.error('Error:', error);
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
                <button onClick={() => handleOperation('factorial')}>Factorial</button>
                <button onClick={() => handleOperation('logarithmic')}>Logarithmic</button>
                <button onClick={() => handleOperation('sqrt')}>Square Root</button>
                <button onClick={() => handleOperation('power')}>Power</button>
            </div>
        </div>
    );
}

export default Home;
