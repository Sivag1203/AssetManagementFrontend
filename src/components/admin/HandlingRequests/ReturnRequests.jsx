import { useEffect, useState } from "react";
import axios from "axios";

function ReturnRequests({ onClose }) {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/return-requests/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching return requests", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      if (newStatus === "completed") {
        await axios.put(
          `http://localhost:8080/api/return-requests/approve/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else if (newStatus === "rejected") {
        await axios.delete(
          `http://localhost:8080/api/return-requests/reject/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      fetchRequests();
    } catch (err) {
      console.error("Failed to update return request status", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#005DAA" }}>
          Return Requests
        </h2>
        <button
          className="btn btn-outline-secondary rounded-pill"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="row g-4">
        {requests.map((req) => (
          <div className="col-md-4" key={req.id}>
            <div
              className="shadow rounded-4 p-4 h-100"
              style={{
                backgroundColor: "#fff",
                borderLeft: "5px solid #005DAA",
              }}
            >
              <h5 className="fw-bold mb-2" style={{ color: "#005DAA" }}>
                {req.asset.serialNumber}
              </h5>
              <p className="text-muted mb-1" style={{ fontSize: "0.95rem" }}>
                {req.asset.specs}
              </p>
              <p className="mb-1">
                <strong>Employee:</strong> {req.employee.name}
              </p>
              <p className="mb-1">
                <strong>Date:</strong> {req.requestDate}
              </p>

              <span
                className={`badge px-3 py-2 rounded-pill text-uppercase mb-3 ${
                  req.status === "pending"
                    ? "bg-warning text-dark"
                    : req.status === "completed"
                    ? "bg-success"
                    : "bg-danger"
                }`}
              >
                {req.status}
              </span>

              {req.status !== "completed" && (
                <div className="d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-outline-success rounded-pill"
                    onClick={() => updateStatus(req.id, "completed")}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger rounded-pill"
                    onClick={() => updateStatus(req.id, "rejected")}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReturnRequests;
