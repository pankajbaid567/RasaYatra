import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ChefHat, Utensils, Star, ArrowRight } from 'lucide-react';
import { regions } from '../data/regions';
import { getAllRecipes } from '../data/recipes';
import ChatBot from '../components/ChatBot';
import '../styles/pages/RegionExplorer.css';

const RegionExplorer = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const allRecipes = getAllRecipes();

  const getRecipesByRegion = (regionName) => {
    return allRecipes.filter(recipe => {
      const region = regions.find(r => r.name === regionName);
      if (!region) return false;
      
      // Check if recipe region matches any state in the region or the region name itself
      return region.states.includes(recipe.region) || recipe.region === regionName;
    });
  };

  const handleRegionClick = (region) => {
    setSelectedRegion(selectedRegion?.id === region.id ? null : region);
  };

  return (
    <div className="region-explorer">
      {/* Hero Section */}
      <section className="regions-hero">
        <div className="container">
          <motion.div 
            className="regions-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="regions-title">Explore by Region</h1>
            <p className="regions-description">
              Journey through India's diverse culinary landscape. Each region tells a unique 
              story through its flavors, ingredients, and cooking traditions shaped by history, 
              geography, and culture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="regions-grid-section">
        <div className="container">
          <div className="regions-grid">
            {regions.map((region, index) => {
              const regionRecipes = getRecipesByRegion(region.name);
              const isSelected = selectedRegion?.id === region.id;
              
              return (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`region-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleRegionClick(region)}
                >
                  <div className="region-image-container">
                    <img src={region.imageUrl} alt={region.name} className="region-image" />
                    <div className="region-overlay">
                      <div className="region-stats">
                        <div className="stat-item">
                          <Utensils className="stat-icon" />
                          <span>{regionRecipes.length} recipes</span>
                        </div>
                        <div className="stat-item">
                          <MapPin className="stat-icon" />
                          <span>{region.states.length} states</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="region-info">
                    <h3 className="region-name">{region.name}</h3>
                    <p className="region-brief">{region.description.substring(0, 120)}...</p>
                    
                    <div className="region-highlights">
                      <div className="highlight-item">
                        <ChefHat className="highlight-icon" />
                        <span>Famous for: {region.famousDishes.slice(0, 2).join(', ')}</span>
                      </div>
                    </div>
                    
                    <button className="explore-region-btn">
                      {isSelected ? 'Close Details' : 'Explore Region'}
                      <ArrowRight className={`btn-icon ${isSelected ? 'rotated' : ''}`} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Region Details */}
      {selectedRegion && (
        <motion.section 
          className="region-details-section"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container">
            <div className="region-details">
              <div className="details-content">
                <div className="details-header">
                  <h2 className="details-title">{selectedRegion.name} Cuisine</h2>
                  <p className="details-description">{selectedRegion.description}</p>
                </div>

                <div className="details-grid">
                  <div className="detail-section">
                    <h3 className="section-title">Famous Dishes</h3>
                    <div className="items-grid">
                      {selectedRegion.famousDishes.map((dish, index) => (
                        <span key={index} className="item-tag dish-tag">{dish}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">Key Ingredients</h3>
                    <div className="items-grid">
                      {selectedRegion.keyIngredients.map((ingredient, index) => (
                        <span key={index} className="item-tag ingredient-tag">{ingredient}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">Cultural Influences</h3>
                    <div className="items-grid">
                      {selectedRegion.culinaryInfluences.map((influence, index) => (
                        <span key={index} className="item-tag influence-tag">{influence}</span>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <h3 className="section-title">States & Territories</h3>
                    <div className="items-grid">
                      {selectedRegion.states.map((state, index) => (
                        <span key={index} className="item-tag state-tag">{state}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Region Recipes */}
                <div className="region-recipes">
                  <h3 className="section-title">Recipes from {selectedRegion.name}</h3>
                  {getRecipesByRegion(selectedRegion.name).length > 0 ? (
                    <div className="region-recipes-grid">
                      {getRecipesByRegion(selectedRegion.name).map((recipe) => (
                        <Link 
                          key={recipe.id} 
                          to={`/recipes/${recipe.id}`} 
                          className="region-recipe-card"
                        >
                          <div className="recipe-image-container">
                            <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                          </div>
                          <div className="recipe-info">
                            <h4 className="recipe-title">{recipe.title}</h4>
                            <p className="recipe-description">{recipe.description}</p>
                            <div className="recipe-meta">
                              <span className="recipe-time">{recipe.prepTime + recipe.cookTime} mins</span>
                              <span className="recipe-rating">
                                <Star className="star-icon" />
                                {recipe.rating}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="no-recipes">
                      <ChefHat className="no-recipes-icon" />
                      <p>More recipes from this region coming soon!</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Call to Action */}
      <section className="regions-cta">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Ready to Start Cooking?</h2>
            <p>
              Explore our complete collection of authentic recipes from across India. 
              Each recipe comes with detailed instructions and cultural stories.
            </p>
            <Link to="/recipes" className="cta-button">
              <ChefHat className="btn-icon" />
              Browse All Recipes
            </Link>
          </motion.div>
        </div>
      </section>
      
      <ChatBot pageContext="regions" />
    </div>
  );
};

export default RegionExplorer;
