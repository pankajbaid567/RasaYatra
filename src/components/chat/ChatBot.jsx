import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Namaste! I\'m your RasaYatra guide. How can I help you explore Indian cuisine today?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Knowledge base specific to RasaYatra
  const knowledge = {
    greetings: ['hello', 'hi', 'hey', 'namaste', 'greetings'],
    regions: ['punjab', 'south india', 'north india', 'bengal', 'kerala', 'gujarat', 'hyderabad', 'rajasthan'],
    recipes: ['butter chicken', 'masala dosa', 'chole bhature', 'hyderabadi biryani', 'mango lassi', 'aam panna', 'cucumber raita'],
    seasonal: ['summer', 'winter', 'monsoon', 'spring', 'seasonal'],
    navigation: ['recipes', 'regions', 'about', 'explore', 'map', 'home']
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    
    // Process the query and generate a response
    processQuery(input);
    
    // Clear input
    setInput('');
  };
  
  const processQuery = (query) => {
    const lowerQuery = query.toLowerCase();
    
    // Process greeting
    if (knowledge.greetings.some(greeting => lowerQuery.includes(greeting))) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: 'Namaste! How can I help you discover Indian cuisine today?' }]);
      }, 500);
      return;
    }
    
    // Process recipe inquiries
    if (lowerQuery.includes('recipe') || knowledge.recipes.some(recipe => lowerQuery.includes(recipe))) {
      let matchedRecipe = knowledge.recipes.find(recipe => lowerQuery.includes(recipe));
      
      if (matchedRecipe) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: `I'd be happy to tell you about ${matchedRecipe}! Would you like to see the recipe, or learn about its cultural significance?`,
            actions: [
              { label: 'See Recipe', action: () => navigate(`/recipes/${matchedRecipe.replace(/\s+/g, '-')}`) },
              { label: 'Cultural Story', action: () => navigate(`/stories/${matchedRecipe.replace(/\s+/g, '-')}`) }
            ]
          }]);
        }, 700);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'We have many delicious recipes from across India! What region or type of dish are you interested in?',
            actions: [
              { label: 'Browse All Recipes', action: () => navigate('/recipes') }
            ]
          }]);
        }, 700);
      }
      return;
    }
    
    // Process regional cuisine inquiries
    if (lowerQuery.includes('region') || knowledge.regions.some(region => lowerQuery.includes(region))) {
      let matchedRegion = knowledge.regions.find(region => lowerQuery.includes(region));
      
      if (matchedRegion) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: `${matchedRegion} has a rich culinary tradition! Would you like to explore recipes from this region?`,
            actions: [
              { label: 'Explore Region', action: () => navigate(`/regions/${matchedRegion.replace(/\s+/g, '-')}`) }
            ]
          }]);
        }, 700);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'India has diverse regional cuisines! You can explore them through our interactive map.',
            actions: [
              { label: 'Open Map', action: () => navigate('/regions') }
            ]
          }]);
        }, 700);
      }
      return;
    }
    
    // Process seasonal food inquiries
    if (knowledge.seasonal.some(term => lowerQuery.includes(term))) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: 'Indian cuisine is deeply connected to seasons! We have special seasonal recipes that utilize fresh ingredients available at specific times of year.',
          actions: [
            { label: 'Seasonal Delights', action: () => navigate('/seasonal') }
          ]
        }]);
      }, 700);
      return;
    }
    
    // Process navigation requests
    if (lowerQuery.includes('navigate') || lowerQuery.includes('take me to') || 
        knowledge.navigation.some(page => lowerQuery.includes(page))) {
      
      if (lowerQuery.includes('recipe') || lowerQuery.includes('recipes')) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'I can take you to our recipes page!',
            actions: [
              { label: 'Go to Recipes', action: () => navigate('/recipes') }
            ]
          }]);
        }, 500);
        return;
      }
      
      if (lowerQuery.includes('region') || lowerQuery.includes('regions') || lowerQuery.includes('map')) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'I can take you to our interactive regional map!',
            actions: [
              { label: 'Open Map', action: () => navigate('/regions') }
            ]
          }]);
        }, 500);
        return;
      }
      
      if (lowerQuery.includes('about')) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'I can take you to our About page to learn more about RasaYatra!',
            actions: [
              { label: 'About Us', action: () => navigate('/about') }
            ]
          }]);
        }, 500);
        return;
      }
      
      if (lowerQuery.includes('home')) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: 'Taking you back to our homepage.',
            actions: [
              { label: 'Home', action: () => navigate('/') }
            ]
          }]);
        }, 500);
        return;
      }
    }
    
    // Default response for unrecognized queries
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'I\'d be happy to help you explore Indian cuisine! Would you like to discover recipes, learn about regional specialties, or find seasonal dishes?',
        actions: [
          { label: 'Explore Recipes', action: () => navigate('/recipes') },
          { label: 'Regional Map', action: () => navigate('/regions') },
          { label: 'Seasonal Dishes', action: () => navigate('/seasonal') }
        ]
      }]);
    }, 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleActionClick = (action) => {
    action();
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-container">
      {/* Chat bubble */}
      <div 
        className={`chat-bubble ${isOpen ? 'open' : ''}`}
        onClick={toggleChat}
      >
        {isOpen ? <X size={24} /> : (
          <img 
            src="/images/chatbot-icon.png" 
            alt="Chat Assistant" 
            className="chat-icon"
          />
        )}
      </div>
      
      {/* Chat dialog */}
      {isOpen && (
        <div className="chat-dialog">
          <div className="chat-header">
            <div className="chat-title">
              <img src="/favicon.svg" alt="RasaYatra" className="chat-logo" />
              <div>
                <h3>RasaYatra Guide</h3>
                <p className="status">Online</p>
              </div>
            </div>
            <button className="close-button" onClick={toggleChat}>
              <X size={18} />
            </button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">{msg.content}</div>
                
                {/* Action buttons for bot messages */}
                {msg.type === 'bot' && msg.actions && (
                  <div className="message-actions">
                    {msg.actions.map((action, actionIndex) => (
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
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={handleKeyPress}
              placeholder="Ask about Indian cuisine..." 
              className="chat-input"
            />
            <div className="chat-controls">
              <button className="send-button" onClick={handleSend}>
                <Send size={18} />
              </button>
            </div>
          </div>
          
          <div className="chat-footer">
            <p>Discover RasaYatra - India's Culinary Heritage</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
