import { useEffect, useState } from "react";
import axios from "axios";

function MyAssets() {
  const [assets, setAssets] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [selectedForService, setSelectedForService] = useState(null);
  const [description, setDescription] = useState("");
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

  const fetchAssignedAssets = async (employeeId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/assigned-assets/employee/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAssets(res.data);
    } catch (err) {
      console.error("Failed to fetch assigned assets", err);
    }
  };

  const fetchServiceRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/service-requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServiceRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch service requests", err);
    }
  };

  const fetchReturnRequests = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/return-requests/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReturnRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch return requests", err);
    }
  };

  const handleReturnRequest = async (assignedAsset) => {
    const alreadyRequested = returnRequests.some(
      (req) =>
        req.asset.id === assignedAsset.asset.id &&
        req.employee.id === assignedAsset.employee.id &&
        req.status === "pending"
    );

    if (alreadyRequested) {
      alert("Return request already exists for this asset.");
      return;
    }

    const payload = {
      asset: assignedAsset.asset,
      employee: assignedAsset.employee,
    };

    try {
      await axios.post("http://localhost:8080/api/return-requests/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Return request raised successfully.");
      fetchReturnRequests();
    } catch (err) {
      console.error("Failed to raise return request", err);
      alert("Failed to raise return request");
    }
  };

  const handleServiceRequest = async () => {
    if (!description.trim()) {
      alert("Please enter a description for the issue.");
      return;
    }

    const alreadyRequested = serviceRequests.some(
      (req) =>
        req.asset.id === selectedForService.asset.id &&
        req.employee.id === selectedForService.employee.id &&
        (req.status === "pending" || req.status === "in_progress")
    );

    if (alreadyRequested) {
      alert("Service request already exists for this asset.");
      return;
    }

    const payload = {
      asset: selectedForService.asset,
      employee: selectedForService.employee,
      description: description,
    };

    try {
      await axios.post("http://localhost:8080/api/service-requests/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Service request submitted successfully.");
      setSelectedForService(null);
      setDescription("");
      fetchServiceRequests();
    } catch (err) {
      console.error("Failed to create service request", err);
      alert("Failed to create service request");
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchEmployeeDetails();
      await fetchServiceRequests();
      await fetchReturnRequests();
    };
    init();
  }, []);

  useEffect(() => {
    if (employee?.id) {
      fetchAssignedAssets(employee.id);
    }
  }, [employee]);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#005DAA" }}>
        My Assets
      </h2>

      <div className="row g-4">
        {assets.length === 0 ? (
          <p className="text-center text-muted">No assets assigned to you.</p>
        ) : (
          assets.map((assigned) => {
            const hasServiceRequest = serviceRequests.some(
              (req) =>
                req.asset.id === assigned.asset.id &&
                req.employee.id === assigned.employee.id &&
                (req.status === "pending" || req.status === "in_progress")
            );

            const hasReturnRequest = returnRequests.some(
              (req) =>
                req.asset.id === assigned.asset.id &&
                req.employee.id === assigned.employee.id &&
                req.status === "pending"
            );

            return (
              <div className="col-md-4" key={assigned.id}>
                <div
                  className="shadow rounded-4 p-4 h-100"
                  style={{
                    backgroundColor: "#fff",
                    borderLeft: "5px solid #005DAA",
                  }}
                >
                  <h5 className="fw-bold mb-2" style={{ color: "#005DAA" }}>
                    {assigned.asset.serialNumber}
                  </h5>
                  <p className="text-muted mb-1" style={{ fontSize: "0.95rem" }}>
                    {assigned.asset.specs}
                  </p>
                  <p className="mb-1">
                    <strong>Category:</strong> {assigned.asset.category?.name}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> {assigned.asset.status}
                  </p>

                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <button
                      className="btn btn-outline-info rounded-pill btn-sm"
                      disabled={hasServiceRequest}
                      onClick={() => setSelectedForService(assigned)}
                    >
                      {hasServiceRequest ? "Requested" : "Service Request"}
                    </button>
                    <button
                      className="btn btn-outline-danger rounded-pill btn-sm"
                      disabled={hasReturnRequest}
                      onClick={() => handleReturnRequest(assigned)}
                    >
                      {hasReturnRequest ? "Requested" : "Return Request"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedForService && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
          <div className="bg-white p-4 rounded-4 shadow" style={{ width: "400px" }}>
            <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
              Raise Service Request
            </h5>
            <p>
              <strong>Asset:</strong> {selectedForService.asset.serialNumber}
            </p>
            <textarea
              className="form-control mb-3"
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-outline-secondary rounded-pill"
                onClick={() => {
                  setSelectedForService(null);
                  setDescription("");
                }}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary rounded-pill"
                onClick={handleServiceRequest}
              >
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
