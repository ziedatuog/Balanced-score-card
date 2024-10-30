import { createSlice } from "@reduxjs/toolkit";

export interface typeData {
  type: string;
  title: string;
}
const officeBrowserSlice = createSlice({
  name: "office browser",
  initialState: {
    deputy: {
      type: "deputy",
      title: "ምክትል ኮሚሽነር ቢሮወች",
    } as typeData,
    directorate: { type: "directorate", title: "ዳይሬክቶሬቶች" } as typeData,
    team: {
      type: "team",
      title: "ቡድን",
    } as typeData,
    employee: { type: "employee", title: "ሠራተኞች" } as typeData,
    officeHeader: null,
    browsingEach: {
      status: false,
      data: null,
    },
    browseEach: {},
  },
  reducers: {
    setEachBrowsingType(state, action) {
      state.browsingEach.status = true;
      state.browsingEach.data = action.payload;
    },
    setEachTypeFalse(state ) {
      state.browsingEach.status = false;
    },
    setEachData(state,action){
      state.browsingEach.data=action.payload;
    }
  },
});
export const officesTypeAction = officeBrowserSlice.actions;
export default officeBrowserSlice;
