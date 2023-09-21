import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: '',
  email: '',
  ownerId: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.ownerId = action.payload.ownerId;
    }
  }
})

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
