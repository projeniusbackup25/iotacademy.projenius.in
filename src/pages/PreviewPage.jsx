import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PreviewPage.css";
import { FaPlay, FaLock, FaEye } from "react-icons/fa";

const data = {
  beginner: {
    title: "Beginner Level Preview",
    subtitle: "Get a sneak peek at what you'll learn! Try the free lessons before unlocking the full workshop.",
    lesson: "Introduction to IoT",
    time: "10 min",
    about:
      "Learn the fundamentals of IoT and get your development environment set up. This lesson covers everything you need to start building smart projects!",
    lessons: [
      { name: "Introduction to IoT", time: "10 min", free: true },
      { name: "Setting Up Your Kit", time: "15 min", free: true },
      { name: "Your First LED Project", time: "20 min" },
      { name: "Working with Sensors", time: "25 min" },
      { name: "Building Smart Controls", time: "30 min" },
    ],
    gradient: "beginner-grad"
  },

  intermediate: {
    title: "Intermediate Level Preview",
    subtitle: "Explore practical IoT solutions and real-world applications.",
    lesson: "ESP32 & Arduino Basics",
    time: "15 min",
    about:
      "Dive deeper into embedded programming and start building real-world IoT automation projects.",
    lessons: [
      { name: "ESP32 & Arduino Basics", time: "15 min", free: true },
      { name: "WiFi Communication", time: "20 min", free: true },
      { name: "IoT Dashboards", time: "30 min" },
      { name: "Cloud Integration", time: "35 min" },
      { name: "Automation Systems", time: "40 min" },
    ],
    gradient: "intermediate-grad"
  },

  advanced: {
    title: "Advanced Level Preview",
    subtitle: "Experience industry-grade IoT & AI integration solutions.",
    lesson: "Edge AI Fundamentals",
    time: "20 min",
    about:
      "Build cutting-edge industrial IoT and AI powered systems using professional workflows.",
    lessons: [
      { name: "Edge AI Fundamentals", time: "20 min", free: true },
      { name: "Industrial IoT Protocols", time: "30 min", free: true },
      { name: "PCB Design", time: "40 min" },
      { name: "Cloud Native IoT", time: "45 min" },
      { name: "Capstone Project", time: "60 min" },
    ],
    gradient: "advanced-grad"
  },
};

const PreviewPage = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const content = data[level];

  return (
    <section className={`preview-wrapper ${content.gradient}`}>
      <div className="preview-header">
        <h2>{content.title}</h2>
        <p>{content.subtitle}</p>
      </div>

      <div className="preview-layout">
        <div className="video-box">
          <div className="video-content">
            <h3>{content.lesson}</h3>
            <span>{content.time}</span>

            <button className="play-btn">
              <FaPlay />
            </button>
          </div>
        </div>

        <div className="lesson-list">
          <h4><FaEye /> Lesson List</h4>

          {content.lessons.map((item, index) => (
            <div key={index} className={`lesson-item ${item.free ? "active" : ""}`}>
              <div className="lesson-left">
                {item.free ? <FaEye /> : <FaLock />}
              </div>

              <div>
                <p>{item.name}</p>
                <span>{item.time}</span>
              </div>

              {item.free && <small>FREE</small>}
            </div>
          ))}

          <button
  className="unlock-btn"
  onClick={() => navigate(`/payment/${level}`)}
>
  ✨ Unlock Full Workshop
</button>

        </div>
      </div>

      <div className="about-box">
        <h4>📘 About This Lesson</h4>
        <p>{content.about}</p>
      </div>
    </section>
  );
};

export default PreviewPage;
