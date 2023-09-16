import { createStore } from 'redux';
import { loggedReducer } from './loggedReducer';

export const store = createStore(loggedReducer);
