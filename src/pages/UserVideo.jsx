import React, { useEffect, useState } from "react";
import "./UserVideo.css";

const API_BASE = "https://iotacademy-backend.onrender.com";

export default function UserVideo() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* 🎥 Fetch videos */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/videos`);
        const data = await res.json();

        if (res.ok) {
          setVideos(data);
        } else {
          console.error("Video fetch failed");
        }
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  /* 🔍 Filter videos */
  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="vd-layout">
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
          <li onClick={() => (window.location.href = "/userdashboard")}>
            📘 My Course
          </li>
          <li className="active">🎥 Videos</li>
          <li onClick={() => (window.location.href = "/userproject")}>
            🛠 Projects
          </li>
          <li onClick={() => (window.location.href = "/userdownload")}>
            ⬇ Downloads
          </li>
          <li onClick={() => (window.location.href = "/certificate")}>
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

        {/* SEARCH */}
        <div className="vd-search">
          <input
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* VIDEO GRID */}
        <div className="vd-grid">
          {loading && <p>Loading videos...</p>}

          {!loading && filteredVideos.length === 0 && (
            <p>No videos available</p>
          )}

          {filteredVideos.map((video) => (
            <VideoCard
              key={video._id}
              title={video.title}
              videoUrl={video.videoUrl}
              level="Beginner"
              status="Pending"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

/* 🎞 Video Card */
function VideoCard({ title, videoUrl, level, status }) {
  return (
    <div className="vd-card">
      <video className="vd-thumb" controls>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support video.
      </video>

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