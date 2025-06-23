import { useEffect, useState } from "react";
import axios from "axios";

function AuditSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/audit-submission/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to fetch audit submissions", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#005DAA" }}>
        Audit Submissions
      </h2>
      <div className="row g-4">
        {submissions.length === 0 ? (
          <p className="text-muted text-center">No audit submissions found.</p>
        ) : (
          submissions.map((sub) => (
            <div className="col-md-4" key={sub.id}>
              <div className="p-4 shadow rounded-4" style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}>
                <h5 className="fw-bold" style={{ color: "#005DAA" }}>
                  Audit #{sub.id}
                </h5>
                <p><strong>Audit ID:</strong> {sub.auditId}</p>
                <p><strong>Status:</strong> {sub.operationalState}</p>
                <p><strong>Comments:</strong> {sub.comments || "No comments"}</p>
                <p><strong>Submitted At:</strong> {new Date(sub.submittedAt).toLocaleString()}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AuditSubmissions;
