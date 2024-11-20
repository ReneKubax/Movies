import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import apiService from '../services/api.service';
import { MovieCard } from './MovieCard';
import { MovieModal } from './MovieModal';
import { CacheData, Movie, MovieCategory } from '../models/types';


const createCache = () => {
  const cache: Record<string, CacheData> = {};

  return {
    get: (key: string) => cache[key],
    set: (key: string, data: CacheData) => {
      cache[key] = data;
    }
  };
};

const movieCache = createCache();

const Movies: React.FC = () => {
  const _baseImgUrl = 'https://image.tmdb.org/t/p/w500';
  const apiKey = '1b501bbda107113acc653f328a2e935d';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [category, setCategory] = useState<MovieCategory>('popular');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [dates, setDates] = useState<{ minimum: string; maximum: string } | null>(null);
  
  const loadingRef = useRef(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMovieElementRef = useRef<HTMLDivElement | null>(null);

  const cacheKey = useMemo(() => 
    `${category}-${language}-${page}`, 
    [category, language, page]
  );

  // Memoize color calculations
  const colorClasses = useMemo(() => {
    const length = movies.length;
    const colors = {
      prime: 'bg-red-500',
      fibonacci: 'bg-orange-500',
      even: 'bg-green-500',
      odd: 'bg-yellow-500'
    };

    const isPrime = (num: number): boolean => {
      if (num <= 1) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    };

    const fibSet = new Set([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]);

    return Array.from({ length }, (_, index) => {
      if (isPrime(index)) return colors.prime;
      if (fibSet.has(index)) return colors.fibonacci;
      return index % 2 === 0 ? colors.even : colors.odd;
    });
  }, [movies.length]);

  const fetchMovies = useCallback(
    async (currentPage: number, lang: string) => {
      if (loadingRef.current) return;

      const cachedData = movieCache.get(cacheKey);
      if (cachedData && currentPage <= cachedData.page) {
        setMovies(cachedData.movies);
        setTotalPages(cachedData.totalPages);
        setDates(cachedData.dates || null);
        return;
      }

      loadingRef.current = true;
      setLoading(true);
      
      try {
        const response = await apiService.getMovies({ 
          language: lang, 
          apiKey, 
          page: currentPage,
          category 
        });
        
        const newMovies = currentPage === 1 
          ? response.data.results 
          : [...movies, ...response.data.results];
        
        setMovies(newMovies);
        setTotalPages(response.data.total_pages);
        setDates(response.data.dates || null);

        movieCache.set(cacheKey, {
          movies: newMovies,
          page: currentPage,
          totalPages: response.data.total_pages,
          dates: response.data.dates
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
      
      loadingRef.current = false;
      setLoading(false);
    },
    [cacheKey, movies, category]
  );

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && !loadingRef.current && page < totalPages) {
        setPage(prev => prev + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    });

    if (lastMovieElementRef.current) {
      observer.current.observe(lastMovieElementRef.current);
    }

    return () => observer.current?.disconnect();
  }, [page, totalPages]);

  useEffect(() => {
    fetchMovies(page, language);
  }, [page, language, category, fetchMovies]);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setMovies([]);
    setPage(1);
  };

  const changeCategory = (newCategory: MovieCategory) => {
    setCategory(newCategory);
    setMovies([]);
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4">
      <header className="py-6 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">TOP Movies</h1>
          <div className="space-x-2">
            <button 
              onClick={() => changeLanguage('en')}
              className={`px-3 py-1 rounded transition-colors ${
                language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              EN
            </button>
            <button 
              onClick={() => changeLanguage('es')}
              className={`px-3 py-1 rounded transition-colors ${
                language === 'es' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              ES
            </button>
          </div>
        </div>
        
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {(['popular', 'now_playing', 'top_rated', 'upcoming'] as MovieCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={`px-4 py-2 rounded whitespace-nowrap transition-colors ${
                category === cat 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {cat.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {dates && (category === 'now_playing' || category === 'upcoming') && (
          <div className="mt-4 text-sm text-gray-600">
            Date Range: {dates.minimum} - {dates.maximum}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie, index) => (
          <div
            key={`${movie.id}-${index}`}
            ref={index === movies.length - 1 ? lastMovieElementRef : null}
          >
            <MovieCard
              movie={movie}
              index={index}
              baseImgUrl={_baseImgUrl}
              onSelect={setSelectedMovie}
              colorClass={colorClasses[index]}
            />
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          baseImgUrl={_baseImgUrl}
        />
      )}
    </div>
  );
};

export default Movies;