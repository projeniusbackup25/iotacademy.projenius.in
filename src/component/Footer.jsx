import React, { useState } from "react";
import "./Footer.css";
import logo from "../images/projenius_logo.png";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
const handleSubscribe = async () => {
  if (!email) {
    setStatus("Please enter a valid email.");
    return;
  }

  setLoading(true);
  setStatus("Subscribing... ⏳");

  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.message || "Subscription failed.");
      setLoading(false);
      return;
    }

    await emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE,
      process.env.REACT_APP_EMAILJS_TEMPLATE,
      { user_email: email },
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    );

    // ✅ Silent success
    setEmail("");
    setStatus(""); // remove message after completion
  } catch (err) {
    console.error(err);
    setStatus("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* BRAND */}
        <div className="foot-brand">
          <div className="brand-row">
            <img src={logo} alt="Projenius" />
            <h3>ProJenius</h3>
          </div>
          

          <p>
            Empowering the next generation with hands-on IoT education.
            Learn by building real projects.
          </p>

          <div className="socials">
            <a href="https://chat.whatsapp.com/BA9caXw5J9W3gNrSfiVSBc" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
            <a href="https://www.instagram.com/projenius_?igsh=MXJwaGhtMWFieHQ4cw==" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://youtube.com/@projenius-8" target="_blank" rel="noreferrer"><FaYoutube /></a>
            <a href="https://www.linkedin.com/in/projenius-498444374/" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        {/* LINKS */}
        <div className="foot-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#how">How we Teach</a></li>
            <li><a href="#product">Products</a></li>
            <li><a href="#workshop">Workshops</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="contact">Contact</a></li>
            <li><a href="#faq">LearningKits</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="foot-contact">
          <h4>Contact Us</h4>
          <p><FaEnvelope /> <a href="mailto:teamprojenius@gmail.com">teamprojenius@gmail.com</a></p>
          <p><FaPhoneAlt /> <a href="tel:+918925450473">+91 89254 50473</a></p>
          <p><FaPhoneAlt /> <a href="tel:+919025476322">+91 90254 76322</a></p>
          <p><FaMapMarkerAlt /> Madurai, Tamil Nadu, India</p>
     </div>

        {/* SUBSCRIBE */}
        <div className="foot-news">
          <h4>Stay Updated</h4>
          <p>Subscribe to get updates on new kits and workshops.</p>

          <div className="sub-box">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe} disabled={loading}>
              {loading ? "..." : "Join"}
            </button>
          </div>

          {status && <p className="sub-status">{status}</p>}
        </div>

      </div>

      {/* BOTTOM */}
     {/* FOOTER BOTTOM – SINGLE SECTION */}
<div className="footer-bottom">

  <div className="footer-bottom-row">
    <p>© 2025 ProJenius. All rights reserved.</p>

    <div className="footer-links">
      <Link to="/privacypolicy">Privacy Policy</Link>
      <Link to="/termsofservice">Terms of Service</Link>
    </div>
  </div>

  <div className="footer-credit">
  <a
    href="https://projenius.in"
    target="_blank"
    rel="noreferrer"
    className="footer-logo-link"
  >
    <img src={logo} alt="ProJenius Logo" />
  </a>

  <p>
    Part of the ProJenius Ecosystem -{" "}
    <a href="https://projenius.in" target="_blank" rel="noreferrer">
      ProJenius
    </a>
  </p>
</div>


</div>



    </footer>
  );
}
