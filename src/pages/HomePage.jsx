import React, { useState, useEffect } from "react";
import "./HomePage.css";

import heroVideo from "../images/heroVideo.mp4"; // your video file

import PromoPopup from "../component/Popup";
import HowWeTeach from "../component/HowWeTeach";
import ProductsSection from "../component/ProductsSection";
import LearningPath from "../component/LearningPath";
import Testimonials from "../component/Testimonials";
import FAQSection from "../component/FAQSection";
import Footer from "../component/Footer";
import Navbar from "../component/NavBar";
import Workshop from "../component/Workshop";
import ChatBot from "../component/ChatBot";
import WorkshopKit from "../component/WorkshopKits";

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showBot, setShowBot] = useState(false);

  /* 🔹 Promo popup after 7 seconds */
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="hero-wrapper" id="home">
        <video
          className="hero-video"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="hero-overlay">
          <h1>
            ProJenius — <span>Build the Future with IoT</span>
          </h1>

          <p className="hero-tagline">
            Learn IoT Like Chitti — From Basics to Advanced
          </p>

          <p className="hero-desc">
            A complete learning ecosystem combining IoT kits, structured video
            courses, and live workshops to build real-world smart solutions.
          </p>

          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() =>
                document.getElementById("workshopkit")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Explore Learning Kits →
            </button>

            <button
              className="btn-secondary"
              onClick={() =>
                document.getElementById("how")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              ▶ Watch Demo
            </button>
          </div>

          <div className="hero-stats">
            <Stat value="1000+" label="Students" />
            <Stat value="50+" label="Projects" />
            <Stat value="100%" label="Hands-on" />
          </div>
        </div>
      </section>

      {/* ================= SECTIONS ================= */}
      <section id="how"><HowWeTeach /></section>
      <section id="workshopkit"><WorkshopKit /></section>
      <section id="workshop"><Workshop /></section>
      <section id="learn"><LearningPath /></section>
      <section id="product"><ProductsSection /></section>
      <section id="testi"><Testimonials /></section>
      <section id="faq"><FAQSection /></section>

      <Footer />

      {/* 💬 Chat Button */}
      <button
        style={{
          position: "fixed",
          bottom: "22px",
          right: "22px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563eb, #06b6d4)",
          border: "none",
          color: "white",
          fontSize: "22px",
          cursor: "pointer",
          zIndex: 9999,
        }}
        onClick={() => setShowBot(true)}
      >
        💬
      </button>

      {showBot && <ChatBot onClose={() => setShowBot(false)} />}
      {showPopup && <PromoPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div className="hero-stat-card">
      <h3>{value}</h3>
      <span>{label}</span>
    </div>
  );
}
