import { motion, AnimatePresence } from 'framer-motion';
import './RegionSidebar.css';

const RegionSidebar = ({ region, isOpen, onClose }) => {
  if (!region) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="sidebar" 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="sidebar-header">
            <h2>{region.name}</h2>
            <button className="close-button" onClick={onClose}>×</button>
          </div>
          
          <div className="sidebar-content">
            <div className="description">
              <h3>About {region.name} Cuisine</h3>
              <p>{region.description}</p>
            </div>
            
            <div className="famous-dishes">
              <h3>Famous Dishes</h3>
              <ul>
                {region.famousDishes?.map(dish => (
                  <motion.li 
                    key={dish} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {dish}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div className="main-ingredients">
              <h3>Key Ingredients</h3>
              <div className="ingredient-tags">
                {region.mainIngredients?.map(ingredient => (
                  <motion.span 
                    key={ingredient} 
                    className="ingredient-tag"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    {ingredient}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <motion.div 
              className="explore-button-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="explore-button">
                Explore {region.name} Recipes
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegionSidebar;
