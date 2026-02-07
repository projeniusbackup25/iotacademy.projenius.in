import React, { useEffect, useRef, useState } from "react";
import "./LearningPath.css";

export default function LearningPath() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { id: 1, title: "Beginner", sub: "Fundamentals", icon: "📘", color: "blue" },
    { id: 2, title: "Intermediate", sub: "Components", icon: "🧱", color: "purple" },
    { id: 3, title: "Advanced", sub: "IoT & Cloud", icon: "🚀", color: "yellow" },
    { id: 4, title: "Certificate", sub: "Recognition", icon: "🏅", color: "blue" },
    { id: 5, title: "Real Projects", sub: "Experience", icon: "🛠️", color: "purple" },
  ];

  /* ✅ SCROLLS TO WorkshopKit SECTION IN HomePage */
  const scrollToWorkshopKit = () => {
    document.getElementById("workshopkit")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} className="lp-section">
      <p className="lp-tag">YOUR PATH</p>

      <h2 className="lp-title">
        Your IoT <span>Learning Journey</span>
      </h2>

      <div className="lp-wrapper">
        <div className={`lp-line ${visible ? "line-animate" : ""}`} />

        {steps.map((step, i) => (
          <div
            key={step.id}
            className={`lp-step ${visible ? "step-animate" : ""}`}
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
            <div className={`lp-card ${step.color}`}>
              <span className="lp-number">{step.id}</span>
              <div className="lp-icon">{step.icon}</div>
            </div>

            <h4>{step.title}</h4>
            <p>{step.sub}</p>
          </div>
        ))}
      </div>

      <button className="lp-cta-btn" onClick={scrollToWorkshopKit}>
        Choose Your Learning Plan →
      </button>
    </section>
  );
}
