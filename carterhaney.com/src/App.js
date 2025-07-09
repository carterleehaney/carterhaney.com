import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import React, { useState, useEffect } from 'react';
import { FaDownload, FaLink } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import NeonHeader from './components/NeonHeader';
import Typewriter from './components/Typewriter';

function App() {

  const [message, setMessage] = useState("");

  // Fetch message from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error("Error fetching message:", error));
  }, []);

  return (
    <div className="App">

      { /* Header section */ }
      <header className="App-header">

        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Edit <code>src/App.js</code> and save to reload.</p>

        {/* Backend Message Test */}
        <h1>{ message }</h1>

      </header>

      { /* Main section */ }
      <main>

        {/* Neon Header Component */}
        <NeonHeader title="Carter Haney" />

        {/* Sub-header for skills (Make this a component...*/}
        {/* <p>I do <strong><Typewriter text="Active Directory..." delay={100} infinite={true} /></strong></p> */}
        
        {/* Div wrapper for buttons */}
        <div className='button-container' style={{display: 'flex'}}>
        <Button
          icon={<FaDownload />}
          label="Resume"
          link="carterhaney.com/resume.pdf"
        />
        <Button
          icon={<FaLinkedin />}
          label="LinkedIn"
          link="https://www.linkedin.com/in/carterhaney"
        />
        <Button
          icon={<FaGithub />}
          label="GitHub"
          link="https://github.com/carterleehaney"
        />
        <Button
          icon={<FaDiscord />}
          label="Discord"
          link="https://discord.com/users/divinelumina"
        />
        </div>
        </main>

    </div>
  );
}

export default App;