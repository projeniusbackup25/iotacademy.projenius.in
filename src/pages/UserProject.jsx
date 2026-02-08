import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProject.css";

export default function UserProject() {
  const navigate = useNavigate();

  return (
    <div className="up-layout">

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
      <main className="up-main">

        <h2>Projects - Beginner</h2>
        <p className="up-sub">
          Apply your knowledge with hands-on projects. Complete projects to earn badges.
        </p>

        {/* STATS */}
        <div className="up-stats">
          <StatCard value="1" label="Completed" color="green" />
          <StatCard value="1" label="In Progress" color="blue" />
          <StatCard value="4" label="Remaining" color="gray" />
        </div>

        {/* PROJECT GRID */}
        <div className="up-grid">

          <ProjectCard
            title="Blink an LED"
            level="Beginner"
            desc="Your first IoT project! Learn to control an LED using a microcontroller."
            status="Submitted"
            action="View Submission"
            highlight="green"
          />

          <ProjectCard
            title="Temperature Monitor"
            level="Beginner"
            desc="Build a temperature monitoring system using DHT11 sensor."
            status="In Progress"
            action="Continue"
            highlight="blue"
          />

          <ProjectCard
            title="Motion Detector"
            level="Beginner"
            desc="Create a PIR-based motion detection system with buzzer alerts."
            status="Not Started"
            action="Start Project"
          />

          <LockedProject title="Smart Light System" level="Intermediate" />
          <LockedProject title="Weather Station" level="Intermediate" />
          <LockedProject title="Home Automation Hub" level="Pro" />

        </div>

      </main>
    </div>
  );
}

/* COMPONENTS */

function StatCard({ value, label, color }) {
  return (
    <div className="up-stat-card">
      <h3 className={color}>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

function ProjectCard({ title, level, desc, status, action, highlight }) {
  return (
    <div className={`up-card ${highlight}`}>
      <h4>🌱 {title}</h4>
      <span className="level">{level}</span>
      <p>{desc}</p>

      <div className="up-footer">
        <span className={`status ${status.replace(" ", "").toLowerCase()}`}>
          {status}
        </span>
        <button>{action} →</button>
      </div>
    </div>
  );
}

function LockedProject({ title, level }) {
  return (
    <div className="up-card locked">
      <h4>🔒 {title}</h4>
      <span className="level">{level}</span>
      <p>Complete previous level to unlock this project.</p>
      <span className="locked-text">Locked</span>
    </div>
  );
}
