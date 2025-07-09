import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import { ResumeButton } from './components/Button';
import React, { useState, useEffect } from 'react';

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div className='button-container' style={{display: 'flex'}}>
        <Button />
        <ResumeButton />
        </div>

        <h1>{ message }</h1>

      </header>
    </div>
  );
}

export default App;