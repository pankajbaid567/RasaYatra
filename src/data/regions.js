
export interface Region {
  id: string;
  name: string;
  states: string[];
  description: string;
  famousDishes: string[];
  keyIngredients: string[];
  culinaryInfluences: string[];
  imageUrl: string;
}

export const regions: Region[] = [
  {
    id: "north-india",
    name: "North India",
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Himachal Pradesh", "Jammu and Kashmir", "Uttarakhand", "Delhi"],
    description: "North Indian cuisine is characterized by its rich, aromatic gravies, tandoor-cooked breads, and extensive use of dairy products. The food is heavily influenced by Mughal culinary traditions, with an emphasis on meat dishes, rich curries, and flatbreads.",
    famousDishes: ["Butter Chicken", "Rogan Josh", "Chole Bhature", "Tandoori Chicken", "Biryani", "Paratha"],
    keyIngredients: ["Wheat flour", "Paneer", "Ghee", "Yogurt", "Garam masala", "Cardamom", "Cloves", "Cinnamon"],
    culinaryInfluences: ["Mughal", "Persian", "Central Asian"],
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2084&auto=format&fit=crop"
  },
  {
    id: "south-india",
    name: "South India",
    states: ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"],
    description: "South Indian cuisine is known for its extensive use of rice, coconut, and spices. The food tends to be lighter, often vegetarian, and features distinctive flavors from curry leaves, mustard seeds, and coconut. Rice-based dishes, lentil preparations, and seafood are staples.",
    famousDishes: ["Masala Dosa", "Idli Sambar", "Hyderabadi Biryani", "Appam", "Rasam", "Pongal"],
    keyIngredients: ["Rice", "Coconut", "Tamarind", "Curry leaves", "Mustard seeds", "Red chilies", "Asafoetida"],
    culinaryInfluences: ["Temple cuisine", "Portuguese", "Arab"],
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "east-india",
    name: "East India",
    states: ["West Bengal", "Odisha", "Bihar", "Jharkhand", "Assam", "Nagaland", "Manipur", "Mizoram", "Tripura", "Meghalaya", "Arunachal Pradesh", "Sikkim"],
    description: "East Indian cuisine features subtle flavors with a focus on fish, rice, and vegetables. Bengali cuisine is known for its perfect balance of sweet and spicy flavors, while Northeastern cuisines are characterized by fermented ingredients and minimal spices.",
    famousDishes: ["Rasgulla", "Machher Jhol", "Momos", "Litti Chokha", "Pitha", "Thukpa"],
    keyIngredients: ["Mustard oil", "Panch phoron", "Rice", "Bamboo shoot", "Fermented fish", "Banana leaf"],
    culinaryInfluences: ["Buddhist", "Tibetan", "Bengali"],
    imageUrl: "https://images.unsplash.com/photo-1605195340000-e9b5e5236048?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "west-india",
    name: "West India",
    states: ["Maharashtra", "Gujarat", "Goa", "Rajasthan"],
    description: "West Indian cuisine varies dramatically across states. Gujarati cuisine is predominantly vegetarian with sweet undertones. Maharashtrian food offers a perfect balance of spicy, sweet, and tangy flavors. Goan cuisine showcases Portuguese influences with extensive use of seafood and coconut.",
    famousDishes: ["Dhokla", "Pav Bhaji", "Vindaloo", "Dal Baati Churma", "Vada Pav", "Modak"],
    keyIngredients: ["Besan (gram flour)", "Jaggery", "Kokum", "Coconut", "Peanuts", "Dried red chilies"],
    culinaryInfluences: ["Portuguese", "Parsi", "Jain", "Marwari"],
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "central-india",
    name: "Central India",
    states: ["Madhya Pradesh", "Chhattisgarh"],
    description: "Central Indian cuisine is known for its wheat-based dishes and the use of besan (gram flour). The food tends to be spicy, often using dry spices rather than wet pastes. Most dishes are vegetarian with some tribal-influenced meat preparations.",
    famousDishes: ["Poha", "Bhutte Ka Kees", "Chakki Ki Shaak", "Indori Namkeen", "Daal Bafla", "Mawa Bati"],
    keyIngredients: ["Wheat", "Gram flour", "Coriander seeds", "Mahua flowers", "Millet"],
    culinaryInfluences: ["Tribal", "Mughal", "Maratha"],
    imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=1887&auto=format&fit=crop"
  }
];

// Helper function to get a region by ID
export const getRegionById = (id: string): Region | undefined => {
  return regions.find(region => region.id === id);
};

// Helper function to get all region names
export const getAllRegionNames = (): string[] => {
  return regions.map(region => region.name);
};

// Helper function to get states by region
export const getStatesByRegion = (regionId: string): string[] => {
  const region = regions.find(r => r.id === regionId);
  return region ? region.states : [];
};
