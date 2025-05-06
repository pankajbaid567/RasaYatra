import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('instructions');
  const [activeStep, setActiveStep] = useState(0);
  const [timer, setTimer] = useState({ active: false, seconds: 0, total: 0 });
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
  const [showAyurvedicInfo, setShowAyurvedicInfo] = useState({});
  
  const intervalRef = useRef(null);
  
  // Timer functions
  const startTimer = (seconds) => {
    if (timer.active) return;
    
    setTimer({ active: true, seconds: seconds, total: seconds });
    
    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev.seconds <= 1) {
          clearInterval(intervalRef.current);
          return { ...prev, active: false, seconds: 0 };
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);
  };
  
  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setTimer(prev => ({ ...prev, active: false }));
    }
  };
  
  const resetTimer = () => {
    stopTimer();
    setTimer(prev => ({ active: false, seconds: prev.total, total: prev.total }));
  };

  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - would be replaced with actual API response
        setRecipe({
          id: recipeId,
          title: "Sarson ka Saag with Makki di Roti",
          region: "Punjab",
          prepTime: "30 mins",
          cookTime: "45 mins",
          servings: 4,
          difficulty: "Medium",
          ingredients: [
            {
              name: "Mustard Greens (Sarson)",
              quantity: "500g",
              ayurvedic: "Reduces Kapha and Vata, increases Pitta. Has heating properties."
            },
            {
              name: "Spinach",
              quantity: "250g",
              ayurvedic: "Balances all three doshas. Has cooling properties and is good for digestion."
            },
            {
              name: "Ghee",
              quantity: "3 tbsp",
              ayurvedic: "Balances Vata and Pitta. Improves digestion and absorption of nutrients."
            },
            {
              name: "Makki atta (Corn flour)",
              quantity: "2 cups",
              ayurvedic: "Light and dry nature, balances Kapha but may increase Vata if consumed in excess."
            },
            {
              name: "Green Chillies",
              quantity: "3-4",
              ayurvedic: "Increases Pitta, reduces Vata and Kapha. Has heating properties."
            }
          ],
          instructions: [
            { 
              step: "Clean and chop the mustard greens and spinach",
              time: null
            },
            { 
              step: "Boil the greens with green chillies until soft",
              time: 900 // 15 minutes in seconds
            },
            { 
              step: "Mash the boiled greens into a coarse paste",
              time: null
            },
            { 
              step: "Heat ghee in a pan and add spices",
              time: 120 // 2 minutes in seconds
            },
            { 
              step: "Add the mashed greens and cook",
              time: 300 // 5 minutes in seconds
            },
            { 
              step: "Prepare dough for Makki di Roti using corn flour",
              time: null
            },
            { 
              step: "Cook rotis on a hot tawa until done",
              time: 600 // 10 minutes in seconds
            }
          ],
          images: [
            "/images/sarson-ka-saag-1.jpg",
            "/images/sarson-ka-saag-2.jpg",
            "/images/makki-di-roti.jpg",
            "/images/punjabi-cuisine.jpg"
          ],
          // Placeholder image URLs - replace with actual images
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          nutritionalInfo: {
            calories: 320,
            protein: "8g",
            carbs: "35g",
            fat: "18g",
            fiber: "7g"
          },
          culturalBackground: {
            title: "Winter Tradition of Punjab",
            content: "Sarson ka Saag and Makki di Roti is a traditional Punjabi dish that celebrates the winter harvest. The combination represents the agricultural bounty of Punjab, where mustard and corn are staple crops. This hearty dish was originally prepared to provide warmth and energy during the cold winter months, with the ghee adding an essential source of fat. In traditional Punjabi homes, preparing Saag is often a communal activity with family members taking turns to stir the greens as they cook slowly over several hours."
          },
          tags: ["Vegetarian", "Winter", "Traditional", "Punjabi", "Healthy"],
          seasonality: "Winter",
          dosha: "Balances Vata, may increase Pitta"
        });
        
        // Mock related recipes
        setRelated([
          {
            id: "chole-bhature",
            title: "Chole Bhature",
            image: "/images/chole-bhature.jpg",
            region: "Punjab"
          },
          {
            id: "amritsari-fish",
            title: "Amritsari Fish",
            image: "/images/amritsari-fish.jpg",
            region: "Punjab"
          },
          {
            id: "butter-chicken",
            title: "Butter Chicken",
            image: "/images/butter-chicken.jpg",
            region: "Punjab"
          },
          {
            id: "rajma-chawal",
            title: "Rajma Chawal",
            image: "/images/rajma-chawal.jpg",
            region: "Punjab"
          }
        ]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipe();
    }
    
    // Clean up timer on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [recipeId]);
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Toggle Ayurvedic info tooltip
  const toggleAyurvedicInfo = (index) => {
    setShowAyurvedicInfo(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  // Slider settings for gallery
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setSelectedImage(index)
  };
  
  // Slider settings for related recipes
  const relatedSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  if (loading) {
    return (
      <div className="recipe-loading">
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p>Loading recipe...</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-error">
        <h2>Recipe Not Found</h2>
        <p>We couldn't find the recipe you're looking for.</p>
        <Link to="/recipes" className="back-button">Browse All Recipes</Link>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <motion.div 
        className="recipe-breadcrumb"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/">Home</Link> &gt; <Link to="/recipes">Recipes</Link> &gt; <span>{recipe.title}</span>
      </motion.div>
      
      <motion.div 
        className="recipe-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span><strong>Region:</strong> <Link to={`/regions/${recipe.region.toLowerCase()}`}>{recipe.region}</Link></span>
          <span><strong>Prep:</strong> {recipe.prepTime}</span>
          <span><strong>Cook:</strong> {recipe.cookTime}</span>
          <span><strong>Serves:</strong> {recipe.servings}</span>
          <span><strong>Difficulty:</strong> {recipe.difficulty}</span>
        </div>
        <div className="recipe-tags">
          {recipe.tags.map(tag => (
            <span key={tag} className="recipe-tag">{tag}</span>
          ))}
        </div>
      </motion.div>

      <div className="recipe-content">
        <motion.div 
          className="recipe-gallery-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Slider {...sliderSettings} className="recipe-slider">
            {recipe.images.map((image, index) => (
              <div key={index} className="slide">
                <div className="recipe-image-wrapper">
                  <img 
                    src={image === "/images/sarson-ka-saag-1.jpg" 
                      ? "https://placehold.co/600x400/FFF8E1/E65100?text=Sarson+ka+Saag" 
                      : `https://placehold.co/600x400/FFF8E1/E65100?text=Recipe+Image+${index+1}`} 
                    alt={`${recipe.title} - image ${index+1}`} 
                    className="recipe-image" 
                  />
                </div>
              </div>
            ))}
          </Slider>
          
          <div className="gallery-thumbnails">
            {recipe.images.map((image, index) => (
              <div 
                key={index} 
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={image === "/images/sarson-ka-saag-1.jpg" 
                    ? "https://placehold.co/100x100/FFF8E1/E65100?text=Thumb" 
                    : `https://placehold.co/100x100/FFF8E1/E65100?text=${index+1}`} 
                  alt={`Thumbnail ${index+1}`} 
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="recipe-details">
          <div className="recipe-tabs">
            <button 
              className={`tab-button ${activeTab === 'instructions' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
            <button 
              className={`tab-button ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
              onClick={() => setActiveTab('cultural')}
            >
              Cultural Story
            </button>
            <button 
              className={`tab-button ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              Video
            </button>
          </div>
          
          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'instructions' && (
                <motion.div 
                  key="instructions"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="instructions-section"
                >
                  <h2>Instructions</h2>
                  
                  {timer.active && (
                    <div className="timer-display">
                      <div className="timer-time">{formatTime(timer.seconds)}</div>
                      <div className="timer-controls">
                        <button onClick={stopTimer} className="timer-button">Pause</button>
                        <button onClick={resetTimer} className="timer-button">Reset</button>
                      </div>
                    </div>
                  )}
                  
                  <ol className="instruction-steps">
                    {recipe.instructions.map((instruction, index) => (
                      <motion.li 
                        key={index}
                        className={`instruction-step ${activeStep === index ? 'active' : ''}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => setActiveStep(index)}
                      >
                        <div className="step-content">
                          <span className="step-number">{index + 1}</span>
                          <div className="step-text">
                            <p>{instruction.step}</p>
                            {instruction.time && (
                              <button 
                                className="timer-start-button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startTimer(instruction.time);
                                }}
                              >
                                Start {formatTime(instruction.time)} Timer
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </motion.div>
              )}
              
              {activeTab === 'ingredients' && (
                <motion.div 
                  key="ingredients"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="ingredients-section"
                >
                  <h2>Ingredients</h2>
                  <ul className="ingredients-list">
                    {recipe.ingredients.map((ingredient, index) => (
                      <motion.li 
                        key={index}
                        className="ingredient-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="ingredient-name-quantity">
                          <span className="ingredient-name">{ingredient.name}</span>
                          <span className="ingredient-quantity">{ingredient.quantity}</span>
                        </div>
                        <div className="ingredient-ayurvedic">
                          <button 
                            className="ayurvedic-info-button"
                            onClick={() => toggleAyurvedicInfo(index)}
                            aria-label="Show Ayurvedic properties"
                          >
                            <span className="ayurvedic-icon">🍃</span>
                          </button>
                          
                          <AnimatePresence>
                            {showAyurvedicInfo[index] && (
                              <motion.div 
                                className="ayurvedic-tooltip"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <h4>Ayurvedic Properties</h4>
                                <p>{ingredient.ayurvedic}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <div className="nutritional-info">
                    <button 
                      className="nutritional-button"
                      onClick={() => setShowNutritionalInfo(!showNutritionalInfo)}
                    >
                      {showNutritionalInfo ? 'Hide Nutritional Info' : 'Show Nutritional Info'}
                    </button>
                    
                    <AnimatePresence>
                      {showNutritionalInfo && (
                        <motion.div 
                          className="nutritional-details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="nutrition-item">
                            <span className="nutrition-label">Calories:</span>
                            <span className="nutrition-value">{recipe.nutritionalInfo.calories}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Protein:</span>
                            <span className="nutrition-value">{recipe.nutritionalInfo.protein}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Carbs:</span>
                            <span className="nutrition-value">{recipe.nutritionalInfo.carbs}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Fat:</span>
                            <span className="nutrition-value">{recipe.nutritionalInfo.fat}</span>
                          </div>
                          <div className="nutrition-item">
                            <span className="nutrition-label">Fiber:</span>
                            <span className="nutrition-value">{recipe.nutritionalInfo.fiber}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="ayurvedic-summary">
                    <h3>Ayurvedic Summary</h3>
                    <p>Seasonality: <span>{recipe.seasonality}</span></p>
                    <p>Dosha Effect: <span>{recipe.dosha}</span></p>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'cultural' && (
                <motion.div 
                  key="cultural"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="cultural-section"
                >
                  <h2>{recipe.culturalBackground.title}</h2>
                  <div className="cultural-content">
                    <p>{recipe.culturalBackground.content}</p>
                  </div>
                  <div className="cultural-image">
                    <img 
                      src="https://placehold.co/600x300/FFF8E1/E65100?text=Cultural+Context" 
                      alt="Cultural context of the recipe" 
                    />
                    <div className="cultural-caption">Farmers harvesting mustard in Punjab</div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'video' && (
                <motion.div 
                  key="video"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="video-section"
                >
                  <h2>Watch How to Prepare</h2>
                  <div className="video-container">
                    <iframe 
                      src={recipe.videoUrl} 
                      title={`How to make ${recipe.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="related-recipes">
        <h2>More Recipes from {recipe.region}</h2>
        <Slider {...relatedSliderSettings} className="related-slider">
          {related.map((relatedRecipe) => (
            <div key={relatedRecipe.id} className="related-recipe-card">
              <Link to={`/recipes/${relatedRecipe.id}`} className="related-recipe-link">
                <div className="related-image-container">
                  <img 
                    src={`https://placehold.co/300x200/FFF8E1/E65100?text=${relatedRecipe.title}`} 
                    alt={relatedRecipe.title} 
                  />
                </div>
                <h3 className="related-title">{relatedRecipe.title}</h3>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecipeDetail;
