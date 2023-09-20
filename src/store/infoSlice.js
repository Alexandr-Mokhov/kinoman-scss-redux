import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  infoTooltipOpen: false,
  infoTooltipMessage: '',
}
const infoSlice = createSlice({
  name: 'infoTooltip',
  initialState,
  reducers: {
    setInfoTooltip(state, action) {
      state.infoTooltipOpen = action.payload.isOpen;
      state.infoTooltipMessage = action.payload.message;
    }
  }
})

export const { setInfoTooltip } = infoSlice.actions;
export default infoSlice.reducer;