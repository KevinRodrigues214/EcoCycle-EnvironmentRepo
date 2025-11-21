import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Signing in...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        
        window.dispatchEvent(new Event("authChanged"));

      
        if (data.user.role === "operational") {
          navigate("/operational-home");
        } 
        else if (data.user.role === "community") {
          if (data.user.status === "active") {
            navigate("/community-home");
          } else {
            setMessage("Your account is pending approval.");
            return;
          }
        } 
        else {
          navigate("/home");
        }

      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Error to login:", err);
      setMessage("Server connection error.");
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" className="logo" alt="logo" />

      <h2>Welcome Back</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <p className="switch-text">
        Don't have an account? <Link to="/register">Create one</Link>
      </p>

      <p className="msg">{message}</p>
    </div>
  );
}
