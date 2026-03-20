import React from "react";
import "./Certificate.css";
import UserSidebar from "../component/UserSidebar"; // ✅ IMPORT

export default function Certificate() {

  const overallProgress = 68;

  return (
    <div style={{ display: "flex" }}>

      {/* ✅ COMMON SIDEBAR */}
      <UserSidebar />

      {/* MAIN CONTENT */}
      <main className="cert-main" style={{ marginLeft: "240px", width: "100%" }}>
        <h1>Certificate</h1>
        <p className="cert-sub">
          Complete all requirements to earn your IoT Academy certificate.
        </p>

        <div className="cert-content">
          
          <div className="cert-preview">
            <div className="cert-overlay">
              <h3>Certificate Pending</h3>
              <p>Complete all requirements to unlock your certificate</p>
            </div>
          </div>

          <div className="cert-progress">
            <h2>Completion Progress</h2>

            <div className="progress-card">
              <div className="progress-header">
                <span>Overall Progress</span>
                <strong>{overallProgress}%</strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>

            <button className="complete-btn">
              ⬇ Complete All Requirements
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}