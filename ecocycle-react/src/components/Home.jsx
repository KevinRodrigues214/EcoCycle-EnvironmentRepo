import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login"; 
};

  return (
    <div>
      <header className="header">
        <div className="header-left">
          <img src="/logo.png" className="logo" alt="EcoCycle logo" />
        </div>

        <nav className="header-nav">
          <a>Dashboard</a>
          <a>Recycling Tips</a>
          <a>About</a>
        </nav>

        <div className="header-right">
          <span className="user-name">Hi, {user?.name || user?.email || "User"}!</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <div className="home-content">
        <h1>Welcome to EcoCycle 🌿</h1>
        <p>Clean Future Begins With Us.</p>
      </div>
    </div>
  );
}
