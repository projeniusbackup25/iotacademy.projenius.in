import React, { useEffect, useRef } from "react";
import "./ProductsSection.css";

export default function ProductsSection() {

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
    <section className="products-section" ref={sectionRef}>

      <p className="section-tag">OUR SOLUTIONS</p>
      <h2 className="section-title">
        Our <span>Products</span>
      </h2>
      <p className="section-sub">
        Powerful platforms and solutions to transform education and business.
      </p>

      <div className="product-grid">

        {/* CARD 1 */}
        <div className="product-card blue">
          <div className="card-top">
            <div className="icon-box blue">📘</div>
            <span className="badge blue">Learning Platform</span>
          </div>

          <h3>ProJenius Platform</h3>

          <ul>
            <li>Learning management system</li>
            <li>Video-based learning portal</li>
            <li>Student dashboard</li>
            <li>Progress tracking</li>
            <li>Certificate system</li>
            <li>Mobile friendly platform</li>
            <li>Instructor-led live sessions</li>
            <li>AI-powered personalized learning paths</li>
          </ul>

          <button className="outline-btn blue">Learn More →</button>
        </div>

        {/* CARD 2 */}
        <div className="product-card purple">
          <div className="card-top">
            <div className="icon-box purple">💡</div>
            <span className="badge purple">For Institutions</span>
          </div>

          <h3>EduTech Solutions</h3>

          <ul>
            <li>Smart learning platforms</li>
            <li>Digital education systems</li>
            <li>Automation solutions</li>
            <li>Learning analytics</li>
            <li>Virtual classroom systems</li>
            <li>Student performance dashboards</li>
            <li>Virtual classroom systems</li>
            <li>Student performance dashboards</li>
          </ul>

          <button className="outline-btn purple">Learn More →</button>
        </div>

        {/* CARD 3 */}
        <div className="product-card gold">
          <div className="card-top">
            <div className="icon-box gold">💍</div>
            <span className="badge gold">Retail Solution</span>
          </div>

          <h3>Projenius Jeweler</h3>

          <ul>
            <li>Chit Fund Management</li>
            <li>Advertisement Management</li>
            <li>Add / Edit Jewellery Products</li>
            <li>Gold & Silver Exchange</li>
            <li>Payment History & Notifications</li>
            <li>Razorpay Payment Gateway Integration</li>
            <li>Live Gold Rate Updates</li>
            <li>Live Process & Transaction Tracking</li>
          </ul>

          <button className="outline-btn gold">Learn More →</button>
        </div>

      </div>

    </section>
  );
}
