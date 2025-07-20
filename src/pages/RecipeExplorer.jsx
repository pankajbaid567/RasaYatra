import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Star, ChefHat, MapPin } from 'lucide-react';
import { getAllRecipes } from '../data/recipes';
import ChatBot from '../components/ChatBot';
import '../styles/pages/RecipeExplorer.css';

const RecipeExplorer = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCookTime, setSelectedCookTime] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  const regions = ['All', 'Punjab', 'South India', 'North India', 'West Bengal', 'Rajasthan', 'Gujarat', 'Maharashtra', 'Hyderabad'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const cookTimes = ['All', 'Under 30 mins', '30-60 mins', 'Over 1 hour'];

  useEffect(() => {
    const allRecipes = getAllRecipes();
    setRecipes(allRecipes);
    setFilteredRecipes(allRecipes);
  }, []);

  useEffect(() => {
    let filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = !selectedRegion || selectedRegion === 'All' || recipe.region === selectedRegion;
      const totalTime = recipe.prepTime + recipe.cookTime;
      const matchesCookTime = !selectedCookTime || selectedCookTime === 'All' ||
                            (selectedCookTime === 'Under 30 mins' && totalTime < 30) ||
                            (selectedCookTime === '30-60 mins' && totalTime >= 30 && totalTime <= 60) ||
                            (selectedCookTime === 'Over 1 hour' && totalTime > 60);

      return matchesSearch && matchesRegion && matchesCookTime;
    });

    // Sort recipes
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'time':
        filtered.sort((a, b) => (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep featured order
        break;
    }

    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedRegion, selectedDifficulty, selectedCookTime, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedDifficulty('');
    setSelectedCookTime('');
    setSortBy('featured');
  };

  return (
    <div className="recipe-explorer">
      {/* Hero Section */}
      <section className="explorer-hero">
        <div className="container">
          <motion.div 
            className="explorer-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="explorer-title">Explore Recipes</h1>
            <p className="explorer-description">
              Discover authentic Indian recipes from every corner of the subcontinent. 
              Search, filter, and find your next culinary adventure.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="search-filters-section">
        <div className="container">
          <div className="search-filters-container">
            {/* Search Bar */}
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Filter Toggle */}
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="filter-icon" />
              Filters
            </button>

            {/* Sort Dropdown */}
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="time">Cooking Time</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>

          {/* Filters Panel */}
          <motion.div 
            className={`filters-panel ${showFilters ? 'active' : ''}`}
            initial={false}
            animate={{ height: showFilters ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filters-content">
              <div className="filter-group">
                <label className="filter-label">Region</label>
                <select 
                  value={selectedRegion} 
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="filter-select"
                >
                  {regions.map(region => (
                    <option key={region} value={region === 'All' ? '' : region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Cooking Time</label>
                <select 
                  value={selectedCookTime} 
                  onChange={(e) => setSelectedCookTime(e.target.value)}
                  className="filter-select"
                >
                  {cookTimes.map(time => (
                    <option key={time} value={time === 'All' ? '' : time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-actions">
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Summary */}
          <div className="results-summary">
            <span className="results-count">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
            </span>
            {(searchTerm || selectedRegion || selectedCookTime) && (
              <span className="active-filters">
                {searchTerm && ` • "${searchTerm}"`}
                {selectedRegion && ` • ${selectedRegion}`}
                {selectedCookTime && ` • ${selectedCookTime}`}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="recipes-grid-section">
        <div className="container">
          {filteredRecipes.length > 0 ? (
            <div className="recipes-grid">
              {filteredRecipes.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="recipe-card-wrapper"
                >
                  <Link to={`/recipes/${recipe.id}`} className="recipe-card">
                    <div className="recipe-image-container">
                      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                      <div className="recipe-badges">
                        <span className="recipe-region-badge">
                          <MapPin className="badge-icon" />
                          {recipe.region}
                        </span>
                        {recipe.seasonal && (
                          <span className="seasonal-badge">Seasonal</span>
                        )}
                      </div>
                    </div>
                    <div className="recipe-info">
                      <h3 className="recipe-title">{recipe.title}</h3>
                      <p className="recipe-description">{recipe.description}</p>
                      <div className="recipe-meta">
                        <div className="meta-item">
                          <Clock className="meta-icon" />
                          <span>{recipe.prepTime + recipe.cookTime} mins</span>
                        </div>
                        <div className="meta-item">
                          <Star className="meta-icon" />
                          <span>{recipe.rating}</span>
                        </div>
                        <div className="meta-item">
                          <ChefHat className="meta-icon" />
                          <span>{recipe.difficulty || 'Medium'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <ChefHat className="no-results-icon" />
              <h3>No recipes found</h3>
              <p>Try adjusting your search criteria or clearing the filters.</p>
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
      
      <ChatBot pageContext="recipes" />
    </div>
  );
};

export default RecipeExplorer;
