import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";

import heroVideo from "../images/heroVideo.mp4";

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
  const [isMuted, setIsMuted] = useState(true);

  const videoRef = useRef(null);

  /* 🔹 Promo popup after 7 seconds */
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  /* 🔹 Ensure video starts muted (browser-safe autoplay) */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  }, []);

  /* 🔊 Toggle video audio */
  const toggleAudio = () => {
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);

      if (!newMutedState) {
        videoRef.current.play(); // ensures audio starts
      }
    }
  };

  return (
    <>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="hero-wrapper" id="home">
        <video
          ref={videoRef}
          className="hero-video"
          src={heroVideo}
          autoPlay
          loop
          playsInline
        />

        {/* 🔊 AUDIO TOGGLE BUTTON */}
        <button
          onClick={toggleAudio}
            className="audio-toggle-btn"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            border: "1px solid #2563eb",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 10,
          }}
          aria-label="Toggle video sound"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>

        <div className="hero-overlay">
          <h1>
            ProJenius — <span>Build the Future with IoT Learing </span>
          </h1>

          <p className="hero-tagline">
           Learn IoT Like ProGenius — From Basics to Advanced IoT Projects
          </p>

          <p className="hero-desc">
            A complete IoT learning ecosystem combining IoT kits, Arduino and ESP32-based projects, structured video courses, and live IoT workshops to help students build real-world smart solutions.
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
              Explore IoT Learning Kits
            </button>

            <button
              className="btn-secondary"
              onClick={() =>
                document.getElementById("how")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
             Watch IoT Demo 
            </button>
          </div>

          <div className="hero-stats">
            <Stat value="100+" label="Students Learning IoT" />
            <Stat value="50+" label="IoT Projects" />
            <Stat value="100%" label="Hands-on IoT Training" />
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

/* ================= STAT COMPONENT ================= */
function Stat({ value, label }) {
  return (
    <div className="hero-stat-card">
      <h3>{value}</h3>
      <span>{label}</span>
    </div>
  );
}
