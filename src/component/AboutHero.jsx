import "./AboutHero.css";

/* ✅ import image directly */
import ceoImage from "../images/heroimg.jpeg";

function AboutHero() {
  return (
    <section
      className="about-hero"
      style={{ backgroundImage: `url(${ceoImage})` }}
    >
      <div className="about-hero-overlay">
        <div className="about-hero-content">
          <h1>
            <span className="highlight">Build</span> Innovate Deliver
          </h1>

          <p className="about-hero-sub">
            Turning ideas into real-world technology solutions through hands-on
            innovation and practical learning.
          </p>

          <div className="about-hero-badge">
            <strong>Karthick Ganesh M</strong>
            <span>CEO & Founder, Projenius</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
