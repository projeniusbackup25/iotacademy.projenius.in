import React, { useState, useEffect, useRef } from "react";
import "./FAQSection.css";

const faqs = [
  {
    q: "What is IoT and why should I learn it?",
    a: "IoT (Internet of Things) is a technology that connects physical devices like sensors, microcontrollers, and machines to the internet. Learning IoT helps students build smart systems such as home automation, smart agriculture, and real-time monitoring solutions using platforms like Arduino and ESP32.",
  },
  {
    q: "Who can join our IoT programs?",
    a: "Our IoT programs are designed for school students, college students, beginners, and tech enthusiasts who want to learn electronics, embedded systems, and IoT development from basics to advanced levels.",
  },
  {
    q: "What age groups are your courses designed for?",
    a: "Our IoT learning programs are suitable for students aged 10+ as well as college learners and beginners who want to explore electronics, coding, and IoT technologies through hands-on projects.",
  },
  {
    q: "Will I receive hardware kits for practice?",
    a: "Yes, students receive IoT hardware kits that include components like sensors, microcontrollers (Arduino / ESP32), and electronic modules to practice and build real-world IoT projects.",
  },
  {
    q: "How does online learning work?",
    a: "After registration, students receive access to structured IoT lessons including recorded videos, project tutorials, and guidance to build IoT systems step-by-step at their own pace.",
  },
  {
    q: "Are there live workshops and training sessions?",
    a: "Yes, we conduct live IoT workshops and training sessions for schools, colleges, and individual learners to provide hands-on experience with IoT hardware and real-world applications.",
  },
  {
    q: "Will I get a certificate after completion?",
    a: "Yes, students receive an IoT course completion certificate after successfully finishing the training program and project activities.",
  },
  {
    q: "Can parents track student progress?",
    a: "Yes, parents can monitor student learning progress, project completion, and skill development through structured course milestones and guidance provided during the program.",
  },
  {
    q: "Are your courses aligned with education standards?",
    a: "Yes, our IoT learning modules are designed to align with modern STEM education standards and focus on practical skills in electronics, embedded systems, and IoT development.",
  },
  {
    q: "What is your refund policy?",
    a: "Refund policies depend on the specific workshop or training program. Please contact our support team for detailed information before enrolling.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState(null);
  const sectionRef = useRef();

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
    <section className="faq-section" ref={sectionRef}>
      <p className="faq-sub">GOT QUESTIONS?</p>

      <h2 className="faq-title">
        Frequently Asked <span>Questions</span>
      </h2>

      <div className="faq-box">
        {faqs.map((f, i) => (
          <div
            key={i}
            className={`faq-card ${active === i ? "open" : ""}`}
            onClick={() => setActive(active === i ? null : i)}
          >
            <div className="faq-head">
              <h4>{f.q}</h4>
              <span>{active === i ? "−" : "+"}</span>
            </div>

            <div className="faq-body">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
