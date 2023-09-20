import { configureStore } from '@reduxjs/toolkit';
import loggedSlice from './loggedSlice';
import loadingSlice from './loadingSlice';
import infoSlice from './infoSlice';

export default configureStore({ 
  reducer: {
    logged: loggedSlice,
    loading: loadingSlice,
    info: infoSlice,
  } 
});
