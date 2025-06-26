import { useState, useEffect } from "react";
import axios from "axios";

function EditEmployeeModal({ show, onClose, employee, onSuccess }) {
  /* ──────────  keep each field in its own state ────────── */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (!employee) return;
    setName(employee.name || "");
    setEmail(employee.email || "");
    setPhone(employee.phone || "");
    setDepartment(employee.department || "");
    setAddress(employee.address || "");
    setLevel(employee.level || "L1");
    setLoginEmail(employee.auth?.email || employee.email || "");
    setPassword("");
  }, [employee]);

  const handleUpdate = async () => {
    if (!employee) return;
    const payload = {
      id: employee.id,
      name,
      email,
      phone,
      department,
      address,
      level,
      auth: {
        email: loginEmail,
        password,
        role: employee.auth?.role || "EMPLOYEE",
      },
    };

    try {
      await axios.put(
        `http://localhost:8080/api/employee/update/${employee.id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to update employee", err);
      alert("Update failed");
    }
  };

  if (!show || !employee) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 p-4">
          <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
            Edit Employee
          </h5>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="col-md-6">
              <select
                className="form-select"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
              </select>
            </div>

            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                placeholder="Login Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleUpdate}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
