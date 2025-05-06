import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import chroma from 'chroma-js';
import './IndiaMap.css';
import { indiaRegionsData } from './indiaRegionsData';

const IndiaMap = ({ onRegionSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tooltip, setTooltip] = useState({ visible: false, region: null, position: { x: 0, y: 0 } });
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const dragStartRef = useRef(null);
  const navigate = useNavigate();

  // Generate color based on recipe count
  const colorScale = chroma.scale(['#FFF8E1', '#E65100']).mode('lch');
  
  // Reset position when component mounts or unmounts
  useEffect(() => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
    
    return () => {
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
    };
  }, []);
  
  const handleRegionClick = (region) => {
    setSelectedRegion(region.id);
    
    // Vibrate on mobile devices for tactile feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Animate selection before navigation or sidebar opening
    setTimeout(() => {
      if (onRegionSelect) {
        onRegionSelect(region);
      } else {
        navigate(`/regions/${region.id}`);
      }
    }, 300);
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const handleResetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only left mouse button
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!dragStartRef.current) return;
    
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    
    setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    dragStartRef.current = null;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };
  
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Determine zoom direction
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.5), 3);
    
    setZoomLevel(newZoom);
  };
  
  const handleRegionHover = (e, region) => {
    if (!region) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    
    setTooltip({
      visible: true,
      region,
      position: {
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top - 70
      }
    });
  };
  
  const handleRegionHoverEnd = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className="map-container">
      <div className="map-controls">
        <button onClick={handleZoomIn} aria-label="Zoom in">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button onClick={handleZoomOut} aria-label="Zoom out">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button onClick={handleResetView} aria-label="Reset view">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
          </svg>
        </button>
      </div>
      
      <div 
        ref={containerRef}
        className="svg-container" 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        role="img"
        aria-label="Interactive map of India showing regional cuisines"
      >
        <svg
          ref={mapRef}
          viewBox="0 0 650 700"
          style={{
            transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)`,
            transformOrigin: 'center center',
          }}
        >
          <g>
            {indiaRegionsData.map((region) => {
              const colorIntensity = (region.recipeCount || 1) / 30; // Normalize recipe count
              return (
                <motion.path
                  key={region.id}
                  d={region.path}
                  fill={colorScale(colorIntensity).hex()}
                  whileHover={{ 
                    fill: "#FFC107",
                    scale: 1.02,
                    transition: { duration: 0.3 } 
                  }}
                  animate={{ 
                    fill: selectedRegion === region.id ? "#E65100" : colorScale(colorIntensity).hex(),
                    scale: selectedRegion === region.id ? 1.03 : 1,
                  }}
                  onClick={() => handleRegionClick(region)}
                  onMouseMove={(e) => handleRegionHover(e, region)}
                  onMouseLeave={handleRegionHoverEnd}
                  className="region-path"
                  role="button"
                  aria-label={`${region.name} region with ${region.recipeCount} recipes`}
                  data-region-name={region.name}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleRegionClick(region);
                    }
                  }}
                />
              );
            })}
          </g>
        </svg>
        
        <AnimatePresence>
          {tooltip.visible && tooltip.region && (
            <motion.div 
              className="map-tooltip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              style={{
                left: tooltip.position.x,
                top: tooltip.position.y,
              }}
            >
              <h3>{tooltip.region.name}</h3>
              <p>{tooltip.region.recipeCount} Recipes</p>
              <div className="tooltip-tag">{tooltip.region.famousDishes[0]}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="map-legend">
        <div className="legend-title">Recipe Density</div>
        <div className="legend-scale">
          <div className="legend-low">Low</div>
          <div className="legend-gradient"></div>
          <div className="legend-high">High</div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
