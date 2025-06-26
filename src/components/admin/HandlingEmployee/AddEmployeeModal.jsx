import { useState, useEffect } from "react";
import axios from "axios";

function AddEmployeeModal({ show, onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [address, setAddress] = useState("");
  const [level, setLevel] = useState("L1");
  const [loginEmail, setLoginEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDept("");
    setAddress("");
    setLevel("L1");
    setLoginEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (show) resetForm();
  }, [show]);

  const handleAdd = async () => {
    const payload = {
      name,
      email,
      phone,
      department: dept,
      address,
      level,
      auth: {
        email: loginEmail,
        password,
        role: "EMPLOYEE",
      },
    };

    try {
      await axios.post("http://localhost:8080/api/employee/add", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error adding employee:", err);
      alert("Failed to add employee");
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="fw-bold mb-3 text-primary">Add New Employee</h5>

          <div className="row g-2">
            <input
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </select>
            <input
              className="form-control"
              placeholder="Login Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-3 d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
