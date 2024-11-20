import axios from 'axios';
import { MovieCategory, MovieResponse } from '../models/types';

class ApiService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private cache: Record<string, { data: MovieResponse; timestamp: number }> = {};
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  async getMovies({ 
    language, 
    apiKey, 
    page, 
    category 
  }: { 
    language: string; 
    apiKey: string; 
    page: number;
    category: MovieCategory;
  }) {
    const cacheKey = `${category}-${language}-${page}`;
    
    // Check cache
    if (this.cache[cacheKey]) {
      const cached = this.cache[cacheKey];
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return { data: cached.data };
      }
    }

    const url = `${this.baseUrl}/movie/${category}?language=${language}&api_key=${apiKey}&page=${page}`;
    const response = await axios.get<MovieResponse>(url);
    
    // Cache response
    this.cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now()
    };

    return response;
  }
}

export default new ApiService();