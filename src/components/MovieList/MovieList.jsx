import styles from './MovieList.module.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

function MovieList({ movies }) {
  const location = useLocation();
  const moviesMap = movies.map(movie => (
    <li key={movie.id} className={styles.items}>
      <Link to={{ pathname: `/movies/${movie.id}`, state: { from: location } }}>{movie.title}</Link>
    </li>
  ));
  return <ul className={styles.navList}>{moviesMap}</ul>;
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default MovieList;
