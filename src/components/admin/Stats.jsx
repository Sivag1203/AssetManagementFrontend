import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Stats() {
  const [assetStats, setAssetStats] = useState(null);
  const [serviceStats, setServiceStats] = useState(null);
  const [returnStats, setReturnStats] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllStats();
  }, []);

  const fetchAllStats = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [assetRes, serviceRes, returnRes] = await Promise.all([
        axios.get("http://localhost:8080/api/asset-requests/status-counts", { headers }),
        axios.get("http://localhost:8080/api/service-requests/status-counts", { headers }),
        axios.get("http://localhost:8080/api/return-requests/status-counts", { headers }),
      ]);

      setAssetStats(assetRes.data);
      setServiceStats(serviceRes.data);
      setReturnStats(returnRes.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const createBarData = (labels, data, colors, label) => ({
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: colors,
        borderRadius: 10,
      },
    ],
  });

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="container">
      <div
        className="mt-4 mx-auto shadow rounded-4 p-5"
        style={{ backgroundColor: "#fff" }}
      >
        <h2 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
          Admin Dashboard
        </h2>
        <p className="text-muted mb-4">
          Welcome to the admin dashboard. Here you can monitor real-time status of requests.
        </p>

        <div className="row g-4">
          {/* Asset Request Stats */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 text-center" style={{ backgroundColor: "#EAF4FF" }}>
              <h5 className="fw-semibold text-dark">Asset Requests</h5>
              {assetStats ? (
                <>
                  <h6>Pending: {assetStats.pending}</h6>
                  <h6>Approved: {assetStats.approved}</h6>
                  <h6>Rejected: {assetStats.rejected}</h6>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Service Request Stats */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 text-center" style={{ backgroundColor: "#FFF5E5" }}>
              <h5 className="fw-semibold text-dark">Service Requests</h5>
              {serviceStats ? (
                <>
                  <h6>Pending: {serviceStats.pending}</h6>
                  <h6>In Progress: {serviceStats.in_progress}</h6>
                  <h6>Completed: {serviceStats.completed}</h6>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>

          {/* Return Request Stats */}
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 p-3 text-center" style={{ backgroundColor: "#E6F9EC" }}>
              <h5 className="fw-semibold text-dark">Return Requests</h5>
              {returnStats ? (
                <>
                  <h6>Pending: {returnStats.pending}</h6>
                  <h6>Completed: {returnStats.completed}</h6>
                  <h6>Rejected: {returnStats.rejected}</h6>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>

        {/* Bar Graphs Section */}
        <div className="mt-5">
          <h5 className="fw-bold mb-3" style={{ color: "#005DAA" }}>
            Request Status Overview
          </h5>

          <div className="row g-4">
            <div className="col-md-4">
              {assetStats && (
                <Bar
                  data={createBarData(
                    ["Pending", "Approved", "Rejected"],
                    [assetStats.pending, assetStats.approved, assetStats.rejected],
                    ["#FFC107", "#28A745", "#DC3545"],
                    "Asset Requests"
                  )}
                  options={barOptions}
                />
              )}
            </div>

            <div className="col-md-4">
              {serviceStats && (
                <Bar
                  data={createBarData(
                    ["Pending", "In Progress", "Completed"],
                    [serviceStats.pending, serviceStats.in_progress, serviceStats.completed],
                    ["#FFC107", "#17A2B8", "#28A745"],
                    "Service Requests"
                  )}
                  options={barOptions}
                />
              )}
            </div>

            <div className="col-md-4">
              {returnStats && (
                <Bar
                  data={createBarData(
                    ["Pending", "Completed", "Rejected"],
                    [returnStats.pending, returnStats.completed, returnStats.rejected],
                    ["#FFC107", "#28A745", "#DC3545"],
                    "Return Requests"
                  )}
                  options={barOptions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
