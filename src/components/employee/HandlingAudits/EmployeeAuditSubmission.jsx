import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeAuditSubmission() {
  const [audits, setAudits] = useState([]); 
  const [active, setActive] = useState(null);
  const [state, setState] = useState("working");
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    (async () => {
      try {
        const { data: emp } = await axios.get(
          "http://localhost:8080/api/employee/details",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { data } = await axios.get(
          `http://localhost:8080/api/audit/employee/${emp.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAudits(data);
      } catch (err) {
        console.error("Fetch error", err);
      }
    })();
  }, []);
  const submitAudit = async () => {
    if (!comment.trim()) return alert("Add a comment first");

    try {
      await axios.post(
        `http://localhost:8080/api/audit/submit/${active.id}`,
        { auditId: active.id, operationalState: state, comments: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAudits((prev) =>
        prev.map((a) =>
          a.id === active.id ? { ...a, status: "submitted" } : a
        )
      );

      setActive(null);
      setState("working");
      setComment("");
      alert("Audit submitted");
    } catch (err) {
      console.error("Submit failed", err);
      alert("Submission failed");
    }
  };

  const badge = (status) =>
    ({
      pending: "warning",
      submitted: "success",
      overdue: "danger",
    }[status] || "secondary");

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#005DAA" }}>
        My Audits
      </h2>

      <div className="row g-4">
        {audits.length === 0 && (
          <p className="text-muted text-center">No audits assigned.</p>
        )}

        {audits.map((a) => (
          <div className="col-md-4" key={a.id}>
            <div
              className="p-4 shadow rounded-4 h-100"
              style={{ background: "#fff", borderLeft: "5px solid #005DAA" }}
            >
              <h5 className="fw-bold" style={{ color: "#005DAA" }}>
                {a.asset.serialNumber}
              </h5>
              <p className="mb-1">
                <strong>Due:</strong> {a.dueDate}
              </p>
              <span className={`badge bg-${badge(a.status)} mb-2`}>
                {a.status}
              </span>
              {a.status === "pending" && (
                <button
                  className="btn btn-outline-success btn-sm rounded-pill"
                  onClick={() => setActive(a)}
                >
                  Fill Audit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="bg-white p-4 rounded-4 shadow" style={{ width: 400 }}>
            <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
              Audit for {active.asset.serialNumber}
            </h5>

            <select
              className="form-select mb-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="working">Working</option>
              <option value="needsrepair">Needs Repair</option>
            </select>

            <textarea
              className="form-control mb-3"
              placeholder="Comments..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={() => {
                  setActive(null);
                  setState("working");
                  setComment("");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded-pill"
                onClick={submitAudit}
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
