import React, { useEffect, useState } from "react";
import "./UserProject.css";

const API = "https://iotacademy-backend.onrender.com";

export default function UserProject() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {

      const res = await fetch(`${API}/api/projects/my-projects`, {
        headers: {
          Authorization: token
        }
      });

      const data = await res.json();
      setProjects(data);

    } catch (err) {
      console.error("Fetch projects error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function submitProject(title, level, file) {

    const formData = new FormData();
    formData.append("video", file);
    formData.append("projectTitle", title);
    formData.append("level", level);

    try {

      setUploading(true);

      const res = await fetch(`${API}/api/projects/submit`, {
        method: "POST",
        headers: {
          Authorization: token
        },
        body: formData
      });

      const data = await res.json();

      alert(data.message);

      fetchProjects();

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }

  }

  function handleUpload(title, level) {

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) submitProject(title, level, file);
    };

    input.click();

  }

  function getStatus(title) {

    const project = projects.find(p => p.projectTitle === title);

    if (!project) return "Not Started";

    return project.status === "submitted"
      ? "Submitted"
      : project.status;

  }

  const completed = projects.filter(p => p.status === "approved").length;
  const submitted = projects.filter(p => p.status === "submitted").length;

  return (
    <div className="up-layout">

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
          <li onClick={() => window.location.href="/userdashboard"}>📘 My Course</li>
          <li onClick={() => window.location.href="/uservideo"}>🎥 Videos</li>
          <li className="active">🛠 Projects</li>
          <li onClick={() => window.location.href="/userdownload"}>⬇ Downloads</li>
          <li onClick={() => window.location.href="/certificate"}>🎓 Certificate</li>
          <li>❓ Support</li>
        </ul>

        <button className="upgrade-btn">✨ Upgrade Bundle</button>

      </aside>

      {/* MAIN */}
      <main className="up-main">

        <h2>Projects - Beginner</h2>

        <p className="up-sub">
          Apply your knowledge with hands-on projects.
        </p>

        {/* STATS */}
        <div className="up-stats">

          <StatCard value={completed} label="Completed" color="green" />
          <StatCard value={submitted} label="Submitted" color="blue" />
          <StatCard value={3 - projects.length} label="Remaining" color="gray" />

        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : (

        <div className="up-grid">

          <ProjectCard
            title="Blink LED"
            level="beginner"
            desc="Control an LED using microcontroller."
            status={getStatus("Blink LED")}
            onSubmit={() => handleUpload("Blink LED","beginner")}
          />

          <ProjectCard
            title="Temperature Monitor"
            level="beginner"
            desc="Build temperature monitoring system."
            status={getStatus("Temperature Monitor")}
            onSubmit={() => handleUpload("Temperature Monitor","beginner")}
          />

          <ProjectCard
            title="Motion Detector"
            level="beginner"
            desc="Create PIR motion detection system."
            status={getStatus("Motion Detector")}
            onSubmit={() => handleUpload("Motion Detector","beginner")}
          />

          <LockedProject title="Smart Light System" level="Intermediate" />
          <LockedProject title="Weather Station" level="Intermediate" />
          <LockedProject title="Home Automation Hub" level="Advanced" />

        </div>

        )}

      </main>

    </div>
  );
}

/* COMPONENTS */

function StatCard({ value, label, color }) {
  return (
    <div className="up-stat-card">
      <h3 className={color}>{value}</h3>
      <p>{label}</p>
    </div>
  );
}

function ProjectCard({ title, level, desc, status, onSubmit }) {

  return (
    <div className="up-card">

      <h4>🌱 {title}</h4>

      <span className="level">{level}</span>

      <p>{desc}</p>

      <div className="up-footer">

        <span className={`status ${status.replace(" ","").toLowerCase()}`}>
          {status}
        </span>

        {status === "Submitted" ? (
          <button disabled>Submitted</button>
        ) : (
          <button onClick={onSubmit}>Submit Project →</button>
        )}

      </div>

    </div>
  );
}

function LockedProject({ title, level }) {

  return (
    <div className="up-card locked">

      <h4>🔒 {title}</h4>

      <span className="level">{level}</span>

      <p>Complete previous level to unlock this project.</p>

      <span className="locked-text">Locked</span>

    </div>
  );
}