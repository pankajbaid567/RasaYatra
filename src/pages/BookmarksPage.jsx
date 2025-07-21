import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../styles/pages/Bookmarks.css';

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    }
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const response = await api.getBookmarks();
      setBookmarks(response || []);
      setError('');
    } catch (error) {
      setError('Failed to fetch bookmarks');
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (recipeId) => {
    try {
      await api.removeBookmark(recipeId);
      setBookmarks(bookmarks.filter(bookmark => bookmark.recipe.id !== recipeId));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  if (loading) {
    return (
      <div className="bookmarks-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading your bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bookmarks-container">
      <div className="bookmarks-header">
        <h1>My Bookmarked Recipes</h1>
        <p>Recipes saved for later</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {bookmarks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔖</div>
          <h2>No bookmarks yet</h2>
          <p>Start exploring recipes and bookmark them to find them easily later!</p>
          <Link to="/recipes" className="explore-button">
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="bookmarks-grid">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="bookmark-card">
              <div className="card-image">
                <img 
                  src={bookmark.recipe.image || '/images/default-recipe.jpg'} 
                  alt={bookmark.recipe.title}
                  onError={(e) => {
                    e.target.src = '/images/default-recipe.jpg';
                  }}
                />
                <button 
                  className="remove-bookmark"
                  onClick={() => handleRemoveBookmark(bookmark.recipe.id)}
                  title="Remove bookmark"
                >
                  🔖
                </button>
              </div>
              <div className="card-content">
                <h3>
                  <Link to={`/recipes/${bookmark.recipe.id}`}>
                    {bookmark.recipe.title}
                  </Link>
                </h3>
                <p className="card-description">
                  {bookmark.recipe.description}
                </p>
                <div className="card-meta">
                  <span className="region">{bookmark.recipe.region}</span>
                  {bookmark.recipe.rating && (
                    <span className="rating">
                      ⭐ {bookmark.recipe.rating}
                    </span>
                  )}
                </div>
                <div className="card-date">
                  Bookmarked {new Date(bookmark.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
