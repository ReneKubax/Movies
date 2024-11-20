import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MovieCard } from '../src/components/MovieCard';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test Overview',
  poster_path: '/test-poster.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
  popularity: 100,
  original_language: 'en'
};

describe('MovieCard', () => {
  const mockOnSelect = jest.fn();
  const baseImgUrl = 'https://image.tmdb.org/t/p/w500';

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  test('renders movie information correctly', () => {
    const { getByText } = render(
      <MovieCard
        movie={mockMovie}
        index={0}
        baseImgUrl={baseImgUrl}
        onSelect={mockOnSelect}
        colorClass="bg-red-500"
      />
    );

    expect(getByText(mockMovie.title)).toBeInTheDocument();
    expect(getByText(mockMovie.release_date)).toBeInTheDocument();
    expect(getByText('8.5')).toBeInTheDocument();
  });

  test('calls onSelect when clicked', async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MovieCard
        movie={mockMovie}
        index={0}
        baseImgUrl={baseImgUrl}
        onSelect={mockOnSelect}
        colorClass="bg-red-500"
      />
    );

    await user.click(getByText(mockMovie.title));
    expect(mockOnSelect).toHaveBeenCalledWith(mockMovie);
  });
});