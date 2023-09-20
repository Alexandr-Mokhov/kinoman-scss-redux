import { configureStore } from '@reduxjs/toolkit';
import loggedSlice from './loggedSlice';
import loadingSlice from './loadingSlice';

export default configureStore({ 
	reducer: {
		logged: loggedSlice,
		loading: loadingSlice,
	} 
});
