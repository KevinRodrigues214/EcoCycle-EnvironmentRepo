import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPickupRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!storedUser) {
      setLoading(false);
      return;
    }

    const params = new URLSearchParams();
    if (storedUser.id) params.append("userId", storedUser.id);
    else if (storedUser.email) params.append("email", storedUser.email);

    fetch(`http://localhost:5000/api/pickup-requests?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setRequests(data.slice(0, 3))) // last 3
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="pickup-section">
      <div className="pickup-header-row">
        <div>
          <h2 className="pickup-title">Pick-up Requests</h2>
          <p className="pickup-subtitle">
            Schedule a pick-up when you have a lot of recyclables ready.
          </p>
        </div>
        <button
          className="pickup-main-btn"
          onClick={() => navigate("/pickup-requests")}
        >
          New pick-up
        </button>
      </div>

      {loading ? (
        <p>Loading your recent requests...</p>
      ) : requests.length === 0 ? (
        <p>You don&apos;t have any pick-up requests yet.</p>
      ) : (
        <ul className="pickup-list">
          {requests.map((r) => (
            <li key={r._id} className="pickup-list-item">
              <div>
                <div className="pickup-list-line">
                  {r.preferredDate || "Date TBA"} •{" "}
                  {r.preferredTime || "Any time"}
                </div>
                <div className="pickup-list-line pickup-status">
                  Status: {r.status || "pending"}
                </div>
              </div>
              <div className="pickup-list-items">{r.itemsDescription}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
