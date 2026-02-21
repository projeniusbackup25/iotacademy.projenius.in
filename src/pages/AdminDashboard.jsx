import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

/* 🔗 BACKEND URL (FIXED) */
const API = "https://iotacademy-backend.onrender.com";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const token = localStorage.getItem("token");

  /* 🔐 ADMIN GUARD */
  useEffect(() => {
    if (!token || localStorage.getItem("role") !== "admin") {
      navigate("/login");
    }
  }, [navigate, token]);

  /* 📥 FETCH VIDEOS */
  const fetchVideos = async () => {
    try {
      const res = await fetch(`${API}/api/videos?subCategory=html`);

      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error("Video fetch failed:", err);
      setVideos([]);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /* ⬆ UPLOAD VIDEO */
  const uploadVideo = async () => {
    if (!title || !file) {
      alert("Enter title & select file");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subCategory", "html");
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
      fetchVideos();
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* 🗑 DELETE VIDEO */
  const deleteVideo = async (id) => {
    if (!window.confirm("Delete this video?")) return;

    try {
      const res = await fetch(`${API}/api/videos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchVideos();
    } catch (err) {
      alert("Delete failed");
      console.error(err);
    }
  };

  /* 🚪 LOGOUT */
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  /* 🔁 Navigation Helper */
  const goTo = (path) => {
    navigate(path);
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
            className={location.pathname === "/admindashboard" ? "active" : ""}
            onClick={() => goTo("/admindashboard")}
          >
            Dashboard
          </li>

          <li
            className={location.pathname === "/orders" ? "active" : ""}
            onClick={() => goTo("/orders")}
          >
            Order History
          </li>

          <li
            className={location.pathname === "/coursepage" ? "active" : ""}
            onClick={() => goTo("/coursepage")}
          >
            Courses & Videos
          </li>

          <li
            className={location.pathname === "/reportspage" ? "active" : ""}
            onClick={() => goTo("/reportspage")}
          >
            Reports
          </li>
        </ul>

        <div className="side-logout" onClick={logout}>
          Logout
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">
        <h2>Courses & Videos</h2>

        {/* UPLOAD */}
        <div className="video-box">
          <h3>HTML Videos</h3>

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

          <button onClick={uploadVideo} disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>

          {/* LIST */}
          {videos.length === 0 ? (
            <p>No videos uploaded</p>
          ) : (
            <ul className="video-list">
              {videos.map((v) => (
                <li key={v._id}>
                  <span>{v.title}</span>
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deleteVideo(v._id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}