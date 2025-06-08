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
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Butter+Chicken',
      ingredients: [
        '500g boneless chicken, cut into pieces',
        '2 tbsp butter',
        '1 large onion, finely chopped',
        '3 cloves garlic, minced',
        '1 inch ginger, grated',
        '1 tsp garam masala',
        '1 tsp cumin powder',
        '1 tsp coriander powder',
        '1/2 tsp red chili powder',
        '400g canned tomatoes, crushed',
        '1/2 cup heavy cream',
        '2 tbsp tomato paste',
        'Salt to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Marinate chicken pieces with salt, red chili powder, and half of the garam masala for 30 minutes.',
        'Heat butter in a large pan and cook marinated chicken until golden brown. Remove and set aside.',
        'In the same pan, add chopped onions and cook until golden brown.',
        'Add minced garlic and grated ginger. Cook for 2 minutes until fragrant.',
        'Add tomato paste and cook for 1 minute, then add crushed tomatoes.',
        'Add remaining spices and let the sauce simmer for 10 minutes until thickened.',
        'Return the chicken to the pan and simmer for 15 minutes.',
        'Stir in heavy cream and cook for another 5 minutes.',
        'Garnish with fresh cilantro and serve hot with basmati rice or naan.'
      ],
      culturalStory: 'Butter Chicken, also known as Murgh Makhani, was invented in the 1950s by Kundan Lal Gujral at his restaurant Moti Mahal in Delhi. Legend has it that this iconic dish was created by accident when leftover tandoori chicken was mixed with tomato gravy, butter, and cream. Today, it\'s one of the most beloved Indian dishes worldwide, representing the rich culinary heritage of North India.',
      tips: [
        'For best results, marinate the chicken overnight in the refrigerator.',
        'Use good quality tomatoes for a richer flavor in the sauce.',
        'Don\'t skip the cream - it\'s essential for the authentic taste and texture.',
        'Serve with basmati rice or fresh naan bread for the complete experience.'
      ]
    },
    {
      id: 'masala-dosa',
      title: 'Masala Dosa',
      description: 'Crispy fermented rice crepe filled with spiced potato filling.',
      region: 'South India',
      prepTime: 30,
      cookTime: 20,
      rating: 4.8,
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Masala+Dosa',
      ingredients: [
        '2 cups dosa batter (store-bought or homemade)',
        '4 large potatoes, boiled and cubed',
        '1 large onion, sliced',
        '2 green chilies, slit',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '10-12 curry leaves',
        '1/2 tsp turmeric powder',
        '1 tsp ginger-garlic paste',
        '2 tbsp oil',
        'Salt to taste',
        'Fresh coriander leaves',
        'Coconut chutney for serving',
        'Sambar for serving'
      ],
      instructions: [
        'Heat oil in a pan and add mustard seeds. When they splutter, add cumin seeds.',
        'Add curry leaves, green chilies, and sliced onions. Cook until onions are soft.',
        'Add ginger-garlic paste and cook for 1 minute.',
        'Add turmeric powder and boiled potato cubes. Mix well and season with salt.',
        'Cook for 5-7 minutes, mashing some potatoes. Garnish with coriander leaves.',
        'Heat a non-stick pan or tawa and pour a ladle of dosa batter.',
        'Spread the batter in a circular motion to form a thin crepe.',
        'Drizzle oil around the edges and cook until the bottom is golden and crispy.',
        'Place the potato filling on one side of the dosa and fold it over.',
        'Serve hot with coconut chutney and sambar.'
      ],
      culturalStory: 'Masala Dosa originated in the restaurants of Mysore and Bangalore in the early 20th century. This iconic South Indian dish represents the perfect marriage of nutrition and taste, with its fermented batter providing probiotics and the spiced potato filling offering comfort. It has become a symbol of South Indian cuisine and is enjoyed across India and worldwide.',
      tips: [
        'Ensure the dosa batter is at room temperature for best results.',
        'The pan should be hot but not smoking when you pour the batter.',
        'Use a ladle to spread the batter from center to edges in a spiral motion.',
        'The key to crispy dosa is using the right amount of oil and proper heat control.'
      ]
    },
    {
      id: 'chole-bhature',
      title: 'Chole Bhature',
      description: 'Spicy chickpea curry served with deep-fried bread.',
      region: 'Punjab',
      prepTime: 40,
      cookTime: 30,
      rating: 4.7,
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Chole+Bhature',
      ingredients: [
        '2 cups dried chickpeas, soaked overnight',
        '2 large onions, finely chopped',
        '4 tomatoes, finely chopped',
        '1 tbsp ginger-garlic paste',
        '2 green chilies, chopped',
        '2 tsp chole masala powder',
        '1 tsp red chili powder',
        '1 tsp turmeric powder',
        '1 tsp cumin seeds',
        '2 bay leaves',
        '1 inch cinnamon stick',
        '3 tbsp oil',
        'Salt to taste',
        'Fresh cilantro for garnish',
        // For Bhature
        '2 cups all-purpose flour',
        '1/2 cup yogurt',
        '1 tsp baking powder',
        '1/2 tsp salt',
        '1 tsp sugar',
        '2 tbsp oil',
        'Oil for deep frying'
      ],
      instructions: [
        'Cook soaked chickpeas in a pressure cooker with salt until tender. Reserve the cooking liquid.',
        'Heat oil in a heavy-bottomed pan. Add cumin seeds, bay leaves, and cinnamon.',
        'Add chopped onions and cook until golden brown.',
        'Add ginger-garlic paste and green chilies. Cook for 2 minutes.',
        'Add chopped tomatoes and cook until they break down completely.',
        'Add all spice powders and cook for 2-3 minutes until fragrant.',
        'Add cooked chickpeas with some cooking liquid. Simmer for 15-20 minutes.',
        'For bhature, mix flour, yogurt, baking powder, salt, sugar, and oil. Knead into soft dough.',
        'Rest the dough for 30 minutes, then roll into circles and deep fry until puffed and golden.',
        'Garnish chole with cilantro and serve hot with bhature.'
      ],
      culturalStory: 'Chole Bhature is believed to have originated in Punjab and later became popular in Delhi. This hearty combination represents the robust flavors of Punjabi cuisine, where rich, spicy curries are paired with satisfying breads. It\'s a favorite weekend breakfast and street food across North India.',
      tips: [
        'Soak chickpeas overnight for better texture and faster cooking.',
        'Save some chickpea cooking water - it adds great flavor to the curry.',
        'Let the bhature dough rest properly for lighter, fluffier bread.',
        'Serve immediately while bhature are hot and crispy.'
      ]
    },
    {
      id: 'hyderabadi-biryani',
      title: 'Hyderabadi Biryani',
      description: 'Aromatic rice dish layered with spiced meat and herbs.',
      region: 'Hyderabad',
      prepTime: 45,
      cookTime: 60,
      rating: 4.9,
      difficulty: 'Hard',
      servings: 6,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Hyderabadi+Biryani',
      ingredients: [
        '500g basmati rice',
        '750g mutton or chicken, cut into pieces',
        '1 cup yogurt',
        '2 tbsp ginger-garlic paste',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp garam masala powder',
        '2 large onions, thinly sliced',
        '1/2 cup milk',
        '1 tsp saffron strands',
        '4 tbsp ghee',
        '3 tbsp oil',
        '4 green cardamom pods',
        '2 black cardamom pods',
        '4 cloves',
        '2 bay leaves',
        '1 inch cinnamon stick',
        'Salt to taste',
        'Fresh mint leaves',
        'Fresh cilantro leaves',
        'Fried onions for garnish'
      ],
      instructions: [
        'Marinate meat with yogurt, ginger-garlic paste, red chili powder, turmeric, and salt for 2 hours.',
        'Soak saffron in warm milk and set aside.',
        'Deep fry sliced onions until golden brown and crispy. Drain and set aside.',
        'Cook marinated meat in a heavy-bottomed pot until 70% done. Set aside.',
        'Boil water with whole spices and salt. Add soaked rice and cook until 70% done.',
        'Layer the partially cooked rice over the meat.',
        'Sprinkle fried onions, mint, cilantro, saffron milk, and dots of ghee.',
        'Cover with aluminum foil, then place the lid. Cook on high heat for 3-4 minutes.',
        'Reduce heat to lowest setting and cook for 45 minutes.',
        'Turn off heat and let it rest for 10 minutes before opening.'
      ],
      culturalStory: 'Hyderabadi Biryani is a culinary masterpiece that evolved in the kitchens of the Nizams of Hyderabad. This dum-cooked biryani represents the perfect fusion of Mughlai and Telugu cuisines, where Persian cooking techniques met local Indian flavors to create something truly extraordinary.',
      tips: [
        'Use aged basmati rice for the best aroma and texture.',
        'The key is in the layering - alternate between rice and meat properly.',
        'Never lift the lid during the dum cooking process.',
        'Let the biryani rest after cooking for flavors to meld together.'
      ]
    }
  ];
};

const getAdditionalRecipes = () => {
  return [
    {
      id: 'rajma',
      title: 'Rajma',
      description: 'Kidney bean curry cooked in aromatic spices.',
      region: 'North India',
      prepTime: 20,
      cookTime: 40,
      rating: 4.6,
      difficulty: 'Easy',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Rajma',
      ingredients: [
        '2 cups dried kidney beans, soaked overnight',
        '2 medium onions, finely chopped',
        '3 tomatoes, finely chopped',
        '1 tbsp ginger-garlic paste',
        '2 green chilies, chopped',
        '1 tsp cumin seeds',
        '1 tsp coriander powder',
        '1 tsp red chili powder',
        '1/2 tsp turmeric powder',
        '1 tsp garam masala powder',
        '3 tbsp oil',
        'Salt to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Cook soaked kidney beans in a pressure cooker until tender.',
        'Heat oil in a pan and add cumin seeds.',
        'Add chopped onions and cook until golden brown.',
        'Add ginger-garlic paste and green chilies. Cook for 2 minutes.',
        'Add chopped tomatoes and cook until soft and mushy.',
        'Add all spice powders and cook for 2-3 minutes.',
        'Add cooked kidney beans with cooking liquid.',
        'Simmer for 15-20 minutes until curry thickens.',
        'Garnish with cilantro and serve with rice.'
      ]
    },
    {
      id: 'fish-curry',
      title: 'Bengali Fish Curry',
      description: 'Traditional fish curry with mustard oil and spices.',
      region: 'West Bengal',
      prepTime: 25,
      cookTime: 35,
      rating: 4.7,
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Fish+Curry',
      ingredients: [
        '500g fish (Rohu or Katla), cut into pieces',
        '2 medium onions, sliced',
        '2 tomatoes, chopped',
        '1 tbsp ginger paste',
        '1 tsp garlic paste',
        '1 tsp turmeric powder',
        '1 tsp red chili powder',
        '1 tsp cumin powder',
        '1 tsp coriander powder',
        '2 green chilies, slit',
        '4 tbsp mustard oil',
        '1 tsp panch phoron (Bengali five-spice)',
        'Salt to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Marinate fish pieces with turmeric and salt for 15 minutes.',
        'Heat mustard oil in a pan and fry fish pieces until golden. Set aside.',
        'In the same oil, add panch phoron and let it splutter.',
        'Add sliced onions and cook until soft.',
        'Add ginger-garlic paste and green chilies. Cook for 2 minutes.',
        'Add chopped tomatoes and all spice powders.',
        'Cook until tomatoes break down and oil separates.',
        'Add water to make a curry consistency.',
        'Gently add fried fish pieces and simmer for 10 minutes.',
        'Garnish with cilantro and serve with steamed rice.'
      ]
    },
    {
      id: 'dal-makhani',
      title: 'Dal Makhani',
      description: 'Creamy black lentils slow-cooked with butter and cream.',
      region: 'Punjab',
      prepTime: 15,
      cookTime: 120,
      rating: 4.8,
      difficulty: 'Medium',
      servings: 6,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Dal+Makhani',
      ingredients: [
        '1 cup whole black lentils (urad dal), soaked overnight',
        '1/4 cup kidney beans, soaked overnight',
        '2 tbsp butter',
        '1 tbsp ghee',
        '1 large onion, finely chopped',
        '2 tomatoes, pureed',
        '1 tbsp ginger-garlic paste',
        '1 green chili, chopped',
        '1 tsp cumin seeds',
        '1 tsp red chili powder',
        '1 tsp garam masala powder',
        '1/2 cup heavy cream',
        'Salt to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Cook soaked lentils and kidney beans in pressure cooker until very soft.',
        'Heat butter and ghee in a heavy-bottomed pan.',
        'Add cumin seeds and chopped onions. Cook until golden.',
        'Add ginger-garlic paste and green chili. Cook for 2 minutes.',
        'Add tomato puree and cook until oil separates.',
        'Add cooked lentils and simmer on low heat for 1-2 hours.',
        'Stir occasionally and add water if needed.',
        'Add cream and garam masala in the last 10 minutes.',
        'Garnish with cilantro and serve with naan or rice.'
      ]
    },
    {
      id: 'dhokla',
      title: 'Dhokla',
      description: 'Steamed fermented rice and chickpea cake.',
      region: 'Gujarat',
      prepTime: 20,
      cookTime: 25,
      rating: 4.5,
      difficulty: 'Easy',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Dhokla',
      ingredients: [
        '1 cup gram flour (besan)',
        '1/4 cup semolina',
        '1 tbsp ginger-green chili paste',
        '1 tsp turmeric powder',
        '1 tsp sugar',
        '1 tsp salt',
        '1 tbsp oil',
        '1 tsp eno fruit salt',
        '3/4 cup water',
        // For tempering
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp sesame seeds',
        '8-10 curry leaves',
        '2 green chilies, slit',
        'Fresh cilantro and coconut for garnish'
      ],
      instructions: [
        'Mix gram flour, semolina, ginger-chili paste, turmeric, sugar, salt, and oil.',
        'Add water gradually to make a smooth batter.',
        'Just before steaming, add eno and mix gently.',
        'Pour into greased steaming plates and steam for 12-15 minutes.',
        'Check doneness with a toothpick - it should come out clean.',
        'For tempering, heat oil and add mustard seeds.',
        'Add sesame seeds, curry leaves, and green chilies.',
        'Pour tempering over steamed dhokla.',
        'Garnish with cilantro and coconut. Serve with chutney.'
      ]
    },
    {
      id: 'pav-bhaji',
      title: 'Pav Bhaji',
      description: 'Spiced vegetable curry served with buttered bread rolls.',
      region: 'Maharashtra',
      prepTime: 20,
      cookTime: 30,
      rating: 4.6,
      difficulty: 'Easy',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Pav+Bhaji',
      ingredients: [
        '3 large potatoes, boiled and mashed',
        '1 cup cauliflower, finely chopped',
        '1 cup green peas',
        '1 cup carrots, finely chopped',
        '2 large onions, finely chopped',
        '3 tomatoes, finely chopped',
        '1 tbsp ginger-garlic paste',
        '2 tbsp pav bhaji masala',
        '1 tsp red chili powder',
        '4 tbsp butter',
        '2 tbsp oil',
        '8 pav (bread rolls)',
        'Salt to taste',
        'Chopped onions and cilantro for garnish',
        'Lemon wedges for serving'
      ],
      instructions: [
        'Heat oil and butter in a large pan.',
        'Add chopped onions and cook until soft.',
        'Add ginger-garlic paste and cook for 2 minutes.',
        'Add all chopped vegetables and cook until tender.',
        'Add tomatoes and cook until soft.',
        'Add mashed potatoes and mix well.',
        'Add pav bhaji masala, red chili powder, and salt.',
        'Mash everything together and cook for 10 minutes.',
        'Butter the pav and toast on a griddle.',
        'Serve hot bhaji with buttered pav, onions, and lemon.'
      ]
    },
    {
      id: 'dal-baati-churma',
      title: 'Dal Baati Churma',
      description: 'Traditional Rajasthani dish with lentils, baked wheat balls, and sweet crumble.',
      region: 'Rajasthan',
      prepTime: 45,
      cookTime: 60,
      rating: 4.7,
      difficulty: 'Hard',
      servings: 6,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Dal+Baati+Churma',
      ingredients: [
        // For Baati
        '2 cups wheat flour',
        '1/4 cup semolina',
        '1/4 cup ghee',
        '1 tsp salt',
        '1/2 tsp carom seeds',
        // For Dal
        '1 cup mixed lentils',
        '2 tomatoes, chopped',
        '1 onion, chopped',
        '1 tbsp ginger-garlic paste',
        '1 tsp turmeric powder',
        '1 tsp red chili powder',
        '2 tbsp ghee',
        // For Churma
        '1 cup coarsely ground wheat flour',
        '1/2 cup jaggery, grated',
        '1/4 cup ghee',
        '1/2 tsp cardamom powder',
        'Chopped almonds and pistachios'
      ],
      instructions: [
        'For baati, mix flour, semolina, ghee, salt, and carom seeds.',
        'Add water to make stiff dough. Form into balls and bake at 200°C for 30 minutes.',
        'For dal, cook lentils until soft. Temper with ghee, onions, and spices.',
        'Add tomatoes and simmer until thick.',
        'For churma, roast ground wheat in ghee until golden.',
        'Add jaggery, cardamom, and nuts. Mix well.',
        'Serve baati dipped in ghee with dal and churma.'
      ]
    },
    {
      id: 'sambar',
      title: 'Sambar',
      description: 'South Indian lentil curry with vegetables and tamarind.',
      region: 'Tamil Nadu',
      prepTime: 20,
      cookTime: 30,
      rating: 4.6,
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Sambar',
      ingredients: [
        '1 cup toor dal (split pigeon peas)',
        '2 tbsp tamarind paste',
        '2 tbsp sambar powder',
        '1 cup mixed vegetables (drumstick, brinjal, okra)',
        '1 onion, chopped',
        '2 tomatoes, chopped',
        '2 tbsp oil',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        '10-12 curry leaves',
        '2 dried red chilies',
        '1/4 tsp asafoetida',
        '1/2 tsp turmeric powder',
        'Salt to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Cook toor dal until soft and mushy.',
        'Heat oil and add mustard seeds, cumin seeds.',
        'Add curry leaves, red chilies, and asafoetida.',
        'Add onions and cook until soft.',
        'Add vegetables and cook for 5 minutes.',
        'Add tomatoes, turmeric, and sambar powder.',
        'Add cooked dal and tamarind paste.',
        'Add water to desired consistency and simmer for 15 minutes.',
        'Garnish with cilantro and serve with rice or idli.'
      ]
    },
    {
      id: 'kerala-fish-curry',
      title: 'Kerala Fish Curry',
      description: 'Coconut-based fish curry with curry leaves and kokum.',
      region: 'Kerala',
      prepTime: 30,
      cookTime: 25,
      rating: 4.8,
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Kerala+Fish+Curry',
      ingredients: [
        '500g fish (kingfish or pomfret), cut into pieces',
        '2 cups coconut milk',
        '1 tbsp coconut oil',
        '1 large onion, sliced',
        '3 tomatoes, chopped',
        '1 tbsp ginger-garlic paste',
        '3 green chilies, slit',
        '15-20 curry leaves',
        '1 tsp turmeric powder',
        '2 tsp red chili powder',
        '1 tsp coriander powder',
        '4-5 kokum petals',
        'Salt to taste'
      ],
      instructions: [
        'Marinate fish with turmeric and salt for 15 minutes.',
        'Heat coconut oil and add curry leaves.',
        'Add sliced onions and cook until soft.',
        'Add ginger-garlic paste and green chilies.',
        'Add tomatoes and cook until soft.',
        'Add all spice powders and cook for 2 minutes.',
        'Add thick coconut milk and bring to a gentle boil.',
        'Add fish pieces and kokum. Simmer for 10 minutes.',
        'Serve hot with steamed rice.'
      ]
    },
    {
      id: 'palak-paneer',
      title: 'Palak Paneer',
      description: 'Creamy spinach curry with cottage cheese cubes.',
      region: 'North India',
      prepTime: 25,
      cookTime: 20,
      rating: 4.7,
      difficulty: 'Medium',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Palak+Paneer',
      ingredients: [
        '500g fresh spinach leaves',
        '250g paneer, cubed',
        '2 onions, chopped',
        '3 tomatoes, chopped',
        '1 tbsp ginger-garlic paste',
        '2 green chilies',
        '1 tsp cumin seeds',
        '1 tsp garam masala',
        '1/2 tsp red chili powder',
        '1/4 cup cream',
        '3 tbsp oil',
        'Salt to taste'
      ],
      instructions: [
        'Blanch spinach leaves in boiling water for 2 minutes.',
        'Blend blanched spinach with green chilies to smooth paste.',
        'Heat oil and lightly fry paneer cubes. Set aside.',
        'Add cumin seeds to the same oil.',
        'Add onions and cook until golden.',
        'Add ginger-garlic paste and tomatoes.',
        'Add spices and cook until oil separates.',
        'Add spinach puree and simmer for 10 minutes.',
        'Add paneer and cream. Cook for 5 minutes.',
        'Serve hot with naan or rice.'
      ]
    },
    {
      id: 'aloo-gobi',
      title: 'Aloo Gobi',
      description: 'Spiced potato and cauliflower dry curry.',
      region: 'North India',
      prepTime: 20,
      cookTime: 25,
      rating: 4.5,
      difficulty: 'Easy',
      servings: 4,
      image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Aloo+Gobi',
      ingredients: [
        '3 large potatoes, cubed',
        '1 medium cauliflower, cut into florets',
        '2 onions, sliced',
        '2 tomatoes, chopped',
        '1 tbsp ginger-garlic paste',
        '1 tsp cumin seeds',
        '1 tsp turmeric powder',
        '1 tsp red chili powder',
        '1 tsp coriander powder',
        '1/2 tsp garam masala',
        '3 tbsp oil',
        'Salt to taste',
        'Fresh cilantro for garnish'
      ],
      instructions: [
        'Heat oil in a large pan and add cumin seeds.',
        'Add potato cubes and fry until lightly golden.',
        'Add cauliflower florets and cook for 5 minutes.',
        'Add onions and cook until soft.',
        'Add ginger-garlic paste and tomatoes.',
        'Add all spices and mix well.',
        'Cover and cook on low heat for 15 minutes.',
        'Stir occasionally until vegetables are tender.',
        'Garnish with cilantro and serve with roti.'
      ]
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
        servings: 2,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Mango+Lassi',
        seasonal: true,
        ingredients: [
          '1 cup ripe mango, chopped',
          '1 cup yogurt',
          '1/4 cup milk',
          '2 tbsp sugar',
          '1/4 tsp cardamom powder',
          'Ice cubes',
          'Pistachios for garnish'
        ],
        instructions: [
          'Blend mango, yogurt, milk, and sugar until smooth.',
          'Add cardamom powder and blend again.',
          'Add ice cubes and blend until frothy.',
          'Pour into glasses and garnish with chopped pistachios.',
          'Serve immediately while cold.'
        ]
      },
      {
        id: 'aam-panna',
        title: 'Aam Panna',
        description: 'Tangy raw mango cooler with mint and spices.',
        region: 'North India',
        prepTime: 15,
        cookTime: 10,
        rating: 4.6,
        servings: 4,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Aam+Panna',
        seasonal: true,
        ingredients: [
          '2 large raw mangoes',
          '1/2 cup sugar',
          '1 tsp roasted cumin powder',
          '1/2 tsp black salt',
          '1/4 tsp regular salt',
          '15-20 mint leaves',
          '1/4 tsp black pepper',
          '4 cups chilled water',
          'Ice cubes',
          'Mint sprigs for garnish'
        ],
        instructions: [
          'Boil raw mangoes until soft. Cool and extract pulp.',
          'Blend mango pulp with sugar, cumin powder, salts, mint, and pepper.',
          'Add chilled water and mix well.',
          'Add ice cubes and garnish with mint.',
          'Serve immediately as a summer cooler.'
        ]
      },
      {
        id: 'cucumber-raita',
        title: 'Cucumber Raita',
        description: 'Cooling yogurt side dish with cucumber and cumin.',
        region: 'All India',
        prepTime: 10,
        cookTime: 0,
        rating: 4.5,
        servings: 4,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Cucumber+Raita',
        seasonal: true,
        ingredients: [
          '2 cups yogurt',
          '2 large cucumbers, grated',
          '1 tsp roasted cumin powder',
          '1/2 tsp black salt',
          '1/4 tsp regular salt',
          '1 tbsp mint leaves, chopped',
          '1 tbsp cilantro, chopped',
          '1 green chili, finely chopped',
          'Chaat masala for sprinkling'
        ],
        instructions: [
          'Whisk yogurt until smooth.',
          'Squeeze excess water from grated cucumber.',
          'Mix cucumber with yogurt.',
          'Add cumin powder, salts, mint, cilantro, and green chili.',
          'Chill for 30 minutes and serve with chaat masala sprinkled on top.'
        ]
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
        servings: 4,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Sarson+Ka+Saag',
        seasonal: true,
        ingredients: [
          '500g mustard greens, chopped',
          '250g spinach, chopped',
          '100g bathua leaves (optional)',
          '2 tbsp cornmeal',
          '1 tbsp ginger-garlic paste',
          '2 green chilies',
          '1 tsp cumin seeds',
          '2 tbsp ghee',
          'Salt to taste',
          'Butter for serving'
        ],
        instructions: [
          'Boil mustard greens, spinach, and bathua with salt until tender.',
          'Blend to coarse paste or mash with wooden spoon.',
          'Heat ghee and add cumin seeds.',
          'Add ginger-garlic paste and green chilies.',
          'Add the greens mixture and cornmeal.',
          'Cook on low heat for 30 minutes, stirring occasionally.',
          'Serve hot with butter and makki di roti.'
        ]
      },
      {
        id: 'gajar-ka-halwa',
        title: 'Gajar Ka Halwa',
        description: 'Sweet carrot pudding with cardamom and nuts.',
        region: 'North India',
        prepTime: 20,
        cookTime: 40,
        rating: 4.9,
        servings: 6,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Gajar+Ka+Halwa',
        seasonal: true,
        ingredients: [
          '1 kg fresh carrots, grated',
          '1 liter full-fat milk',
          '1/2 cup sugar',
          '4 tbsp ghee',
          '1/2 tsp cardamom powder',
          '1/4 cup almonds, chopped',
          '1/4 cup pistachios, chopped',
          '2 tbsp raisins'
        ],
        instructions: [
          'Heat ghee in a heavy-bottomed pan.',
          'Add grated carrots and cook for 10 minutes.',
          'Add milk and cook on medium heat until milk reduces.',
          'Keep stirring occasionally to prevent sticking.',
          'Add sugar and cardamom powder.',
          'Cook until mixture thickens and leaves the sides.',
          'Garnish with nuts and raisins. Serve warm.'
        ]
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
        servings: 4,
        image: 'https://placehold.co/600x400/FFF8E1/E65100?text=Pakoras',
        seasonal: true,
        ingredients: [
          '1 cup gram flour (besan)',
          '2 onions, thinly sliced',
          '2 potatoes, thinly sliced',
          '1 cup spinach leaves',
          '2 green chilies, chopped',
          '1 tsp ginger paste',
          '1 tsp red chili powder',
          '1/2 tsp turmeric powder',
          '1 tsp cumin seeds',
          'Salt to taste',
          'Oil for deep frying',
          'Mint chutney for serving'
        ],
        instructions: [
          'Mix gram flour with all spices and salt.',
          'Add very little water to make thick batter.',
          'Mix vegetables with the batter.',
          'Heat oil for deep frying.',
          'Drop spoonfuls of mixture into hot oil.',
          'Fry until golden brown and crispy.',
          'Serve hot with mint chutney and tea.'
        ]
      }
    ];
  }
};

export const getAllRecipes = () => {
  return [
    ...getFeaturedRecipes(),
    ...getAdditionalRecipes(),
    ...getSeasonalRecipes(),
  ];
};

export const getRecipeById = (id) => {
  const allRecipes = getAllRecipes();
  return allRecipes.find(recipe => recipe.id === id) || null;
};