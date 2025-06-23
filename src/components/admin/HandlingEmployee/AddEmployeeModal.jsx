import React, { useState } from "react";
import axios from "axios";

function AddEmployeeModal({ show, onClose, onSuccess }) {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    address: "",
    level: "L1",
    auth: { email: "", password: "", role: "EMPLOYEE" },
  });

  const handleAddEmployee = async () => {
    try {
      await axios.post("http://localhost:8080/api/employee/add", newEmployee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNewEmployee({
        name: "",
        email: "",
        phone: "",
        department: "",
        address: "",
        level: "L1",
        auth: { email: "", password: "", role: "EMPLOYEE" },
      });
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h5 className="fw-bold mb-3 text-primary">Add New Employee</h5>
          <div className="row g-2">
            {["name", "email", "phone", "department", "address"].map((field, i) => (
              <input
                key={i}
                type="text"
                className="form-control"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newEmployee[field]}
                onChange={(e) => setNewEmployee({ ...newEmployee, [field]: e.target.value })}
              />
            ))}

            <select
              className="form-select"
              value={newEmployee.level}
              onChange={(e) => setNewEmployee({ ...newEmployee, level: e.target.value })}
            >
              <option value="L1">L1</option>
              <option value="L2">L2</option>
              <option value="L3">L3</option>
            </select>

            <input
              type="text"
              className="form-control"
              placeholder="Login Email"
              value={newEmployee.auth.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, auth: { ...newEmployee.auth, email: e.target.value } })
              }
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={newEmployee.auth.password}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, auth: { ...newEmployee.auth, password: e.target.value } })
              }
            />
          </div>
          <div className="mt-3 d-flex justify-content-end gap-2">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAddEmployee}>
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployeeModal;
