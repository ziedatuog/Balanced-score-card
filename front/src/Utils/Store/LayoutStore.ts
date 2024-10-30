import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "show layout",
  initialState: { showLayout: false, layOutType: null },
  reducers: {
    layoutStatus(state, action) {
      state.showLayout = action.payload;
    },
    setLayOutType(state, action) {
      state.layOutType = action.payload;
    },
  },
});




export const layoutActions= layoutSlice.actions;
export default layoutSlice;
