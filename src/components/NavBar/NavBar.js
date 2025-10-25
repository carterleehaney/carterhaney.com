import React from 'react';
import './NavBar.css';

// Very barebones navigation outline — stateless and minimal markup.
export default function NavBar() {
	return (
		<nav className="navbar" aria-label="Main navigation">
			<div className="navbar-brand">Carter Haney</div>
			
			<div className="navbar-center">
				<ul className="navbar-links">
					<li><a href="#home">Home</a></li>
					<li><a href="#certifications">Certifications</a></li>
					<li><a href="#about">About Me</a></li>					
					<li><a href={`${process.env.PUBLIC_URL || ''}/resume.pdf`}>Resume</a></li>
				</ul>
			</div>

			<div className="navbar-right">
				<a href="https://blog.carterhaney.com" className="blog-button" target="_blank" rel="noopener noreferrer">
					Blog
				</a>
			</div>
		</nav>
	);
}
