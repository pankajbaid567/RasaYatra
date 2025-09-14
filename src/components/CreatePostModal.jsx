import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, Clock, Users, ChefHat } from 'lucide-react';
import '../styles/components/CreatePostModal.css';

const CreatePostModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    tags: '',
    includeRecipe: false,
    recipe: {
      prepTime: '',
      cookTime: '',
      servings: '',
      ingredients: '',
      instructions: ''
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRecipeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      recipe: {
        ...prev.recipe,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const postData = {
      title: formData.title,
      content: formData.content,
      image: formData.image || null,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
      recipe: formData.includeRecipe ? {
        prepTime: parseInt(formData.recipe.prepTime) || 0,
        cookTime: parseInt(formData.recipe.cookTime) || 0,
        servings: parseInt(formData.recipe.servings) || 1,
        ingredients: formData.recipe.ingredients.split('\n').filter(ing => ing.trim()),
        instructions: formData.recipe.instructions.split('\n').filter(inst => inst.trim())
      } : null
    };

    onSubmit(postData);
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="create-post-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Share Your Culinary Creation</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Give your post a catchy title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Description *</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              placeholder="Tell us about your dish, cooking experience, or tips..."
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <div className="image-input-wrapper">
              <Image size={20} />
              <input
                type="url"
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="https://example.com/your-dish-image.jpg"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              placeholder="spicy, vegetarian, quick (comma-separated)"
            />
          </div>

          {/* Recipe Toggle */}
          <div className="recipe-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={formData.includeRecipe}
                onChange={(e) => handleInputChange('includeRecipe', e.target.checked)}
              />
              <span className="toggle-slider"></span>
              Include Recipe Details
            </label>
            <span className="toggle-description">
              <ChefHat size={16} />
              Share the complete recipe with your post
            </span>
          </div>

          {/* Recipe Details */}
          {formData.includeRecipe && (
            <div className="recipe-details">
              <h3>Recipe Details</h3>
              
              <div className="recipe-meta">
                <div className="form-group small">
                  <label htmlFor="prepTime">
                    <Clock size={16} />
                    Prep Time (mins)
                  </label>
                  <input
                    type="number"
                    id="prepTime"
                    value={formData.recipe.prepTime}
                    onChange={(e) => handleRecipeChange('prepTime', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group small">
                  <label htmlFor="cookTime">
                    <Clock size={16} />
                    Cook Time (mins)
                  </label>
                  <input
                    type="number"
                    id="cookTime"
                    value={formData.recipe.cookTime}
                    onChange={(e) => handleRecipeChange('cookTime', e.target.value)}
                    min="0"
                  />
                </div>

                <div className="form-group small">
                  <label htmlFor="servings">
                    <Users size={16} />
                    Servings
                  </label>
                  <input
                    type="number"
                    id="servings"
                    value={formData.recipe.servings}
                    onChange={(e) => handleRecipeChange('servings', e.target.value)}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="ingredients">Ingredients</label>
                <textarea
                  id="ingredients"
                  value={formData.recipe.ingredients}
                  onChange={(e) => handleRecipeChange('ingredients', e.target.value)}
                  placeholder="List each ingredient on a new line&#10;2 cups rice&#10;1 tsp salt&#10;3 tbsp oil"
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label htmlFor="instructions">Instructions</label>
                <textarea
                  id="instructions"
                  value={formData.recipe.instructions}
                  onChange={(e) => handleRecipeChange('instructions', e.target.value)}
                  placeholder="Write each step on a new line&#10;1. Heat oil in a pan&#10;2. Add rice and salt&#10;3. Cook for 15 minutes"
                  rows={4}
                />
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Share Post
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default CreatePostModal;