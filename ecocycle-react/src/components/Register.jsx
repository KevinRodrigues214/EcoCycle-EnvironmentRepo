import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }), // <-- send name too
      });

      const data = await res.json();

      if (res.ok) {
        
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        setMessage("Account created! Redirecting to login...");
        setTimeout(() => (window.location.href = "/login"), 900);
      } else {
        
        setMessage(data.message || (data.errors ? data.errors[0]?.msg : "Error creating account."));
      }
    } catch (err) {
      console.error(err);
      setMessage("Server connection error.");
    }
  };

  return (
    <div className="auth-container">
      <img src="/logo.png" className="logo" alt="EcoCycle logo" />

      <h2>Create Account</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>

      <p className="switch-text">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

      <p className="msg">{message}</p>
    </div>
  );
}
