import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";
import iotImg from "../images/login_page_img.jpeg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // ✅ DUMMY LOGIN CONDITION
      if (phone === "1111111111" && password.length > 0) {
        localStorage.setItem("token", "dummyToken");
        localStorage.setItem("role", "user");
        localStorage.setItem("userName", "Demo User");
        localStorage.setItem("userPhone", phone);
        localStorage.setItem("loginTime", new Date().toLocaleString());

        navigate("/userdashboard");
      } else {
        setError("Invalid mobile number or password");
      }

      setLoading(false);
    }, 800); // small delay for UI feel
  };

  return (
    <div className="login-page">
      
      {/* LEFT */}
      <div className="login-left">
        <h2>Projenius IoT Login</h2>
        <p className="sub-text">Login to start your smart learning journey</p>

        <form onSubmit={handleLogin}>
          <input
            type="tel"
            placeholder="Mobile Number"
            maxLength="10"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          />

          {/* PASSWORD */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error">{error}</p>}

          <Link to="/forgot-password" className="forgot">
            Forgot Password?
          </Link>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <img src={iotImg} alt="IoT Illustration" />
      </div>
    </div>
  );
}