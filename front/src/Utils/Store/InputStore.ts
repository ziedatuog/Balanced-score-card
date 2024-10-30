import { createSlice } from "@reduxjs/toolkit";
const inputTypeSlice = createSlice({
  name: "input type",
  initialState: {
    setType: null,
    addEach: false,
    titleData: null,
    actionType: "new",
    actionId: null,
    showReview: false,
    showHigherAmount:false,
  },
  reducers: {
    setType(state, action) {
      state.setType = action.payload;
    },
    setAddEach(state) {
      state.addEach = true;
    },
    setAddEachFalse(state) {
      state.addEach = false;
    },
    setTitleData(state, action) {
      state.titleData = action.payload;
    },
    setActionType(state, action) {
      state.actionType = action.payload;
    },
    setActionId(state, action) {
      state.actionId = action.payload;
    },
    setShowReview(state, action) {
      state.showReview = action.payload;
    },
    setHighAmount(state, action) {
      state.showHigherAmount = action.payload;
    },
  },
});
export const inputAction = inputTypeSlice.actions;
export default inputTypeSlice;
