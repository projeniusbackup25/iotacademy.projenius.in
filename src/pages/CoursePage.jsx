import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../component/Sidebar";
import "./CoursePage.css";
import manageIcon from "../images/video-manage.png";

const API = "https://iotacademy-backend.onrender.com";

/* COURSE DATA */
const coursesData = [
  {
    title: "Beginner IoT Fundamentals",
    description: "Learn the basics of IoT, sensors, and microcontrollers",
    level: "Beginner",
    subCategory: "beginner",
  },
  {
    title: "Intermediate Sensor Integration",
    description: "Deep dive into sensor data collection and processing",
    level: "Intermediate",
    subCategory: "intermediate",
  },
  {
    title: "Advanced Cloud IoT Systems",
    description: "Build enterprise-grade IoT solutions with cloud integration",
    level: "Advanced",
    subCategory: "advanced",
  },
];

export default function CoursePage() {

  const [activeTab, setActiveTab] = useState("All");
  const [openModal, setOpenModal] = useState(null);
  const [videosByCategory, setVideosByCategory] = useState({});
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* FETCH VIDEOS */
  const fetchVideos = async (subCategory) => {
    try {
      const res = await fetch(`${API}/api/videos?subCategory=${subCategory}`);
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();

      setVideosByCategory((prev) => ({
        ...prev,
        [subCategory]: data,
      }));

    } catch (err) {
      console.error(err);
    }
  };

  /* UPLOAD VIDEO */
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

    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* DELETE VIDEO */
  const deleteVideo = async (id, subCategory) => {

    if (!window.confirm("Delete this video?")) return;

    try {

      const res = await fetch(`${API}/api/videos/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchVideos(subCategory);

    } catch {
      alert("Delete failed");
    }
  };

  const filteredCourses =
    activeTab === "All"
      ? coursesData
      : coursesData.filter((c) => c.level === activeTab);

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        <h2>Courses & Videos</h2>

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

        {/* Course List */}

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

              <img
  src={manageIcon}
  alt="Manage Videos"
  className="manage-icon"
  onClick={() => {
    setOpenModal(course);
    fetchVideos(course.subCategory);
  }}
/>

            </div>

          ))}

        </div>

      </main>

      {/* MODAL */}

      {openModal && (

        <div className="video-modal-overlay">

          <div className="video-modal">

            <div className="modal-header">

              <h3>{openModal.title}</h3>

              <span
                className="close-btn"
                onClick={() => setOpenModal(null)}
              >
                ✕
              </span>

            </div>

            {/* Upload */}

            <div className="modal-upload">

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
                onClick={() => uploadVideo(openModal.subCategory)}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>

            </div>

            {/* Video List */}

            <div className="modal-videos">

              {(videosByCategory[openModal.subCategory] || []).length === 0 ? (

                <p>No videos</p>

              ) : (

                videosByCategory[openModal.subCategory].map((v) => (

                  <div key={v._id} className="video-row">

                    <span>🎬 {v.title}</span>

                    <FaTrash
                      className="video-delete"
                      onClick={() =>
                        deleteVideo(v._id, openModal.subCategory)
                      }
                    />

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );
}