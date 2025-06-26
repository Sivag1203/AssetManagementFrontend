import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [role, setRole] = useState("employee");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState("L1");

  const processSignUp = async (e) => {
    e.preventDefault();
    setMsg("");

    const payload = {
      role,
      user: {
        name,
        email,
        phone,
        department,
        address,
        ...(role === "employee" && { level }),
        auth: {
          email,
          password,
        },
      },
    };

    try {
      await axios.post("http://localhost:8080/api/auth/register", payload);
      setMsg("Registration successful!");
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMsg("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-body-tertiary d-flex align-items-center justify-content-center">
      <div
        className="shadow p-5 rounded-4 bg-white"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h3 className="text-center mb-4" style={{ color: "#005DAA" }}>
          Create Account
        </h3>

        {msg && (
          <div
            className={`alert ${
              msg.includes("successful") ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {msg}
          </div>
        )}

        <form onSubmit={processSignUp}>
          <div className="mb-3">
            <label className="form-label">Register as</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <input
            className="form-control mb-3"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="form-control mb-3"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="form-control mb-3"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          <input
            className="form-control mb-3"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {role === "employee" && (
            <select
              className="form-select mb-3"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </select>
          )}

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-lg rounded-pill"
              style={{ backgroundColor: "#005DAA", color: "#fff" }}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <a
              onClick={() => navigate("/")}
              className="text-decoration-none"
              style={{ color: "#005DAA", cursor: "pointer" }}
            >
              Login
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
