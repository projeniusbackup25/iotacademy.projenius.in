import React from "react";
import Sidebar from "../component/Sidebar";
import "./ReportsPage.css";

const ReportsPage = () => {
  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main">

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

        {/* Stats */}

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

        {/* Charts */}

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