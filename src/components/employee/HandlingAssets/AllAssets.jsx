import { useEffect, useState } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
const auth = { headers: { Authorization: `Bearer ${token}` } };

function AllAssets() {
  const [assets, setAssets] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [page, setPage] = useState(0);
  const size = 6;

  const loadData = async (pg) => {
    try {
      const { data: emp } = await axios.get("http://localhost:8080/api/employee/details", auth);
      setEmployee(emp);

      const [el, as] = await Promise.all([
        axios.get(`http://localhost:8080/api/assets/eligible-paged?page=${pg}&size=${size}`, auth),
        axios.get(`http://localhost:8080/api/assigned-assets/employee/${emp.id}`, auth),
      ]);

      setAssets(el.data);
      setAssigned(as.data);
    } catch (err) {
      console.error("Data load failed", err);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  const hasAsset = (assetId) => assigned.some((a) => a.asset.id === assetId);

  const requestAsset = async (asset) => {
    if (!employee) return;
    if (hasAsset(asset.id)) return alert("You already have this asset.");

    try {
      await axios.post(
        "http://localhost:8080/api/asset-requests/create",
        { asset, employee },
        auth
      );
      alert("Request sent");
    } catch (err) {
      console.error("Request failed", err);
      alert("Could not send request");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center mb-4" style={{ color: "#005DAA" }}>Eligible Assets</h2>

      <div className="row g-4">
        {assets.length === 0 && (
          <p className="text-center text-muted">No eligible assets found.</p>
        )}

        {assets.map((a) => (
          <div key={a.id} className="col-md-4">
            <div className="shadow rounded-4 p-4 h-100" style={{ background: "#fff", borderLeft: "5px solid #005DAA" }}>
              <h5 className="fw-bold mb-2" style={{ color: "#005DAA" }}>{a.serialNumber}</h5>
              <p className="text-muted mb-1" style={{ fontSize: "0.95rem" }}>{a.specs}</p>
              <p className="mb-1"><strong>Eligibility:</strong> {a.eligibilityLevel}</p>
              <button
                className="btn btn-outline-primary rounded-pill mt-3"
                disabled={hasAsset(a.id)}
                onClick={() => requestAsset(a)}
              >
                {hasAsset(a.id) ? "Already Assigned" : "Request Asset"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-end mt-4">
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page - 1)} disabled={page === 0}>
                Previous
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">Page {page + 1}</span>
            </li>
            <li className="page-item">
              <button className="page-link" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllAssets;
