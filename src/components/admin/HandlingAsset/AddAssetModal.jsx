import { useState, useEffect } from "react";

function AddAssetModal({ show, onClose, onSave, categories }) {
  if (!show) return null;

  const [serialNumber, setSerialNumber] = useState("");
  const [specs, setSpecs] = useState("");
  const [eligibilityLevel, setEligibilityLevel] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSave = () => {
    if (!serialNumber || !specs || !eligibilityLevel || !categoryId) {
      alert("Please fill in all fields");
      return;
    }

    // Sending form data to parent
    onSave({
      serialNumber,
      specs,
      eligibilityLevel,
      categoryId,
    });

    // Clearing fields
    setSerialNumber("");
    setSpecs("");
    setEligibilityLevel("");
    setCategoryId("");
  };

  // Clear form after modal is closed
  useEffect(() => {
    if (!show) {
      setSerialNumber("");
      setSpecs("");
      setEligibilityLevel("");
      setCategoryId("");
    }
  }, [show]);

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ color: "#005DAA" }}>
              Add New Asset
            </h5>
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
                <option value="">Select Level</option>
                <option value="L1">L1</option>
                <option value="L2">L2</option>
                <option value="L3">L3</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn rounded-pill"
              style={{ backgroundColor: "#005DAA", color: "#fff" }}
              onClick={handleSave}
            >
              Save Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAssetModal;
