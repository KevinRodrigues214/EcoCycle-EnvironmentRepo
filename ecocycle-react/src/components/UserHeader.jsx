import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserHeader() {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" className="logo" alt="EcoCycle logo" />
      </div>

      <nav className="header-nav">
        <a onClick={() => navigate("/home")}>Dashboard</a>
        <a onClick={() => navigate("/challenges")}>Challenges</a>
        <a onClick={() => navigate("/events")}>Events</a>
        <a onClick={() => navigate("/rewards")}>Rewards</a>
        <a onClick={() => navigate("/recycling-map")}>Map</a>
        <a onClick={() => navigate("/photo-ai")}>Photo AI</a>  
          <a onClick={() => navigate("/pickup-requests")}>Pick-ups</a>
      </nav>

      <div className="header-right">
        <span className="user-name">
          Hi, {user?.name || user?.email || "User"}!
        </span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
