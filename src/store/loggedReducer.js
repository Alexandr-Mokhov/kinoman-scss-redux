const initialState = {
  loggedIn: false,
}

const LOGGED = 'LOGGED';

export const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED: return {...state, loggedIn: action.payload}
    default: return state;
  }
}
