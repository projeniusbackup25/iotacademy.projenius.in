import React, { useState } from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="dash-layout">

      {/* SIDEBAR */}
      <aside className={`dash-sidebar ${collapse ? "mini" : ""}`}>
        <div className="side-head">
          <div className="logo-box">⚙</div>
          {!collapse && <span>IoT Learn</span>}
          <button onClick={() => setCollapse(!collapse)}>❮</button>
        </div>

        <ul className="side-menu">
          <li className="active">Dashboard</li>
          <li>Order History</li>
          <li>Courses & Videos</li>
          <li>Reports</li>
        </ul>

        <div className="side-logout">Logout</div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">

        {/* TOP BAR */}
        <div className="dash-top">
          <h2>Dashboard</h2>

          <div className="top-right">
            <div className="search-box">
              🔍 <input placeholder="Search..." />
            </div>

            <span className="notify">🔔</span>

            <div className="user-box">
              <div className="avatar"></div>
              <div>
                <b>Admin User</b>
                <small>admin@projenius.com</small>
              </div>
            </div>
          </div>
        </div>

        <h3>Welcome back, Admin!</h3>
        <p className="date">Friday, January 23, 2026</p>

        {/* STAT CARDS */}
        <div className="stat-grid">
          <Stat title="Total Orders" value="1,234" color="blue" />
          <Stat title="Active Students" value="892" color="sky" />
          <Stat title="Total Revenue" value="$45,678" color="purple" />
        </div>

        {/* PANELS */}
        <div className="panel-grid">

          {/* ORDERS */}
          <div className="panel-box">
            <h4>Recent Orders</h4>

            <Order name="John Doe" kit="Arduino Starter Kit" price="$149" />
            <Order name="Jane Smith" kit="Raspberry Pi Kit" price="$199" />
            <Order name="Mike Johnson" kit="ESP32 Bundle" price="$89" />
            <Order name="Sarah Wilson" kit="Complete IoT Kit" price="$299" />
          </div>

          {/* PERFORMANCE */}
          <div className="panel-box">
            <h4>Performance Overview</h4>

            <Perf label="Approval Rate" value="94.5%" />
            <Perf label="Course Completion" value="78.2%" />
            <Perf label="Avg. Response Time" value="2.4 hrs" />
          </div>

        </div>

      </main>
    </div>
  );
}

/* COMPONENTS */

function Stat({ title, value, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-left">
        <span>{title}</span>
        <h2>{value}</h2>
        <p>+ from last month</p>
      </div>
      <div className="stat-icon">📊</div>
    </div>
  );
}

function Order({ name, kit, price }) {
  return (
    <div className="order-row">
      <div>
        <b>{name}</b>
        <small>{kit}</small>
      </div>
      <span>{price}</span>
    </div>
  );
}

function Perf({ label, value }) {
  return (
    <div className="perf-row">
      <span>{label}</span>
      <b>{value}</b>
    </div>
  );
}
