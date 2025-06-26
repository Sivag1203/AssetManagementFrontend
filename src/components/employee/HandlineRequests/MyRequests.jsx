import { useEffect, useState } from "react";
import axios from "axios";

function MyRequests() {
  const [employeeId, setEmployeeId] = useState(null);
  const [assetRequests, setAssetRequests] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/employee/details",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployeeId(data.id);

        const [assetRes, serviceRes, returnRes] = await Promise.all([
          axios.get(
            `http://localhost:8080/api/asset-requests/employee/${data.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `http://localhost:8080/api/service-requests/employee/${data.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
          axios.get(
            `http://localhost:8080/api/return-requests/employee/${data.id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        ]);

        setAssetRequests(assetRes.data);
        setServiceRequests(serviceRes.data);
        setReturnRequests(returnRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  const renderCard = (type, req) => (
    <div className="col-md-4 mb-4" key={`${type}-${req.id}`}>
      <div
        className="shadow rounded-4 p-4 h-100"
        style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}
      >
        <h6 className="fw-bold text-primary mb-2">{type} Request</h6>
        <p className="mb-1">
          <strong>Asset:</strong> {req.asset?.serialNumber || "N/A"}
        </p>
        {req.description && (
          <p className="mb-1">
            <strong>Description:</strong> {req.description}
          </p>
        )}
        <p className="mb-1">
          <strong>Status:</strong>{" "}
          <span
            className={`badge ${
              req.status === "pending"
                ? "bg-warning"
                : req.status === "in_progress"
                ? "bg-info"
                : "bg-success"
            }`}
          >
            {req.status}
          </span>
        </p>
        <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
          <strong>Date:</strong> {req.requestDate}
        </p>
      </div>
    </div>
  );

  const renderSection = (title, data, type) => (
    <div className="mb-5">
      <h4 className="fw-semibold mb-3 text-secondary">{title}</h4>
      <div className="row">
        {data.length === 0 ? (
          <p className="text-muted">No {type.toLowerCase()} requests found.</p>
        ) : (
          data.map((req) => renderCard(type, req))
        )}
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#005DAA" }}>
        My Requests
      </h2>
      {renderSection("Asset Requests", assetRequests, "Asset")}
      {renderSection("Service Requests", serviceRequests, "Service")}
      {renderSection("Return Requests", returnRequests, "Return")}
    </div>
  );
}

export default MyRequests;
