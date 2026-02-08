import React from "react";

import "./Certificate.css";

export default function Certificate() {

  const overallProgress = 68;

  return (
    <div className="cert-layout">
      {/* SIDEBAR */}
      <aside className="ud-sidebar">

  <div className="ud-logo">
    <div className="logo-box">⚙</div>
    <div>
      <b>IoT Learn</b>
      <small>Student Portal</small>
    </div>
  </div>

  <ul className="ud-menu">
    <li
      className={window.location.pathname === "/userdashboard" ? "active" : ""}
      onClick={() => (window.location.href = "/userdashboard")}
    >
      📘 My Course
    </li>

    <li
      className={window.location.pathname === "/uservideo" ? "active" : ""}
      onClick={() => (window.location.href = "/uservideo")}
    >
      🎥 Videos
    </li>

    <li
      className={window.location.pathname === "/userproject" ? "active" : ""}
      onClick={() => (window.location.href = "/userproject")}
    >
      🛠 Projects
    </li>

    <li
      className={window.location.pathname === "/userdownload" ? "active" : ""}
      onClick={() => (window.location.href = "/userdownload")}
    >
      ⬇ Downloads
    </li>

    <li
      className={window.location.pathname === "/certificate" ? "active" : ""}
      onClick={() => (window.location.href = "/certificate")}
    >
      🎓 Certificate
    </li>

    <li>❓ Support</li>
  </ul>

  <button className="upgrade-btn">✨ Upgrade Bundle</button>

</aside>


      {/* MAIN CONTENT */}
      <main className="cert-main">
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
