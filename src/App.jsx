import AdminDashboard from "./components/admin/AdminDashboard";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import Login from "./components/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Assets from "./components/admin/HandlingAsset/Assets";
import Stats from "./components/admin/Stats";
import AllEmployees from "./components/admin/HandlingEmployee/AllEmployees";
import AllRequests from "./components/admin/HandlingRequests/AllRequests";
import AdminProfile from "./components/admin/HandlingProfile/AdminProfile";
import AllAssets from "./components/employee/HandlingAssets/AllAssets";
import EmployeeProfile from "./components/employee/HandlingProfile/EmployeeProfile";
import MyAssets from "./components/employee/HandlingAssets/MyAssets";
import MyRequests from "./components/employee/HandlineRequests/MyRequests";
import Audits from "./components/admin/HandlingAudits/Audits";
import EmployeeAuditSubmission from "./components/employee/HandlingAudits/EmployeeAuditSubmission";
import AuditSubmissions from "./components/admin/HandlingAudits/AuditSubmissions";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Stats />} />
            <Route path="assets" element={<Assets />} />
            <Route path="employees" element={<AllEmployees />} />
            <Route path="requests" element={<AllRequests />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="audits" element={<Audits />} />
            <Route path="auditsubmissions" element={<AuditSubmissions/>} />
          </Route>
          <Route path="/employee" element={<EmployeeDashboard />}>
            <Route index element={<AllAssets />} />
            <Route path="myprofile" element={<EmployeeProfile />} />
            <Route path="myassets" element={<MyAssets />} />
            <Route path="myrequests" element={<MyRequests />} />
            <Route path="audits" element={<EmployeeAuditSubmission/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
