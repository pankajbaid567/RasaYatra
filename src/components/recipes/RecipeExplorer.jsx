import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './RecipeExplorer.css';

const RecipeExplorer = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    region: '',
    dietary: '',
    meal: '',
    difficulty: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - would be replaced with actual API response
        const mockRecipes = [
          {
            id: 'butter-chicken',
            title: 'Butter Chicken',
            region: 'Punjab',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Medium',
            dietary: ['Non-vegetarian'],
            mealType: ['Dinner', 'Lunch'],
            image: '/images/butter-chicken.jpg',
            description: 'A classic Punjabi dish of chicken in a creamy tomato sauce.'
          },
          {
            id: 'masala-dosa',
            title: 'Masala Dosa',
            region: 'South India',
            prepTime: '30 mins (plus fermentation)',
            cookTime: '20 mins',
            difficulty: 'Medium',
            dietary: ['Vegetarian'],
            mealType: ['Breakfast', 'Dinner'],
            image: '/images/masala-dosa.jpg',
            description: 'Crispy fermented rice and lentil crepe filled with spiced potatoes.'
          },
          {
            id: 'sarson-ka-saag',
            title: 'Sarson Ka Saag',
            region: 'Punjab',
            prepTime: '30 mins',
            cookTime: '45 mins',
            difficulty: 'Easy',
            dietary: ['Vegetarian'],
            mealType: ['Lunch', 'Dinner'],
            image: '/images/sarson-ka-saag.jpg',
            description: 'Mustard greens slow-cooked with spices, traditionally served with Makki di Roti.'
          },
          {
            id: 'dhokla',
            title: 'Dhokla',
            region: 'Gujarat',
            prepTime: '15 mins (plus fermentation)',
            cookTime: '20 mins',
            difficulty: 'Easy',
            dietary: ['Vegetarian'],
            mealType: ['Breakfast', 'Snack'],
            image: '/images/dhokla.jpg',
            description: 'Steamed fermented batter made from rice and chickpeas, served with green chutney.'
          },
          {
            id: 'rogan-josh',
            title: 'Rogan Josh',
            region: 'Kashmir',
            prepTime: '20 mins',
            cookTime: '1 hour 30 mins',
            difficulty: 'Medium',
            dietary: ['Non-vegetarian'],
            mealType: ['Dinner'],
            image: '/images/rogan-josh.jpg',
            description: 'An aromatic lamb curry characterized by its deep red color from Kashmiri chilies.'
          },
          {
            id: 'pav-bhaji',
            title: 'Pav Bhaji',
            region: 'Maharashtra',
            prepTime: '20 mins',
            cookTime: '30 mins',
            difficulty: 'Easy',
            dietary: ['Vegetarian'],
            mealType: ['Lunch', 'Dinner', 'Snack'],
            image: '/images/pav-bhaji.jpg', 
            description: 'Spiced vegetable mash served with butter-toasted soft bread rolls.'
          }
        ];
        
        setRecipes(mockRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecipes = recipes.filter(recipe => {
    // Apply region filter
    if (filters.region && recipe.region !== filters.region) return false;
    
    // Apply dietary filter
    if (filters.dietary && !recipe.dietary.includes(filters.dietary)) return false;
    
    // Apply meal type filter
    if (filters.meal && !recipe.mealType.includes(filters.meal)) return false;
    
    // Apply difficulty filter
    if (filters.difficulty && recipe.difficulty !== filters.difficulty) return false;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.region.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="recipe-explorer">
      <motion.div 
        className="explorer-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Discover Recipes</h1>
        <p>Explore authentic recipes from across India's diverse culinary landscape</p>
      </motion.div>
      
      <div className="explorer-controls">
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search recipes, ingredients, or regions..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        <div className="filter-controls">
          <select name="region" value={filters.region} onChange={handleFilterChange}>
            <option value="">All Regions</option>
            <option value="Punjab">Punjab</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Kashmir">Kashmir</option>
            <option value="South India">South India</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Bengal">Bengal</option>
          </select>
          
          <select name="dietary" value={filters.dietary} onChange={handleFilterChange}>
            <option value="">All Dietary</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-vegetarian">Non-vegetarian</option>
            <option value="Vegan">Vegan</option>
          </select>
          
          <select name="meal" value={filters.meal} onChange={handleFilterChange}>
            <option value="">All Meal Types</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
          
          <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
            <option value="">All Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="recipes-loading">
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p>Discovering recipes...</p>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="no-results">
          <h2>No recipes found</h2>
          <p>Try adjusting your filters or search term</p>
        </div>
      ) : (
        <motion.div 
          className="recipes-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredRecipes.map((recipe, index) => (
            <motion.div 
              key={recipe.id}
              className="recipe-card"
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
                  <div className="recipe-region">{recipe.region}</div>
                </div>
                <div className="recipe-info">
                  <h2>{recipe.title}</h2>
                  <p>{recipe.description}</p>
                  <div className="recipe-meta-info">
                    <span>{recipe.difficulty}</span>
                    <span>{recipe.prepTime} prep</span>
                  </div>
                  <div className="recipe-tags">
                    {recipe.dietary.map(diet => (
                      <span key={diet} className="recipe-tag">{diet}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default RecipeExplorer;
