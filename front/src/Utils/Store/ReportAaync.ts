import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addReport = createAsyncThunk(
  "new report/newReport",
  async (sth: any) => {
    const response = await fetch("http://localhost:5001/report/new", {
      method: "POST",
      body: JSON.stringify(sth),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  }
);
const addReportSlice = createSlice({
  name: "new report",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addReport.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(addReport.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addReport.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getReportNotification = createAsyncThunk(
  "get report notification/getReportNotification",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/report/notification/${sth}`
    );
    const data = await response.json();
    return data;
  }
);
const reportNotificationSlice = createSlice({
  name: "reportNotification",
  initialState: {
    items: [] as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getReportNotification.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getReportNotification.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(getReportNotification.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getReport = createAsyncThunk(
  "get report /getReport",
  async (sth: any) => {
    const response = await fetch(`http://localhost:5001/report/one/${sth}`);
    const data = await response.json();
    return data;
  }
);
const reportSlice = createSlice({
  name: "getReport",
  initialState: {
    reportItem: {
      _id: null as any,
      employeeId: null as any,
      receiverId: null as any,
      type: null as any,
      status: null as any,
      reports: [] as any,
      createdDate: null as any,
      employeeName: null as any,
    },

    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getReport.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getReport.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.reportItem = action.payload;
      })

      .addCase(getReport.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getResult = createAsyncThunk(
  "get result /getResult",
  async (sth: any) => {
    const response = await fetch(`http://localhost:5001/report/result/${sth}`);
    const data = await response.json();
    return data;
  }
);

const resultSlice = createSlice({
  name: "getResulteport",
  initialState: {
    item: {} as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getResult.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getResult.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(getResult.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const changeReportStatus = createAsyncThunk(
  "change report status/changeReportStatus",
  async (sth: { type?: string; id: string; status?: string; data: any }) => {
    let url = `http://localhost:5001/report/response/${sth.status}/${sth.id}`;
    if (sth.type === "rejected") {
      url = `http://localhost:5001/report/correct/${sth.id}`;
    }
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(sth.data),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    return data;
  }
);
const changeStatusSlice = createSlice({
  name: "reportStatus",
  initialState: {
    item: null as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(changeReportStatus.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(changeReportStatus.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(changeReportStatus.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
export const getStatus = createAsyncThunk(
  "get statust /getStatus",
  async (sth: any) => {
    const response = await fetch(`http://localhost:5001/report/status/${sth}`);
    const data = await response.json();
    return data;
  }
);

const reportStatusSlice = createSlice({
  name: "reportStatus",
  initialState: {
    reportStatus: { status: null as any } as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getStatus.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getStatus.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.reportStatus = action.payload;
      })
      .addCase(getStatus.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const notificationAmount = createAsyncThunk(
  "notification amount /notificationAmount",
  async (sth: any) => {
    const response = await fetch(`http://localhost:5001/report/count/${sth}`);
    const data = await response.json();
    return data;
  }
);

const notificationAmountSlice = createSlice({
  name: "notificationAmount",
  initialState: {
    item:0 as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(notificationAmount.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(notificationAmount.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(notificationAmount.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});


export const getResultRate = createAsyncThunk(
  "get result rate/getResultRate",
  async (sth: any) => {
    const response = await fetch(`http://localhost:5001/report/${sth.type}/${sth.id}`);
    const data = await response.json();
    return data;
  }
);

const resultRateSlice = createSlice({
  name: "reportRate",
  initialState: {
    items:[] as any,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getResultRate.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getResultRate.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getResultRate.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const report = reportSlice.reducer;
export const newReport = addReportSlice.reducer;
export const reportStatus = reportStatusSlice.reducer;
export const reportNotification = reportNotificationSlice.reducer;
export const result = resultSlice.reducer;
export const changeStatus = changeStatusSlice.reducer;
export const notificationCount=notificationAmountSlice.reducer;
export const resultRate=resultRateSlice.reducer;

