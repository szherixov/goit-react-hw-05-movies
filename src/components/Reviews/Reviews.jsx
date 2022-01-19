import { useState, useEffect } from 'react';
import {TailSpin} from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { getMovieReviews } from '../../Api/Api';
import { toast } from 'react-toastify';

function Reviews({ movieId }) {
  const [review, setReview] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const fetchMovieReview = async () => {
      try {
        setShowLoader(true);
        const movieCredits = await getMovieReviews(movieId);
        setReview(movieCredits);
      } catch (error) {
        toast.error(error.message, { theme: 'colored' });
      } finally {
        setShowLoader(false);
      }
    };

    fetchMovieReview();
  }, [movieId]);
  const reviewMap = review.map(item => {
    return (
      <li key={item.id}>
        <h3>{item.author}</h3>
        <p>{item.content}</p>
      </li>
    );
  });
  return (
    <div>
      {showLoader && <TailSpin type="ThreeDots" color="#00BFFF" height={80} width={80} />}
      {review?.length > 0 ? <ul>{reviewMap}</ul> : <p>We don't have any reviews for this movie.</p>}
    </div>
  );
}

Reviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default Reviews;
