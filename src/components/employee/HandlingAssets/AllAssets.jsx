import { useEffect, useState } from "react";
import axios from "axios";

function AllAssets() {
  const [assets, setAssets] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [assignedAssets, setAssignedAssets] = useState([]);
  const token = localStorage.getItem("token");

  const fetchEligibleAssets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/assets/eligible", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(res.data);
    } catch (err) {
      console.error("Failed to fetch eligible assets", err);
    }
  };

  const fetchEmployeeDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/employee/details", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data);
      fetchAssignedAssets(res.data.id); // fetch assigned assets after employee is fetched
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
      setAssignedAssets(res.data);
    } catch (err) {
      console.error("Failed to fetch assigned assets", err);
    }
  };

  const handleRequest = async (asset) => {
    if (!employee) return alert("Employee data not loaded!");

    const alreadyAssigned = assignedAssets.some(
      (assigned) => assigned.asset.id === asset.id
    );

    if (alreadyAssigned) {
      alert("You already have this asset assigned.");
      return;
    }

    const requestPayload = {
      asset: asset,
      employee: employee,
    };

    try {
      await axios.post("http://localhost:8080/api/asset-requests/create", requestPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Asset request submitted successfully!");
    } catch (err) {
      console.error("Failed to create asset request", err);
      alert("Failed to create request");
    }
  };

  useEffect(() => {
    fetchEligibleAssets();
    fetchEmployeeDetails();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center" style={{ color: "#005DAA" }}>
        Eligible Assets
      </h2>
      <div className="row g-4">
        {assets.length === 0 ? (
          <p className="text-center text-muted">No eligible assets found.</p>
        ) : (
          assets.map((asset) => {
            const alreadyAssigned = assignedAssets.some(
              (assigned) => assigned.asset.id === asset.id
            );

            return (
              <div className="col-md-4" key={asset.id}>
                <div
                  className="shadow rounded-4 p-4 h-100"
                  style={{
                    backgroundColor: "#fff",
                    borderLeft: "5px solid #005DAA",
                  }}
                >
                  <h5 className="fw-bold mb-2" style={{ color: "#005DAA" }}>
                    {asset.serialNumber}
                  </h5>
                  <p className="text-muted mb-1" style={{ fontSize: "0.95rem" }}>
                    {asset.specs}
                  </p>
                  <p className="mb-1">
                    <strong>Eligibility Level:</strong> {asset.eligibilityLevel}
                  </p>

                  <div className="d-flex justify-content-end mt-3">
                    <button
                      className="btn btn-outline-primary rounded-pill"
                      onClick={() => handleRequest(asset)}
                      disabled={alreadyAssigned}
                    >
                      {alreadyAssigned ? "Already Assigned" : "Request Asset"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AllAssets;
