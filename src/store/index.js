import { configureStore } from '@reduxjs/toolkit';
import loggedSlice from './loggedSlice';
import loadingSlice from './loadingSlice';
import infoSlice from './infoSlice';
import userSlice from './userSlice';
import notMoviesSlice from './notMoviesSlice';

export default configureStore({
  reducer: {
    logged: loggedSlice,
    loading: loadingSlice,
    info: infoSlice,
    user: userSlice,
    notMovies: notMoviesSlice,
  }
});
