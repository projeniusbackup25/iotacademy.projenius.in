import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./CoursePage.css";
import "./AdminDashboard.css";

/* 🔗 BACKEND URL */
const API = "https://iotacademy-backend.onrender.com";

const coursesData = [
  {
    title: "Beginner IoT Fundamentals",
    description: "Learn the basics of IoT, sensors, and microcontrollers",
    level: "Beginner",
  },
  {
    title: "Intermediate Sensor Integration",
    description: "Deep dive into sensor data collection and processing",
    level: "Intermediate",
  },
  {
    title: "Advanced Cloud IoT Systems",
    description: "Build enterprise-grade IoT solutions with cloud integration",
    level: "Advanced",
  },
];

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [collapse, setCollapse] = useState(false);

  /* 🔥 VIDEO STATES */
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= FETCH VIDEOS ================= */
  const fetchVideos = async (level) => {
    try {
      const res = await fetch(
        `${API}/api/videos?subCategory=${level.toLowerCase()}`
      );

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Video fetch failed:", err);
      setVideos([]);
    }
  };

  /* ================= UPLOAD VIDEO ================= */
  const uploadVideo = async (level) => {
    if (!title || !file) {
      alert("Enter title & select file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subCategory", level.toLowerCase());
    formData.append("video", file);

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/videos/upload`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setTitle("");
      setFile(null);
      fetchVideos(level);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE VIDEO ================= */
  const deleteVideo = async (id, level) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      const res = await fetch(`${API}/api/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchVideos(level);
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  /* ================= FILTER COURSES ================= */
  const filteredCourses =
    activeTab === "All"
      ? coursesData
      : coursesData.filter((c) => c.level === activeTab);

  return (
    <div className="admin-layout">
      {/* ================= SIDEBAR ================= */}
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

      {/* ================= MAIN ================= */}
      <main className="admin-content">
        <div className="page-header">
          <div>
            <h2>Courses & Videos</h2>
            <p>Manage your learning content</p>
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
                </div>
              </div>

              <div className="course-actions">
                ✏️ 🗑️
                <span
                  className="dropdown-toggle"
                  onClick={() => {
                    setOpenIndex(openIndex === index ? null : index);
                    fetchVideos(course.level);
                  }}
                >
                  {openIndex === index ? "⌃" : "⌄"}
                </span>

                {openIndex === index && (
                  <div className="course-dropdown">
                    <div className="dropdown-header">
                      <span>Videos</span>
                    </div>

                    {/* Add Video */}
                    <div className="dropdown-item">
                      <input
                        type="text"
                        placeholder="Video title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <button
                        onClick={() => uploadVideo(course.level)}
                        disabled={loading}
                      >
                        {loading ? "Uploading..." : "Upload"}
                      </button>
                    </div>

                    {/* Video List */}
                    <div className="video-list">
                      {videos.length === 0 ? (
                        <div>No videos</div>
                      ) : (
                        videos.map((v) => (
                          <div className="video-row" key={v._id}>
                            <span>🎬 {v.title}</span>
                            <FaTrash
                              className="video-delete"
                              onClick={() =>
                                deleteVideo(v._id, course.level)
                              }
                            />
                          </div>
                        ))
                      )}
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