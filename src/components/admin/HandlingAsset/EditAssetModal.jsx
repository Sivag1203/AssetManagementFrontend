import React from "react";

function EditAssetModal({ show, onClose, asset, setAsset, onUpdate }) {
  if (!show || !asset) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content rounded-4 p-4">
          <div className="modal-header border-0">
            <h5 className="modal-title" style={{ color: "#005DAA" }}>
              Edit Asset
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {[
              { label: "Serial Number", name: "serialNumber" },
              { label: "Specs", name: "specs" },
            ].map((field, i) => (
              <div className="mb-3" key={i}>
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  className="form-control"
                  value={asset[field.name]}
                  onChange={(e) => setAsset({ ...asset, [field.name]: e.target.value })}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Eligibility Level</label>
              <select
                className="form-select"
                value={asset.eligibilityLevel}
                onChange={(e) => setAsset({ ...asset, eligibilityLevel: e.target.value })}
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
                value={asset.status}
                onChange={(e) => setAsset({ ...asset, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="not-available">Not Available</option>
              </select>
            </div>
          </div>
          <div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn rounded-pill"
              style={{ backgroundColor: "#005DAA", color: "#fff" }}
              onClick={onUpdate}
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
