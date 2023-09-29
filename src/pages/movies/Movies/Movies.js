/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchForm from '../../../components/SearchForm/SearchForm';
import MoviesCardList from '../../../components/MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';
import { getAllMovies } from '../../../api/MoviesApi';
import Preloader from '../../../components/Preloader/Preloader';
import { useResize } from '../../../utils/checkResize';
import filterMovies from '../../../utils/filterMovies';
import { setNotFoundMovies } from '../../../store/features/notMoviesSlice';
import {
  SCREEN_DESCTOP,
  SCREEN_TABLET,
  SCREEN_MOBILE,
  STARTING_ITEMS_DESCTOP,
  STARTING_ITEMS_TABLET,
  STARTING_ITEMS_MOBILE,
  STARTING_ITEMS_MINIMUM,
  ADDITIONAL_ITEMS_DESCTOP,
  ADDITIONAL_ITEMS_TABLET,
  ADDITIONAL_ITEMS_MOBILE,
  ADDITIONAL_ITEMS_MINIMUM,
  ONE_ADDITIONAL_ELEMENT,
} from '../../../constans';

export default function Movies() {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [shortFilms, setShortFilms] = useState([]);
  const [preloaderEnabled, setPreloaderEnabled] = useState(false);
  const [errorFoundMovies, setErrorFoundMovies] = useState(false);
  const [buttonMore, setButtonMore] = useState(false);
  const [startItems, setStartItems] = useState(5);
  const [addedItems, setAddedItems] = useState(2);
  const [checkedShort, setCheckedShort] = useState(false);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const windowWidth = useResize();
  const dispatch = useDispatch();

  useEffect(() => {
    settingAmountFilms();
    handleShowButtonMore(startItems);
  }, [windowWidth]);

  useEffect(() => {
    if (localStorage.movieSearchText) {
      setValue(localStorage.getItem('movieSearchText'));
      setCheckedShort(JSON.parse(localStorage.getItem('checkedShort')));
      setShortFilms(JSON.parse(localStorage.getItem('shortFilms')));
      setFoundMovies(JSON.parse(localStorage.getItem('foundMovies')));
    }
  }, [])

  useEffect(() => {
    if (movies[0]) {
      dispatch(setNotFoundMovies(false));
    }
    handleNotFoundMovies(shortFilms, foundMovies);
    savingLocalData();
    handleShowButtonMore(startItems);
  }, [foundMovies, shortFilms])

  function handleChange(evt) {
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setIsValid(false);
      setButtonDisabled(true);
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  }

  function settingAmountFilms() {
    if (windowWidth >= SCREEN_DESCTOP) {
      setStartItems(STARTING_ITEMS_DESCTOP);
      setAddedItems(ADDITIONAL_ITEMS_DESCTOP);
    } else if (windowWidth >= SCREEN_TABLET) {
      setStartItems(STARTING_ITEMS_TABLET);
      setAddedItems(ADDITIONAL_ITEMS_TABLET);
    } else if (windowWidth >= SCREEN_MOBILE) {
      setStartItems(STARTING_ITEMS_MOBILE);
      setAddedItems(ADDITIONAL_ITEMS_MOBILE);
    } else {
      setStartItems(STARTING_ITEMS_MINIMUM);
      setAddedItems(ADDITIONAL_ITEMS_MINIMUM);
    }
  }

  function showButtonMore(listFilms, visibleFilms) {
    listFilms.length >= visibleFilms + ONE_ADDITIONAL_ELEMENT ?
      setButtonMore(true) : setButtonMore(false);
  }

  function handleShowButtonMore(visibleFilms) {
    checkedShort ?
      showButtonMore(shortFilms, visibleFilms) :
      showButtonMore(foundMovies, visibleFilms);
  }

  function handleClickMore() {
    const sum = startItems + addedItems;
    setStartItems(sum);
    handleShowButtonMore(sum);
  }

  function savingLocalData() {
    localStorage.setItem('movieSearchText', value);
    localStorage.setItem('foundMovies', JSON.stringify(foundMovies));
    localStorage.setItem('checkedShort', JSON.stringify(checkedShort));
    localStorage.setItem('shortFilms', JSON.stringify(shortFilms));
  }

  function handleGetAllMovies(moviesList) {
    setButtonMore(false);
    getAllMovies()
      .then((res) => {
        setMovies(res);
        moviesList === foundMovies ?
          setFoundMovies(filterMovies(res, value, false)) :
          setShortFilms(filterMovies(res, value, true));
      })
      .catch((err) => {
        setErrorFoundMovies(true);
        console.log(err);
      })
      .finally(() => {
        setButtonDisabled(false);
        setPreloaderEnabled(false);
      })
  }

  function findMovies(checked) {
    setButtonDisabled(true);
    if (value === '') {
      setIsValid(false);
    } else {
      setPreloaderEnabled(true);
      setErrorFoundMovies(false);
      setIsValid(true);
      settingAmountFilms();
      if (movies[0]) {
        setButtonDisabled(false);
        setPreloaderEnabled(false);
        checked ?
          setFoundMovies(filterMovies(movies, value, false)) :
          setShortFilms(filterMovies(movies, value, true));
      } else {
        checked ?
          handleGetAllMovies(foundMovies) :
          handleGetAllMovies(shortFilms);
      }
    }
  }

  function handleChecked() {
    findMovies(checkedShort);
    setCheckedShort(!checkedShort);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    findMovies(!checkedShort);
  }

  function handleNotFoundMovies(shortList, foundList) {
    if (movies[0]) {
      if (checkedShort) {
        shortList.length === 0 ?
          dispatch(setNotFoundMovies(true)) :
          dispatch(setNotFoundMovies(false));
      } else {
        foundList.length === 0 ?
          dispatch(setNotFoundMovies(true)) :
          dispatch(setNotFoundMovies(false));
      }
    }
  }

  return (
    <main className="movies" aria-label="Фильмы">
      <SearchForm
        value={value}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        checkedShort={checkedShort}
        handleChecked={handleChecked}
      />
      {preloaderEnabled ? <Preloader /> :
        <MoviesCardList
          foundMovies={foundMovies}
          errorFoundMovies={errorFoundMovies}
          startItems={startItems}
          shortFilms={shortFilms}
          checkedShort={checkedShort}
        />}
      {buttonMore && <MoreMovies handleClickMore={handleClickMore} />}
    </main>
  )
}
