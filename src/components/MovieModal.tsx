import React from 'react';
import { Movie } from '../models/types';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  baseImgUrl: string;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  onClose,
  baseImgUrl,
}) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{movie.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img 
            src={`${baseImgUrl}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg"
          />
          <div>
            <p className="mb-4">{movie.overview}</p>
            <div className="space-y-2">
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Popularity:</strong> {movie.popularity}</p>
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};