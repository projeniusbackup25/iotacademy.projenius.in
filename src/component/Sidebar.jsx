import React, { useState } from "react";
import "./Sidebar.css";
import logo from "../images/projenius_logo.png";
import { NavLink } from "react-router-dom";

function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="mobile-topbar">
        <img src={logo} alt="logo" className="mobile-logo"/>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "active" : ""}`}>

        <div className="logo-section">
          <img src={logo} alt="logo"/>
          <h2>IoT Learn</h2>
        </div>

        <nav className="menu">

         <NavLink
  to="/admindashboard"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  Dashboard
</NavLink>

<NavLink
  to="/orders"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  Order History
</NavLink>

<NavLink
  to="/coursepage"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  Courses & Videos
</NavLink>

<NavLink
  to="/reportspage"
  className={({ isActive }) =>
    isActive ? "menu-item active" : "menu-item"
  }
>
  Reports
</NavLink>

        </nav>

        <div className="logout">
          <NavLink to="/login">
            <button>➜ Logout</button>
          </NavLink>
        </div>

      </div>
    </>
  );
}

export default Sidebar;