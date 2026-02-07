import React from "react";
import "./TermsOfService.css";

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-updated">Last updated: February 2026</p>

        <section className="terms-section">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing or using our IoT Academy website, workshops, or online
            classes, you agree to comply with these Terms of Service.
          </p>
        </section>

        <section className="terms-section">
          <h2>Services Offered</h2>
          <p>
            We provide IoT workshops, online training sessions, educational
            resources, and mentorship for learning purposes only.
          </p>
        </section>

        <section className="terms-section">
          <h2>User Responsibilities</h2>
          <ul>
            <li>Provide accurate and complete registration information</li>
            <li>Use course materials only for personal learning</li>
            <li>Do not redistribute paid or copyrighted content</li>
            <li>Maintain respectful conduct during sessions</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>Payments & Access</h2>
          <p>
            Course access is granted only after successful payment. Refund
            policies, if applicable, will be shared at the time of registration.
          </p>
        </section>

        <section className="terms-section">
          <h2>Intellectual Property</h2>
          <p>
            All materials, including videos, documents, and code, are the
            property of the IoT Academy and may not be reused without permission.
          </p>
        </section>

        <section className="terms-section">
          <h2>Limitation of Liability</h2>
          <p>
            We are not liable for any losses arising from the use of our website
            or educational services.
          </p>
        </section>

        <section className="terms-section">
          <h2>Changes to Terms</h2>
          <p>
            We may update these terms at any time. Continued use of our services
            means you accept the updated terms.
          </p>
        </section>

        <section className="terms-section">
          <h2>Contact</h2>
          <p>
            For questions regarding these Terms of Service, please contact us
            through our official website.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
