import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addAnyTarget = createAsyncThunk(
  "main Target/addMainTarget",
  async (sth: any) => {
    const response = await fetch(`http://localhost:5001/goal/new/${sth.type}`, {
      method: "POST",
      body: JSON.stringify(sth.data),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
);

export const addAnyTargetSlice = createSlice({
  name: "add any target",
  initialState: { items: [], loading: false, error: null },

  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(addAnyTarget.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(addAnyTarget.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addAnyTarget.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getPlanningTarget = createAsyncThunk(
  "get goals/get any goal",
  async () => {
    const response = await fetch(`http://localhost:5001/goal/get/main`);
    const data = await response.json();
    return data;
  }
);

const getPlanningTargetSlice = createSlice({
  name: "getPlanningTarget",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getPlanningTarget.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getPlanningTarget.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(getPlanningTarget.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getOnesTarget = createAsyncThunk(
  "get one target/getOneTarget",
  async (sth: any) => {
    let sendId = sth.deputyId;
    if (sth.type === "directorate") {
      sendId = sth.directorateId;
    }
    const response = await fetch(
      `http://localhost:5001/goal/get/${sth.type}/${sendId}`
    );
    const data = await response.json();
    return data;
  }
);

const getOnesTargetSlice = createSlice({
  name: "getOneTarget",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getOnesTarget.pending, (state: any) => {
        state.loading = true;
      })

      .addCase(getOnesTarget.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOnesTarget.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getSpecificMeasurements = createAsyncThunk(
  "get one measurement/getSpecificMeasurement",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/goal/get/measurement/employee/${sth}`
    );
    const data = await response.json();
    return data;
  }
);
const getSpecificMeasurementsSlice = createSlice({
  name: "getSpecificMeasurements",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getSpecificMeasurements.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getSpecificMeasurements.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getSpecificMeasurements.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getSubMeasurements = createAsyncThunk(
  "get sub measurement/getSubMeasurement",
  async (sth: any) => {
    let url = `http://localhost:5001/goal/get/measurement/main/${sth.subId}/${sth.id}`;
    if (sth.type === "planning") {
      url = `http://localhost:5001/goal/get/measurement/planning/${sth.subId}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const getSubMeasurementsSlice = createSlice({
  name: "getSubMeasurements",
  initialState: {
    item: {
      subId: null,
      subTitile: null,
      subWeight: null,
      measurements: [],
    },
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getSubMeasurements.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getSubMeasurements.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(getSubMeasurements.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
export const getTeamMeasurements = createAsyncThunk(
  "get team measurement/getTeamMeasurement",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/goal/get/measurement/team/${sth}`
    );
    const data = await response.json();
    return data;
  }
);
const getTeamMeasurementsSlice = createSlice({
  name: "get any target",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getTeamMeasurements.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getTeamMeasurements.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(getTeamMeasurements.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
export const getOnlyMeasurements = createAsyncThunk(
  "get only measurement/getOnlyMeasurement",
  async (sth: any) => {
    let url = `http://localhost:5001/goal/get/measurement/only/${sth}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const getOnlyMeasurementsSlice = createSlice({
  name: "get any target",
  initialState: {
    items: [],
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getOnlyMeasurements.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getOnlyMeasurements.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getOnlyMeasurements.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const getSubAssignees = createAsyncThunk(
  "get assignees/getAssignees",
  async (sth: any) => {
    let url = `http://localhost:5001/goal/get/assignees/sub/${sth.tarId}`;
    if (sth.type === "deputy") {
      url = `http://localhost:5001/goal/get/assignees/sub/${sth.type}/${sth.id}/${sth.tarId}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);
export const getMeasurementAssignees = createAsyncThunk(
  "get measurement assignees/getMeasurementAssignees",
  async (sth: any) => {
    const response = await fetch(
      `http://localhost:5001/goal/get/assignees/measurement/${sth.type}/${sth.id}/${sth.tarId}`
    );
    const data = await response.json();
    return data;
  }
);

export const getAssigneesSlice = createSlice({
  name: "get assignees",
  initialState: {
    subItems: [],
    measurementItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(getSubAssignees.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getMeasurementAssignees.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(getSubAssignees.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.subItems = action.payload;
      })
      .addCase(getMeasurementAssignees.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.measurementItems = action.payload;
      })
      .addCase(getSubAssignees.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(getMeasurementAssignees.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
// modifying the asssignees weight

export const editPlanningAssignees = createAsyncThunk(
  "main Target",
  async (sth: any) => {
    let url = `http://localhost:5001/goal/edit/assignees/sub/${sth.subId}`;
    if (sth.type === "deputy") {
      url = `http://localhost:5001/goal/edit/assignees/sub/${sth.type}/${sth.id}/${sth.subId}`;
    }
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(sth.data),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }
);

// modifying the measurement assignees

export const editMeasurementAssignees = createAsyncThunk(
  "edit mesurement assignees",
  async (sth: any) => {
    let url = `http://localhost:5001/goal/edit/assignees/measurement/${sth.activityId}`;
    if (sth.type) {
      url = `http://localhost:5001/goal/edit/assignees/measurement/team/${sth.id}/${sth.activityId}`;
    }
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(sth.data),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  }
);

export const editAssigneesSlice = createSlice({
  name: "editAssigneesSlice",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(editPlanningAssignees.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(editMeasurementAssignees.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(editPlanningAssignees.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(
        editMeasurementAssignees.fulfilled,
        (state: any, action: any) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(editPlanningAssignees.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(editMeasurementAssignees.rejected, (state: any, action: any) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export const planningTarget = getPlanningTargetSlice.reducer;
export const eachTarget = getOnesTargetSlice.reducer;
export const specificMeasurements = getSpecificMeasurementsSlice.reducer;
export const subMeasurements = getSubMeasurementsSlice.reducer;
export const teamMeasurements = getTeamMeasurementsSlice.reducer;
export const onlyMeasurements = getOnlyMeasurementsSlice.reducer;
export const assignees=getAssigneesSlice.reducer;
export const editAssignees=editAssigneesSlice.reducer;