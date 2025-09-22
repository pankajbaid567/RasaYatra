import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RecipeExplorer from './pages/RecipeExplorer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FavoritesPage from './pages/FavoritesPage';
import BookmarksPage from './pages/BookmarksPage';
import ProfilePage from './pages/ProfilePage';
import CommunityPage from './pages/CommunityPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AuthGuard from './components/AuthGuard';
import RegionExplorer from './pages/RegionExplorer';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';
import './styles/responsive-utils.css';
import ChatBot from './components/ChatBot';

// Content component that has access to location
const AppContent = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('/');
  const [recipeId, setRecipeId] = useState(null);
  
  useEffect(() => {
    setCurrentPath(location.pathname);
    
    // Extract recipe ID if we're on a recipe detail page
    if (location.pathname.startsWith('/recipes/')) {
      setRecipeId(location.pathname.split('/').pop());
    } else {
      setRecipeId(null);
    }
  }, [location]);

  // Determine the ChatBot context based on the current route
  const getChatBotContext = () => {
    if (currentPath === '/') return 'home';
    if (currentPath === '/about') return 'about';
    if (currentPath === '/recipes') return 'recipes';
    if (currentPath === '/regions') return 'regions';
    if (currentPath === '/community') return 'community';
    if (currentPath.startsWith('/recipes/') && recipeId) return `recipe-detail:${recipeId}`;
    return 'general';
  };

  return (
    <AuthGuard>
      <div className="app-container">
        <Header />
        <main id="main-content" className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/recipes" element={<RecipeExplorer />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
            <Route path="/regions" element={<RegionExplorer />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/favorites" element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } />
            <Route path="/bookmarks" element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            } />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
        <ChatBot pageContext={getChatBotContext()} />
      </div>
    </AuthGuard>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
