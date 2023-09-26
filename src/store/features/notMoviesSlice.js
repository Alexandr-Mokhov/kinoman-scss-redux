import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notFoundMovies: false,
}

const notMoviesSlice = createSlice({
  name: 'notMovies',
  initialState,
  reducers: {
    setNotFoundMovies(state, action) {
      state.notFoundMovies = action.payload;
    }
  }
})

export const { setNotFoundMovies } = notMoviesSlice.actions;
export default notMoviesSlice.reducer;
