import { useState, useEffect } from 'react';
import {TailSpin} from 'react-loader-spinner';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getMoviesByKeyWord } from '../../Api/Api';
import Form from '../../components/Form';
import MovieList from '../../components/MovieList';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const queryURL = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!queryURL) {
      setMovies(null);
      return;
    }

    async function fetchMovies() {
      try {
        setShowLoader(true);
        const fetchedMovies = await getMoviesByKeyWord(queryURL ?? query);

        if (!fetchedMovies.length) {
          toast.error('Enter proper query', { theme: 'colored' });
        }

        setMovies(fetchedMovies);
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setShowLoader(false);
      }
    }

    fetchMovies();
  }, [query, queryURL]);

  const handleSubmit = value => {
    setQuery(value);
    history.push({ ...location, search: `query=${value}` });
  };

  return (
    <>
      <Form handleSubmit={handleSubmit} />

      {showLoader && <TailSpin type="ThreeDots" color="#00BFFF" height={80} width={80} />}

      {movies && <MovieList movies={movies} />}
    </>
  );
}

export default MoviesPage;
