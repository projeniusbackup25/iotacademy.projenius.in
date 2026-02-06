import React from "react";
import "./HowWeTeach.css";

export default function HowWeTeach() {
  return (
    <section className="teach-section">

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
            ></iframe>
            
            </div>
</div>


          <div className="hours-box">
            <b>100+ Hours</b>
            <span>Video Content</span>
          </div>

        </div>

        {/* CONTENT SIDE */}
        <div className="teach-content">

          <span className="section-tag">HOW WE TEACH</span>

          <h2>
            Our Teaching Method — <br />
            <span>Learn by Building</span>
          </h2>

          <p>
            We focus on hands-on learning with structured guidance and real
            projects so students gain strong technical and problem-solving
            skills.
          </p>

          <ul>
            <li>Step-by-step structured learning</li>
            <li>Hands-on IoT kits delivered to home</li>
            <li>Beginner to advanced roadmap</li>
            <li>Real-world industry projects</li>
            <li>Certificate after completion</li>
          </ul>

          <button
            className="teach-cta-btn"
            onClick={() => {
              document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Start Your Learning Journey →
          </button>

        </div>

      </div>

    </section>
  );
}
