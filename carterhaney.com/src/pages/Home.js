import React from 'react';
import TopNav from '../components/TopNav';
import NeonHeader from '../components/NeonHeader';
import RotatingTypewriter from '../components/RotatingTypewriter';
import Terminal from '../components/Terminal';
import Button from '../components/Button';
import { FaDownload, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="App">
      {/* Top Navigation Bar */}
      <TopNav />

      {/* Header section */}
      <header className="App-header">
        {/* Default React Logo and instructions */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>Edit <code>src/App.js</code> and save to reload.</p> */}

        {/* Backend Message Test */}
        {/* <h1>{ message }</h1> */}
      </header>

      {/* Main section */}
      <main>
        {/* Neon Header Component */}
        <NeonHeader title="Carter Haney" />

        {/* Sub-header for skills */}
        <p>
          I'm working on{' '}
          <span style={{ display: 'inline-block' }}>
            <RotatingTypewriter delay={100} pause={1200} />
          </span>
        </p>

        {/* Div wrapper for buttons */}
        <div className='button-container' style={{ display: 'flex' }}>
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

        {/* Terminal component */}
        <div style={{ margin: '2rem 0', display: 'flex', justifyContent: 'center' }}>
          <Terminal />
        </div>
      </main>

      {/* Footer section */}
      <footer></footer>
    </div>
  );
};

export default Home;