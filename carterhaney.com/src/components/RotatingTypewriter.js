import React, { useState, useEffect } from 'react';

{ /* This was also vibe-coded. But it works :) */ }

const topics = [
  "Active Directory...",
  "Incident Response...",
  "Penetration Testing...",
  "Forensics...",
  "Network Analysis...",
  "Homelabbing...",
  "Cyber Defense...",
  "Threat Hunting...",
  "Vulnerability Management...",
  "Infrastructure...",
  "Virtualization..."
];

const TYPING = "typing";
const DELETING = "deleting";

const RotatingTypewriter = ({ delay = 100, pause = 1200 }) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [mode, setMode] = useState(TYPING);

  useEffect(() => {
    let timeout;
    const current = topics[index];

    if (mode === TYPING) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, delay);
      } else {
        timeout = setTimeout(() => setMode(DELETING), pause);
      }
    } else if (mode === DELETING) {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, delay / 2);
      } else {
        timeout = setTimeout(() => {
          setIndex((index + 1) % topics.length);
          setMode(TYPING);
        }, delay);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, mode, index, delay, pause]);

  return (
    <span className="NeonHeader NeonHeader-inline">
      {displayed}
      <span className="typewriter-cursor"></span>
    </span>
  );
};

export default RotatingTypewriter;