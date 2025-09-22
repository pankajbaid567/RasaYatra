import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3 className="footer-logo">RasaYatra</h3>
            <p className="footer-tagline">A Journey Through Indian Cuisine</p>
            <p className="footer-description">
              Discover authentic Indian recipes, explore regional cuisines, and connect with a community of food lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Explore Recipes</Link></li>
              <li><Link to="/regions">Regional Cuisines</Link></li>
              <li><Link to="/community">Community</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div className="footer-features">
            <h4 className="footer-title">Features</h4>
            <ul className="footer-list">
              <li><Link to="/favorites">My Favorites</Link></li>
              <li><Link to="/bookmarks">Bookmarks</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><a href="#ai-assistant">AI Assistant</a></li>
              <li><a href="#chatbot">Recipe Chat</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer-contact">
            <h4 className="footer-title">Connect With Us</h4>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <span className="social-icon">📘</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span className="social-icon">📷</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span className="social-icon">🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <span className="social-icon">📺</span>
              </a>
            </div>
            <div className="contact-info">
              <p>📧 support@rasayatra.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} RasaYatra. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
              <Link to="/cookies" className="legal-link">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
