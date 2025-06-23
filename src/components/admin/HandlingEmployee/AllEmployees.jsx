import { useEffect, useState } from "react";
import axios from "axios";
import AddEmployeeModal from "./AddEmployeeModal";
import EditEmployeeModal from "./EditEmployeeModal";

function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/employee/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employee/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#005DAA" }}>
          All Employees
        </h2>
        <button
          className="btn rounded-pill"
          style={{ backgroundColor: "#005DAA", color: "#fff" }}
          onClick={() => setShowAddModal(true)}
        >
          Add Employee
        </button>
      </div>

      <div className="row">
        {employees.map((emp) => (
          <div className="col-md-4 mb-4" key={emp.id}>
            <div className="card border-0 shadow-sm rounded-4 p-3">
              <h5 className="fw-bold mb-2" style={{ color: "#005DAA" }}>
                {emp.name}
              </h5>
              <p className="mb-1 text-muted">{emp.email}</p>
              <p className="mb-1">
                <strong>Phone:</strong> {emp.phone}
              </p>
              <p className="mb-1">
                <strong>Department:</strong> {emp.department}
              </p>
              <p className="mb-1">
                <strong>Address:</strong> {emp.address}
              </p>
              <p className="mb-3">
                <strong>Level:</strong> {emp.level}
              </p>
              <div className="d-flex justify-content-end gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => {
                    setCurrentEmployee(emp);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteEmployee(emp.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddEmployeeModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={fetchEmployees}
      />

      <EditEmployeeModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        employee={currentEmployee}
        onSuccess={fetchEmployees}
      />
    </div>
  );
}

export default AllEmployees;