import React, { useState, useEffect } from "react";
import "./OrderPage.css";
import Sidebar from "../component/Sidebar";

const API = "https://iotacademy-backend.onrender.com";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [orders, setOrders] = useState([]);

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

  /* ================= FILTER DATA ================= */

  const filteredData =
    activeTab === "All"
      ? orders
      : orders.filter(
          (item) =>
            item.level.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="dashboard-main">

        <h2>Order History</h2>
        <p className="subtitle">
          View and manage all student orders
        </p>

        {/* Tabs */}

        <div className="tabs">
          {["All", "Beginner", "Intermediate", "Advanced"].map(
            (tab) => (
              <button
                key={tab}
                className={
                  activeTab === tab ? "tab active" : "tab"
                }
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Table */}

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
                  <td colSpan="5" className="no-data">
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
                      {new Date(
                        item.dateJoined
                      ).toLocaleDateString()}
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