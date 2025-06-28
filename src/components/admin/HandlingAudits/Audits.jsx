import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Audits() {
  const [assignedAssets, setAssignedAssets] = useState([]);
  const [existingAudits, setExistingAudits] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all assigned assets
  const fetchAssignedAssets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/assigned-assets/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignedAssets(res.data);
    } catch (err) {
      alert("Failed to load assigned assets.");
    }
  };

  // Fetch all existing audits (pending only)
  const fetchExistingAudits = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/audit/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExistingAudits(res.data.filter((a) => a.status === "pending"));
    } catch (err) {
      alert("Failed to load audits.");
    }
  };

  const checkAuditExists = (assetId, employeeId) => {
    return existingAudits.some(
      (audit) => audit.asset.id === assetId && audit.employee.id === employeeId
    );
  };

  const handleCreateAudit = async (assetId, employeeId) => {
    if (checkAuditExists(assetId, employeeId)) {
      alert("Audit already exists for this asset and employee.");
      return;
    }

    const payload = {
      dueDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post(
        `http://localhost:8080/api/audit/create/${assetId}/${employeeId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Audit created successfully.");
      fetchExistingAudits();
    } catch (err) {
      alert("Failed to create audit.");
    }
  };

  useEffect(() => {
    fetchAssignedAssets();
    fetchExistingAudits();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#005DAA" }}>
          Create Audits
        </h2>
        <Link to="/admin/auditsubmissions" className="btn btn-outline-secondary rounded-pill">
          View Submissions
        </Link>
      </div>

      <div className="row g-4">
        {assignedAssets.map((assigned) => {
          const auditExists = checkAuditExists(assigned.asset.id, assigned.employee.id);

          return (
            <div className="col-md-4" key={assigned.id}>
              <div className="p-4 shadow rounded-4" style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}>
                <h5 className="fw-bold" style={{ color: "#005DAA" }}>{assigned.asset.serialNumber}</h5>
                <p><strong>Employee:</strong> {assigned.employee.name}</p>
                <p><strong>Specs:</strong> {assigned.asset.specs}</p>
                <button
                  className="btn btn-outline-primary rounded-pill btn-sm mt-2"
                  onClick={() => handleCreateAudit(assigned.asset.id, assigned.employee.id)}
                  disabled={auditExists}
                >
                  {auditExists ? "Audit Already Created" : "Create Audit"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Audits;