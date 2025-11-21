import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserChallenges({ showViewAll = true }) {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/challenges")
      .then((res) => res.json())
      .then((data) => setChallenges(data || []))
      .catch((err) => {
        console.error(err);
        setError("Could not load challenges.");
      });
  }, []);

  const visible = challenges.slice(0, 2); // what shows on dashboard

  return (
    <section className="weekly-section">
      <div className="weekly-header-row">
        <div>
          <h2 className="weekly-title">Weekly Challenges</h2>
          <p className="weekly-subtitle">
            Complete eco-tasks this week and earn points for rewards.
          </p>
        </div>

        {/* 👇 only show this on dashboard when showViewAll = true */}
        {showViewAll && (
          <button
            type="button"
            className="section-link"
            onClick={() => navigate("/challenges")}
          >
            View all
          </button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="challenges-grid">
        {visible.map((ch) => (
          <article key={ch._id} className="challenge-card">
            <div className="challenge-card-header">
              <div className="challenge-icon">♻️</div>
              <div>
                <div className="challenge-name">{ch.name}</div>
                <div className="challenge-points">
                  {ch.reward_points} points
                </div>
              </div>
            </div>
            <p className="challenge-description">{ch.description}</p>
            <div className="challenge-meta-row">
              <span className="challenge-tag">
                Duration: {ch.duration_days} days
              </span>
            </div>
            <button className="challenge-btn" type="button">
              Join challenge
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
