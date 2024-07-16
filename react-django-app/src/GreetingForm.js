// src/GreetingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GreetingForm() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('');
    const [names, setNames] = useState([]);

    const fetchNames = async () => {
        try {
            const namesResponse = await axios.get('http://3.15.26.36:8000/api/names/');
            setNames(namesResponse.data.names);
        } catch (error) {
            console.error('There was an error fetching the names!', error);
        }
    };

    useEffect(() => {
        fetchNames();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://3.15.26.36:8000/api/greet/', { name });
            setGreeting(response.data.greeting);
            await fetchNames(); // Fetch names again after adding a new name
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your name" 
                />
                <button type="submit">Greet</button>
            </form>
            {greeting && <p>{greeting}</p>}
            <h3>Greeted Names:</h3>
            <ul>
                {names.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GreetingForm;
