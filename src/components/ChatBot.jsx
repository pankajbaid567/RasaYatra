import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendMessageToGemini } from '../services/geminiService';
import { api } from '../services/api';
import './ChatBot.css';

const ChatBot = ({ pageContext = "general" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [regions, setRegions] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesData, regionsData] = await Promise.all([
          api.getRecipes(),
          api.getRegions()
        ]);
        setRecipes(recipesData);
        setRegions(regionsData);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching data for ChatBot:', error);
        setDataLoaded(true); // Continue without data
      }
    };

    fetchData();
  }, []);

  // Helper functions to mimic the static data functions
  const getAllRecipes = () => recipes;
  
  const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === parseInt(id) || recipe.id === id);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format message text to handle markdown-like formatting
  const formatMessageText = (text) => {
    if (!text) return '';
    
    let formattedText = text;
    
    // Handle bold text (enclosed in **double asterisks**)
    formattedText = formattedText.replace(
      /\*\*(.*?)\*\*/g, 
      '<strong>$1</strong>'
    );
    
    // Handle italic text (enclosed in *single asterisks*)
    formattedText = formattedText.replace(
      /\*([^*]+)\*/g,
      '<em>$1</em>'
    );
    
    // Handle bullet points (lines starting with *)
    formattedText = formattedText.replace(
      /^\* (.+)$/gm,
      '<li>$1</li>'
    );
    
    // Wrap consecutive list items in ul tags
    formattedText = formattedText.replace(
      /(<li>.+<\/li>\n*)+/g,
      '<ul>$&</ul>'
    );
    
    // Handle line breaks
    return formattedText.replace(/\n/g, '<br>');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Context-aware prompts based on current page and content
  const getContextPrompt = () => {
    if (!dataLoaded) {
      return "You are RasaYatra's AI assistant, an expert in Indian cuisine and cooking. Format your responses with rich formatting: use **bold text** for emphasis by surrounding important terms with double asterisks, *italic* with single asterisks, and create bullet points by starting lines with an asterisk and space like '* Point one'. ";
    }

    const basePrompt = "You are RasaYatra's AI assistant, an expert in Indian cuisine and cooking. Format your responses with rich formatting: use **bold text** for emphasis by surrounding important terms with double asterisks, *italic* with single asterisks, and create bullet points by starting lines with an asterisk and space like '* Point one'. ";
    const allRecipes = getAllRecipes();
    const featuredRecipes = allRecipes.length > 0 ? allRecipes.slice(0, 5).map(r => r.title).join(", ") : "various Indian dishes";
    
    // Check if we're on a specific recipe page
    if (pageContext.startsWith('recipe-detail:')) {
      const recipeId = pageContext.split(':')[1];
      const recipe = getRecipeById(recipeId);
      
      if (recipe) {
        const ingredientsText = Array.isArray(recipe.ingredients) 
          ? recipe.ingredients.map(ing => typeof ing === 'object' ? ing.name : ing).join(', ')
          : 'various ingredients';
          
        return `${basePrompt} 
You are currently helping with the recipe: "${recipe.title}" from the ${recipe.region} region. 
Key details: Prep time: ${recipe.prepTime} min, Cook time: ${recipe.cookTime} min, Rating: ${recipe.rating}/5, Servings: ${recipe.servings}.
Ingredients: ${ingredientsText}
This dish is ${recipe.seasonal ? 'seasonal and' : ''} known for: ${recipe.description}

You should explain cooking techniques, suggest modifications, help with ingredient substitutions, provide cultural context, and answer questions about this specific recipe. If asked about other recipes, you can suggest similar dishes or complementary sides from the same region.`;
      }
    }
    
    // Check if we're on a specific region page
    const regionMatch = pageContext.match(/regions:([a-zA-Z-]+)/);
    if (regionMatch) {
      const regionId = regionMatch[1];
      const region = regions.find(r => r.id === regionId);
      
      if (region) {
        return `${basePrompt}
You are currently discussing the cuisine of ${region.name}, which includes states like ${region.states.join(', ')}.
Famous dishes: ${region.famousDishes.join(', ')}
Key ingredients: ${region.keyIngredients.join(', ')}
Cultural influences: ${region.culinaryInfluences.join(', ')}

${region.description}

You should share knowledge about ${region.name} cuisine, suggest authentic recipes from this region, explain unique cooking techniques, discuss cultural significance of dishes, and help users understand the distinctive flavors of this region.`;
      }
    }
    
    // Standard page contexts
    switch(pageContext) {
      case 'home':
        return `${basePrompt} 
Help users discover recipes, learn about Indian cuisine, and navigate our platform. 
Focus on welcoming new users and highlighting featured content.
Featured recipes on our homepage include: ${featuredRecipes}.
Suggest users check out popular regional cuisines like Punjabi, South Indian, Bengali, and Rajasthani.`;
      
      case 'recipes':
        return `${basePrompt} 
Help users find recipes, understand cooking techniques, suggest ingredient substitutions, and provide cooking tips.
Our recipe collection includes dishes from regions across India including Punjab, South India, North India, West Bengal, Rajasthan, Gujarat, Maharashtra, and Hyderabad.
You can discuss recipe variations, cultural significance, cooking difficulty levels, and preparation times.`;
      
      case 'regions':
        return `${basePrompt} 
Share knowledge about different Indian regional cuisines, their characteristics, famous dishes, cultural influences, and help users explore regional specialties.
Our platform focuses on major Indian regions like Punjab (butter chicken, chole), South India (dosa, idli), North India (korma, biryani), West Bengal (rasgulla, fish curry), Rajasthan (dal baati churma), Gujarat (dhokla, thepla), Maharashtra (vada pav, puran poli), and Hyderabad (biryani, haleem).
You can discuss regional ingredients, cooking techniques, historical influences, and festival foods.`;
      
      case 'about':
        return `${basePrompt} 
Discuss RasaYatra's mission to preserve and celebrate India's culinary heritage through authentic recipes and cultural stories.
Our platform was founded in 2022 with a vision to make traditional Indian recipes accessible to the modern digital generation.
In 2023, we researched across India's 28 states, collecting over 800 authentic recipes.
By 2024, we built this platform using cutting-edge technology.
In spring 2025, we officially launched RasaYatra to connect food enthusiasts globally.
You can help users understand our features, community initiatives, and our commitment to cultural preservation.`;
      
      default:
        return `${basePrompt} 
Assist users with any questions about Indian cuisine, cooking techniques, ingredients, or navigating the RasaYatra platform.
Our site features recipes from across India, organized by region, with detailed ingredients, instructions, and cultural context.
We cover all major regional cuisines including Punjab, South India, North India, West Bengal, Rajasthan, Gujarat, Maharashtra, and Hyderabad.`;
    }
  };

  // Define navigation-related keywords
  const navigationKeywords = {
    recipes: ['recipe', 'recipes', 'dish', 'dishes', 'cook', 'cooking', 'make', 'prepare'],
    regions: ['region', 'regions', 'cuisine', 'map', 'area', 'state', 'states', 'punjab', 'bengal', 'south india', 'north india'],
    about: ['about', 'info', 'information', 'rasayatra', 'story', 'mission', 'background'],
    home: ['home', 'homepage', 'main page', 'welcome']
  };
  
  // Check if a message contains navigation intent
  const checkForNavigationIntent = (message) => {
    const lowerMessage = message.toLowerCase();
    let navigationIntent = null;
    
    // Check for explicit navigation phrases
    if (lowerMessage.includes('take me to') || lowerMessage.includes('go to') || 
        lowerMessage.includes('navigate to') || lowerMessage.includes('show me') ||
        lowerMessage.includes('open the') || lowerMessage.includes('visit')) {
          
      // Determine which page they want to navigate to
      if (navigationKeywords.recipes.some(word => lowerMessage.includes(word))) {
        return { type: 'recipes' };
      }
      if (navigationKeywords.regions.some(word => lowerMessage.includes(word))) {
        return { type: 'regions' };
      }
      if (navigationKeywords.about.some(word => lowerMessage.includes(word))) {
        return { type: 'about' };
      }
      if (navigationKeywords.home.some(word => lowerMessage.includes(word))) {
        return { type: 'home' };
      }
    }
    
    // Check for recipe search - only if data is loaded
    if (dataLoaded && recipes.length > 0) {
      const allRecipes = getAllRecipes();
      for (const recipe of allRecipes) {
        if (lowerMessage.includes(recipe.title.toLowerCase())) {
          return { type: 'specific-recipe', id: recipe.id };
        }
      }
    }
    
    // Check for region search - only if data is loaded  
    if (dataLoaded && regions.length > 0) {
      for (const region of regions) {
        if (lowerMessage.includes(region.name.toLowerCase())) {
          return { type: 'specific-region', id: region.id };
        }
      }
    }
    
    return navigationIntent;
  };

  // Generate action buttons based on message content
  const generateActionButtons = (message, navigationType) => {
    if (!navigationType) return null;
    
    let actions = [];
    
    switch(navigationType.type) {
      case 'recipes':
        actions = [
          { label: 'Browse Recipes', action: () => navigate('/recipes') }
        ];
        break;
      case 'regions':
        actions = [
          { label: 'Explore Regions', action: () => navigate('/regions') }
        ];
        break;
      case 'about':
        actions = [
          { label: 'About RasaYatra', action: () => navigate('/about') }
        ];
        break;
      case 'home':
        actions = [
          { label: 'Go to Homepage', action: () => navigate('/') }
        ];
        break;
      case 'specific-recipe':
        actions = [
          { label: 'View Recipe', action: () => navigate(`/recipes/${navigationType.id}`) }
        ];
        break;
      case 'specific-region':
        actions = [
          { label: 'Explore Region', action: () => navigate(`/regions/${navigationType.id}`) }
        ];
        break;
      default:
        return null;
    }
    
    return actions;
  };
  
  const handleActionClick = (action) => {
    action();
    // Close the chatbot after navigation
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };
  
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // Check for navigation intent
    const navigationIntent = checkForNavigationIntent(inputValue);

    try {
      // Get context-aware prompt
      const contextPrompt = getContextPrompt();
      
      // Use actual Gemini AI API
      const botResponse = await sendMessageToGemini(inputValue, contextPrompt);
      
      // Generate action buttons if navigation is detected
      const actions = generateActionButtons(inputValue, navigationIntent);
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        actions: actions // Add action buttons if available
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('ChatBot Error:', error);
      
      let errorText = "Sorry, I'm having trouble connecting right now. Please try again in a moment.";
      
      if (error.message.includes('API key not configured')) {
        errorText = "Configuration error: Please check the API key setup.";
      } else if (error.message.includes('404')) {
        errorText = "Service temporarily unavailable. Our cooking assistant will be back shortly!";
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Generate contextual welcome message based on current page
  const getWelcomeMessage = () => {
    // If we're on a specific recipe page
    if (pageContext.startsWith('recipe-detail:')) {
      const recipeId = pageContext.split(':')[1];
      const recipe = getRecipeById(recipeId);
      
      if (recipe) {
        return `Welcome! I see you're looking at the ${recipe.title} recipe from ${recipe.region}. Would you like cooking tips, ingredient substitutions, or the cultural story behind this dish?`;
      }
    }

    // For different pages
    switch(pageContext) {
      case 'home':
        return "Welcome to RasaYatra! I can help you discover authentic Indian recipes, learn about regional cuisines, or navigate to our featured content. What are you interested in exploring today?";
      case 'recipes':
        return "Looking for the **perfect recipe**? I can suggest dishes based on ingredients, cooking time, difficulty level, or regional preferences. What kind of dish are you craving today?";
      case 'regions':
        return "Exploring **Indian regional cuisines**? Each region has its unique flavors and techniques. Would you like to know more about a specific region or discover signature dishes from across India?";
      case 'about':
        return "Thanks for visiting our About page! I'd be happy to share more about RasaYatra's mission, our journey documenting India's culinary heritage, or answer any questions about our platform.";
      default:
        return "Hi! I'm **RasaYatra's cooking assistant**. I can help you with:\n* Recipes and cooking techniques\n* Ingredient substitutions and tips\n* Regional Indian cuisines\n* Cultural stories behind dishes\n\nHow can I assist you with *Indian cuisine* today?";
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        id: Date.now(),
        text: getWelcomeMessage(),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, messages.length, pageContext]);

  return (
    <>
      {/* Chat Button */}
      <div 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle size={24} />
        <div className="chat-tooltip">Ask me about recipes!</div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={20} />
              <span>RasaYatra Assistant</span>
            </div>
            <button 
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-icon">
                  {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className="message-content">
                  <div 
                    className="message-text"
                    dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
                  ></div>
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  {/* Action buttons for bot messages */}
                  {message.sender === 'bot' && message.actions && (
                    <div className="message-actions">
                      {message.actions.map((action, actionIndex) => (
                        <button 
                          key={actionIndex}
                          onClick={() => handleActionClick(action.action)}
                          className="action-button"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot-message">
                <div className="message-icon">
                  <Bot size={16} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about recipes, ingredients, or cooking tips..."
              rows="1"
              disabled={isLoading}
            />
            <button 
              onClick={sendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="send-button"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
