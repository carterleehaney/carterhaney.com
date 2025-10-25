import React, { useState, useEffect } from 'react';
import './AnimatedTyping.css';

export default function AnimatedTyping({ 
	text = '', 
	speed = 50, 
	className = '', 
	style = {},
	startDelay = 0 
}) {
	const [displayedText, setDisplayedText] = useState('');
	const [isTyping, setIsTyping] = useState(false);

	useEffect(() => {
		// Reset when text changes
		setDisplayedText('');
		setIsTyping(false);

		// Start after delay
		const startTimer = setTimeout(() => {
			setIsTyping(true);
		}, startDelay);

		return () => clearTimeout(startTimer);
	}, [text, startDelay]);

	useEffect(() => {
		if (!isTyping) return;

		let currentIndex = 0;

		const typingInterval = setInterval(() => {
			if (currentIndex < text.length) {
				setDisplayedText(text.slice(0, currentIndex + 1));
				currentIndex++;
			} else {
				clearInterval(typingInterval);
			}
		}, speed);

		return () => clearInterval(typingInterval);
	}, [text, speed, isTyping]);

	return (
		<span className={`animated-typing ${className}`} style={style}>
			{displayedText}
			<span className="typing-cursor"></span>
		</span>
	);
}
