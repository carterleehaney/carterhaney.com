import React, { useState } from 'react';
import './CertificationsCarousel.css';

export default function CertificationsCarousel() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState('right');

	const certifications = [
		{
			id: 1,
			title: 'Certified Red Team Operator',
			image: '/images/certifications/rto.jpg',
			issuer: 'Zero Point Security',
			year: 'August 2025',
			verificationLink: 'https://certs.zeropointsecurity.co.uk/c815fb20-48a5-4b03-990b-86ae729f13cc'
		},
		{
			id: 2,
			title: 'Security+',
			image: '/images/certifications/comptia.jpg',
			issuer: 'CompTIA',
			year: 'June 2025',
            verificationLink: 'https://linkedin.com/in/carterhaney'
		},
		{
			id: 3,
			title: 'ITF+',
			image: '/images/certifications/comptia.jpg',
			issuer: 'CompTIA',
			year: 'May 2022',
            verificationLink: 'https://linkedin.com/in/carterhaney'
		}
	];

	const nextSlide = () => {
		setDirection('left');
		setCurrentIndex((prev) => 
			prev === 0 ? certifications.length - 1 : prev - 1
		);
	};

	const prevSlide = () => {
		setDirection('right');
		setCurrentIndex((prev) => (prev + 1) % certifications.length);
	};

	const goToSlide = (index) => {
		setDirection(index > currentIndex ? 'right' : 'left');
		setCurrentIndex(index);
	};

	const getPosition = (index) => {
		if (index === currentIndex) return 'center';
		
		const leftIndex = (currentIndex - 1 + certifications.length) % certifications.length;
		const rightIndex = (currentIndex + 1) % certifications.length;
		
		if (index === leftIndex) return 'left';
		if (index === rightIndex) return 'right';
		
		// Determine if hidden card should be positioned far left or far right
		if (direction === 'right') {
			// Cards entering from right, exiting to left
			return 'hidden from-left';
		} else {
			// Cards entering from left, exiting to right
			return 'hidden from-right';
		}
	};

	return (
		<div id="certifications" className="certifications-carousel">
			<h2 className="carousel-title">Certifications</h2>
			
			<div className="carousel-container">
				<button 
					className="carousel-button prev" 
					onClick={prevSlide}
					aria-label="Previous certification"
				>
					<span className="arrow-icon">‹</span>
				</button>

				<div className="carousel-viewport">
					<div className="carousel-cards">
						{certifications.map((cert, index) => (
							<div key={cert.id} 
								className={`carousel-card-wrapper ${getPosition(index)}`}
							>
								<div className="certification-card">
									<img 
										src={cert.image} 
										alt={cert.title}
										className="certification-image"
									/>
									<div className="certification-info">
										<h3 className="certification-title">{cert.title}</h3>
										<p className="certification-issuer">{cert.issuer}</p>
										<p className="certification-year">{cert.year}</p>
									</div>
									{cert.verificationLink && (
										<a 
											href={cert.verificationLink} 
											target="_blank" 
											rel="noopener noreferrer"
											className="verification-badge"
											aria-label="Verify certification"
										>
											✓
										</a>
									)}
								</div>
							</div>
						))}
					</div>
				</div>

				<button 
					className="carousel-button next" 
					onClick={nextSlide}
					aria-label="Next certification"
				>
					<span className="arrow-icon">›</span>
				</button>
			</div>

			<div className="carousel-indicators">
				{certifications.map((_, index) => (
					<button
						key={index}
						className={`indicator ${index === currentIndex ? 'active' : ''}`}
						onClick={() => goToSlide(index)}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
}
