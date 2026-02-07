import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-updated">Last updated: February 2026</p>

        <section className="privacy-section">
          <h2>Introduction</h2>
          <p>
            At our IoT Academy, we respect your privacy and are committed to
            protecting your personal information. This policy explains how we
            collect, use, and safeguard your data when you use our website,
            workshops, and online classes.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <ul>
            <li>Name, email address, and phone number</li>
            <li>Workshop and course registration details</li>
            <li>Payment-related information (securely processed)</li>
            <li>Technical data such as IP address and browser type</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide IoT workshops and online classes</li>
            <li>To communicate updates and learning materials</li>
            <li>To improve our website and services</li>
            <li>To ensure security and prevent misuse</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Data Protection</h2>
          <p>
            We use industry-standard security measures to protect your personal
            data against unauthorized access, loss, or misuse.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <p>
            You may request access, correction, or deletion of your personal
            data by contacting us through our official communication channels.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please
            contact us via our website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
