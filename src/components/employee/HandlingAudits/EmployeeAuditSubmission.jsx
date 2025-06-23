import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeAuditSubmission() {
  const [audits, setAudits] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [comments, setComments] = useState("");
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [operationalState, setOperationalState] = useState("working");
  const token = localStorage.getItem("token");

  const fetchEmployeeDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employee/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data);
    } catch (err) {
      console.error("Failed to fetch employee", err);
    }
  };

  const fetchPendingAudits = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/audit/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAudits(res.data.filter((audit) => audit.status === "pending"));
    } catch (err) {
      console.error("Failed to fetch audits", err);
    }
  };

  const handleSubmit = async () => {
    if (!comments.trim()) return alert("Add a comment");

    const payload = {
      auditId: selectedAudit.id,
      operationalState,
      comments,
    };

    try {
      await axios.post(`http://localhost:8080/api/audit/submit/${selectedAudit.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Audit submitted successfully");
      setComments("");
      setOperationalState("working");
      setSelectedAudit(null);
      fetchPendingAudits(employee.id);
    } catch (err) {
      console.error("Submission failed", err);
      alert("Failed to submit");
    }
  };

  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  useEffect(() => {
    if (employee?.id) {
      fetchPendingAudits(employee.id);
    }
  }, [employee]);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#005DAA" }}>
        Pending Audits
      </h2>
      <div className="row g-4">
        {audits.map((audit) => (
          <div className="col-md-4" key={audit.id}>
            <div className="p-4 shadow rounded-4" style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}>
              <h5 className="fw-bold" style={{ color: "#005DAA" }}>{audit.asset.serialNumber}</h5>
              <p><strong>Due:</strong> {audit.dueDate}</p>
              <button
                className="btn btn-outline-success rounded-pill btn-sm"
                onClick={() => setSelectedAudit(audit)}
              >
                Fill Audit
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAudit && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="bg-white p-4 rounded-4 shadow" style={{ width: "400px" }}>
            <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>Submit Audit</h5>
            <p><strong>Asset:</strong> {selectedAudit.asset.serialNumber}</p>
            <select
              className="form-select mb-2"
              value={operationalState}
              onChange={(e) => setOperationalState(e.target.value)}
            >
              <option value="working">Working</option>
              <option value="damaged">Damaged</option>
              <option value="not_working">Not Working</option>
            </select>
            <textarea
              className="form-control mb-3"
              placeholder="Comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={() => {
                  setSelectedAudit(null);
                  setComments("");
                  setOperationalState("working");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded-pill"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeAuditSubmission;
