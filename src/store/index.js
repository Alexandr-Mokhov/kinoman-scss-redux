import { configureStore } from '@reduxjs/toolkit';
import loggedSlice from './loggedSlice';
import loadingSlice from './loadingSlice';
import infoSlice from './infoSlice';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    logged: loggedSlice,
    loading: loadingSlice,
    info: infoSlice,
    user: userSlice,
  }
});
