import { useEffect, useState } from "react";

function EditAssetModal({ show, onClose, asset, onUpdate }) {
  const [serialNumber, setSerialNumber] = useState("");
  const [specs, setSpecs] = useState("");
  const [eligibilityLevel, setEligibilityLevel] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (asset) {
      setSerialNumber(asset.serialNumber || "");
      setSpecs(asset.specs || "");
      setEligibilityLevel(asset.eligibilityLevel || "");
      setStatus(asset.status || "");
    }
  }, [asset]);

  if (!show || !asset) return null;

  const handleSave = () => {
    onUpdate({
      ...asset,
      serialNumber,
      specs,
      eligibilityLevel,
      status,
    });
  };

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content rounded-4 p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title" style={{ color: "#005DAA" }}>Edit Asset</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Serial Number</label>
              <input
                type="text"
                className="form-control"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Specs</label>
              <input
                type="text"
                className="form-control"
                value={specs}
                onChange={(e) => setSpecs(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Eligibility Level</label>
              <select
                className="form-select"
                value={eligibilityLevel}
                onChange={(e) => setEligibilityLevel(e.target.value)}
              >
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button
              className="btn rounded-pill"
              style={{ backgroundColor: "#005DAA", color: "#fff" }}
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAssetModal;
