import React, { useState } from "react";
import "./UserSidebar.css";
import { NavLink } from "react-router-dom";

function UserSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ✅ MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <h2>IoT Learn</h2>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* ✅ OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* ✅ SIDEBAR */}
      <div className={`sidebar ${open ? "active" : ""}`}>

        <div className="logo-section">
          <h2>IoT Learn</h2>
          <span className="portal-text">Student Portal</span>
        </div>

        <nav className="menu">

          <NavLink
            to="/userdashboard"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={() => setOpen(false)}
          >
            📘 My Course
          </NavLink>

          <NavLink
            to="/uservideo"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={() => setOpen(false)}
          >
            🎬 Videos
          </NavLink>

          <NavLink
            to="/userproject"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={() => setOpen(false)}
          >
            🛠 Projects
          </NavLink>

          <NavLink
            to="/userdownload"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={() => setOpen(false)}
          >
            ⬇ Downloads
          </NavLink>

          <NavLink
            to="/certificate"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={() => setOpen(false)}
          >
            🎓 Certificate
          </NavLink>

          <NavLink
            to="/support"
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
            onClick={() => setOpen(false)}
          >
            ❓ Support
          </NavLink>

        </nav>

        <div className="upgrade">
          <button>✨ Upgrade Bundle</button>
        </div>

      </div>
    </>
  );
}

export default UserSidebar;