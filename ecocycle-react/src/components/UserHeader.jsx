
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function UserHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const syncUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));
      } catch {
        setUser(null);
      }
    };

    
    const onStorage = (e) => {
      if (e.key === "user" || e.key === "token") syncUser();
    };

    
    const onAuthChanged = () => syncUser();

    window.addEventListener("storage", onStorage);
    window.addEventListener("authChanged", onAuthChanged);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");

   
    window.dispatchEvent(new Event("authChanged"));

    
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
