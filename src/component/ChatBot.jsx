import React, { useEffect, useState } from "react";
import "./ChatBot.css";
import botImg from "../images/robot.png";

const QUESTIONS = [
  "How can I help you?",
  "Need help choosing an IoT course?",
  "Looking for the right learning kit?",
  "Want guidance to start your IoT journey?",
  "Have questions about workshops?",
  "Not sure where to begin?",
  "Need expert IoT guidance?"
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [cloudText, setCloudText] = useState(QUESTIONS[0]);

  // 🔁 Rotating questions (UNCHANGED)
  useEffect(() => {
    if (isOpen) return;

    const interval = setInterval(() => {
      setCloudText((prev) => {
        let next;
        do {
          next = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        } while (next === prev);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // 🔥 REMOVE CHATBASE DEFAULT ICON (NEW FIX)
  useEffect(() => {
    const removeChatbase = () => {
      const elements = document.querySelectorAll(
        'iframe[src*="chatbase"], div[id*="chatbase"], div[class*="chatbase"], chatbase-widget'
      );

      elements.forEach((el) => {
        // keep ONLY your iframe
        const myIframe = document.querySelector(".chatbot-container iframe");
        if (el !== myIframe) {
          el.remove();
        }
      });
    };

    const interval = setInterval(removeChatbase, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ☁️ CLOUD */}
      {!isOpen && (
        <div className="help-cloud">
          {cloudText}
        </div>
      )}

      {/* 🤖 ROBOT BUTTON */}
      {!isOpen && (
        <button
          className="chat-launcher"
          onClick={() => setIsOpen(true)}
        >
          <img src={botImg} alt="chatbot" />
        </button>
      )}

      {/* 🤖 CHAT WINDOW */}
      {isOpen && (
        <div className="chatbot-container">
          <button
            className="chatbot-close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✖
          </button>

          <iframe
            src="https://www.chatbase.co/chatbot-iframe/PpCU6yUtfFHv_62dQQoN9"
            title="Projenius Chatbot"
            allow="clipboard-write"
          />
        </div>
      )}
    </>
  );
}