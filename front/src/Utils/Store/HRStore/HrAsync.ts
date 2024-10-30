import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//add any architecture input
export const addAny = createAsyncThunk("new arch/addAny", async (sth: any) => {
  const response = await fetch(
    `http://localhost:5001/architecture/new/${sth.type}`,
    {
      method: "POST",
      body: JSON.stringify(sth.data),
      headers: {
        "content-type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data;
});

const addAnySlice = createSlice({
  name: "new deputy",
  initialState: { item: {} as any, loading: false, error: null as any },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addAny.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(addAny.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(addAny.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

// get all the deputies and the directorates

export const getAny = createAsyncThunk("get any/geAny", async (sth: any) => {
  const response = await fetch(`http://localhost:5001/architecture/get/${sth}`);
  const data = response.json();
  return data;
});
const getAnySlice = createSlice({
  name: "getAnySlice",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getAny.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getAny.fulfilled, (state: any, action: any) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(getAny.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

//get for each types of architecture
export const getForEach = createAsyncThunk(
  "find each/findForEach",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/architecture/get/${sth.type}/${sth.id}`
    );
    const data = await response.json();
    return data;
  }
);

const getForEachSlice = createSlice({
  name: "get for each",
  initialState: {
    item: {
      name: "",
      items: [],
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getForEach.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getForEach.fulfilled, (state: any, action: any) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(getForEach.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
////

//get for each types of architecture
export const getForEachData = createAsyncThunk(
  "find each data/findForEachData",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/architecture/get/one/${sth.type}/${sth.id}`
    );
    const data = await response.json();
    return data;
  }
);

const getForEachDataSlice = createSlice({
  name: "getForEachData",
  initialState: { item: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getForEachData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getForEachData.fulfilled, (state: any, action: any) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(getForEachData.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const editAnyData = createAsyncThunk(
  "edit data/editAnyData",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/architecture/edit/commissioner/${sth.id}`,
      {
        method: "PUT",
        body: JSON.stringify(sth.sendData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  }
);

const editAnyDataSlice = createSlice({
  name: "edit data",
  initialState: { items: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(editAnyData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(editAnyData.fulfilled, (state: any, action: any) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(editAnyData.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
export const changePassword = createAsyncThunk(
  "change password/changePassword",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/architecture/password/${sth.id}`,
      {
        method: "PUT",
        body: JSON.stringify(sth.data),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    return data;
  }
);

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState: { item: {} as any , loading: false, error: null },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(changePassword.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(changePassword.fulfilled, (state: any, action: any) => {
        state.item = action.payload;
        state.loading = false;
      })
      .addCase(changePassword.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const addElement = addAnySlice.reducer;
export const getAnyElement = getAnySlice.reducer;
export const getForEachElement = getForEachSlice.reducer;
export const getForEachElementData = getForEachDataSlice.reducer;
export const editAnyElement = editAnyDataSlice.reducer;
export const password = changePasswordSlice.reducer;
