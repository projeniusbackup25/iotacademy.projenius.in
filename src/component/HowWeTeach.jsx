import React from "react";
import "./HowWeTeach.css";

export default function HowWeTeach() {
  return (
    <section className="teach-section">
      <span className="section-tag">HOW WE TEACH</span>

      <div className="teach-container">

        {/* VIDEO SIDE */}
        <div className="video-border">
          <div className="video-box">

            <span className="preview-tag">Course Preview</span>

            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/1adzVmNh078?si=gfI4n-ehpsL8Jwda"
                title="Course Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* ✅ NOW EXACTLY BELOW VIDEO */}
            <div className="hours-box">
              <b>100+ Hours </b>
              <span>  Video Content</span>
            </div>

          </div>
        </div>

        {/* CONTENT SIDE */}
        <div className="teach-content">

          <h2>
            Our IoT Teaching Method <br />
            <span>Learn by Building Real IoT Projects</span>
          </h2>

          {/* <p>
           We focus on hands-on IoT learning with structured guidance and real-world projects so students develop strong technical and problem-solving skills in IoT development.
          </p> */}

          <ul>
            <li>Step-by-step structured IoT learning</li>
            <li>Hands-on IoT kits delivered to home</li>
            <li>Beginner to advanced IoT learning roadmap</li>
            <li>Real-world IoT industry projects</li>
            <li>IoT course completion certificate</li>
          </ul>

          <button
            className="teach-cta-btn"
            onClick={() => {
              document
                .getElementById("product")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Your IoT Learning Journey →
          </button>

        </div>

      </div>
    </section>
  );
}
