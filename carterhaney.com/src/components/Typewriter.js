import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, delay, infinite }) => {
  const blank = '\u00A0';
  const [currentText, setCurrentText] = useState(blank);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => (prevText === blank ? '' : prevText) + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      timeout = setTimeout(() => {
        setCurrentText(blank);
        setCurrentIndex(0);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, delay, text, infinite]);

  return (
    <span>
      {currentText}
      <span className="typewriter-cursor"></span>
    </span>
  );
};

export default Typewriter;