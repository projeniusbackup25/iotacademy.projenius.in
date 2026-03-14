import React, { useEffect, useRef, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import Sidebar from "../component/Sidebar";

const API = "https://iotacademy-backend.onrender.com";

export default function AdminDashboard() {

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  /* 📊 Dashboard Stats */
  const [totalOrders, setTotalOrders] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);

  const navigate = useNavigate();
  const menuRef = useRef(null);

  /* 🔐 Load admin data */
  useEffect(() => {

    const role = localStorage.getItem("role");

    if (role !== "admin") {
      navigate("/login");
      return;
    }

    setAdminName(localStorage.getItem("adminName") || "Admin");
    setAdminEmail(localStorage.getItem("adminEmail") || "");
    setLoginTime(localStorage.getItem("loginTime") || "Unknown");

  }, [navigate]);



  /* 📊 FETCH DASHBOARD STATS */
  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/orders/stats`, {
          headers: {
            Authorization: token
          }
        });

        const data = await res.json();

        if (res.ok) {
          setTotalOrders(data.totalOrders);
          setActiveStudents(data.activeStudents);
        }

      } catch (err) {
        console.error("Dashboard stats fetch error:", err);
      }

    };

    fetchStats();

  }, []);



  /* ❌ Close dropdown outside click */
  useEffect(() => {

    const handler = (e) => {

      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }

    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);

  }, []);



  return (

    <div className="dash-layout">

      {/* SIDEBAR */}
      <Sidebar />

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

            {/* SETTINGS */}
            <div className="settings-wrapper" ref={menuRef}>

              <FaCog
                className="settings-icon"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (

                <div className="settings-dropdown">

                  <p><b>{adminName}</b></p>
                  <p>{adminEmail}</p>

                  <hr />

                  <p className="login-time">
                    🕒 Logged in at <br />
                    <small>{loginTime}</small>
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

        {/* HEADER */}
        <h3>Welcome back, {adminName}!</h3>

        <p className="date">

          {new Date().toLocaleDateString("en-US", {

            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",

          })}

        </p>

        {/* STAT CARDS */}

        <div className="stat-grid">

          <Stat title="Total Orders" value={totalOrders} color="blue" />
          <Stat title="Active Students" value={activeStudents} color="sky" />
          <Stat title="Total Revenue" value="$45,678" color="purple" />

        </div>

        {/* PANELS */}

        <div className="panel-grid">

          <div className="panel-box">

            <h4>Recent Orders</h4>

            <Order name="John Doe" kit="Arduino Starter Kit" price="$149" />
            <Order name="Jane Smith" kit="Raspberry Pi Kit" price="$199" />
            <Order name="Mike Johnson" kit="ESP32 Bundle" price="$89" />
            <Order name="Sarah Wilson" kit="Complete IoT Kit" price="$299" />

          </div>

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