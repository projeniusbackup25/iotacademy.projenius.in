import React from "react";
import "./NavBar.css";
import logo from "../images/projenius_logo.png"; // your logo
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="nav-wrap">
      <nav className="navbar">

        {/* LEFT BRAND */}
       <div
  className="nav-left"
  onClick={() => window.location.reload()}
  style={{ cursor: "pointer" }}
>
  <img src={logo} alt="Projenius" className="nav-logo" />
  <span className="brand-text">ProJenius IoT Academy</span>
</div>



        {/* RIGHT SIDE */}
        <div className="nav-right">

          <ul className="nav-links">
            <li><a href="home">Home</a></li>
            <li><a href="#workshopkit">LearningKits</a></li>
            <li><a href="#product">Products</a></li>
            <li><a href="#workshop">Workshops</a></li>
            <li><a href="about">About</a></li>
            <li><a href="contactpage">Contact</a></li>

          </ul>

          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
