import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRewards({ showViewAll = true }) {
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/rewards")
      .then((res) => res.json())
      .then((data) => setRewards(data || []))
      .catch((err) => {
        console.error(err);
        setError("Could not load rewards.");
      });
  }, []);

  // on dashboard show only first reward
  const visible = rewards.slice(0, 1);

  return (
    <section className="rewards-section">
      <div className="rewards-header-row">
        <div>
          <h2 className="rewards-title">Rewards & Points</h2>
          <p className="rewards-subtitle">
            See what you can earn with your EcoPoints.
          </p>
        </div>

        {/* only show on dashboard */}
        {showViewAll && (
          <button
            type="button"
            className="section-link"
            onClick={() => navigate("/rewards")}
          >
            View all
          </button>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <div className="rewards-grid">
        {visible.map((r) => (
          <article key={r._id} className="reward-card">
            <div className="reward-card-header">
              <div className="reward-icon">🏅</div>
              <div>
                <div className="reward-name">{r.name}</div>
                <div className="reward-store">{r.storeName}</div>
              </div>
            </div>

            <p className="reward-description">{r.description}</p>

            <div className="reward-meta-row">
              <span className="reward-tag">
                Requires {r.pointsRequired} points
              </span>

              {r.couponCode && (
                <span className="reward-code">Code: {r.couponCode}</span>
              )}
            </div>

            <button className="reward-btn" type="button">
              Redeem (coming soon)
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
