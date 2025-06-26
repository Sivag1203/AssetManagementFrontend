import { useEffect, useState } from "react";
import axios from "axios";

function MyAssets() {
  const [assets, setAssets] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [description, setDescription] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEmployeeData();
    fetchServiceRequests();
    fetchReturnRequests();
  }, []);

  useEffect(() => {
    if (employee?.id) fetchAssignedAssets(employee.id);
  }, [employee]);

  const fetchEmployeeData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employee/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data);
    } catch (err) {
      console.error("Employee fetch failed", err);
    }
  };

  const fetchAssignedAssets = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/assigned-assets/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data);
    } catch (err) {
      console.error("Assigned assets fetch failed", err);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/service-requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServiceRequests(res.data);
    } catch (err) {
      console.error("Service requests fetch failed", err);
    }
  };

  const fetchReturnRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/return-requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReturnRequests(res.data);
    } catch (err) {
      console.error("Return requests fetch failed", err);
    }
  };

  const hasServiceRequest = (assetId) =>
    serviceRequests.find(
      (r) => r.asset.id === assetId && (r.status === "pending" || r.status === "in_progress")
    );

  const hasReturnRequest = (assetId) =>
    returnRequests.find((r) => r.asset.id === assetId && r.status === "pending");

  const handleReturnRequest = async (assetObj) => {
    if (hasReturnRequest(assetObj.asset.id)) return alert("Return already requested");

    try {
      await axios.post("http://localhost:8080/api/return-requests/create", {
        asset: assetObj.asset,
        employee: assetObj.employee,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Return request submitted");
      fetchReturnRequests();
    } catch (err) {
      console.error("Return request failed", err);
    }
  };

  const handleServiceRequest = async () => {
    if (!description.trim()) return alert("Enter issue description");
    if (hasServiceRequest(selectedAsset.asset.id)) return alert("Service already requested");

    try {
      await axios.post("http://localhost:8080/api/service-requests/create", {
        asset: selectedAsset.asset,
        employee: selectedAsset.employee,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Service request submitted");
      setSelectedAsset(null);
      setDescription("");
      fetchServiceRequests();
    } catch (err) {
      console.error("Service request failed", err);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#005DAA" }}>
        My Assets
      </h2>

      <div className="row g-4">
        {assets.length === 0 ? (
          <p className="text-muted text-center">No assets assigned.</p>
        ) : (
          assets.map((a) => (
            <div className="col-md-4" key={a.id}>
              <div className="p-4 shadow rounded-4 h-100" style={{ borderLeft: "5px solid #005DAA", backgroundColor: "#fff" }}>
                <h5 className="fw-bold" style={{ color: "#005DAA" }}>{a.asset.serialNumber}</h5>
                <p className="text-muted">{a.asset.specs}</p>
                <p><strong>Category:</strong> {a.asset.category?.name}</p>
                <p><strong>Status:</strong> {a.asset.status}</p>

                <div className="d-flex justify-content-end gap-2 mt-3">
                  <button
                    className="btn btn-outline-info btn-sm rounded-pill"
                    disabled={hasServiceRequest(a.asset.id)}
                    onClick={() => setSelectedAsset(a)}
                  >
                    {hasServiceRequest(a.asset.id) ? "Requested" : "Service Request"}
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    disabled={hasReturnRequest(a.asset.id)}
                    onClick={() => handleReturnRequest(a)}
                  >
                    {hasReturnRequest(a.asset.id) ? "Requested" : "Return Request"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedAsset && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="bg-white p-4 rounded-4 shadow" style={{ width: "400px" }}>
            <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
              Raise Service Request
            </h5>
            <p><strong>Asset:</strong> {selectedAsset.asset.serialNumber}</p>
            <textarea
              className="form-control mb-3"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-secondary rounded-pill" onClick={() => {
                setSelectedAsset(null);
                setDescription("");
              }}>
                Cancel
              </button>
              <button className="btn btn-primary rounded-pill" onClick={handleServiceRequest}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAssets;
