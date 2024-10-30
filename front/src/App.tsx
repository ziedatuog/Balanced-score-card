import { Routes, Route } from "react-router-dom";
import MeasurementBrowse from "./Pages/SubPages/MeasurementBrowse";
import BrowsePage from "./Pages/SubPages/BrowsePage";
import EmployeeDetail from "./Pages/SubPages/UserDetail";
import ProtectedRoute from "./Components/MainComponents/ProtectedRoute";
import SendReport from "./Pages/SubPages/SendReport";
import ReportNotifications from "./Pages/SubPages/ReportsNotification";
import ResultPage from "./Pages/SubPages/ResultPage";
import PlanningHome from "./Pages/SubPages/PlanningHome";
import DeputyHome from "./Pages/MainPages/DeputyHome";
import DirectorateHome from "./Pages/MainPages/DirectorateHome";
import TeamHome from "./Pages/MainPages/TeamHome";
import EmployeeHome from "./Pages/MainPages/EmployeeHome";
import ComissionerHome from "./Pages/MainPages/ComissionerHome";
import HrBrowse from "./Pages/SubPages/HrBrowse";
import Login from "./Pages/MainPages/Login";
import { useSelector } from "react-redux";
import EachResultPage from "./Pages/SubPages/EachResultPage";
function App() {
  const current = useSelector((state: { type: any }) => state.type.current);
  return (
    <div className="bg-blue-200/30 flex flex-col items-center gap-3 position:relative text-center">
      <Routes>
        <Route element={<ProtectedRoute />}>
          {current.type === "commissioner" && (
            <Route path="/" element={<ComissionerHome />} />
          )}
          {current.type === "deputy" && (
            <Route path="/" element={<DeputyHome />} />
          )}
          {current.type === "directorate" && (
            <Route path="/" element={<DirectorateHome />} />
          )}
          {current.type === "team" && <Route path="/" element={<TeamHome />} />}
          {current.type === "employee" && (
            <Route path="/" element={<EmployeeHome />} />
          )}
          {(current.type === "directorate" || current.type === "deputy") && (
            <Route
              path="/measurements/:subId"
              element={<MeasurementBrowse />}
            />
          )}
          {current.name === "hr" && (
            <>
              <Route path="/browse" element={<HrBrowse />} />
              <Route path="/:type/:id" element={<BrowsePage />} />
              <Route
                path="/userDetail/:id"
                element={<EmployeeDetail page="" />}
              />
            </>
          )}

          {current.type !== "employee" && (
            <>
              <Route
                path="/receive/:status/:id"
                element={<SendReport type="receive" />}
              />
              <Route path="/notifications" element={<ReportNotifications />} />
              <Route path="/each/:type" element={<EachResultPage />} />
              
            </>
          )}
          {current.name === "planning" && (
            <Route path="/planning" element={<PlanningHome />} />
          )}
          <Route path="/profile" element={<EmployeeDetail page="profile" />} />
          <Route path="/measurements" element={<EmployeeHome />} />
          <Route path="/send/:status" element={<SendReport type="send" />} />
          <Route path="/result/:id" element={<ResultPage />} />
        </Route>
        <Route path="*" element={<div className="p-24 text-4xl text-red-800 tracking-wider font-bold">Forbidden</div>} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
