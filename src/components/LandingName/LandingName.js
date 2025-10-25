import React from 'react';
import AnimatedTyping from '../AnimatedTyping/AnimatedTyping';
import './LandingName.css';

export default function LandingName() {
	return (
		<div id="home" className="landing-name">
			<AnimatedTyping 
				text="Carter Haney" 
				speed={80}
				className="landing-name-text"
			/>
		</div>
	);
}
