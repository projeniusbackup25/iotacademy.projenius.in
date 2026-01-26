import React from "react";
import "./Testimonials.css";

const testimonials = [
  {
    name: "Arun Kumar",
    text:
      "The hands-on approach made learning IoT extremely practical and engaging. The step-by-step guidance and real-world projects helped me build my first smart home system within weeks. I now feel confident working with sensors, microcontrollers, and cloud integrations.",
  },
  {
    name: "Priya Sharma",
    text:
      "This platform completely changed the way I teach IoT concepts. The practical examples, live demonstrations, and project-based learning modules made it easy for my students to understand complex topics. It has become an essential tool in my classroom.",
  },
  {
    name: "Vikram Rajan",
    text:
      "The quality of the IoT kits and tutorials exceeded my expectations. Everything was well-structured, beginner-friendly, and supported with clear explanations. It is one of the best investments I’ve made for building a strong foundation in hardware and embedded systems.",
  },
  {
    name: "Sanjay Kumar",
    text:
      "Project-based learning helped me understand embedded systems in a way textbooks never could. Working on real applications improved my problem-solving skills and gave me the confidence to design and debug hardware projects independently.",
  },
  {
    name: "Meena Devi",
    text:
      "My son now spends more time building projects instead of passively watching videos. The interactive learning approach encouraged creativity and logical thinking. It is wonderful to see him so excited about electronics and IoT at such a young age.",
  },
  {
    name: "Rahul Patel",
    text:
      "This platform provides an excellent foundation for anyone interested in IoT startups and hardware prototyping. The practical exposure, combined with industry-relevant use cases, helped me move from ideas to working prototypes with confidence.",
  },
];


export default function Testimonials() {
  return (
    <section className="test-section">
      <p className="test-sub">SUCCESS STORIES</p>
      <h2 className="test-title">
        Trusted by <span>50+</span> Students
      </h2>

      <div className="carousel">
        <div className="track">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div className="test-card" key={i}>
              <div className="stars">★★★★★</div>
              <p className="msg">"{t.text}"</p>
              <div className="user">
                <div className="avatar"></div>
                <div>
                  <h4>{t.name}</h4>
                  <small>{t.role}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
