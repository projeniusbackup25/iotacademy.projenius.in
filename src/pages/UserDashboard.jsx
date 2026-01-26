import React from "react";
import "./UserDashboard.css";

export default function UserDashboard() {
  return (
    <div className="ud-layout">

      {/* SIDEBAR */}
      <aside className="ud-sidebar">
        <div className="ud-logo">
          <div className="logo-box">⚙</div>
          <div>
            <b>IoT Learn</b>
            <small>Student Portal</small>
          </div>
        </div>

        <ul className="ud-menu">
          <li className="active">📘 My Course</li>
          <li>🎥 Videos</li>
          <li>🛠 Projects</li>
          <li>⬇ Downloads</li>
          <li>🎓 Certificate</li>
          <li>❓ Support</li>
        </ul>

        <button className="upgrade-btn">✨ Upgrade Bundle</button>
      </aside>

      {/* MAIN */}
      <main className="ud-main">

        {/* TOP BAR */}
        <div className="ud-top">
          <div>
            <span className="welcome">Welcome back,</span>
            <h3>John! 👋</h3>
          </div>

          <div className="ud-actions">
            <span className="notify">🔔</span>
            <div className="avatar"></div>
            <button className="logout">Logout</button>
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

        {/* STATS + CONTINUE */}
        <div className="ud-grid">

          {/* PROGRESS */}
          <div className="stat-box">
            <h4>Your Progress</h4>

            <div className="circle">35%</div>

            <div className="stats">
              <Stat label="Lessons Done" value="12/34" />
              <Stat label="This Week" value="4.5h" />
              <Stat label="Day Streak" value="7" />
            </div>
          </div>

          {/* CONTINUE */}
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
