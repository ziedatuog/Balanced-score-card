import { createSlice } from "@reduxjs/toolkit";

const targetMainSlice = createSlice({
  name: "target slice",
  initialState: {
    onMain: false,
    onSub: false,
    targetData: null,
    assigneTo: {
      status: false,
      item: null,
    },
  },
  reducers: {
    setOnMain(state, action) {
      state.onMain = action.payload;
    },
    setOnSub(state, action) {
      state.onSub = action.payload;
    },
    setTargetData(state, action) {
      state.targetData = action.payload;
    },

    setAssigneTo(state, action) {
      state.assigneTo.status = true;
      state.assigneTo.item = action.payload;
    },
    setAssigneRomove(state, action) {
      state.assigneTo.status = false;
      state.assigneTo.item = action.payload;
    },
  },
});

export const targetSliceAction = targetMainSlice.actions;

export default targetMainSlice;
