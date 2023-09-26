import { configureStore } from '@reduxjs/toolkit';
import loggedSlice from './features/loggedSlice';
import loadingSlice from './features/loadingSlice';
import infoSlice from './features/infoSlice';
import userSlice from './features/userSlice';
import notMoviesSlice from './features/notMoviesSlice';

export default configureStore({
  reducer: {
    logged: loggedSlice,
    loading: loadingSlice,
    info: infoSlice,
    user: userSlice,
    notMovies: notMoviesSlice,
  }
});
