import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedIn: false,
}

const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    }
  }
})

export const { setLoggedIn } = loggedSlice.actions;
export default loggedSlice.reducer;

