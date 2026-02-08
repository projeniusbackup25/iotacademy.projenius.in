import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ===========================
      // TEMPORARY DUPLICATE LOGIN
      // ===========================
      // Example: Both admin and user share the same phone "9999999999"
      if (
        phone === "9999999999" &&
        (password === "admin123" || password === "user123")
      ) {
        if (password === "admin123") {
          // ADMIN LOGIN
          localStorage.setItem("token", "dummyToken");
          localStorage.setItem("role", "admin");
          localStorage.setItem("adminName", "Admin Name");
          localStorage.setItem("adminEmail", "admin@example.com");
          localStorage.setItem("loginTime", new Date().toLocaleString());
          navigate("/admindashboard");
        } else {
          // USER LOGIN
          localStorage.setItem("token", "dummyToken");
          localStorage.setItem("role", "user");
          localStorage.setItem("userName", "User Name");
          localStorage.setItem("userPhone", phone);
          localStorage.setItem("loginTime", new Date().toLocaleString());
          navigate("/userdashboard");
        }
      } else {
        // ===========================
        // NORMAL API LOGIN
        // ===========================
        const res = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`,
          { phone, password }
        );

        // 🔐 Save common auth data
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        // 🔑 ADMIN LOGIN
        if (res.data.role === "admin") {
          localStorage.setItem("adminName", res.data.admin.name);
          localStorage.setItem("adminEmail", res.data.admin.email);
          localStorage.setItem("loginTime", new Date().toLocaleString());
          navigate("/admindashboard");
        }

        // 👤 USER LOGIN
        else {
          localStorage.setItem("userName", res.data.user.name);
          localStorage.setItem("userPhone", res.data.user.phone);
          localStorage.setItem("loginTime", new Date().toLocaleString());
          navigate("/userdashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
