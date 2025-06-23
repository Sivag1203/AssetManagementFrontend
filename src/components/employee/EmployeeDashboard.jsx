import { Outlet } from "react-router-dom";
import EmployeeNavbar from "./EmployeeNavbar";

function AdminDashboard() {
  return (
    <div className="container-fluid min-vh-100 bg-body-tertiary p-2">
      <EmployeeNavbar />
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
