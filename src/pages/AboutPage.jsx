import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Award } from 'lucide-react';
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
              <img src="images/indian-spices.jpg" alt="Indian spices and ingredients" />
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
                <div className="story-year">2020</div>
                <h3>The Idea</h3>
                <p>
                  During the pandemic, we realized how disconnected people had become from 
                  their culinary roots. RasaYatra was born from the desire to bridge this gap.
                </p>
              </div>
              <div className="story-item">
                <div className="story-year">2021</div>
                <h3>Research & Development</h3>
                <p>
                  We spent months traveling across India, documenting traditional recipes 
                  and learning from local cooks and grandmothers.
                </p>
              </div>
              <div className="story-item">
                <div className="story-year">2022</div>
                <h3>Building the Platform</h3>
                <p>
                  With over 500 authentic recipes collected, we began building the digital 
                  platform to share these culinary treasures.
                </p>
              </div>
              <div className="story-item">
                <div className="story-year">2023</div>
                <h3>Community Growth</h3>
                <p>
                  Today, RasaYatra serves thousands of food enthusiasts worldwide, 
                  preserving culinary heritage one recipe at a time.
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
    </div>
  );
};

export default AboutPage;
