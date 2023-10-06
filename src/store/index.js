import { configureStore } from '@reduxjs/toolkit';
import loggedSlice from './features/loggedSlice';
import loadingSlice from './features/loadingSlice';
import tooltipSlice from './features/tooltipSlice';
import userSlice from './features/userSlice';
import notMoviesSlice from './features/notMoviesSlice';
import filmsSlice from './features/filmsSlice';
import errorSlice from './features/errorSlice';

export default configureStore({
  reducer: {
    logged: loggedSlice,
    loading: loadingSlice,
    tooltip: tooltipSlice,
    user: userSlice,
    notMovies: notMoviesSlice,
    favorite: filmsSlice,
    error: errorSlice,
  }
});
