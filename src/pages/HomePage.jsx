import React, { useEffect, useState } from "react";
import "./HomePage.css";

import hero1 from "../images/heroimg.jpeg";
import hero2 from "../images/heroimg.jpeg";
import hero3 from "../images/heroimg.jpeg";
import hero4 from "../images/heroimg.jpeg";

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

/* ✅ STATIC CONSTANTS (ESLint-safe) */
const slides = [hero1, hero2, hero3, hero4];
const SLIDE_COUNT = slides.length;
const EXTENDED_LENGTH = SLIDE_COUNT + 2;

export default function HomePage() {
  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [showBot, setShowBot] = useState(false);

  const extendedSlides = [
    slides[SLIDE_COUNT - 1],
    ...slides,
    slides[0],
  ];

  /* 🔹 Promo popup */
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  /* 🔹 Auto slide */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  /* 🔹 Loop correction (NO dependency warnings) */
  useEffect(() => {
    if (index === EXTENDED_LENGTH - 1) {
      setTimeout(() => {
        setTransition(false);
        setIndex(1);
      }, 1200);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(SLIDE_COUNT);
      }, 1200);
    }
  }, [index]);

  /* 🔹 Re-enable animation */
  useEffect(() => {
    if (!transition) {
      setTimeout(() => setTransition(true), 50);
    }
  }, [transition]);

  return (
    <>
      <Navbar />

      <section className="hero-wrapper" id="home">
        <div
          className={`hero-track ${transition ? "animate" : ""}`}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {extendedSlides.map((img, i) => (
            <div
              key={i}
              className="hero-slide"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>

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
            <button className="btn-primary">Explore Learning Kits →</button>
            <button className="btn-secondary">▶ Watch Demo</button>
          </div>

          <div className="hero-stats">
            <Stat value="1000+" label="Students" />
            <Stat value="50+" label="Projects" />
            <Stat value="100%" label="Hands-on" />
          </div>
        </div>
      </section>

      <section id="how"><HowWeTeach /></section>
      <section id="product"><ProductsSection /></section>
      <section id="workshop"><Workshop /></section>
      <section id="learn"><LearningPath /></section>
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
