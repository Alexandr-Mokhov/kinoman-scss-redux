/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addStatusFavorite, deleteStatusFavorite } from '../../api/MainApi';
import { setInfoTooltip } from '../../store/features/tooltipSlice';
import { setSavedFilms } from '../../store/features/filmsSlice';
import {
  MINUTES_PER_HOUR,
  FAVORITE_DELETE_ERROR,
  ERROR_ADDING_FAVORITES,
} from '../../constans';

export default function MoviesCard({ movie }) {
  const dispatch = useDispatch();
  const savedFilms = useSelector(state => state.favorite.savedFilms);
  const { pathname } = useLocation();
  const [isLiked, setIsLiked] = useState(false);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const isSavedMovies = pathname === '/saved-movies';

  useEffect(() => {
    if (savedFilms[0]) {
      savedFilms.map((item) => checkValues(item));
    }
  }, [savedFilms, movie])

  function checkValues(item) {
    if (item.movieId === movie.id) {
      setIsLiked(true);
      movie._id = item._id;
    }
  }

  function handleLikeClick() {
    setLikeDisabled(true);
    if (isLiked || isSavedMovies) {
      deleteStatusFavorite(movie)
        .then(() => {
          setIsLiked(false);
          dispatch(setSavedFilms(savedFilms.filter(item => item._id !== movie._id)));
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        dispatch(setInfoTooltip({isOpen: true, message: FAVORITE_DELETE_ERROR}));
        });
    } else {
      addStatusFavorite(movie)
        .then((res) => {
          setIsLiked(true);
          dispatch(setSavedFilms([...savedFilms, res]));
          setLikeDisabled(false);
        })
        .catch((err) => {
          console.log(err);
        dispatch(setInfoTooltip({isOpen: true, message: ERROR_ADDING_FAVORITES}));
        });
    }
  }

  function getTimeFromMins(mins) {
    const hours = Math.trunc(mins / MINUTES_PER_HOUR);
    const minutes = mins % MINUTES_PER_HOUR;
    return hours + 'ч ' + minutes + 'м';
  };

  return (
    <div className="movies-card">
      <a href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          className="movies-card__image"
          src={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
      </a>
      <div className="movies-card__container">
        <h2 className="movies-card__name">{movie.nameRU}</h2>
        <button
          className={`movies-card__favorites ${isSavedMovies && 'movies-card__favorites_delete'}
            ${isLiked && 'movies-card__favorites_active'}`}
          type="button"
          onClick={handleLikeClick}
          disabled={likeDisabled}
        />
      </div>
      <p className="movies-card__time">{getTimeFromMins(movie.duration)}</p>
    </div>
  )
}
