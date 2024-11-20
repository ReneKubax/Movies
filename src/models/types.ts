export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    popularity: number;
    vote_average: number;
  }
  
  export interface MovieResponse {
    results: Movie[];
    total_pages: number;
    dates?: {
      minimum: string;
      maximum: string;
    };
  }

  export type MovieCategory = 'popular' | 'now_playing' | 'top_rated' | 'upcoming';

export interface CacheData {
    movies: Movie[];
    page: number;
    totalPages: number;
    dates?: {
      minimum: string;
      maximum: string;
    };
  }