import { useState, useEffect } from 'react';
import {TailSpin} from 'react-loader-spinner';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { getMovieCredits } from '../../Api/Api';
import error from '../../image/default.png';
import styles from './Cast.module.css';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        setShowLoader(true);
        const movieCredits = await getMovieCredits(movieId);
        setCast(movieCredits);
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setShowLoader(false);
      }
    };

    fetchMovieCredits();
  }, [movieId]);

  const castMap = cast
    .map(item => {
      if (item.known_for_department === 'Acting') {
        return (
          <li key={item.id} className={styles.items}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.profile_path}`}
                alt={item.title}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = error;
                }}
              />
            </div>
            <div className={styles.inner}>
              <h3>{item.name}</h3>
              <p>
                Character: <span>{item.character !== '' ? item.character : 'No information'}</span>
              </p>
            </div>
          </li>
        );
      }

      return null;
    })
    .slice(0, 12);
  return (
    <div>
      <ul>
        {showLoader && <TailSpin type="ThreeDots" color="#00BFFF" height={80} width={80} />}
        {cast && <ul>{castMap}</ul>}
      </ul>
      ;
    </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.number.isRequired,
};
export default Cast;
