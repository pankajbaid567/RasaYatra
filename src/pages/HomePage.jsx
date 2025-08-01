import { Link } from 'react-router-dom';
import { ArrowRight, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { api } from '../services/api';
import ChatBot from '../components/ChatBot';
import '../styles/pages/HomePage.css';
import React from 'react';

const HomePage = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recipesResponse, regionsResponse] = await Promise.all([
        api.getFeaturedRecipes(6),
        api.getRegions()
      ]);
      
      setFeaturedRecipes(recipesResponse || []);
      setRegions(regionsResponse || []);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      setFeaturedRecipes([]);
      setRegions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="hero-title">
                Discover India's Culinary Heritage
              </h1>
              <p className="hero-description">
                RasaYatra takes you on a flavorful journey through India's diverse culinary landscape, 
                exploring authentic recipes and the cultural stories behind them.
              </p>
              <div className="hero-actions">
                <Link to="/recipes" className="primary-button">
                  Explore Recipes <ArrowRight className="icon" />
                </Link>
                <Link to="/about" className="secondary-button">
                  Our Story
                </Link>
              </div>
            </motion.div>
            <motion.div 
              className="hero-image-container"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="images/hero-food.jpeg" 
                alt="Indian cuisine" 
                className="hero-image" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Recipes</h2>
            <Link to="/recipes" className="view-all-link">
              View All <ArrowRight className="icon" />
            </Link>
          </div>
          <div className="recipe-grid">
            {loading ? (
              <div className="loading-grid">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="recipe-card loading">
                    <div className="recipe-image loading-shimmer"></div>
                    <div className="recipe-info">
                      <div className="loading-text"></div>
                      <div className="loading-text short"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              featuredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/recipes/${recipe.id}`} className="recipe-card">
                    <div className="recipe-image-container">
                      <img src={recipe.image || '/images/default-recipe.jpg'} alt={recipe.title} className="recipe-image" />
                      <div className="recipe-region">{recipe.region}</div>
                    </div>
                    <div className="recipe-info">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-description">{recipe.description}</p>
                      <div className="recipe-meta">
                        <span className="recipe-time">{recipe.prepTime + recipe.cookTime} mins</span>
                        <span className="recipe-rating">{recipe.rating} ★</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explore by Region</h2>
            <Link to="/regions" className="view-all-link">
              View All <ArrowRight className="icon" />
            </Link>
          </div>
          <motion.div 
            className="map-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="map-content">
              <h3 className="map-title">Journey Through India's Flavors</h3>
              <p className="map-description">
                India's cuisine is as diverse as its culture. Discover regional specialties from 
                the spicy curries of the South to the aromatic biryanis of the North.
              </p>
              <Link to="/regions" className="map-button">
                <Map className="icon" /> Explore Regions
              </Link>
            </div>
            <div className="map-image-container">
              <img src="images/bharat-map.png" alt="Map of India" className="map-image" />
            </div>
          </motion.div>
        </div>
      </section>
      
      <ChatBot pageContext="home" />
    </div>
  );
};

export default HomePage;
