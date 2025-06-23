import { useEffect, useState } from "react";
import axios from "axios";

function MyRequests() {
  const [employee, setEmployee] = useState(null);
  const [assetRequests, setAssetRequests] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const token = localStorage.getItem("token");

  const fetchEmployeeDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employee/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data);
    } catch (err) {
      console.error("Failed to fetch employee details", err);
    }
  };

  const fetchAllRequests = async (employeeId) => {
    try {
      const [assetRes, serviceRes, returnRes] = await Promise.all([
        axios.get(`http://localhost:8080/api/asset-requests/employee/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:8080/api/service-requests/employee/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:8080/api/return-requests/employee/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAssetRequests(assetRes.data);
      setServiceRequests(serviceRes.data);
      setReturnRequests(returnRes.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchEmployeeDetails();
    };
    init();
  }, []);

  useEffect(() => {
    if (employee?.id) {
      fetchAllRequests(employee.id);
    }
  }, [employee]);

  const renderRequestCard = (type, request) => {
    const { status, requestDate, asset, description } = request;

    return (
      <div className="col-md-4 mb-4" key={`${type}-${request.id}`}>
        <div className="shadow rounded-4 p-4 h-100" style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}>
          <h6 className="fw-bold text-primary mb-2">{type} Request</h6>
          <p className="mb-1">
            <strong>Asset:</strong> {asset?.serialNumber || "N/A"}
          </p>
          {description && (
            <p className="mb-1">
              <strong>Description:</strong> {description}
            </p>
          )}
          <p className="mb-1">
            <strong>Status:</strong>{" "}
            <span className={`badge ${status === "pending" ? "bg-warning" : status === "in_progress" ? "bg-info" : "bg-success"}`}>
              {status}
            </span>
          </p>
          <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
            <strong>Date:</strong> {requestDate}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#005DAA" }}>
        My Requests
      </h2>

      <div className="mb-5">
        <h4 className="fw-semibold mb-3 text-secondary">Asset Requests</h4>
        <div className="row">
          {assetRequests.length === 0 ? (
            <p className="text-muted">No asset requests found.</p>
          ) : (
            assetRequests.map((req) => renderRequestCard("Asset", req))
          )}
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-semibold mb-3 text-secondary">Service Requests</h4>
        <div className="row">
          {serviceRequests.length === 0 ? (
            <p className="text-muted">No service requests found.</p>
          ) : (
            serviceRequests.map((req) => renderRequestCard("Service", req))
          )}
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-semibold mb-3 text-secondary">Return Requests</h4>
        <div className="row">
          {returnRequests.length === 0 ? (
            <p className="text-muted">No return requests found.</p>
          ) : (
            returnRequests.map((req) => renderRequestCard("Return", req))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyRequests;
