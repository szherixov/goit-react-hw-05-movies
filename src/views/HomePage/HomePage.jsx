import { useState, useEffect } from 'react';
import {TailSpin} from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { getTrendingMovies } from '../../Api/Api';
import MovieList from '../../components/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setShowLoader(true);
        const movies = await getTrendingMovies();
        setMovies(movies);
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setShowLoader(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      <h1>Trending movies today</h1>
      {showLoader && <TailSpin type="ThreeDots" color="#00BFFF" height={80} width={80} />}

      {movies && <MovieList movies={movies} />}
    </>
  );
}
