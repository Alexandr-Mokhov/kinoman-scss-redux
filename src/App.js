/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Main from './pages/main/Main/Main';
import Movies from './pages/movies/Movies/Movies';
import SavedMovies from '../src/pages/savedMovies/SavedMovies/SavedMovies';
import Profile from './pages/profile/Profile/Profile';
import Register from './pages/register/Register/Register';
import Login from './pages/login/Login/Login';
import NotFound from './pages/notFound/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import ProtectedRouteElement from './components/ProtectedRoute/ProtectedRoute';
import { checkToken } from './api/MainApi';
import { getSavedMovies } from './api/MainApi';
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import { setLoggedIn } from './store/loggedSlice';
import { setInfoTooltip } from './store/infoSlice';
import { setCurrentUser } from './store/userSlice';
import { MOVIE_DOWNLOAD_ERROR, TOKEN_VERIFICATION_ERROR } from './constans';

export default function App() {

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.logged.loggedIn);
  const currentUser = useSelector(state => state.user);

  const navigate = useNavigate();
  const [savedFilms, setSavedFilms] = useState([]);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [checkedShort, setCheckedShort] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          setSavedFilms(res.filter(movie => movie.owner === currentUser.ownerId));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setInfoTooltip({ isOpen: true, message: MOVIE_DOWNLOAD_ERROR }));
        })
    }
  }, [isTokenChecked]);

  useEffect(() => {
    if (loggedIn) {
      if (pathname === "/sign-up" || pathname === "/sign-in") {
        navigate('/movies', { replace: true });
      }
    }
  }, [pathname, loggedIn])

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            dispatch(setCurrentUser({ name: res.name, email: res.email, ownerId: res._id }));
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            localStorage.setItem('ownerId', res._id);
            dispatch(setLoggedIn(true));
            setIsTokenChecked(true);
            navigate(pathname, { replace: true });
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch(setInfoTooltip({ isOpen: true, message: TOKEN_VERIFICATION_ERROR }));
        });
    }
  }

  function onSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('movieSearchText');
    localStorage.removeItem('shortFilms');
    localStorage.removeItem('foundMovies');
    localStorage.removeItem('checkedShort');
    localStorage.removeItem('ownerId');
    dispatch(setLoggedIn(false));
    dispatch(setCurrentUser({ name: '', email: '', ownerId: '' }));
    setSavedFilms([]);
    setMovies([]);
    setFoundMovies([]);
    setNotFoundMovies(false);
    setIsTokenChecked(false);
    navigate('/', { replace: true });
  }

  function handleNotFoundMovies(shortList, foundList) {
    if (movies[0]) {
      if (checkedShort) {
        shortList.length === 0 ?
          setNotFoundMovies(true) :
          setNotFoundMovies(false);
      } else {
        foundList.length === 0 ?
          setNotFoundMovies(true) :
          setNotFoundMovies(false);
      }
    }
  }

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/movies" element={
          <ProtectedRouteElement element={Movies}
            savedFilms={savedFilms}
            setSavedFilms={setSavedFilms}
            foundMovies={foundMovies}
            setFoundMovies={setFoundMovies}
            movies={movies}
            setMovies={setMovies}
            notFoundMovies={notFoundMovies}
            setNotFoundMovies={setNotFoundMovies}
            handleNotFoundMovies={handleNotFoundMovies}
            checkedShort={checkedShort}
            setCheckedShort={setCheckedShort}
          />}
        />
        <Route path="/saved-movies" element={
          <ProtectedRouteElement element={SavedMovies}
            savedFilms={savedFilms}
            setSavedFilms={setSavedFilms}
            notFoundMovies={notFoundMovies}
            setNotFoundMovies={setNotFoundMovies}
          />}
        />
        <Route path="/profile" element={
          <ProtectedRouteElement element={Profile}
            onSignOut={onSignOut}
          />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <InfoTooltip />
    </div>
  );
}
