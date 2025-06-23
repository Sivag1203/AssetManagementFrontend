import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserDetails,
  deleteUserDetails,
} from "../../store/actions/UserAction";

function AdminNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminName = useSelector((state) => state.user.name);

  const logout = () => {
    localStorage.clear();
    navigate("/");
    // dispatch(deleteUserDetails());
    dispatch(deleteUserDetails()); 
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/details",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // setUserDetails(dispatch)(response.data);
        dispatch(setUserDetails(response.data));
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    fetchAdminDetails();
  }, [dispatch]);

  return (
    <nav
      className="navbar navbar-expand-lg py-3 shadow-sm"
      style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e0e0e0" }}
    >
      <div className="container-fluid px-4">
        <Link
          to=""
          className="navbar-brand fw-bold fs-4"
          style={{ color: "#005DAA" }}
        >
         {adminName ? `Welcome ${adminName}` : ""}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item">
              <Link to="assets" className="nav-link fw-semibold text-dark">
                Assets
              </Link>
            </li>
            <li className="nav-item">
              <Link to="employees" className="nav-link fw-semibold text-dark">
                Employees
              </Link>
            </li>
            <li className="nav-item">
              <Link to="requests" className="nav-link fw-semibold text-dark">
                Requests
              </Link>
            </li>
            <li className="nav-item">
              <Link to="audits" className="nav-link fw-semibold text-dark">
                Audits
              </Link>
            </li>
             <li className="nav-item">
              <Link to="profile" className="nav-link fw-semibold text-dark">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-danger btn-sm fw-semibold px-3"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
