import React from "react";
import "./Popup.css";
import popupImg from "../images/popup.jpeg";

export default function PromoPopup({ onClose }) {

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "918925450473"; // 91 for India country code
    const message = "I need to study IoT course from your platform";
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="promo-overlay">
      <div className="promo-box">
        <button className="promo-close" onClick={onClose}>✖</button>

        <img 
          src={popupImg} 
          alt="IoT Course Promo" 
          className="promo-image"
          onClick={handleWhatsAppRedirect}
        />

        <div className="promo-content">
          <div className="promo-content1">
          <h3>Start Your IoT Learning Journey🚀</h3>
          <p>Enroll in our IoT workshop and start building smart IoT systems today.</p>
          </div>
          <button 
            className="promo-btn"
            onClick={handleWhatsAppRedirect}
          >
            Join IoT Workshop on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}