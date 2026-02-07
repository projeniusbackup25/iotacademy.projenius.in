import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./ContactPage.css";
import Footer from "../component/Footer";
import Navbar from "../component/NavBar";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });

  const [popupState, setPopupState] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email || !form.message) {
      setPopupState("error");
      return;
    }

    setPopupState("loading");

    const templateParams = {
      user_name: form.name,
      user_email: form.email,
      user_phone: form.phone,
      user_category: form.category,
      user_message: form.message,
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_USER,
        templateParams,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setPopupState("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        category: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setPopupState("error");
    }
  };

  // AUTO-DISMISS SUCCESS OR ERROR AFTER 4 SECONDS
  useEffect(() => {
    if (popupState === "success" || popupState === "error") {
      const timer = setTimeout(() => {
        setPopupState("idle");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [popupState]);

  return (
    <>
      <Navbar />

      <section className="contact-section">
        <div className="contact-container">

          {/* LEFT SECTION */}
          <div className="contact-left">
            <span className="contact-tag">CONTACT US</span>

            <h1>
              Let’s Build <span>Something</span><br />Together
            </h1>

            <p className="contact-desc">
              Have questions about our IoT courses, kits, workshops, or collaborations?
              Our team is here to help you.
            </p>

            <div className="contact-info">
              <div>
                <FaEnvelope />
                <a href="mailto:teamprojenius@gmail.com">projenius.iot@gmail.com</a>
              </div>

              <div>
                <FaPhoneAlt />
                <a href="tel:+918925450473">+91 89254 50473</a>
              </div>
              <div>
                <FaPhoneAlt />
                <a href="tel:+919025476322">+91 90254 76322</a>
              </div>

             <div>
  <FaMapMarkerAlt />
  <span>
    Plot no 3, 16, Erikarai St, Velmurugan Nagar, Madurai,
    Tamil Nadu 625016, India
  </span>
</div>

            </div>
          </div>

          {/* RIGHT FORM CARD */}
          <div className="contact-card">

            {/* POPUP OVERLAY */}
            {popupState !== "idle" && (
              <div className="popup-overlay">
                <div className="popup-card">

                  {/* LOADING */}
                  {popupState === "loading" && (
                    <>
                      <div className="popup-loader">
                        <span>⏳</span>
                        <span>🔄</span>
                        <span>⚡</span>
                      </div>
                      <h3>Processing your message...</h3>
                      <p>Please wait a moment 🚀</p>
                    </>
                  )}

                  {/* SUCCESS */}
                  {popupState === "success" && (
                    <>
                      <div className="success-emoji">🎉✨</div>
                      <h3>Message Sent Successfully!</h3>
                      <p>We’ll get back to you very soon 😊</p>
                    </>
                  )}

                  {/* ERROR */}
                  {popupState === "error" && (
                    <>
                      <div className="error-emoji">❌😢</div>
                      <h3>Something went wrong</h3>
                      <p>Please try again</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* FORM VISIBLE ONLY WHEN IDLE */}
            {popupState === "idle" && (
              <>
                <h3>Send Us a Message</h3>

                <div className="input-group">
                  <FaUser />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                </div>

                <div className="input-group">
                  <FaPhoneAlt />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>

                <div className="input-group">
                  <FaEnvelope />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>

                <div className="input-group select">
                  <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select Category</option>
                    <option>Courses & Learning</option>
                    <option>IoT Kits</option>
                    <option>Workshops</option>
                    <option>Product Support</option>
                    <option>Partnerships</option>
                    <option>General Inquiry</option>
                  </select>
                  <FaChevronDown className="arrow" />
                </div>

                <div className="input-group textarea">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                  />
                </div>

                <button className="submit-btn" onClick={handleSubmit}>
                  Submit Message →
                </button>
              </>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
