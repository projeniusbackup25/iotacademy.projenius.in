import React from "react";
import "./VisionMission.css";
import { FiEye, FiTarget, FiZap, FiAward, FiGlobe, FiBookOpen, FiUsers } from "react-icons/fi";

const VisionMission = () => {
  return (
    <section className="vm-section">
      <div className="vm-header">
        <h1>Building Tomorrow's Innovators</h1>
        <p>
          Our commitment to excellence in IoT education is guided by a clear
          vision and driven by a focused mission.
        </p>
      </div>

      <div className="vm-cards">
        {/* Vision Card */}
        <div className="vm-card">
          <div className="vm-icon">
            <FiEye />
          </div>
          <h2>Our Vision</h2>
          <p className="vm-desc">
            To become the leading IoT education platform that transforms curious
            minds into industry-ready innovators, bridging the gap between
            academic learning and real-world technological advancement.
          </p>

          <ul className="vm-list">
            <li>
              <FiZap />
              <div>
                <h4>Inspire Innovation</h4>
                <span>Nurturing creative problem-solvers for tomorrow’s challenges</span>
              </div>
            </li>
            <li>
              <FiAward />
              <div>
                <h4>Industry Excellence</h4>
                <span>Setting the standard for IoT professional education</span>
              </div>
            </li>
            <li>
              <FiGlobe />
              <div>
                <h4>Global Impact</h4>
                <span>Creating a worldwide community of smart technology experts</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Mission Card */}
        <div className="vm-card">
          <div className="vm-icon">
            <FiTarget />
          </div>
          <h2>Our Mission</h2>
          <p className="vm-desc">
            To deliver world-class IoT education through immersive learning
            experiences that combine theoretical knowledge with practical
            skills, preparing students for successful careers in the rapidly
            evolving smart technology landscape.
          </p>

          <ul className="vm-list">
            <li>
              <FiBookOpen />
              <div>
                <h4>Practical IoT Learning</h4>
                <span>Hands-on projects with real sensors, microcontrollers, and cloud platforms</span>
              </div>
            </li>
            <li>
              <FiUsers />
              <div>
                <h4>Industry-Aligned Curriculum</h4>
                <span>Courses developed with leading tech companies and experts</span>
              </div>
            </li>
            <li>
              <FiZap />
              <div>
                <h4>Real-World Projects</h4>
                <span>Application-driven learning for career readiness</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;