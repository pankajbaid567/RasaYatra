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
        <h1 className="logo">RasaYatra</h1>
        <p className="tagline">A Journey Through Indian Cuisine</p>
      </motion.div>
      
      <motion.nav 
        className="main-nav"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Explore</a></li>
          <li><a href="#">Featured</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </motion.nav>
    </header>
  );
};

export default Header;
