import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OrderPage.css"; // keep your existing css
import "./AdminDashboard.css"; // IMPORTANT: admin sidebar styles

const ordersData = [
  {
    name: "Alex Johnson",
    email: "alex@example.com",
    course: "Beginner IoT Basics",
    level: "Beginner",
    date: "2024-01-15",
    status: "Paid",
  },
  {
    name: "Sarah Williams",
    email: "sarah@example.com",
    course: "Intermediate Sensors",
    level: "Intermediate",
    date: "2024-01-14",
    status: "Paid",
  },
  {
    name: "Mike Chen",
    email: "mike@example.com",
    course: "Advanced Robotics",
    level: "Advanced",
    date: "2024-01-13",
    status: "Pending",
  },
  {
    name: "James Wilson",
    email: "james@example.com",
    course: "Intermediate Networks",
    level: "Intermediate",
    date: "2024-01-11",
    status: "Failed",
  },
];

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const [collapse, setCollapse] = useState(false);


  const filteredData =
    activeTab === "All"
      ? ordersData
      : ordersData.filter((item) => item.level === activeTab);

  return (
    <div className="dash-layout">
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
      <main className="dash-main">
        <h2>Order History</h2>
        <p className="subtitle">View and manage all student orders</p>

        <div className="tabs">
          {["All", "Beginner", "Intermediate", "Advanced"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Level</th>
                <th>Date Joined</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="student">
                      <div className="avatar">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.course}</td>
                  <td>
                    <span className={`badge ${item.level.toLowerCase()}`}>
                      {item.level}
                    </span>
                  </td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
