import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "./LayoutStore";
import officeBrowserSlice from "./HRStore/OfficeBrowserStore";
import inputTypeSlice from "./InputStore";
import {
  planningTarget,
  eachTarget,
  specificMeasurements,
  subMeasurements,
  teamMeasurements,
  onlyMeasurements,
  assignees,
  editAssignees,
} from "./PlanningStore/PlannigAsync";
import typeSlice from "./CommonStore";
import targetMainSlice from "./PlanningStore/TargetType";
import {
  newReport,
  reportStatus,
  report,
  reportNotification,
  result,
  changeStatus,
  notificationCount,
  resultRate,
} from "./ReportAaync";
import {
  addElement,
  getAnyElement,
  getForEachElement,
  getForEachElementData,
  editAnyElement,
  password
} from "./HRStore/HrAsync";
const Store = configureStore({
  reducer: {
    layoutState: layoutSlice.reducer,
    offices: officeBrowserSlice.reducer,
    inputType: inputTypeSlice.reducer,
    addElement,
    getAnyElement,
    getForEachElement,
    getForEachElementData,
    editAnyElement,
    targetType: targetMainSlice.reducer,
    onlyMeasurements,
    assignees,
    editAssignees,
    type: typeSlice.reducer,
    planningTarget,
    eachTarget,
    specificMeasurements,
    subMeasurements,
    teamMeasurements,
    newReport,
    report,
    reportStatus,
    reportNotification,
    result,
    changeStatus,
    password,
    notificationCount,
    resultRate,
  },
});
export default Store;
