import React, { useState, useEffect, useRef } from "react";
import "./FAQSection.css";

const faqs = [
  {
    q: "What is IoT and why should I learn it?",
    a: "IoT (Internet of Things) connects everyday devices to the internet. Learning IoT helps you build smart systems and prepares you for future technology careers.",
  },
  {
    q: "Who can join our IoT programs?",
    a: "Students, beginners, hobbyists, and professionals can join. No prior coding or electronics knowledge is required to start.",
  },
  {
    q: "What age groups are your courses designed for?",
    a: "Our programs are suitable for school students, college students, and working professionals. We offer beginner-friendly learning paths.",
  },
  {
    q: "Will I receive hardware kits for practice?",
    a: "Yes, physical IoT kits will be delivered to your home depending on the course or workshop you enroll in.",
  },
  {
    q: "How does online learning work?",
    a: "You will get structured video lessons, guided projects, downloadable materials, and live mentor support sessions.",
  },
  {
    q: "Are there live workshops and training sessions?",
    a: "Yes, we conduct both online and in-person workshops with hands-on activities and real-time interaction with trainers.",
  },
  {
    q: "Will I get a certificate after completion?",
    a: "Yes, you will receive an industry-recognized certificate after completing the course modules and projects.",
  },
  {
    q: "Can parents track student progress?",
    a: "Yes, parents and institutions can monitor learning progress through our dashboard and regular performance updates.",
  },
  {
    q: "Are your courses aligned with education standards?",
    a: "Yes, our programs follow skill-based learning aligned with NEP 2020 and industry requirements.",
  },
  {
    q: "What is your refund policy?",
    a: "If a workshop or course is canceled or payment fails, refunds are processed within 5–7 business days.",
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
