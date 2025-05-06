import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { indiaRegionsData } from '../map/indiaRegionsData';
import './RegionExplorer.css';

const RegionExplorer = () => {
  const { regionId } = useParams();
  const [region, setRegion] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find region data from our existing data
    const regionData = indiaRegionsData.find(r => r.id === regionId);
    
    if (regionData) {
      setRegion(regionData);
      
      // This would be replaced with an actual API call to fetch region-specific recipes
      const fetchRegionalRecipes = async () => {
        setLoading(true);
        try {
          // Simulate API call with timeout
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock data - would be replaced with actual API response
          const mockRecipes = [
            {
              id: 'butter-chicken',
              title: 'Butter Chicken',
              prepTime: '30 mins',
              cookTime: '45 mins',
              difficulty: 'Medium',
              image: '/images/butter-chicken.jpg',
              description: 'A classic Punjabi dish of chicken in a creamy tomato sauce.'
            },
            {
              id: 'sarson-ka-saag',
              title: 'Sarson Ka Saag',
              prepTime: '30 mins',
              cookTime: '45 mins',
              difficulty: 'Easy',
              image: '/images/sarson-ka-saag.jpg',
              description: 'Mustard greens slow-cooked with spices, traditionally served with Makki di Roti.'
            },
            {
              id: 'chole-bhature',
              title: 'Chole Bhature',
              prepTime: '40 mins (plus soaking)',
              cookTime: '30 mins',
              difficulty: 'Medium',
              image: '/images/chole-bhature.jpg',
              description: 'Spicy chickpea curry served with deep-fried bread.'
            },
            {
              id: 'amritsari-fish',
              title: 'Amritsari Fish',
              prepTime: '20 mins (plus marination)',
              cookTime: '15 mins',
              difficulty: 'Easy',
              image: '/images/amritsari-fish.jpg',
              description: 'Crispy and flavorful fish fritters with a signature spice blend.'
            }
          ];
          
          setRecipes(mockRecipes);
        } catch (error) {
          console.error("Error fetching regional recipes:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRegionalRecipes();
    } else {
      setLoading(false);
    }
  }, [regionId]);

  if (!region && !loading) {
    return (
      <div className="region-not-found">
        <h2>Region Not Found</h2>
        <p>We couldn't find the region you're looking for.</p>
        <Link to="/" className="back-button">Return to Map</Link>
      </div>
    );
  }

  return (
    <div className="region-explorer">
      {loading ? (
        <div className="region-loading">
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p>Exploring {regionId} cuisine...</p>
        </div>
      ) : (
        <>
          <motion.div 
            className="region-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="region-title-container">
              <h1>{region.name} Cuisine</h1>
              <div className="recipe-count">{region.recipeCount} Recipes</div>
            </div>
            <p className="region-intro">{region.description}</p>
          </motion.div>
          
          <div className="region-navigation">
            <button 
              className={`region-tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`region-tab ${activeTab === 'recipes' ? 'active' : ''}`}
              onClick={() => setActiveTab('recipes')}
            >
              Recipes
            </button>
            <button 
              className={`region-tab ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Key Ingredients
            </button>
            <button 
              className={`region-tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              Culinary History
            </button>
          </div>
          
          <div className="region-content">
            {activeTab === 'overview' && (
              <motion.div 
                className="region-overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="region-map">
                  <svg viewBox="0 0 650 700" className="region-svg">
                    <path 
                      d={region.path} 
                      fill="#E65100" 
                      stroke="#FFF" 
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                
                <div className="region-features">
                  <div className="region-section">
                    <h2>Famous Dishes</h2>
                    <ul className="famous-dishes-list">
                      {region.famousDishes.map(dish => (
                        <motion.li 
                          key={dish}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {dish}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="region-section">
                    <h2>Key Ingredients</h2>
                    <div className="ingredients-tags">
                      {region.mainIngredients.map(ingredient => (
                        <motion.span 
                          key={ingredient}
                          className="ingredient-tag"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {ingredient}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="region-section">
                    <h2>Culinary Techniques</h2>
                    <p>The {region.name} cuisine is known for its unique cooking methods like slow simmering, tandoor cooking, and the extensive use of dairy products. The flavors are rich, hearty, and deeply satisfying.</p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'recipes' && (
              <motion.div 
                className="region-recipes"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Popular Recipes from {region.name}</h2>
                
                <div className="regional-recipes-grid">
                  {recipes.map((recipe, index) => (
                    <motion.div 
                      key={recipe.id}
                      className="regional-recipe-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ 
                        y: -5,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
                      }}
                    >
                      <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                        <div className="recipe-image">
                          <img 
                            src={`https://placehold.co/600x400/FFF8E1/E65100?text=${recipe.title}`} 
                            alt={recipe.title} 
                          />
                        </div>
                        <div className="recipe-info">
                          <h3>{recipe.title}</h3>
                          <p>{recipe.description}</p>
                          <div className="recipe-meta-info">
                            <span>{recipe.difficulty}</span>
                            <span>{recipe.prepTime} prep</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'ingredients' && (
              <motion.div 
                className="region-ingredients"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Essential Ingredients of {region.name} Cuisine</h2>
                
                <div className="ingredients-grid">
                  {region.mainIngredients.map((ingredient, index) => (
                    <motion.div 
                      key={ingredient}
                      className="ingredient-card"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="ingredient-icon">
                        <img 
                          src={`https://placehold.co/200x200/FFF8E1/E65100?text=${ingredient}`} 
                          alt={ingredient}
                        />
                      </div>
                      <h3>{ingredient}</h3>
                      <p>An essential component of {region.name} cuisine, used in various traditional dishes.</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="ingredient-ayurvedic">
                  <h3>Ayurvedic Significance</h3>
                  <p>The ingredients commonly used in {region.name} cuisine have distinct Ayurvedic properties that contribute to the region's dietary wisdom. These ingredients are chosen not just for flavor but also for their health benefits according to traditional knowledge.</p>
                </div>
              </motion.div>
            )}
            
            {activeTab === 'history' && (
              <motion.div 
                className="region-history"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Culinary History of {region.name}</h2>
                
                <div className="history-content">
                  <div className="history-image">
                    <img 
                      src={`https://placehold.co/800x400/FFF8E1/E65100?text=${region.name}+History`} 
                      alt={`Cultural history of ${region.name} cuisine`}
                    />
                  </div>
                  
                  <div className="history-text">
                    <h3>Historical Influences</h3>
                    <p>The cuisine of {region.name} has been shaped by its geography, climate, invasions, trade routes, and cultural exchanges over centuries. The distinct flavors and cooking techniques have evolved through generations, preserving ancient wisdom while adapting to changing times.</p>
                    
                    <h3>Cultural Significance</h3>
                    <p>Food in {region.name} is not just sustenance but an integral part of the cultural identity. Traditional recipes are passed down through generations, and meals are central to festivals, celebrations, and family gatherings.</p>
                    
                    <h3>Evolution Over Time</h3>
                    <p>While maintaining its core elements, {region.name} cuisine has evolved with influences from neighboring regions and foreign cultures. The adaptation of ingredients and techniques has enriched the culinary traditions while preserving their authentic essence.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RegionExplorer;
