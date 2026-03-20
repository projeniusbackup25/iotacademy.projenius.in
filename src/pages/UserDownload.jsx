import React, { useState } from "react";
import "./UserDownload.css";
import UserSidebar from "../component/UserSidebar"; // ✅ IMPORT

const files = [
  {
    title: "IoT Fundamentals - Complete Notes",
    size: "2.4 MB",
    type: "Notes",
    icon: "📄",
  },
  {
    title: "Arduino Starter Code Pack",
    size: "156 KB",
    type: "Code",
    icon: "💻",
  },
  {
    title: "Sensor Datasheets Collection",
    size: "8.7 MB",
    type: "Datasheets",
    icon: "📦",
  },
  {
    title: "ESP32 Pinout Reference",
    size: "1.1 MB",
    type: "Datasheets",
    icon: "📄",
  },
  {
    title: "MQTT Client Examples",
    size: "89 KB",
    type: "Code",
    icon: "💻",
  },
  {
    title: "IoT Development Toolkit",
    size: "4.5 MB",
    type: "Tools",
    icon: "🧰",
  },
];

export default function UserDownloads() {
  const [filter, setFilter] = useState("All");

  const filteredFiles =
    filter === "All"
      ? files
      : files.filter((item) => item.type === filter);

  return (
    <div style={{ display: "flex" }}>

      {/* ✅ COMMON SIDEBAR */}
      <UserSidebar />

      {/* MAIN */}
      <main className="ud-main" style={{ marginLeft: "240px", width: "100%" }}>

        <h2>Downloads</h2>
        <p className="ud-sub">
          Access course materials, code samples, and documentation.
        </p>

        {/* FILTERS */}
        <div className="ud-filters">
          {["All", "Notes", "Code", "Datasheets", "Tools"].map((btn) => (
            <button
              key={btn}
              className={filter === btn ? "active" : ""}
              onClick={() => setFilter(btn)}
            >
              {btn}
            </button>
          ))}
        </div>

        {/* LIST */}
        <div className="ud-list">
          {filteredFiles.map((file, index) => (
            <div className="ud-card" key={index}>
              <div className="ud-left">
                <div className="ud-icon">{file.icon}</div>
                <div>
                  <h4>{file.title}</h4>
                  <p>
                    {file.size} • {file.type}
                  </p>
                </div>
              </div>

              <button className="download-btn">⬇ Download</button>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}