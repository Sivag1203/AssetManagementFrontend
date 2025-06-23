import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const processLogin = async (e) => {
    e.preventDefault();
    try {
      // let encString = window.btoa(email + ":" + password);
      const requestBody = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        requestBody
      );
      setMsg("login successful");
      //   console.log(response.data);
      localStorage.setItem("token", response.data.token);

      let role = response.data.role.toLowerCase();
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "employee":
          navigate("/employee");
          break;
        default:
          console.error("Unknown role:", role);
          setMsg("Unknown role, please contact support.");
      }
    } catch (err) {
      setMsg("login failed");
      console.error(err);
    }
  };
  return (
    <div className="container-fluid min-vh-100 bg-body-tertiary">
      <div className="row py-4">
        <div className="col text-center">
          <h4 className="fw-bold" style={{ color: "#005DAA" }}>
            ASSETLY
          </h4>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div
          className="row shadow rounded-4 overflow-hidden"
          style={{ maxWidth: "450px", width: "100%", backgroundColor: "#fff" }}
        >
          <div className="col-md-12 p-5">
            <div className="mb-4 text-center">
              <h4 className="mt-3" style={{ color: "#005DAA" }}>
                Welcome Back!
              </h4>
              <p className="text-muted small">Login to continue to Assetly</p>
              {msg && (
                <div className="alert alert-info" role="alert">
                  {msg}
                </div>
              )}
            </div>
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid mb-3">
                <button
                  type="button"
                  className="btn btn-lg rounded-pill"
                  style={{ backgroundColor: "#005DAA", color: "#fff" }}
                  onClick={processLogin}
                >
                  Login
                </button>
              </div>
              <div className="text-center">
                <small className="text-muted">
                  Don’t have an account?{" "}
                  <a
                    className="text-decoration-none"
                    style={{ color: "#005DAA" }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </a>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
