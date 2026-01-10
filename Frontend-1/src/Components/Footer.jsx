import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="company-info">
            <a href="/" className="footer-logo">
              <div className="footer-logo-icon">
                <span>SV</span>
              </div>
              <span className="footer-logo-text">SkillVerify</span>
            </a>
            <p className="company-description">
              Video-based skill verification platform for blue-collar workers.
            </p>
          </div>

          <div className="links-section">
            <h3>Quick Links</h3>
            <ul className="links-list">
              <li><a href="/workers" className="footer-link">Find Workers</a></li>
              <li><a href="/upload" className="footer-link">Upload Video</a></li>
              <li><a href="/how-it-works" className="footer-link">How it Works</a></li>
            </ul>
          </div>

          <div className="contact-section">
            <h3>Contact</h3>
            <ul className="contact-info">
              <li>support@skillverify.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="copyright">
          &copy; {currentYear} SkillVerify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;