import React, { useEffect, useRef } from "react";
import "./ProductsSection.css";

export default function ProductsSection() {

  const sectionRef = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current.classList.add("show");
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(sectionRef.current);
  }, []);

  return (
    <section className="products-section" ref={sectionRef}>

      <p className="section-tag">OUR SERVICES</p>
      <h2 className="section-title">
       IoT Learning Programs <span>& Project Solutions</span>
      </h2>
      {/* <p className="section-sub">
        Explore our hands-on IoT learning programs, workshops, and project development services designed to help students and innovators build real-world smart systems using Arduino, ESP32, sensors, and embedded technologies.
      </p> */}

      <div className="product-grid">

        {/* CARD 1 */}
        <div className="product-card blue">
          <div className="card-content">
            <div className="card-top">
              <div className="icon-box blue">📘</div>
              <span className="badge blue">Learning Programs</span>
            </div>

            <h3>IoT Workshops & Hands-on Training</h3>

            <ul>
              <li>Suitable for beginners to advanced learners with expert guidance.</li>
              <li>Beginner to advanced IoT workshops</li>
              <li>Arduino & ESP32 programming</li>
              <li>Sensor-based IoT projects</li>
              <li>Workshops for schools and colleges</li>
              <li>Certificate system</li>
            </ul>
          </div>

          <button className="outline-btn blue">Explore IoT Workshops →</button>
        </div>

        {/* CARD 2 */}
        <div className="product-card purple">
          <div className="card-content">
            <div className="card-top">
              <div className="icon-box purple">💡</div>
              <span className="badge purple">Structured Learning</span>
            </div>

            <h3>Online & Offline IoT Classes</h3>

            <ul>
              <li>Structured IoT learning programs available both online and offline with step-by-step guidance and project-based learning.</li>
              <li>Online IoT learning sessions</li>
              <li>In-person classroom training</li>
              <li>Pre-recorded IoT video lessons after registration</li>
              <li>Structured IoT curriculum</li>
              <li>Hands-on hardware learning</li>
            </ul>
          </div>

          <button className="outline-btn purple">View IoT Classes →</button>
        </div>

        {/* CARD 3 */}
        <div className="product-card gold">
          <div className="card-content">
            <div className="card-top">
              <div className="icon-box gold">💍</div>
              <span className="badge gold">Project Solutions</span>
            </div>

            <h3>IoT Project Development</h3>

            <ul>
              <li>We help students and institutions build real-world IoT projects using Arduino, ESP32, and embedded systems.</li>
              <li>Academic IoT projects</li>
              <li>Smart automation systems</li>
              <li>Final year project support</li>
              <li>PCB design & prototyping</li>
              <li>Custom IoT solutions</li>
            </ul>
          </div>

          <button className="outline-btn gold">Start Your Project →</button>
        </div>

      </div>

    </section>
  );
}