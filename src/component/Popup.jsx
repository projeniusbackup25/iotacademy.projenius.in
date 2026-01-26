import React from "react";
import "./Popup.css";
import popupImg from "../images/projenius_logo.png";

export default function PromoPopup({ onClose }) {
  return (
    <div className="promo-overlay">
      <div className="promo-box">
        <button className="promo-close" onClick={onClose}>✖</button>
        <img src={popupImg} alt="Promo" />
      </div>
    </div>
  );
}
