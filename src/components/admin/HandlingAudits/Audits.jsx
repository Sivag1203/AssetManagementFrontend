// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // function Audits() {
// //   const [assignedAssets, setAssignedAssets] = useState([]);
// //   const [dueDate, setDueDate] = useState("");
// //   const [audits, setAudits] = useState([]);
// //   const token = localStorage.getItem("token");

// //   const fetchAllAssignedAssets = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:8080/api/assigned-assets/all", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setAssignedAssets(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch assigned assets", err);
// //     }
// //   };

// //   const fetchAllAudits = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:8080/api/audit/all", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setAudits(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch audits", err);
// //     }
// //   };

// //   const handleCreateAudit = async (assetId, employeeId) => {
// //     if (!dueDate) return alert("Please enter due date");

// //     const payload = { dueDate: dueDate };

// //     try {
// //       await axios.post(
// //         `http://localhost:8080/api/audit/create/${assetId}/${employeeId}`,
// //         payload,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       alert("Audit created successfully");
// //       await fetchAllAudits(); // Ensure audit list refreshes
// //     } catch (err) {
// //       if (err.response?.status === 400 || err.response?.status === 500) {
// //         alert("Audit already exists or duplicate entry");
// //       } else {
// //         alert("Failed to create audit");
// //       }
// //       console.error("Failed to create audit", err);
// //     }
// //   };

// //   const getAuditByAssetAndEmployee = (assetId, employeeId) => {
// //     return audits.find(
// //       (a) => a.asset.id === assetId && a.employee.id === employeeId
// //     );
// //   };

// //   useEffect(() => {
// //     fetchAllAssignedAssets();
// //     fetchAllAudits();
// //   }, []);

// //   return (
// //     <div className="container py-5">
// //       <h2 className="text-center fw-bold mb-4" style={{ color: "#005DAA" }}>
// //         Create Audits
// //       </h2>

// //       <div className="mb-4 d-flex gap-3">
// //         <input
// //           type="date"
// //           className="form-control"
// //           value={dueDate}
// //           onChange={(e) => setDueDate(e.target.value)}
// //         />
// //         <Link to="/admin/auditsubmissions" className="btn btn-outline-secondary rounded-pill">
// //           View Submissions
// //         </Link>
// //       </div>

// //       <div className="row g-4">
// //         {assignedAssets.map((assigned) => {
// //           const audit = getAuditByAssetAndEmployee(
// //             assigned.asset.id,
// //             assigned.employee.id
// //           );

// //           let buttonText = "Create Audit";
// //           let isDisabled = false;

// //           if (audit) {
// //             if (audit.status === "submitted") {
// //               buttonText = "Audit Completed";
// //               isDisabled = true;
// //             } else if (audit.status === "pending" || audit.status === "overdue") {
// //               buttonText = "Sent for Audit";
// //               isDisabled = true;
// //             }
// //           }

// //           return (
// //             <div className="col-md-4" key={assigned.id}>
// //               <div
// //                 className="p-4 shadow rounded-4"
// //                 style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}
// //               >
// //                 <h5 className="fw-bold" style={{ color: "#005DAA" }}>
// //                   {assigned.asset.serialNumber}
// //                 </h5>
// //                 <p><strong>Employee:</strong> {assigned.employee.name}</p>
// //                 <p><strong>Specs:</strong> {assigned.asset.specs}</p>
// //                 <button
// //                   className="btn btn-outline-primary rounded-pill btn-sm mt-2"
// //                   onClick={() => handleCreateAudit(assigned.asset.id, assigned.employee.id)}
// //                   disabled={isDisabled}
// //                 >
// //                   {buttonText}
// //                 </button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Audits;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Audits() {
  const [assignedAssets, setAssignedAssets] = useState([]);
  const token = localStorage.getItem("token");

  const fetchAssignedAssets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/assigned-assets/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssignedAssets(res.data);
    } catch (err) {
      alert("Failed to load assigned assets.");
    }
  };

  const handleCreateAudit = async (assetId, employeeId) => {
    const payload = {
      dueDate: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post(
        `http://localhost:8080/api/audit/create/${assetId}/${employeeId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Audit created successfully.");
    } catch (err) {
      alert("Failed to create audit.");
    }
  };

  useEffect(() => {
    fetchAssignedAssets();
  }, []);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#005DAA" }}>
          Create Audits
        </h2>
        <Link to="/admin/auditsubmissions" className="btn btn-outline-secondary rounded-pill">
          View Submissions
        </Link>
      </div>

      <div className="row g-4">
        {assignedAssets.map((assigned) => (
          <div className="col-md-4" key={assigned.id}>
            <div
              className="p-4 shadow rounded-4"
              style={{ backgroundColor: "#fff", borderLeft: "5px solid #005DAA" }}
            >
              <h5 className="fw-bold" style={{ color: "#005DAA" }}>
                {assigned.asset.serialNumber}
              </h5>
              <p><strong>Employee:</strong> {assigned.employee.name}</p>
              <p><strong>Specs:</strong> {assigned.asset.specs}</p>
              <button
                className="btn btn-outline-primary rounded-pill btn-sm mt-2"
                onClick={() => handleCreateAudit(assigned.asset.id, assigned.employee.id)}
              >
                Create Audit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Audits;
