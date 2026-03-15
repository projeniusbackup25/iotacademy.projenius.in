import React from "react";
import "./WorkshopKits.css";
import { FaStar, FaRocket, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WorkshopKit = () => {
  const navigate = useNavigate();

  return (
    <section className="workshop-section">
      <p className="workshop-tag">Choose Your Learning Path</p>

      <h2 className="workshop-title">
        IoT Workshop <span>Levels</span>
      </h2>

      <p className="workshop-subtitle">
       Select the perfect starting point for your IoT learning journey. Each workshop level is designed to match your current skills and help you progress confidently in IoT development and real-world projects.
      </p>

      <div className="workshop-grid">

        {/* Beginner – PURPLE */}
        <div className="kit-card advanced">
          <div className="kit-icon purple">
            <FaStar />
          </div>

          <h3>Beginner</h3>
          <p className="kit-role">Young Explorers</p>

          <p className="kit-desc">
           Perfect for curious young learners aged 8–14 who want to explore the basics of electronics and IoT technology.
          </p>

          <ul>
            <li>Learn basic electronics with fun experiments</li>
            <li>Build LED projects using Arduino</li>
            <li>Create simple sensor-based gadgets</li>
            <li>Understand how electronic circuits work</li>
            <li>Earn your first IoT learning certificate!</li>
          </ul>

          <button
            className="btn-gradient purple"
            onClick={() => navigate("/preview/beginner")}
          >
            Start Learning →
          </button>
        </div>

        {/* Intermediate – YELLOW */}
        <div className="kit-card beginner">
          <div className="kit-icon yellow">
            <FaRocket />
          </div>

          <h3>Intermediate IoT Workshop</h3>
          <p className="kit-role">College Innovators</p>

          <p className="kit-desc">
            Ideal for students and enthusiasts ready to build practical IoT solutions using Arduino and ESP32.
          </p>

          <ul>
            <li>Master Arduino & ESP32 IoT programming</li>
            <li>Build smart home automation systems</li>
            <li>Create IoT dashboards with real-time sensor data</li>
            <li>Learn cloud integration for IoT systems</li>
            <li>Build an industry-ready IoT project portfolio</li>
          </ul>

          <button
            className="btn-gradient yellow"
            onClick={() => navigate("/preview/intermediate")}
          >
            Start Learning →
          </button>
        </div>

        {/* Advanced – BLUE */}
        <div className="kit-card intermediate">
          <div className="kit-icon blue">
            <FaCrown />
          </div>

          <h3>Advanced IoT Workshop</h3>
          <p className="kit-role">Pro Engineers</p>

          <p className="kit-desc">
           For professionals seeking advanced AI-IoT integration and industrial IoT solutions.
          </p>

          <ul>
            <li>AI and Machine Learning for IoT edge devices</li>
            <li>Industrial IoT protocols and security</li>
            <li>Custom PCB design and IoT hardware development</li>
            <li>Cloud-based IoT system architecture</li>
            <li>Capstone IoT project with mentorship</li>
          </ul>

          <button
            className="btn-gradient blue"
            onClick={() => navigate("/preview/advanced")}
          >
            Start Learning →
          </button>
        </div>

      </div>
    </section>
  );
};

export default WorkshopKit;
