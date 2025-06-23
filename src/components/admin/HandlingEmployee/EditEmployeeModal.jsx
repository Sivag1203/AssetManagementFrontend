import React, { useState, useEffect } from "react";
import axios from "axios";

function EditEmployeeModal({ show, onClose, employee, onSuccess }) {
  const [editedEmployee, setEditedEmployee] = useState(employee);

  useEffect(() => {
    setEditedEmployee(employee);
  }, [employee]);

  const handleUpdateEmployee = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/employee/update/${editedEmployee.id}`,
        editedEmployee,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Failed to update employee", error);
    }
  };

  if (!show || !editedEmployee) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content rounded-4 p-4">
          <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
            Edit Employee
          </h5>

          <div className="row g-3">
            {["name", "email", "phone", "department", "address"].map((field, i) => (
              <div className="col-md-6" key={i}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={editedEmployee[field] || ""}
                  onChange={(e) => setEditedEmployee({ ...editedEmployee, [field]: e.target.value })}
                />
              </div>
            ))}

            <div className="col-md-6">
              <select
                className="form-select"
                value={editedEmployee.level}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, level: e.target.value })}
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
                value={editedEmployee.auth?.email || ""}
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    auth: { ...editedEmployee.auth, email: e.target.value },
                  })
                }
              />
            </div>

            <div className="col-md-6">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                onChange={(e) =>
                  setEditedEmployee({
                    ...editedEmployee,
                    auth: { ...editedEmployee.auth, password: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleUpdateEmployee}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeeModal;
