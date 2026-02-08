import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserVideo.css";

export default function UserVideo() {
  const navigate = useNavigate();

  return (
    <div className="vd-layout">

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


      {/* MAIN */}
      <main className="vd-main">

        <h2>Video Lessons</h2>
        <p className="vd-sub">
          Watch and learn from our comprehensive video library.
        </p>

        {/* SEARCH BAR */}
        <div className="vd-search">
          <input placeholder="Search videos..." />
        </div>

        {/* VIDEO GRID */}
        <div className="vd-grid">
          <VideoCard
            title="Introduction to IoT: What is the Internet of Things?"
            duration="12:45"
            status="Completed"
            level="Beginner"
          />
          <VideoCard
            title="Understanding Microcontrollers: Arduino vs ESP32"
            duration="18:30"
            status="Completed"
            level="Beginner"
          />
          <VideoCard
            title="Sensor Basics: Temperature, Humidity, and Motion"
            duration="15:20"
            status="Completed"
            level="Beginner"
          />
          <VideoCard
            title="Setting Up Your First IoT Project"
            duration="22:10"
            status="Pending"
            level="Beginner"
          />
        </div>

      </main>
    </div>
  );
}

function VideoCard({ title, duration, status, level }) {
  return (
    <div className="vd-card">
      <div className="vd-thumb">
        ▶
        <span className="vd-time">{duration}</span>
      </div>

      <h4>{title}</h4>

      <div className="vd-tags">
        <span className="level">{level}</span>
        <span className={status === "Completed" ? "done" : "pending"}>
          {status}
        </span>
      </div>
    </div>
  );
}
 