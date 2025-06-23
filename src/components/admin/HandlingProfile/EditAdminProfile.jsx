import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../store/actions/UserAction";
import axios from "axios";

function EditAdminProfile({ user, token, onCancel, onSuccess }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    department: user.department,
    address: user.address,
    auth: {
      email: user.email,
      password: "",
      role: user.role,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("auth.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        auth: {
          ...prev.auth,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/admin/update/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUserDetails(res.data));
      onSuccess(); // notify parent to close edit mode
    } catch (error) {
      alert("Failed to update profile");
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          name="phone"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <input
          type="text"
          name="department"
          className="form-control"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Login Email</label>
        <input
          type="email"
          name="auth.email"
          className="form-control"
          value={formData.auth.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">New Password</label>
        <input
          type="password"
          name="auth.password"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn"
          style={{ backgroundColor: "#005DAA", color: "#fff" }}
          onClick={handleUpdate}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default EditAdminProfile;
