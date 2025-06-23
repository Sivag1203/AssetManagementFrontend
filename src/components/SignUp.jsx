import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [role, setRole] = useState("employee");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    address: "",
    level: "L1", // default for employee
    password: ""
  });

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setFormData((prev) => ({
      ...prev,
      level: selectedRole === "employee" ? "L1" : ""
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const processSignUp = async (e) => {
    e.preventDefault();
    setMsg("");

    const payload = {
      role: role,
      user: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        address: formData.address,
        ...(role === "employee" && { level: formData.level }),
        auth: {
          email: formData.email,
          password: formData.password
        }
      }
    };

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", payload);
      setMsg("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-body-tertiary d-flex align-items-center justify-content-center">
      <div className="shadow p-5 rounded-4 bg-white" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4" style={{ color: "#005DAA" }}>Create Account</h3>

        {msg && (
          <div className={`alert ${msg.includes("successful") ? "alert-success" : "alert-danger"}`} role="alert">
            {msg}
          </div>
        )}

        <form onSubmit={processSignUp}>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Register as</label>
            <select className="form-select" id="role" value={role} onChange={handleRoleChange}>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone</label>
            <input type="text" className="form-control" id="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="department" className="form-label">Department</label>
            <input type="text" className="form-control" id="department" value={formData.department} onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} />
          </div>

          {role === "employee" && (
            <div className="mb-3">
              <label htmlFor="level" className="form-label">Level</label>
              <select className="form-select" id="level" value={formData.level} onChange={handleChange}>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
              </select>
            </div>
          )}

          <div className="d-grid">
            <button type="submit" className="btn btn-lg rounded-pill" style={{ backgroundColor: "#005DAA", color: "#fff" }}>
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <a onClick={() => navigate("/")} className="text-decoration-none" style={{ color: "#005DAA", cursor: "pointer" }}>
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
