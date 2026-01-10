import React from 'react';
import './Home.css';

const Home = () => {
  const workers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      skill: 'Carpentry',
      rating: 'Gold',
      score: 92,
      location: 'Mumbai'
    },
    {
      id: 2,
      name: 'Amit Sharma',
      skill: 'Electrical',
      rating: 'Silver',
      score: 78,
      location: 'Delhi'
    },
    {
      id: 3,
      name: 'Suresh Patel',
      skill: 'Plumbing',
      rating: 'Bronze',
      score: 65,
      location: 'Bangalore'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      skill: 'Masonry',
      rating: 'Gold',
      score: 88,
      location: 'Chennai'
    }
  ];

  const getRatingClass = (rating) => {
    switch (rating.toLowerCase()) {
      case 'gold': return 'rating-gold';
      case 'silver': return 'rating-silver';
      case 'bronze': return 'rating-bronze';
      default: return '';
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <h1 className="hero-title">Video-Based Skill Verification</h1>
          <p className="hero-subtitle">Show your skills, get rated, find better work</p>
          <div className="hero-buttons">
            <a href="/upload" className="upload-button">Upload Your Skills</a>
            <a href="/workers" className="find-button">Find Workers</a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="how-it-works-container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-icon">📹</div>
              <h3 className="step-title">Upload Video</h3>
              <p className="step-description">Record and upload your skill demonstration</p>
            </div>
            <div className="step">
              <div className="step-icon">⭐</div>
              <h3 className="step-title">Get Rated</h3>
              <p className="step-description">AI analyzes quality, speed, and precision</p>
            </div>
            <div className="step">
              <div className="step-icon">💼</div>
              <h3 className="step-title">Get Hired</h3>
              <p className="step-description">Contractors hire based on verified skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workers Section */}
      <section className="workers-section">
        <div className="workers-container">
          <div className="section-header">
            <h2 className="section-title">Top Rated Workers</h2>
            <a href="/upload" className="upload-video-button">Upload Your Video</a>
          </div>

          <div className="workers-grid">
            {workers.map(worker => (
              <div key={worker.id} className="worker-card">
                <div className="video-preview">
                  <div className="video-overlay">
                    <div className="play-button">▶️</div>
                  </div>
                  <span className={`rating-badge ${getRatingClass(worker.rating)}`}>
                    {worker.rating}
                  </span>
                </div>

                <div className="worker-info">
                  <div className="worker-header">
                    <div>
                      <h3 className="worker-name">{worker.name}</h3>
                      <p className="worker-skill">{worker.skill}</p>
                    </div>
                    <div className="worker-score">
                      <div className="score-value">{worker.score}%</div>
                      <div className="score-label">Score</div>
                    </div>
                  </div>
                  
                  <div className="worker-location">📍 {worker.location}</div>

                  <div className="action-buttons">
                    <a href={`/worker/${worker.id}`} className="profile-button">
                      View Profile
                    </a>
                    <button className="compare-button">
                      Compare Videos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Show Your Skills?</h2>
          <p className="cta-description">
            Upload a 2-minute video of your work and get your Skill Score today
          </p>
          <a href="/upload" className="cta-button">Get Started Free</a>
        </div>
      </section>
    </div>
  );
};

export default Home;