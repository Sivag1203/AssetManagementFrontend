function AddAssetModal({ show, onClose, onSave, formData, setFormData, categories }) {
  if (!show) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
            {[
              { label: "Serial Number", name: "serialNumber" },
              { label: "Specs", name: "specs" },
            ].map((field, i) => (
              <div className="mb-3" key={i}>
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  className="form-control"
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="form-label">Eligibility Level</label>
              <select
                name="eligibilityLevel"
                className="form-select"
                onChange={handleChange}
                value={formData.eligibilityLevel}
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
                name="categoryId"
                className="form-select"
                onChange={handleChange}
                value={formData.categoryId}
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
              onClick={onSave}
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
