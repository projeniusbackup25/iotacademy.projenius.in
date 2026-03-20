import React, { useEffect, useState } from "react";
import "./UserVideo.css";
import UserSidebar from "../component/UserSidebar"; // ✅ IMPORT

const API = "https://iotacademy-backend.onrender.com";

export default function UserVideo() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* 🎥 FETCH ALL VIDEOS */
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API}/api/videos/user`, {
          headers: {
            Authorization: token,
          },
        });

        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  /* 🔍 SEARCH FILTER */
  const filteredVideos = videos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      
      {/* ✅ COMMON SIDEBAR */}
      <UserSidebar />

      {/* MAIN */}
      <main className="vd-main" style={{ marginLeft: "240px", width: "100%" }}>
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
              level={video.subCategory?.toUpperCase()}
              status="Pending"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

/* 🎞 VIDEO CARD */
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