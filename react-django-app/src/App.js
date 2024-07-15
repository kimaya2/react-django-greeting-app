// src/App.js
import React from 'react';
import './App.css';
import GreetingForm from './GreetingForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Greeting App</h1>
        <GreetingForm />
      </header>
    </div>
  );
}

export default App;
