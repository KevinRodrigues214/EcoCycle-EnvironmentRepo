import React, { useEffect, useState } from "react";

function UserRewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRewards() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/rewards");
        if (!res.ok) throw new Error("Failed to load rewards");

        const data = await res.json();
        setRewards(data);
      } catch (err) {
        console.error(err);
        setError("Could not load rewards.");
      } finally {
        setLoading(false);
      }
    }

    loadRewards();
  }, []);

  if (loading) return <div className="rewards-section">Loading rewards...</div>;
  if (error) return <div className="rewards-section error-text">{error}</div>;

  return (
    <section className="rewards-section">
      <div className="rewards-header-row">
        <div>
          <h2 className="rewards-title">Rewards & Points</h2>
          <p className="rewards-subtitle">
            See what you can earn with your EcoPoints.
          </p>
        </div>
      </div>

      {rewards.length === 0 && <p>No rewards available yet.</p>}

      <div className="rewards-grid">
        {rewards.map((r) => (
          <article key={r._id} className="reward-card">
            <div className="reward-card-header">
              <div className="reward-icon">🏆</div>
              <div>
                <h3 className="reward-name">{r.name}</h3>
                <p className="reward-store">{r.storeName}</p>
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

            <button className="reward-btn">Redeem (coming soon)</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserRewards;
