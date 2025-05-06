import { useState } from 'react';
import { motion } from 'framer-motion';
import IndiaMap from '../map/IndiaMap';
import RegionSidebar from '../sidebar/RegionSidebar';

const HomePage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <section className="hero-section">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore the Flavors of India
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Discover authentic recipes and culinary traditions from different regions of India.
          Click on a region to begin your gastronomic journey.
        </motion.p>
      </section>

      <section className="map-section">
        <IndiaMap onRegionSelect={handleRegionSelect} />
      </section>

      <RegionSidebar 
        region={selectedRegion} 
        isOpen={sidebarOpen} 
        onClose={handleCloseSidebar} 
      />
    </>
  );
};

export default HomePage;
