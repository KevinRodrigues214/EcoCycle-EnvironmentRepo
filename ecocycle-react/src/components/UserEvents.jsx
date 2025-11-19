import React, { useEffect, useState } from "react";

function UserEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/events");
        if (!res.ok) throw new Error("Failed to load events");

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("Could not load events.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) return <div className="events-section">Loading events...</div>;
  if (error) return <div className="events-section error-text">{error}</div>;

  return (
    <section className="events-section">
      <div className="events-header-row">
        <div>
          <h2 className="events-title">Upcoming Events</h2>
          <p className="events-subtitle">
            Join local clean-ups and recycling activities in your community.
          </p>
        </div>
      </div>

      {events.length === 0 && <p>No events available right now.</p>}

      <div className="events-grid">
        {events.map((e) => (
          <article key={e._id} className="event-card">
            <div className="event-card-header">
              <div className="event-icon">📍</div>
              <div>
                <h3 className="event-name">{e.eventName || e.name}</h3>
                <p className="event-location">{e.eventLocation}</p>
              </div>
            </div>

            <p className="event-description">{e.eventDescription}</p>

            <div className="event-meta-row">
              <span className="event-tag">
                {e.eventDate} • {e.eventTime}
              </span>
              {e.eventPoints && (
                <span className="event-points">
                  +{e.eventPoints} pts
                </span>
              )}
            </div>

            <button className="event-btn">View / Join event</button>
          </article>
        ))}
      </div>
    </section>
  );
}

export default UserEvents;
