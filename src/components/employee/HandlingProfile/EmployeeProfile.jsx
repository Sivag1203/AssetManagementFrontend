import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import EditEmployeeProfile from "./EditEmployeeProfile";
import axios from "axios";

function EmployeeProfile() {
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  const [editMode, setEditMode] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    getProfilePic();
  }, []);

  const getProfilePic = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/profile-pic", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfilePic(res.data.fileName);
    } catch (err) {
      console.error("Failed to fetch profile picture", err);
    }
  };

  const uploadProfilePic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:8080/api/profile-pic/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMsg("Profile image uploaded...");
      getProfilePic();
    } catch (err) {
      console.error("Upload failed", err);
      setMsg("Upload failed!");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 rounded-4 shadow-lg" style={{ width: "600px" }}>
        <h4 className="fw-bold mb-4 text-center" style={{ color: "#005DAA" }}>
          Profile
        </h4>

        <div className="text-center mb-4">
          <img
            src={profilePic ? `/images/${profilePic}` : "/default-profile.png"}
            alt="Profile"
            className="rounded-circle mb-2"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <input
            type="file"
            className="form-control mt-2"
            accept="image/*"
            onChange={uploadProfilePic}
          />
          <small className="text-success">{msg}</small>
        </div>

        {editMode ? (
          <EditEmployeeProfile
            user={user}
            token={token}
            onCancel={() => setEditMode(false)}
            onSuccess={() => setEditMode(false)}
          />
        ) : (
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.name}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.email}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.phone}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.department}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.address}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Login Email</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.email}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <div className="border rounded px-3 py-2 bg-light">
                {user.role}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn"
                style={{ backgroundColor: "#005DAA", color: "#fff" }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmployeeProfile;
