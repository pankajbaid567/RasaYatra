import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Star, 
  MapPin, 
  ArrowLeft, 
  Heart,
  Share2,
  Bookmark,
  CheckCircle
} from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import ChatBot from '../components/ChatBot';
import '../styles/pages/RecipeDetail.css';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedSteps, setCheckedSteps] = useState({});
  const [isFavorited, setIsFavorited] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' }); // 'success' or 'error'

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setLoading(true);
        // Fetch the specific recipe
        const foundRecipe = await api.getRecipeById(recipeId);
        if (foundRecipe) {
          setRecipe(foundRecipe);
          
          // Get related recipes from the same region
          const allRecipes = await api.getRecipes();
          const related = allRecipes
            .filter(r => r.region === foundRecipe.region && r.id !== foundRecipe.id)
            .slice(0, 3);
          setRelatedRecipes(related);

          // Check if recipe is favorited or bookmarked by current user
          if (user) {
            try {
              const [favorites, bookmarks] = await Promise.all([
                api.getFavorites(),
                api.getBookmarks()
              ]);
              setIsFavorited(favorites.some(fav => fav.recipeId === foundRecipe.id));
              setIsBookmarked(bookmarks.some(bookmark => bookmark.recipeId === foundRecipe.id));
            } catch (error) {
              console.error('Error checking favorites/bookmarks:', error);
            }
          }
        } else {
          // Recipe not found, redirect to recipes page
          navigate('/recipes');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        navigate('/recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [recipeId, user, navigate]);

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleStep = (index) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFavorite = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isFavorited) {
        await api.removeFavorite(recipe.id);
        setIsFavorited(false);
        setMessage({ text: 'Recipe removed from favorites', type: 'success' });
      } else {
        const result = await api.addFavorite(recipe.id);
        if (result?.alreadyExists) {
          setMessage({ text: result.message, type: 'success' });
          setIsFavorited(true); // Update UI state to reflect reality
        } else {
          setIsFavorited(true);
          setMessage({ text: 'Recipe added to favorites', type: 'success' });
        }
      }
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setMessage({ text: 'Failed to update favorites', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isBookmarked) {
        await api.removeBookmark(recipe.id);
        setIsBookmarked(false);
        setMessage({ text: 'Recipe removed from bookmarks', type: 'success' });
      } else {
        const result = await api.addBookmark(recipe.id);
        if (result?.alreadyExists) {
          setMessage({ text: result.message, type: 'success' });
          setIsBookmarked(true); // Update UI state to reflect reality
        } else {
          setIsBookmarked(true);
          setMessage({ text: 'Recipe added to bookmarks', type: 'success' });
        }
      }
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      setMessage({ text: 'Failed to update bookmarks', type: 'error' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: recipe.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  if (loading) {
    return (
      <div className="recipe-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-not-found">
        <div className="container">
          <h1>Recipe Not Found</h1>
          <p>The recipe you're looking for doesn't exist.</p>
          <Link to="/recipes" className="back-button">
            <ArrowLeft className="icon" />
            Back to Recipes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      {/* Hero Section */}
      <section className="recipe-hero">
        <div className="recipe-hero-overlay">
          <div className="container">
            <div className="recipe-hero-content">
              <motion.div 
                className="recipe-hero-info"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <button onClick={() => navigate(-1)} className="back-button">
                  <ArrowLeft className="icon" />
                  Back
                </button>
                
                <div className="recipe-title-section">
                  <h1 className="recipe-title">{recipe.title}</h1>
                  <p className="recipe-description">{recipe.description}</p>
                  
                  <div className="recipe-meta-info">
                    <div className="meta-item">
                      <MapPin className="meta-icon" />
                      <span>{recipe.region}</span>
                    </div>
                    <div className="meta-item">
                      <Star className="meta-icon" />
                      <span>{recipe.rating}</span>
                    </div>
                    <div className="meta-item">
                      <ChefHat className="meta-icon" />
                      <span>{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>

                <div className="recipe-actions">
                  <button 
                    className={`action-button ${isFavorited ? 'active' : ''}`}
                    onClick={handleFavorite}
                    title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className="icon" />
                    {isFavorited ? 'Favorited' : 'Favorite'}
                  </button>
                  <button 
                    className={`action-button ${isBookmarked ? 'active' : ''}`}
                    onClick={handleBookmark}
                    title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
                  >
                    <Bookmark className="icon" />
                    {isBookmarked ? 'Saved' : 'Save'}
                  </button>
                  <button className="action-button" onClick={handleShare}>
                    <Share2 className="icon" />
                    Share
                  </button>
                </div>

                {/* Message display */}
                {message.text && (
                  <motion.div 
                    className={`message ${message.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <CheckCircle className="message-icon" />
                    {message.text}
                  </motion.div>
                )}
              </motion.div>

              <motion.div 
                className="recipe-hero-image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img src={recipe.image} alt={recipe.title} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Info Cards */}
      <section className="recipe-info-section">
        <div className="container">
          <div className="recipe-info-cards">
            <div className="info-card">
              <Clock className="card-icon" />
              <div className="card-content">
                <span className="card-label">Prep Time</span>
                <span className="card-value">{recipe.prepTime} mins</span>
              </div>
            </div>
            <div className="info-card">
              <ChefHat className="card-icon" />
              <div className="card-content">
                <span className="card-label">Cook Time</span>
                <span className="card-value">{recipe.cookTime} mins</span>
              </div>
            </div>
            <div className="info-card">
              <Users className="card-icon" />
              <div className="card-content">
                <span className="card-label">Serves</span>
                <span className="card-value">{recipe.servings || 4}</span>
              </div>
            </div>
            <div className="info-card">
              <Star className="card-icon" />
              <div className="card-content">
                <span className="card-label">Difficulty</span>
                <span className="card-value">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="recipe-content-section">
        <div className="container">
          <div className="recipe-content">
            {/* Ingredients */}
            <div className="content-section">
              <h2 className="section-title">Ingredients</h2>
              <div className="ingredients-list">
                {(recipe.ingredients || []).map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`ingredient-item ${checkedIngredients[index] ? 'checked' : ''}`}
                    onClick={() => toggleIngredient(index)}
                  >
                    <CheckCircle className="check-icon" />
                    <div className="ingredient-content">
                      <span className="ingredient-text">
                        {typeof ingredient === 'string' 
                          ? ingredient 
                          : `${ingredient.name} - ${ingredient.quantity}`
                        }
                      </span>
                      {typeof ingredient === 'object' && ingredient.healthBenefits && (
                        <p className="ingredient-benefits">{ingredient.healthBenefits}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="content-section">
              <h2 className="section-title">Instructions</h2>
              <div className="instructions-list">
                {(recipe.instructions || []).map((instruction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`instruction-item ${checkedSteps[index] ? 'checked' : ''}`}
                  >
                    <div 
                      className="instruction-number"
                      onClick={() => toggleStep(index)}
                    >
                      {checkedSteps[index] ? <CheckCircle className="check-icon" /> : index + 1}
                    </div>
                    <div className="instruction-content">
                      <p className="instruction-text">{instruction}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Cultural Story */}
          {recipe.culturalStory && (
            <motion.div 
              className="cultural-story"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Cultural Story</h2>
              <div className="story-content">
                <p>{recipe.culturalStory}</p>
              </div>
            </motion.div>
          )}

          {/* Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <motion.div 
              className="recipe-tips"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Chef's Tips</h2>
              <div className="tips-list">
                {recipe.tips.map((tip, index) => (
                  <div key={index} className="tip-item">
                    <ChefHat className="tip-icon" />
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Recipes */}
      {relatedRecipes.length > 0 && (
        <section className="related-recipes-section">
          <div className="container">
            <h2 className="section-title">More from {recipe.region}</h2>
            <div className="related-recipes-grid">
              {relatedRecipes.map((relatedRecipe, index) => (
                <motion.div
                  key={relatedRecipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link to={`/recipes/${relatedRecipe.id}`} className="related-recipe-card">
                    <div className="related-recipe-image">
                      <img src={relatedRecipe.image} alt={relatedRecipe.title} />
                    </div>
                    <div className="related-recipe-info">
                      <h3 className="related-recipe-title">{relatedRecipe.title}</h3>
                      <p className="related-recipe-description">{relatedRecipe.description}</p>
                      <div className="related-recipe-meta">
                        <span className="recipe-time">{relatedRecipe.prepTime + relatedRecipe.cookTime} mins</span>
                        <span className="recipe-rating">
                          <Star className="star-icon" />
                          {relatedRecipe.rating}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <ChatBot pageContext="recipe-detail" />
    </div>
  );
};

export default RecipeDetail;
