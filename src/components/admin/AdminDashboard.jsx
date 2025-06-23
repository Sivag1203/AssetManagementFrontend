import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container-fluid min-vh-100 bg-body-tertiary p-2">
      <AdminNavbar />
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
