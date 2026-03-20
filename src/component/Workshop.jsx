import React, { useState, useEffect, useRef } from "react";
import "./Workshop.css";

import img1 from "../images/liveworkshop1.jpeg";
import img2 from "../images/liveworkshop2.jpeg";
import img3 from "../images/SRM.jpeg";

/* GET COMING SUNDAY */
const getComingSunday = () => {
  const today = new Date();
  const day = today.getDay();
  const diff = (7 - day) % 7 || 7;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + diff);

  return sunday.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* WHATSAPP HANDLER */
const handleOnlineRegister = (course, date) => {
  const time = new Date().toLocaleTimeString("en-IN");
  const msg = `Hi, I want to learn *${course}* scheduled on *${date}*.
Current time: ${time}`;

  window.open(
    `https://wa.me/918925450473?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
};

/* DATA */
const onlineWorkshops = [
  {
    level: "FREE SESSION",
    title: "Free Hackathon Tips & Career Guidance",
    desc: "Learn how to build winning hackathon projects, get career guidance, and understand how IoT innovation works in real industry.",
    date: getComingSunday(),
    time: "11:00 AM - 12:00 PM",
    duration: "1 Hour",   // ✅ ADD THIS
    img: img1,
  },
  {
    level: "IOT WORKSHOP",
    title: "IoT Basic Workshop",
    desc: "Hands-on IoT learning with Arduino, sensors, and real-world embedded system projects.",
    date: getComingSunday(),
    time: "11:00 AM - 12:00 PM",
    duration: "1 Hour",   // ✅ ADD THIS
    img: img2,
  },
];

const offlineWorkshops = [
  {
    level: "WORKSHOP",
    title: "SRM Chennai Workshop",
    desc: "Large-scale hands-on workshop with live demos and projects.",
    date: "SRM University, Chennai",
    time: "1-Day Workshop",
    img: img3,
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
      <h2 className="ws-title">Live IoT Workshops & Training</h2>

      <p className="ws-sub">
        Expert-led workshops to master IoT, embedded systems, Arduino, ESP32, and electronics through practical learning.
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
          In-Person IoT Workshops
        </button>
      </div>

      <div className="ws-grid">
        {data.map((item, i) => (
          <div className="ws-card" key={i}>
            <div className="ws-img">
  <img src={item.img} alt={item.title} />
  <span className="ws-badge">{item.level}</span>
</div>

            <div className="ws-body">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>

              <div className="ws-meta">
                <span>📅 {item.date}</span>
                <span>⏰ {item.time}</span>
                <span>⏳ {item.duration}</span>
              </div>

              {/* ✅ ONLY CHANGE IS HERE */}
              <button
                className="ws-btn"
                onClick={() => {
                  if (type === "online") {
                    handleOnlineRegister(item.title, item.date);
                  } else {
                    window.open("https://projenius.in/workshops", "_blank");
                  }
                }}
              >
                {type === "online" ? "Enroll Now" : "View Gallery"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
