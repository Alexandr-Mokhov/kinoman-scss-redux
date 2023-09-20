import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoTooltipOpen: false,
}
const infoSlice = createSlice({
  name: 'infoTooltipOpen',
  initialState,
  reducers: {
    setInfoTooltipOpen(state, action) {
      state.infoTooltipOpen = action.payload;
    }
  }
})

export const { setInfoTooltipOpen } = infoSlice.actions;
export default infoSlice.reducer;