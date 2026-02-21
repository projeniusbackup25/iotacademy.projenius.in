import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./CoursePage.css";
import "./AdminDashboard.css";

const API = "https://iotacademy-backend.onrender.com";

/* 🔗 COURSE → SUBCATEGORY MAP */
const coursesData = [
  {
    title: "Beginner IoT Fundamentals",
    description: "Learn the basics of IoT, sensors, and microcontrollers",
    level: "Beginner",
    subCategory: "html",
  },
  {
    title: "Intermediate Sensor Integration",
    description: "Deep dive into sensor data collection and processing",
    level: "Intermediate",
    subCategory: "css",
  },
  {
    title: "Advanced Cloud IoT Systems",
    description: "Build enterprise-grade IoT solutions with cloud integration",
    level: "Advanced",
    subCategory: "js",
  },
];

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);
  const [collapse, setCollapse] = useState(false);

  /* 🔥 VIDEO STATE PER COURSE */
  const [videosByCategory, setVideosByCategory] = useState({});
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  /* ================= FETCH VIDEOS ================= */
  const fetchVideos = async (subCategory) => {
    try {
      const res = await fetch(
        `${API}/api/videos?subCategory=${subCategory}`
      );
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setVideosByCategory((prev) => ({
        ...prev,
        [subCategory]: data,
      }));
    } catch (err) {
      console.error("Fetch failed:", err);
      setVideosByCategory((prev) => ({
        ...prev,
        [subCategory]: [],
      }));
    }
  };

  /* ================= UPLOAD VIDEO ================= */
  const uploadVideo = async (subCategory) => {
    if (!title || !file) {
      alert("Enter title & choose video");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subCategory", subCategory);
    formData.append("video", file);

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/videos/upload`, {
        method: "POST",
        headers: { Authorization: token },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setTitle("");
      setFile(null);
      fetchVideos(subCategory);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE VIDEO ================= */
  const deleteVideo = async (id, subCategory) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      const res = await fetch(`${API}/api/videos/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchVideos(subCategory);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filteredCourses =
    activeTab === "All"
      ? coursesData
      : coursesData.filter((c) => c.level === activeTab);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className={`dash-sidebar ${collapse ? "mini" : ""}`}>
        <div className="side-head">
          <div className="logo-box">⚙</div>
          {!collapse && <span>IoT Learn</span>}
          <button onClick={() => setCollapse(!collapse)}>❮</button>
        </div>

        <ul className="side-menu">
          <li onClick={() => navigate("/admindashboard")}>Dashboard</li>
          <li onClick={() => navigate("/orders")}>Order History</li>
          <li className="active">Courses & Videos</li>
          <li onClick={() => navigate("/reportspage")}>Reports</li>
        </ul>

        <div className="side-logout" onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}>
          Logout
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-content">
        <h2>Courses & Videos</h2>

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

              <span
                className="dropdown-toggle"
                onClick={() => {
                  setOpenIndex(openIndex === index ? null : index);
                  fetchVideos(course.subCategory);
                }}
              >
                {openIndex === index ? "⌃" : "⌄"}
              </span>

              {openIndex === index && (
                <div className="course-dropdown">
                  <input
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
                    disabled={loading}
                    onClick={() => uploadVideo(course.subCategory)}
                  >
                    {loading ? "Uploading..." : "Upload"}
                  </button>

                  {(videosByCategory[course.subCategory] || []).length === 0 ? (
                    <p>No videos</p>
                  ) : (
                    videosByCategory[course.subCategory].map((v) => (
                      <div key={v._id} className="video-row">
                        🎬 {v.title}
                        <FaTrash
                          onClick={() =>
                            deleteVideo(v._id, course.subCategory)
                          }
                        />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}