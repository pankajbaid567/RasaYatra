import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
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
    </header>
  );
};

export default Header;
