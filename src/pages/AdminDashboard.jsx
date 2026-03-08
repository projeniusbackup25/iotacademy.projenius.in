import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OrderPage.css";
import "./AdminDashboard.css";

const API = "https://iotacademy-backend.onrender.com";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);
  const [collapse, setCollapse] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= FETCH ORDERS ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/orders/admin`, {
          headers: {
            Authorization: token,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();

        setOrders(data);
      } catch (err) {
        console.error("Order fetch error:", err);
      }
    };

    fetchOrders();
  }, []);

  /* ================= FILTER TABS ================= */
  const filteredData =
    activeTab === "All"
      ? orders
      : orders.filter(
          (item) =>
            item.level.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div className="dash-layout">
      {/* ================= ADMIN SIDEBAR ================= */}
      <aside className={`dash-sidebar ${collapse ? "mini" : ""}`}>
        <div className="side-head">
          <div className="logo-box">⚙</div>
          {!collapse && <span>IoT Learn</span>}

          <button onClick={() => setCollapse(!collapse)}>❮</button>
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

        <div
          className="side-logout"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="dash-main">
        <h2>Order History</h2>
        <p className="subtitle">View and manage all student orders</p>

        {/* ================= TABS ================= */}
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

        {/* ================= TABLE ================= */}
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
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>
                      <div className="student">
                        <div className="avatar">
                          {item.name?.charAt(0)}
                        </div>

                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{item.course}</td>

                    <td>
                      <span
                        className={`badge ${item.level.toLowerCase()}`}
                      >
                        {item.level}
                      </span>
                    </td>

                    <td>
                      {new Date(item.dateJoined).toLocaleDateString()}
                    </td>

                    <td>
                      <span
                        className={`status ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}