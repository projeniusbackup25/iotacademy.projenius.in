import React from "react";
import "./ChatBot.css";

export default function ChatBot({ onClose }) {
  return (
    <div className="chatbot-container">
      <div className="chat-iframe-wrapper">

        <button className="chatbot-close-btn" onClick={onClose}>
          ✖
        </button>

        <iframe
          src="https://www.chatbase.co/chatbot-iframe/Wm-dA3YC_cv_XcaIu3WOD"
          width="100%"
          style={{ height: "100%", minHeight: "420px", border: "none" }}
          frameBorder="0"
          allow="clipboard-write"
          title="Projenius Chatbot"
        ></iframe>

      </div>
    </div>
  );
}
