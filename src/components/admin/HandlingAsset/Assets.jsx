// Assets.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AddAssetModal from "./AddAssetModal";
import AddCategoryModal from "./AddCategoryModal";
import EditAssetModal from "./EditAssetModal";

function Assets() {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editAsset, setEditAsset] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/assets/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/asset-category/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddAsset = async (newAsset) => {
    try {
      await axios.post(
        `http://localhost:8080/api/assets/add/${newAsset.categoryId}`,
        {
          serialNumber: newAsset.serialNumber,
          specs: newAsset.specs,
          eligibilityLevel: newAsset.eligibilityLevel,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setShowModal(false);
      fetchAssets();
    } catch (error) {
      alert("Error adding asset. Check input values.");
      console.error(error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/asset-category/add",
        { name: newCategoryName },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewCategoryName("");
      setShowCategoryModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteAsset = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/assets/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  const handleUpdateAsset = async (updatedAsset) => {
    try {
      await axios.put(
        `http://localhost:8080/api/assets/update/${updatedAsset.id}`,
        updatedAsset,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditModalOpen(false);
      fetchAssets();
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold" style={{ color: "#005DAA" }}>
          Assets
        </h2>
        <div className="d-flex gap-2">
          <button
            className="btn rounded-pill"
            style={{ backgroundColor: "#005DAA", color: "#fff" }}
            onClick={() => {
              fetchCategories();
              setShowModal(true);
            }}
          >
            + Add Asset
          </button>
          <button
            className="btn rounded-pill"
            style={{ backgroundColor: "#005DAA", color: "#fff" }}
            onClick={() => setShowCategoryModal(true)}
          >
            + Add Category
          </button>
        </div>
      </div>

      <div className="row g-4">
        {assets.map((asset) => (
          <div key={asset.id} className="col-md-6 col-lg-4">
            <div
              className="p-4 shadow rounded-4 h-100"
              style={{
                backgroundColor: "#fff",
                borderLeft: "5px solid #005DAA",
              }}
            >
              <h5 className="fw-bold mb-2" style={{ color: "#005DAA" }}>
                {asset.serialNumber}
              </h5>
              <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
                {asset.specs}
              </p>
              <p className="text-muted mb-2" style={{ fontSize: "0.95rem" }}>
                Eligilibility : {asset.eligibilityLevel}
              </p>
              <span
                className={`badge px-3 py-2 rounded-pill ${
                  asset.status === "available" ? "bg-success" : "bg-secondary"
                }`}
              >
                {asset.status}
              </span>
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-outline-primary btn-sm rounded-pill"
                  onClick={() => {
                    setEditAsset(asset);
                    setEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm rounded-pill"
                  onClick={() => handleDeleteAsset(asset.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddAssetModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddAsset}
        categories={categories}
      />

      <AddCategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categoryName={newCategoryName}
        setCategoryName={setNewCategoryName}
        onSave={handleAddCategory}
      />

      <EditAssetModal
        show={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        asset={editAsset}
        onUpdate={(updatedAsset) => {
          handleUpdateAsset(updatedAsset);
        }}
      />
    </div>
  );
}

export default Assets;
