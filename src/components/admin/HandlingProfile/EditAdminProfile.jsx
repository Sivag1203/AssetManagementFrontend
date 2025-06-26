import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../store/actions/UserAction";
import axios from "axios";

function EditAdminProfile({ user, token, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [department, setDepartment] = useState(user.department);
  const [address, setAddress] = useState(user.address);
  const [loginEmail, setLoginEmail] = useState(user.email);
  const [password, setPassword] = useState(""); // new password

  const handleUpdate = async () => {
    const payload = {
      id: user.id,
      name,
      email,
      phone,
      department,
      address,
      auth: {
        email: loginEmail,
        password, 
        role: user.role,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:8080/api/admin/update/${user.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setUserDetails(res.data));
      onSuccess();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          type="text"
          className="form-control"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Department</label>
        <input
          type="text"
          className="form-control"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Login Email</label>
        <input
          type="email"
          className="form-control"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">New Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
