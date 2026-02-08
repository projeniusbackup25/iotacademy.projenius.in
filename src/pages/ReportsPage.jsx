import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ReportsPage.css";
import "./AdminDashboard.css";

const ReportsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="admin-layout">
      {/* ================= ADMIN SIDEBAR ================= */}
      <aside className={`dash-sidebar ${collapse ? "mini" : ""}`}>
        <div className="side-head">
          <div className="logo-box">⚙</div>
          {!collapse && <span>IoT Learn</span>}

          <button onClick={() => setCollapse(!collapse)}>
            ❮
          </button>
        </div>

        <ul className="side-menu">
          <li
            className={location.pathname === "/admindashboard" ? "active" : ""}
            onClick={() => navigate("/admindashboard")}
          >
            Dashboard
          </li>

          <li
            className={location.pathname === "/orders" ? "active" : ""}
            onClick={() => navigate("/orders")}
          >
            Order History
          </li>

          <li
            className={location.pathname === "/coursepage" ? "active" : ""}
            onClick={() => navigate("/coursepage")}
          >
            Courses & Videos
          </li>

          <li
            className={location.pathname === "/reportspage" ? "active" : ""}
            onClick={() => navigate("/reportspage")}
          >
            Reports
          </li>
        </ul>

        <div className="side-logout" onClick={() => navigate("/login")}>
          Logout
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="admin-content">
        <div className="reports-header">
          <div>
            <h2>Reports</h2>
            <p>Analytics and insights for your platform</p>
          </div>

          <div className="header-actions">
            <button className="filter-btn">📅 Last 30 Days</button>
            <button className="primary-btn">⬇ Export Report</button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Enrollments</p>
            <h3>2,847</h3>
            <span className="positive">+15.3% from last month</span>
          </div>

          <div className="stat-card">
            <p>Course Completion Rate</p>
            <h3>78.4%</h3>
            <span className="positive">+4.2% from last month</span>
          </div>

          <div className="stat-card">
            <p>Revenue by Level</p>
            <h3>$124,580</h3>
            <span className="positive">+23.1% from last month</span>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h4>Enrollment by Course Level</h4>

            <div className="donut-placeholder">
              <div className="donut-center">
                <h3>2,847</h3>
                <small>Total</small>
              </div>
            </div>

            <div className="legend">
              <span className="green">● Beginner 45%</span>
              <span className="blue">● Intermediate 35%</span>
              <span className="orange">● Advanced 20%</span>
            </div>
          </div>

          <div className="chart-card">
            <h4>Monthly Revenue</h4>

            <div className="line-placeholder">
              Jan&nbsp;&nbsp;Feb&nbsp;&nbsp;Mar&nbsp;&nbsp;Apr&nbsp;&nbsp;May&nbsp;&nbsp;Jun
            </div>

            <div className="revenue-footer">
              <div>
                <p>Average Monthly</p>
                <h3>$20,763</h3>
              </div>
              <div>
                <p>Best Month</p>
                <h3 className="positive">May - $23,680</h3>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsPage;
