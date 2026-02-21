import React, { useEffect, useRef, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCog, FaTrash, FaPlus } from "react-icons/fa";

/* ✅ SAFE API URL (LOCAL + PRODUCTION) */
const API =
  process.env.REACT_APP_API_URL ||
  "https://iotacademy-backend.onrender.com";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const [collapse, setCollapse] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [loginTime, setLoginTime] = useState("");

  const [videos, setVideos] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const token = localStorage.getItem("token");

  /* 🔐 ADMIN AUTH CHECK */
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
      return;
    }

    setAdminName(localStorage.getItem("adminName") || "Admin");
    setAdminEmail(localStorage.getItem("adminEmail") || "");
    setLoginTime(localStorage.getItem("loginTime") || "Unknown");

    fetchVideos();
  }, [navigate]);

  /* 📥 FETCH VIDEOS (DEFENSIVE) */
  const fetchVideos = async () => {
    try {
      const res = await fetch(
        `${API}/api/videos?subCategory=html`
      );

      if (!res.ok) {
        console.error("Video fetch failed:", res.status);
        setVideos([]);
        return;
      }

      const text = await res.text();

      if (!text || text.startsWith("<")) {
        console.error("Invalid response (HTML instead of JSON)");
        setVideos([]);
        return;
      }

      const data = JSON.parse(text);
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading videos", err);
      setVideos([]);
    }
  };

  /* ➕ UPLOAD VIDEO */
  const uploadVideo = async () => {
    if (!title || !videoFile) {
      alert("Title and video are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subCategory", "html");
    formData.append("video", videoFile);

    try {
      const res = await fetch(`${API}/api/videos/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}` // ✅ FIXED
        },
        body: formData
      });

      if (!res.ok) throw new Error("Upload failed");

      setTitle("");
      setVideoFile(null);
      setShowUpload(false);
      fetchVideos();
    } catch (err) {
      alert("Upload failed");
    }
  };

  /* 🗑 DELETE VIDEO */
  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      const res = await fetch(`${API}/api/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}` // ✅ FIXED
        }
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchVideos();
    } catch (err) {
      alert("Delete failed");
    }
  };

  /* ❌ CLOSE SETTINGS DROPDOWN */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 🚪 LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dash-layout">
      {/* SIDEBAR */}
      <aside className={`dash-sidebar ${collapse ? "mini" : ""}`}>
        <div className="side-head">
          <div className="logo-box">⚙</div>
          {!collapse && <span>IoT Learn</span>}
          <button onClick={() => setCollapse(!collapse)}>❮</button>
        </div>

        <ul className="side-menu">
          <li
            className={location.pathname === "/coursepage" ? "active" : ""}
            onClick={() => navigate("/coursepage")}
          >
            Courses & Videos
          </li>
        </ul>

        <div className="side-logout" onClick={handleLogout}>
          Logout
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        <div className="dash-top">
          <h2>Courses & Videos</h2>

          <div className="settings-wrapper" ref={menuRef}>
            <FaCog onClick={() => setShowMenu(!showMenu)} />
            {showMenu && (
              <div className="settings-dropdown">
                <p><b>{adminName}</b></p>
                <p>{adminEmail}</p>
                <small>{loginTime}</small>
              </div>
            )}
          </div>
        </div>

        {/* VIDEO PANEL */}
        <div className="panel-box">
          <div className="video-header">
            <h4>HTML Videos</h4>
            <button onClick={() => setShowUpload(!showUpload)}>
              <FaPlus /> Add Video
            </button>
          </div>

          {showUpload && (
            <div className="upload-box">
              <input
                placeholder="Video title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
              <button onClick={uploadVideo}>Upload</button>
            </div>
          )}

          {videos.length === 0 && (
            <p style={{ marginTop: "10px" }}>No videos uploaded</p>
          )}

          {videos.map((v) => (
            <div className="video-row" key={v._id}>
              <span>{v.title}</span>
              <FaTrash
                className="delete-icon"
                onClick={() => deleteVideo(v._id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}