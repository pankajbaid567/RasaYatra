import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Award } from 'lucide-react';
import ChatBot from '../components/ChatBot';
import '../styles/pages/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.div 
            className="about-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="about-hero-title">Our Story</h1>
            <p className="about-hero-description">
              RasaYatra began as a passion project to preserve and share the rich culinary 
              heritage of India. We believe that food is more than sustenance—it's culture, 
              history, and love served on a plate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <motion.div 
              className="mission-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-description">
                To create a comprehensive digital platform that celebrates India's diverse 
                culinary traditions, making authentic recipes accessible to food enthusiasts 
                worldwide while preserving the cultural stories behind each dish.
              </p>
              <div className="mission-values">
                <div className="value-item">
                  <Heart className="value-icon" />
                  <h3>Passion for Authenticity</h3>
                  <p>Every recipe is carefully researched and tested to ensure authenticity.</p>
                </div>
                <div className="value-item">
                  <Users className="value-icon" />
                  <h3>Community Driven</h3>
                  <p>Built by food lovers, for food lovers, fostering a global community.</p>
                </div>
                <div className="value-item">
                  <Globe className="value-icon" />
                  <h3>Cultural Bridge</h3>
                  <p>Connecting people worldwide through the universal language of food.</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="mission-image"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img src="images/indian-spices.webp" alt="Indian spices and ingredients" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <motion.div 
            className="story-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">The Journey Begins</h2>
            <div className="story-grid">
              <div className="story-item">
                <div className="story-year">2022</div>
                <h3>The Vision</h3>
                <p>
                  Inspired by the growing interest in authentic regional cuisines post-pandemic, 
                  we envisioned a platform that would make traditional Indian recipes accessible 
                  to the modern digital generation.
                </p>
              </div>
              <div className="story-item">
                <div className="story-year">2023</div>
                <h3>Deep Dive Research</h3>
                <p>
                  We embarked on an extensive journey across India's 28 states, collecting 
                  over 800 authentic recipes from home cooks, street vendors, and heritage kitchens, 
                  documenting their stories and techniques.
                </p>
              </div>
              <div className="story-item">
                <div className="story-year">2024</div>
                <h3>Platform Development</h3>
                <p>
                  With our comprehensive recipe database and cultural insights, we built 
                  RasaYatra using cutting-edge technology to create an immersive culinary 
                  experience that honors tradition while embracing innovation.
                </p>
              </div>
              <div className="story-item">
                <div className="story-year">2025</div>
                <h3>Launch & Community</h3>
                <p>
                  This spring, RasaYatra officially launched, already connecting thousands 
                  of food enthusiasts globally. We're building a vibrant community that 
                  celebrates India's culinary diversity and preserves it for future generations.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="features-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">What Makes Us Different</h2>
            <div className="features-grid">
              <div className="feature-card">
                <Award className="feature-icon" />
                <h3>Authentic Recipes</h3>
                <p>
                  Every recipe is sourced from traditional cooks and verified for authenticity. 
                  No shortcuts, no substitutions—just pure tradition.
                </p>
              </div>
              <div className="feature-card">
                <Globe className="feature-icon" />
                <h3>Regional Diversity</h3>
                <p>
                  From Kashmir to Kanyakumari, we celebrate the incredible diversity of 
                  Indian cuisine across all states and regions.
                </p>
              </div>
              <div className="feature-card">
                <Heart className="feature-icon" />
                <h3>Cultural Stories</h3>
                <p>
                  Each recipe comes with its story—the history, traditions, and cultural 
                  significance that make it special.
                </p>
              </div>
              <div className="feature-card">
                <Users className="feature-icon" />
                <h3>Community Sharing</h3>
                <p>
                  Join a community of food lovers sharing tips, variations, and their own 
                  family recipes from across the globe.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Join Our Culinary Journey</h2>
            <p>
              Be part of preserving and celebrating India's incredible culinary heritage. 
              Start exploring authentic recipes today.
            </p>
            <div className="cta-buttons">
              <a href="/recipes" className="primary-button">
                Explore Recipes
              </a>
              <a href="/contact" className="secondary-button">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <ChatBot pageContext="about" />
    </div>
  );
};

export default AboutPage;
