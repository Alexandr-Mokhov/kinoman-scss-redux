/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Main from './pages/main/Main/Main';
import Movies from './pages/movies/Movies/Movies';
import SavedMovies from '../src/pages/savedMovies/SavedMovies/SavedMovies';
import Profile from './pages/profile/Profile/Profile';
import Register from './pages/register/Register/Register';
import Login from './pages/login/Login/Login';
import NotFound from './pages/notFound/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import ProtectedRouteElement from './components/ProtectedRoute/ProtectedRoute';
import { checkToken } from './api/MainApi';
import { getSavedMovies } from './api/MainApi';
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import { MOVIE_DOWNLOAD_ERROR, TOKEN_VERIFICATION_ERROR } from './constans';
import { useDispatch, useSelector } from 'react-redux';

export default function App() {

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.loggedIn);
  console.log(loggedIn);

  const setLoggedIn = (value) => {
    dispatch({type: 'LOGGED', payload: value});
  }

  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', ownerId: '' });
  const [savedFilms, setSavedFilms] = useState([]);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
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
          setIsInfoTooltipOpen(true);
          setInfoTooltipMessage(MOVIE_DOWNLOAD_ERROR);
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
            setCurrentUser({ name: res.name, email: res.email, ownerId: res._id });
            localStorage.setItem('name', res.name);
            localStorage.setItem('email', res.email);
            localStorage.setItem('ownerId', res._id);
            setLoggedIn(true);
            setIsTokenChecked(true);
            navigate(pathname, { replace: true });
          } else {
            return Promise.reject(res.status);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipOpen(true);
          setInfoTooltipMessage(TOKEN_VERIFICATION_ERROR);
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
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '', ownerId: '' });
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
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/sign-up" element={
            <Register
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
            />}
          />
          <Route path="/sign-in" element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
            />}
          />
          <Route path="/movies" element={
            <ProtectedRouteElement
              element={Movies}
              loggedIn={loggedIn}
              savedFilms={savedFilms}
              setSavedFilms={setSavedFilms}
              foundMovies={foundMovies}
              setFoundMovies={setFoundMovies}
              movies={movies}
              setMovies={setMovies}
              notFoundMovies={notFoundMovies}
              setNotFoundMovies={setNotFoundMovies}
              setIsInfoTooltipOpen={setIsInfoTooltipOpen}
              setInfoTooltipMessage={setInfoTooltipMessage}
              handleNotFoundMovies={handleNotFoundMovies}
              checkedShort={checkedShort}
              setCheckedShort={setCheckedShort}
            />}
          />
          <Route path="/saved-movies" element={
            <ProtectedRouteElement
              element={SavedMovies}
              loggedIn={loggedIn}
              savedFilms={savedFilms}
              setSavedFilms={setSavedFilms}
              notFoundMovies={notFoundMovies}
              setNotFoundMovies={setNotFoundMovies}
              setIsInfoTooltipOpen={setIsInfoTooltipOpen}
              setInfoTooltipMessage={setInfoTooltipMessage}
            />}
          />
          <Route path="/profile" element={
            <ProtectedRouteElement element={Profile}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setCurrentUser={setCurrentUser}
              onSignOut={onSignOut}
            />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          infoTooltipMessage={infoTooltipMessage}
          setIsInfoTooltipOpen={setIsInfoTooltipOpen}
          setInfoTooltipMessage={setInfoTooltipMessage}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
