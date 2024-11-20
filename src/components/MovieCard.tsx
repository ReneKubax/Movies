import { Movie } from '../models/types';

interface MovieCardProps {
  movie: Movie;
  index: number;
  baseImgUrl: string;
  onSelect: (movie: Movie) => void;
  colorClass: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  baseImgUrl,
  onSelect,
  colorClass,
}) => {
  return (
    <div 
      className={`movie-card ${colorClass}`}
      onClick={() => onSelect(movie)}
    >
      <img 
        src={`${baseImgUrl}${movie.poster_path}`} 
        alt={movie.title}
        className="w-full h-auto rounded-t-lg transition-transform hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.release_date}</p>
        <div className="mt-2">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
