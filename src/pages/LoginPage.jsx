import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import iotImg from "../images/iot-illustration.webp"; // put your IoT image here

const ADMIN_NUMBER = "9025476322";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [mpin, setMpin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    if (mpin.length !== 4) {
      setError("MPIN must be 4 digits");
      return;
    }

    setError("");

    if (phone === ADMIN_NUMBER) {
      navigate("/admindashboard");
    } else {
      navigate("/userdashboard");
    }
  };

  return (
    <div className="login-page">
      {/* LEFT SIDE - FORM */}
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

          <input
            type="password"
            placeholder="4 Digit MPIN"
            maxLength="4"
            value={mpin}
            onChange={(e) => setMpin(e.target.value.replace(/\D/g, ""))}
          />

          {error && <p className="error">{error}</p>}

          <div className="forgot">Forgot MPIN?</div>

          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="login-right">
        <img src={iotImg} alt="IoT Illustration" />
      </div>
    </div>
  );
}
