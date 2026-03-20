import React, { useEffect, useRef, useState } from "react";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import UserSidebar from "../component/UserSidebar"; // ✅ IMPORT SIDEBAR

export default function UserDashboard() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loginTime, setLoginTime] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  /* 🔐 Load user data */
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "user") {
      navigate("/login");
      return;
    }

    setUserName(localStorage.getItem("userName") || "Student");
    setUserEmail(localStorage.getItem("userEmail") || "");
    setLoginTime(localStorage.getItem("loginTime") || "Unknown");
  }, [navigate]);

  /* ❌ Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 🚪 Logout */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      
      {/* ✅ COMMON SIDEBAR */}
      <UserSidebar />

      {/* ================= MAIN ================= */}
      <main className="ud-main" style={{ marginLeft: "240px", width: "100%" }}>

        {/* TOP BAR */}
        <div className="ud-top">
          <div>
            <span className="welcome">Welcome back,</span>
            <h3>{userName}! 👋</h3>
          </div>

          <div className="ud-actions">
            <span className="notify">🔔</span>

            {/* SETTINGS DROPDOWN */}
            <div className="settings-wrapper" ref={menuRef}>
              <FaCog
                className="settings-icon"
                onClick={() => setShowMenu(!showMenu)}
              />

              {showMenu && (
                <div className="settings-dropdown">
                  <p><b>{userName}</b></p>
                  <p>{userEmail}</p>
                  <hr />
                  <p className="login-time">
                    🕒 Logged in at<br />
                    <small>{loginTime}</small>
                  </p>

                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DASHBOARD */}
        <h2>My Dashboard</h2>
        <p className="sub">Track your progress and continue learning</p>

        {/* COURSE CARD */}
        <div className="course-card">
          <div className="course-img"></div>

          <div className="course-info">
            <div className="tags">
              <span className="tag">Basic Bundle</span>
              <span className="active">Active</span>
            </div>

            <h3>Basic IoT Fundamentals</h3>
            <p>
              Master the fundamentals of IoT development with hands-on projects
              and real-world examples.
            </p>

            <div className="meta">
              <span>📅 Enrolled: Jan 15, 2024</span>
              <span>⏱ 12 hours</span>
              <span>📚 34 lessons</span>
            </div>

            <div className="progress-row">
              <div className="bar">
                <div style={{ width: "35%" }}></div>
              </div>
              <b>35%</b>
              <button className="start-btn">▶ Start Learning</button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="ud-grid">
          <div className="stat-box">
            <h4>Your Progress</h4>

            <div className="circle">35%</div>

            <div className="stats">
              <Stat label="Lessons Done" value="12/34" />
              <Stat label="This Week" value="4.5h" />
              <Stat label="Day Streak" value="7" />
            </div>
          </div>

          <div className="stat-box">
            <h4>Continue Learning</h4>

            <div className="continue-box">
              <div className="thumb">▶</div>

              <div>
                <small>Lesson 8</small>
                <b>Setting Up Your First Arduino Board</b>
                <p>12 min left</p>
                <button className="resume-btn">▶ Resume</button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <b>{value}</b>
      <small>{label}</small>
    </div>
  );
}