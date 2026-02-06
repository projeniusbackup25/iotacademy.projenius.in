import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!phone) return alert("Enter phone number");

    try {
      setLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/forgot-password`,
        { phone }
      );

      const { name, email, resetLink } = res.data;

      console.log("EMAIL:", email);
      console.log("RESET LINK:", resetLink);

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_RESET_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_RESET_TEMPLATE_ID,
        {
          name: name,
          to_email: email,
          resetLink: resetLink,
        },
        process.env.REACT_APP_EMAILJS_RESET_PUBLIC_KEY
      );

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        {!success ? (
          <>
            <h2>Forgot Password 🔐</h2>
            <p>Enter your registered phone number</p>

            <div className="input-group">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button onClick={handleSubmit} disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        ) : (
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h3>Reset Link Sent</h3>
            <p>Check your email for password reset link.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
