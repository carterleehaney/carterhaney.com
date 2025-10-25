import React from 'react';
import './AboutMe.css';

export default function AboutMe() {
	return (
		<section id="about" className="about-me">
			<div className="about-content">
				<h1 className="about-title">About Me</h1>
				<p className="about-paragraph">
					Hi! I'm Carter, a soon-to-be graduate with a Bachelor's degree in Computer Science from
                    Tennessee Tech University. I love cybersecurity, particularly offsensive security and defensive tooling.
                    I also enjoy building infrastructure and scaling cloud environments.
                </p>
                <p className="about-paragraph">
					Some more information about me, I enjoy writing, going on walks, and web development in my free time.
                    I have three dogs, Cooper, Carley, and Charlie, who keep me pretty busy. Feel free to connect with me on
                    LinkedIn, I'd love to network!
				</p>
			</div>
		</section>
	);
}
