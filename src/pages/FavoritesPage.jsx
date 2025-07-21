import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../styles/pages/Favorites.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await api.getFavorites();
      setFavorites(response || []);
      setError('');
    } catch (error) {
      setError('Failed to fetch favorites');
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await api.removeFromFavorites(recipeId);
      setFavorites(favorites.filter(fav => fav.recipe.id !== recipeId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <div className="favorites-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>My Favorite Recipes</h1>
        <p>Your collection of beloved dishes</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">❤️</div>
          <h2>No favorites yet</h2>
          <p>Start exploring recipes and add them to your favorites!</p>
          <Link to="/recipes" className="explore-button">
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-card">
              <div className="card-image">
                <img 
                  src={favorite.recipe.image || '/images/default-recipe.jpg'} 
                  alt={favorite.recipe.title}
                  onError={(e) => {
                    e.target.src = '/images/default-recipe.jpg';
                  }}
                />
                <button 
                  className="remove-favorite"
                  onClick={() => handleRemoveFavorite(favorite.recipe.id)}
                  title="Remove from favorites"
                >
                  ❤️
                </button>
              </div>
              <div className="card-content">
                <h3>
                  <Link to={`/recipes/${favorite.recipe.id}`}>
                    {favorite.recipe.title}
                  </Link>
                </h3>
                <p className="card-description">
                  {favorite.recipe.description}
                </p>
                <div className="card-meta">
                  <span className="region">{favorite.recipe.region}</span>
                  {favorite.recipe.rating && (
                    <span className="rating">
                      ⭐ {favorite.recipe.rating}
                    </span>
                  )}
                </div>
                <div className="card-date">
                  Added {new Date(favorite.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
