const API_BASE_URL = 'https://backend-rasayatra-production-8787.up.railway.app/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name, email, password) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Recipe endpoints
  async getRecipes(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.request(`/recipes${queryString ? `?${queryString}` : ''}`);
    return response?.data?.recipes || response?.recipes || [];
  }

  async getAllRecipes() {
    const response = await this.request('/recipes?limit=100');
    return response?.data?.recipes || response?.recipes || [];
  }

  async getRecipe(id) {
    const response = await this.request(`/recipes/${id}`);
    return response?.data?.recipe || response?.recipe || response;
  }

  async getRecipeById(id) {
    return this.getRecipe(id);
  }

  async createRecipe(recipeData) {
    return this.request('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  }

  async updateRecipe(id, recipeData) {
    return this.request(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  }

  async deleteRecipe(id) {
    return this.request(`/recipes/${id}`, {
      method: 'DELETE',
    });
  }

  async getFeaturedRecipes(limit = 6) {
    const response = await this.request(`/recipes/featured/top?limit=${limit}`);
    return response?.data?.recipes || response?.recipes || [];
  }

  async getRecipesByRegion(region, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.request(`/recipes/region/${region}${queryString ? `?${queryString}` : ''}`);
    return response?.data?.recipes || response?.recipes || [];
  }

  // Favorites endpoints
  async getFavorites() {
    const response = await this.request('/favorites');
    return response?.data?.favorites || response?.favorites || [];
  }

  async addToFavorites(recipeId) {
    try {
      return await this.request(`/favorites/${recipeId}`, {
        method: 'POST',
      });
    } catch (error) {
      // Handle duplicate favorite gracefully
      if (error.message?.includes('already in favorites') || error.status === 409) {
        return { success: true, message: 'Recipe is already in your favorites', alreadyExists: true };
      }
      throw error;
    }
  }

  async removeFromFavorites(recipeId) {
    return this.request(`/favorites/${recipeId}`, {
      method: 'DELETE',
    });
  }

  async checkFavorite(recipeId) {
    return this.request(`/favorites/check/${recipeId}`);
  }

  // Bookmarks endpoints
  async getBookmarks() {
    const response = await this.request('/bookmarks');
    return response?.data?.bookmarks || response?.bookmarks || [];
  }

  async addBookmark(recipeId) {
    try {
      return await this.request(`/bookmarks/${recipeId}`, {
        method: 'POST',
      });
    } catch (error) {
      // Handle duplicate bookmark gracefully
      if (error.message?.includes('already bookmarked') || error.status === 409) {
        return { success: true, message: 'Recipe is already in your bookmarks', alreadyExists: true };
      }
      throw error;
    }
  }

  async removeBookmark(recipeId) {
    return this.request(`/bookmarks/${recipeId}`, {
      method: 'DELETE',
    });
  }

  async checkBookmark(recipeId) {
    return this.request(`/bookmarks/check/${recipeId}`);
  }

  // Regions endpoints
  async getRegions() {
    const response = await this.request('/regions');
    return response?.data?.regions || response?.regions || [];
  }

  async getRegion(id) {
    const response = await this.request(`/regions/${id}`);
    return response?.data?.region || response?.region || response;
  }

  async getRegionStats(id) {
    return this.request(`/regions/${id}/stats`);
  }

  // Alias methods for backward compatibility
  async addFavorite(recipeId) {
    return this.addToFavorites(recipeId);
  }

  async removeFavorite(recipeId) {
    return this.removeFromFavorites(recipeId);
  }
}

export const api = new ApiService();
export default api;
