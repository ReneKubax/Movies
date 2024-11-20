import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Movies from '../src/components/Movies';
import apiService from '../src/services/api.service';

// Mock the API service
jest.mock('../services/api.service', () => ({
  getMovies: jest.fn(() => Promise.resolve({
    data: {
      results: [
        {
          id: 1,
          title: 'Test Movie 1',
          overview: 'Test Overview 1',
          poster_path: '/test-poster-1.jpg',
          release_date: '2023-01-01',
          vote_average: 8.5,
          popularity: 100,
          original_language: 'en'
        },
        {
          id: 2,
          title: 'Test Movie 2',
          overview: 'Test Overview 2',
          poster_path: '/test-poster-2.jpg',
          release_date: '2023-01-02',
          vote_average: 7.5,
          popularity: 90,
          original_language: 'en'
        }
      ],
      total_pages: 2
    }
  }))
}));

describe('Movies', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders movies from API', async () => {
    const { getByText } = render(<Movies />);
    
    await waitFor(() => {
      expect(getByText('Test Movie 1')).toBeInTheDocument();
      expect(getByText('Test Movie 2')).toBeInTheDocument();
    });
  });

  test('changes language when language button is clicked', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<Movies />);
    
    const esButton = getByText('ES');
    await user.click(esButton);
    
    expect(esButton).toHaveClass('bg-blue-500');
  });

  test('changes category when category button is clicked', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<Movies />);
    
    const topRatedButton = getByText('TOP RATED');
    await user.click(topRatedButton);
    
    expect(topRatedButton).toHaveClass('bg-blue-500');
  });

  test('displays loading state while fetching movies', async () => {
    const { getByRole, getByText } = render(<Movies />);
    
    expect(getByRole('status')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(getByText('Test Movie 1')).toBeInTheDocument();
    });
  });

  test('handles category change and fetches new movies', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<Movies />);
    
    await waitFor(() => {
      expect(getByText('Test Movie 1')).toBeInTheDocument();
    });

    const upcomingButton = getByText('UPCOMING');
    await user.click(upcomingButton);
    
    expect(upcomingButton).toHaveClass('bg-blue-500');
    
    expect(apiService.getMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'upcoming'
      })
    );
  });

  test('handles language change', async () => {
    const user = userEvent.setup();
    const { getByText } = render(<Movies />);
    
    await waitFor(() => {
      expect(getByText('Test Movie 1')).toBeInTheDocument();
    });

    const esButton = getByText('ES');
    await user.click(esButton);
    
    expect(esButton).toHaveClass('bg-blue-500');
    

    expect(apiService.getMovies).toHaveBeenCalledWith(
      expect.objectContaining({
        language: 'es'
      })
    );
  });

  test('handles movie selection', async () => {
    const user = userEvent.setup();
    const { getByText, getByRole } = render(<Movies />);
    
    await waitFor(() => {
      expect(getByText('Test Movie 1')).toBeInTheDocument();
    });

    await user.click(getByText('Test Movie 1'));

    expect(getByRole('dialog')).toBeInTheDocument();
    
    const closeButton = getByRole('button', { name: /×/i });
    await user.click(closeButton);
    
    expect(getByRole('dialog')).not.toBeInTheDocument();
  });
});