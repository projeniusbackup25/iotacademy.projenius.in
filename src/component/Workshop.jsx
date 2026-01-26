import React, { useState, useEffect, useRef } from "react";
import "./Workshop.css";

import img1 from "../images/projenius_logo.png";
import img2 from "../images/projenius_logo.png";
import img3 from "../images/projenius_logo.png";
import img4 from "../images/projenius_logo.png";

const onlineWorkshops = [
  {
    level: "BEGINNER",
    title: "IoT Fundamentals: Sensors to Cloud",
    desc: "Learn IoT architecture, sensors, and cloud connectivity.",
    date: "Jan 15, 2025",
    time: "10:00 AM - 12:00 PM",
    img: img1,
  },
  {
    level: "ADVANCED",
    title: "Advanced Circuit Design & PCB",
    desc: "Master PCB layout and circuit design techniques.",
    date: "Jan 22, 2025",
    time: "9:00 AM - 1:00 PM",
    img: img2,
  },
];

const offlineWorkshops = [
  {
    level: "HARDWARE",
    title: "Electronics Hands-On Bootcamp",
    desc: "Practical hardware sessions with real components.",
    date: "Feb 5, 2025",
    time: "10:00 AM - 4:00 PM",
    img: img3,
  },
  {
    level: "IoT LAB",
    title: "Smart Devices Building Camp",
    desc: "Build smart IoT systems with kits and trainers.",
    date: "Feb 12, 2025",
    time: "9:00 AM - 3:00 PM",
    img: img4,
  },
];

export default function WorkshopsSection() {
  const [type, setType] = useState("online");
  const sectionRef = useRef();

  const data = type === "online" ? onlineWorkshops : offlineWorkshops;

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
    <section className="ws-section" ref={sectionRef}>

      <h2 className="ws-title">⚡ Live Workshops & Training</h2>

      <p className="ws-sub">
        Expert-led workshops to master IoT, embedded systems and electronics.
      </p>

      <div className="ws-toggle">
        <button
          className={type === "online" ? "active" : ""}
          onClick={() => setType("online")}
        >
          Online Workshops
        </button>

        <button
          className={type === "offline" ? "active" : ""}
          onClick={() => setType("offline")}
        >
          In-Person Workshops
        </button>
      </div>

      <div className="ws-grid">
        {data.map((item, i) => (
          <div className="ws-card" key={i}>

            <div
              className="ws-img"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <span className="ws-badge">{item.level}</span>
            </div>

            <div className="ws-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className="ws-meta">
                <span>📅 {item.date}</span>
                <span>⏰ {item.time}</span>
              </div>

              <button className="ws-btn">Register Now</button>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
