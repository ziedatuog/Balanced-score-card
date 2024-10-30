import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCommonData = createAsyncThunk(
  "fech common/fetchCommonData",
  async (sth: any) => {
    const response = await fetch("http://localhost:5001/login", {
      method: "POST",
      body: JSON.stringify(sth),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
  }
);
export const logDataOut = createAsyncThunk("log out/logDataOut", async () => {
  const response = await fetch("http://localhost:5001/logout");
  const data = await response.json();
  return data;
});
const typeSlice = createSlice({
  name: "type of the hierarchy",
  initialState: {
    current: {},
    assigneeType: "sub",
    targetType: false,
  },
  reducers: {
    setAssigneeType(state, action) {
      state.assigneeType = action.payload;
    },
    setTargetType(state, action) {
      state.targetType = action.payload;
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(fetchCommonData.fulfilled, (state: any, action: any) => {
      state.current = action.payload;
    });
    builder.addCase(logDataOut.fulfilled, (state: any, action: any) => {
      state.current = action.payload;
    });
  },
});

export const typeAction = typeSlice.actions;
export default typeSlice;
