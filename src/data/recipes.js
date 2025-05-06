// Mock data for recipes until backend integration is complete

export const getFeaturedRecipes = () => {
  return [
    {
      id: 'butter-chicken',
      title: 'Butter Chicken',
      description: 'A rich and creamy tomato-based curry with tender chicken pieces.',
      region: 'Punjab',
      prepTime: 30,
      cookTime: 45,
      rating: 4.9,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Butter+Chicken'
    },
    {
      id: 'masala-dosa',
      title: 'Masala Dosa',
      description: 'Crispy fermented rice crepe filled with spiced potato filling.',
      region: 'South India',
      prepTime: 30,
      cookTime: 20,
      rating: 4.8,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Masala+Dosa'
    },
    {
      id: 'chole-bhature',
      title: 'Chole Bhature',
      description: 'Spicy chickpea curry served with deep-fried bread.',
      region: 'Punjab',
      prepTime: 40,
      cookTime: 30,
      rating: 4.7,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Chole+Bhature'
    },
    {
      id: 'hyderabadi-biryani',
      title: 'Hyderabadi Biryani',
      description: 'Aromatic rice dish layered with spiced meat and herbs.',
      region: 'Hyderabad',
      prepTime: 45,
      cookTime: 60,
      rating: 4.9,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Hyderabadi+Biryani'
    }
  ];
};

export const getSeasonalRecipes = () => {
  // Check current season and return appropriate recipes
  // For now, returning summer recipes as an example
  const currentMonth = new Date().getMonth(); // 0-11
  
  // Summer recipes (April to July: months 3-6)
  if (currentMonth >= 3 && currentMonth <= 6) {
    return [
      {
        id: 'mango-lassi',
        title: 'Mango Lassi',
        description: 'Refreshing yogurt drink with sweet mangoes and cardamom.',
        region: 'Punjab',
        prepTime: 10,
        cookTime: 0,
        rating: 4.7,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Mango+Lassi',
        seasonal: true
      },
      {
        id: 'aam-panna',
        title: 'Aam Panna',
        description: 'Tangy raw mango cooler with mint and spices.',
        region: 'North India',
        prepTime: 15,
        cookTime: 10,
        rating: 4.6,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Aam+Panna',
        seasonal: true
      },
      {
        id: 'cucumber-raita',
        title: 'Cucumber Raita',
        description: 'Cooling yogurt side dish with cucumber and cumin.',
        region: 'All India',
        prepTime: 10,
        cookTime: 0,
        rating: 4.5,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Cucumber+Raita',
        seasonal: true
      }
    ];
  }
  
  // Winter recipes (November to February: months 10-11, 0-1)
  else if (currentMonth >= 10 || currentMonth <= 1) {
    return [
      {
        id: 'sarson-ka-saag',
        title: 'Sarson Ka Saag',
        description: 'Hearty mustard greens curry with makki di roti.',
        region: 'Punjab',
        prepTime: 30,
        cookTime: 45,
        rating: 4.8,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Sarson+Ka+Saag',
        seasonal: true
      },
      {
        id: 'gajar-ka-halwa',
        title: 'Gajar Ka Halwa',
        description: 'Sweet carrot pudding with cardamom and nuts.',
        region: 'North India',
        prepTime: 20,
        cookTime: 40,
        rating: 4.9,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Gajar+Ka+Halwa',
        seasonal: true
      }
    ];
  }
  
  // Spring/Monsoon recipes (rest of the year)
  else {
    return [
      {
        id: 'pakoras',
        title: 'Monsoon Pakoras',
        description: 'Crispy vegetable fritters perfect for rainy evenings.',
        region: 'All India',
        prepTime: 15,
        cookTime: 20,
        rating: 4.7,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Pakoras',
        seasonal: true
      }
    ];
  }
};

export const getAllRecipes = () => {
  // Combine featured and other recipes
  // In a real app, this would fetch from an API
  return [
    ...getFeaturedRecipes(),
    ...getSeasonalRecipes(),
    // Additional recipes would be added here
  ];
};

export const getRecipeById = (id) => {
  const allRecipes = getAllRecipes();
  return allRecipes.find(recipe => recipe.id === id) || null;
};
