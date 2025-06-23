function AddCategoryModal({ show, onClose, categoryName, setCategoryName, onSave }) {
  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ color: "#005DAA" }}>
              Add New Category
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
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
              Save Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
