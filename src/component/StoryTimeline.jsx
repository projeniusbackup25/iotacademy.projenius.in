import React, { useEffect, useRef, useState } from "react";
import "./StoryTimeline.css";

// Founder images
import founderImg from "../images/founder.jpg";
import f1 from "../images/projenius_logo.png";
import f2 from "../images/projenius_logo.png";
import f3 from "../images/projenius_logo.png";
import f4 from "../images/projenius_logo.png";

// Co-Founder images
import coFounderImg from "../images/cofounder.jpg";
import c1 from "../images/projenius_logo.png";
import c2 from "../images/projenius_logo.png";
import c3 from "../images/projenius_logo.png";
import c4 from "../images/projenius_logo.png";

const slides = [
  { year: "1995", image: f1, title: "First Spark", desc: "Where curiosity began." },
  { year: "2002", image: f2, title: "Learning Phase", desc: "Hands-on experimentation." },
  { year: "2008", image: f3, title: "Identity Built", desc: "Labs shaped thinking." },
  { year: "2012", image: f4, title: "Leadership", desc: "Responsibility took form." },
  { year: "2016", image: c1, title: "Shared Vision", desc: "Founder meets Co-Founder." },
  { year: "2018", image: c2, title: "Execution", desc: "Ideas to systems." },
  { year: "2021", image: c3, title: "Scaling", desc: "Growth with structure." },
  { year: "2024", image: c4, title: "Future", desc: "Impact-driven direction." },
];

export default function LeadershipJourney() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const SPEED_FACTOR = 0.6;

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();

      const progress = Math.min(
        Math.max(-rect.top / (rect.height - window.innerHeight), 0),
        1
      );

      const cardWidth = 420; // must match CSS
const gap = 80;        // must match CSS
const totalCards = slides.length;

const maxIndex = totalCards - 1;

// map progress → card index smoothly
const exactIndex = progress * maxIndex;

// translate exactly one card at a time
const translateX =
  exactIndex * (cardWidth + gap) * SPEED_FACTOR;

track.style.transform = `translateX(-${translateX}px)`;


      track.style.transform = `translateX(-${translateX}px)`;

     const index = Math.min(
  slides.length - 1,
  Math.round(exactIndex)
);

      setActiveIndex(index);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isFounderPhase = activeIndex <= 3;

  return (
    <section className="journey-section" ref={sectionRef}>
      <div className="journey-sticky">
        {/* LEFT PANEL */}
        <div className="journey-left">
          <img
            className="journey-avatar"
            src={isFounderPhase ? founderImg : coFounderImg}
            alt="Leader"
          />
          <h4>{isFounderPhase ? "Karthick Ganesh M" : "Harshini M"}</h4>
          <span>{isFounderPhase ? "CEO & Founder,ProJenius" : "Co-Founder,ProJenius"}</span>

          <h1 className="journey-year">
            {slides[activeIndex]?.year}
          </h1>
        </div>

        {/* RIGHT TRACK */}
        <div className="journey-track" ref={trackRef}>
          {slides.map((slide, i) => {
            const distance = Math.abs(i - activeIndex);

            let stateClass = "is-faded";
            if (distance === 0) stateClass = "is-active";
            else if (distance === 1) stateClass = "is-near";

            return (
              <div key={i} className={`journey-card ${stateClass}`}>
                <div className="journey-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
                <h3>{slide.title}</h3>
                <p>{slide.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
