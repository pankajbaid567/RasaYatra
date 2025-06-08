import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import RecipeExplorer from './pages/RecipeExplorer';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RegionExplorer from './pages/RegionExplorer';
import RecipeDetail from './pages/RecipeDetail';
import './App.css';

function App() {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // Simulate initial loading
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1500);
    
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) {
  //   return 0;
  // }

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/recipes" element={<RecipeExplorer />} />
            <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
            <Route path="/regions" element={<RegionExplorer />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
