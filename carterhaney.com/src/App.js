import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import { FaDownload, FaLink, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import NeonHeader from './components/NeonHeader';
import RotatingTypewriter from './components/RotatingTypewriter';
import Terminal from './components/Terminal.js';
import TopNav from './components/TopNav.js';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Blogs from './pages/Blogs.js';
import Home from './pages/Home.js';

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
      <TopNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;