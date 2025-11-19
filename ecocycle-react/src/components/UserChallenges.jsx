// src/components/UserChallenges.jsx
import React, { useEffect, useState } from "react";

function UserChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadChallenges() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/challenges");
        if (!res.ok) throw new Error("Failed to load challenges");

        const data = await res.json();
        setChallenges(data);
      } catch (err) {
        console.error(err);
        setError("Could not load challenges.");
      } finally {
        setLoading(false);
      }
    }

    loadChallenges();
  }, []);

  if (loading) return <div className="weekly-section">Loading challenges...</div>;
  if (error) return <div className="weekly-section error-text">{error}</div>;

  return (
    <section className="weekly-section">
      <div className="weekly-header-row">
        <div>
          <h2 className="weekly-title">Weekly Challenges</h2>
          <p className="weekly-subtitle">
            Complete eco-tasks this week and earn points for rewards.
          </p>
        </div>
      </div>

      {challenges.length === 0 && <p>No challenges available right now.</p>}

      <div className="challenges-grid">
        {challenges.map((c) => (
          <article key={c._id} className="challenge-card">
            <div className="challenge-card-header">
              <div className="challenge-icon">♻️</div>
              <div>
                <h3 className="challenge-name">{c.name}</h3>
                <p className="challenge-points">{c.reward_points} points</p>
              </div>
            </div>

            <p className="challenge-description">{c.description}</p>

            <div className="challenge-meta-row">
              <span className="challenge-tag">
                Duration: {c.duration_days} days
              </span>
            </div>

            <button className="challenge-btn">Join challenge</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserChallenges;
