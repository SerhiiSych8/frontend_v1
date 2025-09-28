import { apiClient } from './config';

export interface Game {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  minBet: number;
  maxBet: number;
  createdAt: string;
  updatedAt: string;
}

export interface GameCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export const gamesAPI = {
  // Get all games
  getGames: async (): Promise<Game[]> => {
    const response = await apiClient.get('/games');
    return response.data;
  },

  // Get game by ID
  getGameById: async (id: string): Promise<Game> => {
    const response = await apiClient.get(`/games/${id}`);
    return response.data;
  },

  // Get games by category
  getGamesByCategory: async (categoryId: string): Promise<Game[]> => {
    const response = await apiClient.get(`/games/category/${categoryId}`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<GameCategory[]> => {
    const response = await apiClient.get('/games/categories');
    return response.data;
  },

  // Search games
  searchGames: async (query: string): Promise<Game[]> => {
    const response = await apiClient.get(`/games/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};
