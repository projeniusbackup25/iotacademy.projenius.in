import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CoursePage.css";
import "./AdminDashboard.css";


const coursesData = [
  {
    title: "Beginner IoT Fundamentals",
    description: "Learn the basics of IoT, sensors, and microcontrollers",
    level: "Beginner",
    videos: 8,
  },
  {
    title: "Intermediate Sensor Integration",
    description: "Deep dive into sensor data collection and processing",
    level: "Intermediate",
    videos: 12,
  },
  {
    title: "Advanced Cloud IoT Systems",
    description: "Build enterprise-grade IoT solutions with cloud integration",
    level: "Advanced",
    videos: 15,
  },
];

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [collapse, setCollapse] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const filteredCourses =
    activeTab === "All"
      ? coursesData
      : coursesData.filter((c) => c.level === activeTab);

  return (
    <div className="admin-layout">
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
      <main className="admin-content">
        <div className="page-header">
          <div>
            <h2>Courses & Videos</h2>
            <p>Manage your learning content</p>
          </div>

          <div>
            <button className="primary-btn">+ Add Course</button>
            <button className="secondary-btn">Add Video</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {["All", "Beginner", "Intermediate", "Advanced"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "All" ? "All Courses" : tab}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <div className="course-list">
          {filteredCourses.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="course-left">
                <div className="course-icon">📘</div>
                <div>
                  <h4>
                    {course.title}
                    <span className={`badge ${course.level.toLowerCase()}`}>
                      {course.level}
                    </span>
                  </h4>
                  <p>{course.description}</p>
                  <small>🎥 {course.videos} videos</small>
                </div>
              </div>

              <div className="course-actions">
                ✏️ 🗑️
                <span
                  className="dropdown-toggle"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  {openIndex === index ? "⌃" : "⌄"}
                </span>

                {openIndex === index && (
                  <div className="course-dropdown">
                    <div className="dropdown-header">
                      <span>Videos</span>
                    </div>

                    <button className="dropdown-item">➕ Add Video</button>
                    <button className="dropdown-item danger">
                      🗑️ Delete Video
                    </button>

                    <div className="video-list">
                      {Array.from({ length: course.videos }).map((_, i) => (
                        <div className="video-row" key={i}>
                          <span>🎬 Video {i + 1}</span>
                          <span className="video-delete">🗑️</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
