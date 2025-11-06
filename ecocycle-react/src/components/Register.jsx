import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [partnerType, setPartnerType] = useState("");
  const [orgName, setOrgName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // ✅ useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Creating account...");

    const body = { name, email, password, role };

    if (role === "community") {
      body.partnerType = partnerType;
      if (partnerType === "event") body.organizationName = orgName;
      if (partnerType === "business") body.businessName = businessName;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        if (role === "community") {
          setMessage(
            "Registration request sent! Please wait for approval by our operations team."
          );
        } else {
          if (data.token) localStorage.setItem("token", data.token);
          if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

          setMessage("Account created! Redirecting to login...");
          setTimeout(() => navigate("/login"), 1000); // ✅ navigate instead of window.location.href
        }
      } else {
        setMessage(
          data.message || (data.errors ? data.errors[0]?.msg : "Error creating account.")
        );
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

        <label>User Type:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="user">Regular User</option>
          <option value="community">Community Partner</option>
        </select>

        {role === "community" && (
          <>
            <label>Partner Type:</label>
            <select
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value)}
              required
            >
              <option value="">Select...</option>
              <option value="event">Event Organizer</option>
              <option value="business">Business Partner</option>
            </select>

            {partnerType === "event" && (
              <input
                type="text"
                placeholder="Organization Name"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            )}

            {partnerType === "business" && (
              <input
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            )}
          </>
        )}

        <button type="submit">Register</button>
      </form>

      <p className="switch-text">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>

      <p className="msg">{message}</p>
    </div>
  );
}
