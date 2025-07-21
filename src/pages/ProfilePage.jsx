import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Heart, 
  Bookmark, 
  Clock, 
  Star, 
  ChefHat,
  MapPin,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import '../styles/pages/ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('favorites');
  const [stats, setStats] = useState({
    totalFavorites: 0,
    totalBookmarks: 0,
    joinDate: null
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const [favoritesData, bookmarksData] = await Promise.all([
          api.getFavorites(),
          api.getBookmarks()
        ]);

        setFavorites(favoritesData);
        setBookmarks(bookmarksData);
        
        setStats({
          totalFavorites: favoritesData.length,
          totalBookmarks: bookmarksData.length,
          joinDate: user?.createdAt ? new Date(user.createdAt) : null
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.createdAt]);

  const handleRemoveFavorite = async (recipeId) => {
    try {
      await api.removeFavorite(recipeId);
      setFavorites(favorites.filter(fav => fav.recipeId !== recipeId));
      setStats(prev => ({ ...prev, totalFavorites: prev.totalFavorites - 1 }));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleRemoveBookmark = async (recipeId) => {
    try {
      await api.removeBookmark(recipeId);
      setBookmarks(bookmarks.filter(bookmark => bookmark.recipeId !== recipeId));
      setStats(prev => ({ ...prev, totalBookmarks: prev.totalBookmarks - 1 }));
    } catch (error) {
      console.error('Error removing bookmark:', error);
    }
  };

  const RecipeCard = ({ recipe, type, onRemove }) => (
    <motion.div
      className="profile-recipe-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <button
          className={`remove-btn ${type}`}
          onClick={() => onRemove(recipe.id)}
          title={`Remove from ${type}`}
        >
          {type === 'favorites' ? <Heart className="icon filled" /> : <Bookmark className="icon filled" />}
        </button>
      </div>
      
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <MapPin className="meta-icon" />
            <span>{recipe.region}</span>
          </div>
          <div className="meta-item">
            <Clock className="meta-icon" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
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
        
        <Link to={`/recipes/${recipe.id}`} className="view-recipe-btn">
          View Recipe
        </Link>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <section className="profile-header">
        <div className="container">
          <motion.div 
            className="profile-hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="profile-avatar">
              <User className="avatar-icon" />
            </div>
            
            <div className="profile-info">
              <h1 className="profile-name">{user?.name}</h1>
              <p className="profile-email">{user?.email}</p>
              {stats.joinDate && (
                <div className="join-date">
                  <Calendar className="calendar-icon" />
                  <span>Joined {stats.joinDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Stats Cards */}
          <motion.div 
            className="profile-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="stat-card">
              <Heart className="stat-icon favorites" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalFavorites}</span>
                <span className="stat-label">Favorite Recipes</span>
              </div>
            </div>
            
            <div className="stat-card">
              <Bookmark className="stat-icon bookmarks" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalBookmarks}</span>
                <span className="stat-label">Saved Recipes</span>
              </div>
            </div>
            
            <div className="stat-card">
              <TrendingUp className="stat-icon activity" />
              <div className="stat-content">
                <span className="stat-number">{stats.totalFavorites + stats.totalBookmarks}</span>
                <span className="stat-label">Total Activity</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recipe Collections */}
      <section className="profile-collections">
        <div className="container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart className="tab-icon" />
              Favorite Recipes ({stats.totalFavorites})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'bookmarks' ? 'active' : ''}`}
              onClick={() => setActiveTab('bookmarks')}
            >
              <Bookmark className="tab-icon" />
              Saved Recipes ({stats.totalBookmarks})
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'favorites' && (
              <motion.div 
                className="recipes-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {favorites.length > 0 ? (
                  <>
                    <h2 className="section-title">Your Favorite Recipes</h2>
                    <div className="recipes-grid">
                      {favorites.map((favorite) => (
                        <RecipeCard
                          key={favorite.id}
                          recipe={favorite.recipe}
                          type="favorites"
                          onRemove={handleRemoveFavorite}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <Heart className="empty-icon" />
                    <h3>No favorite recipes yet</h3>
                    <p>Start exploring and add recipes to your favorites!</p>
                    <Link to="/recipes" className="explore-btn">
                      Explore Recipes
                    </Link>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'bookmarks' && (
              <motion.div 
                className="recipes-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {bookmarks.length > 0 ? (
                  <>
                    <h2 className="section-title">Your Saved Recipes</h2>
                    <div className="recipes-grid">
                      {bookmarks.map((bookmark) => (
                        <RecipeCard
                          key={bookmark.id}
                          recipe={bookmark.recipe}
                          type="bookmarks"
                          onRemove={handleRemoveBookmark}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="empty-state">
                    <Bookmark className="empty-icon" />
                    <h3>No saved recipes yet</h3>
                    <p>Save recipes you want to cook later!</p>
                    <Link to="/recipes" className="explore-btn">
                      Explore Recipes
                    </Link>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
