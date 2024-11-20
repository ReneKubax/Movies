# Movies App

A React application that displays movies using The Movie Database (TMDB) API. Features include infinite scrolling, multilingual support, and smart caching.

## Features

- Infinite scroll loading
- Multiple movie categories (Popular, Now Playing, Top Rated, Upcoming)
- Language switching (EN/ES)
- Smart caching system for API responses
- Responsive grid layout
- Color-coded movie cards based on:
  - Prime numbers (Red)
  - Fibonacci sequence (Orange)
  - Even/Odd numbers (Green/Yellow)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- A TMDB API key (get one at https://www.themoviedb.org/settings/api)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movies-app.git
cd movies-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your TMDB API key:
```env
VITE_TMDB_API_KEY=your_api_key_here
```

## Running the Application

To run the application in development mode:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is busy).

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
  ├── components/
  │   ├── Movies.tsx
  │   ├── MovieCard.tsx
  │   └── MovieModal.tsx
  ├── models/
  │   └── types.ts
  ├── services/
  │   └── api.service.ts
  └── App.tsx
```

## Dependencies

Main dependencies used in this project:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.0.0",
    "vite": "^4.3.9"
  }
}
```

## Development

1. The project uses Vite as the build tool
2. TypeScript for type safety
3. Tailwind CSS for styling
4. ESLint and Prettier for code formatting

To format your code:

```bash
npm run format
```

To lint your code:

```bash
npm run lint
```

## API Integration

The application uses The Movie Database (TMDB) API. You'll need to:

1. Register at TMDB
2. Get an API key
3. Add the API key to your `.env` file

## Deployment

To deploy the application:

1. Build the project:
```bash
npm run build
```

2. The build output will be in the `dist` directory
3. Deploy the contents of `dist` to your hosting provider

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details
