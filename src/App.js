/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Main from './pages/main/Main/Main';
import Movies from './pages/movies/Movies/Movies';
import SavedMovies from './pages/savedMovies/SavedMovies/SavedMovies';
import Profile from './pages/profile/Profile/Profile';
import Register from './pages/register/Register/Register';
import Login from './pages/login/Login/Login';
import NotFound from './pages/notFound/NotFound/NotFound';
import Footer from './components/Footer/Footer';
import ProtectedRouteElement from './components/ProtectedRoute/ProtectedRoute';
import InfoTooltip from './components/InfoTooltip/InfoTooltip';
import { checkToken } from './api/MainApi';
import { getSavedMovies } from './api/MainApi';
import { setLoggedIn } from './store/features/loggedSlice';
import { setInfoTooltip } from './store/features/tooltipSlice';
import { setCurrentUser } from './store/features/userSlice';
import { setNotFoundMovies } from './store/features/notMoviesSlice';
import { setSavedFilms } from './store/features/filmsSlice';
import { MOVIE_DOWNLOAD_ERROR, TOKEN_VERIFICATION_ERROR } from './constans';

export default function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loggedIn = useSelector(state => state.logged.loggedIn);
  const currentUser = useSelector(state => state.user);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      getSavedMovies()
        .then((res) => {
          dispatch(setSavedFilms(res.filter(movie => movie.owner === currentUser.ownerId)));
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
      checkToken()
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
    dispatch(setSavedFilms([]));
    dispatch(setNotFoundMovies(false));
    setIsTokenChecked(false);
    navigate('/', { replace: true });
  }

  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/movies" element={<ProtectedRouteElement element={Movies} />} />
        <Route path="/saved-movies" element={<ProtectedRouteElement element={SavedMovies} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={Profile} onSignOut={onSignOut} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <InfoTooltip />
    </div>
  );
}
