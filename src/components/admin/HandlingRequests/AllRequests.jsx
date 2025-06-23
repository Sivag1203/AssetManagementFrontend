import { useState } from "react";
import AssetRequests from "./AssetRequests";
import ServiceRequests from "./ServiceRequests";
import ReturnRequests from "./ReturnRequests";

function AllRequests() {
  const [activeRequestType, setActiveRequestType] = useState(null);

  const renderActiveComponent = () => {
    switch (activeRequestType) {
      case "asset":
        return <AssetRequests onClose={() => setActiveRequestType(null)} />;
      case "service":
        return <ServiceRequests onClose={() => setActiveRequestType(null)} />;
      case "return":
        return <ReturnRequests onClose={() => setActiveRequestType(null)} />;
      default:
        return (
          <div className="container py-5">
            <h2 className="fw-bold mb-4 text-center" style={{ color: "#005DAA" }}>
              All Requests
            </h2>
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div
                  className="card p-4 text-center shadow rounded-4"
                  style={{ cursor: "pointer", borderLeft: "5px solid #005DAA" }}
                  onClick={() => setActiveRequestType("asset")}
                >
                  <h5 className="fw-semibold">Asset Requests</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="card p-4 text-center shadow rounded-4"
                  style={{ cursor: "pointer", borderLeft: "5px solid #005DAA" }}
                  onClick={() => setActiveRequestType("service")}
                >
                  <h5 className="fw-semibold">Service Requests</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div
                  className="card p-4 text-center shadow rounded-4"
                  style={{ cursor: "pointer", borderLeft: "5px solid #005DAA" }}
                  onClick={() => setActiveRequestType("return")}
                >
                  <h5 className="fw-semibold">Return Requests</h5>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div style={{ minHeight: "calc(100vh - 100px)" }}>{renderActiveComponent()}</div>;
}

export default AllRequests;
