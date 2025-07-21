import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="header">
      <motion.div 
        className="logo-container"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="logo-link">
          <h1 className="logo">RasaYatra</h1>
          <p className="tagline">A Journey Through Indian Cuisine</p>
        </Link>
      </motion.div>
      
      <motion.nav 
        className="main-nav"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Explore</Link></li>
          <li><Link to="/regions">Regions</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </motion.nav>

      <div className="auth-section">
        {isAuthenticated ? (
          <div className="user-menu">
            <button 
              className="user-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <span className="user-avatar">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </span>
              <span className="user-name">{user?.name}</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <Link to="/profile" onClick={() => setIsUserMenuOpen(false)}>
                  👤 My Profile
                </Link>
                <Link to="/favorites" onClick={() => setIsUserMenuOpen(false)}>
                  ❤️ Favorites
                </Link>
                <Link to="/bookmarks" onClick={() => setIsUserMenuOpen(false)}>
                  🔖 Bookmarks
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/signup" className="signup-button">Sign Up</Link>
          </div>
        )}
        
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/recipes" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link to="/regions" onClick={() => setIsMenuOpen(false)}>Regions</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
              <Link to="/favorites" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
              <Link to="/bookmarks" onClick={() => setIsMenuOpen(false)}>Bookmarks</Link>
              <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
