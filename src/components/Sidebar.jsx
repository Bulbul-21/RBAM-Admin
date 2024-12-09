import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../Styles/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to toggle sidebar visibility

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the auth token
    navigate("/login"); // Redirect to login page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <button className="hamburger-menu" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <h2>VRV</h2>
          <p>Welcome, Admin</p>
          <nav>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Users
            </NavLink>
            <NavLink
              to="/roles"
              className={({ isActive }) =>
                isActive ? "sidebar-link active-link" : "sidebar-link"
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              Roles
            </NavLink>
          </nav>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
