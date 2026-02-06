import React from "react";
import "./WorkshopKits.css";
import { FaStar, FaRocket, FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const WorkshopKit = () => {
  const navigate = useNavigate();

  return (
    <section className="workshop-section">
      <p className="workshop-tag">Choose Your Path</p>

      <h2 className="workshop-title">
        Workshop <span>Levels</span>
      </h2>

      <p className="workshop-subtitle">
        Select the perfect starting point for your IoT journey. Each level is
        crafted to match your current skills and help you progress confidently.
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
            Perfect for curious minds aged 8–14 who want to discover the magic
            of electronics!
          </p>

          <ul>
            <li>Learn basic electronics with fun experiments</li>
            <li>Build colorful LED projects</li>
            <li>Create simple sensor-based gadgets</li>
            <li>Understand how circuits work</li>
            <li>Earn your first IoT certificate!</li>
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

          <h3>Intermediate</h3>
          <p className="kit-role">College Innovators</p>

          <p className="kit-desc">
            Ideal for students and enthusiasts ready to build practical IoT
            solutions.
          </p>

          <ul>
            <li>Master Arduino & ESP32 programming</li>
            <li>Build smart home automation systems</li>
            <li>Create IoT dashboards with real-time data</li>
            <li>Learn cloud integration techniques</li>
            <li>Industry-relevant project portfolio</li>
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

          <h3>Advanced</h3>
          <p className="kit-role">Pro Engineers</p>

          <p className="kit-desc">
            For professionals seeking cutting-edge AI-IoT integration and
            industrial solutions.
          </p>

          <ul>
            <li>AI & Machine Learning on edge devices</li>
            <li>Industrial IoT protocols & security</li>
            <li>Custom PCB design & manufacturing</li>
            <li>Cloud-native IoT architecture</li>
            <li>Capstone project with mentorship</li>
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
