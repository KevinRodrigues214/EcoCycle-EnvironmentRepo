import React, { useState, useEffect } from "react";

export default function CreateEvents() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    eventPoints: "",
  });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(""); 

  // Fetch all existing events from backend
  useEffect(() => {
  fetch("http://localhost:5000/api/events")
    .then((res) => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Fetched events:", data);
      setEvents(data);
      setError("");
    })
    .catch((err) => {
      console.error("❌ Error fetching events:", err);
      setError("❌ Error loading events. Please try again later.");
    });
}, []);


  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Event created successfully!");
        setFormData({
          eventName: "",
          eventDate: "",
          eventTime: "",
          eventLocation: "",
          eventDescription: "",
          eventPoints: "",
        });
        setError(""); 

        // Refresh event list
        const updated = await fetch("http://localhost:5000/api/events")
          .then((r) => {
            if (!r.ok) throw new Error("Failed to fetch updated events");
            return r.json();
          });
        setEvents(updated);
      } else {
        setError("❌ " + (data.error || "Failed to create event"));
      }
    } catch (err) {
      console.error("Error submitting event:", err);
      setError("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className="create-events">
      <h1>Create Event</h1>

      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="eventTime"
          value={formData.eventTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="eventLocation"
          placeholder="Event Location"
          value={formData.eventLocation}
          onChange={handleChange}
          required
        />
        <textarea
          name="eventDescription"
          placeholder="Event Description"
          value={formData.eventDescription}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="eventPoints"
          placeholder="Points for Attending"
          value={formData.eventPoints}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Event</button>
      </form>

      {/* Display error messages */}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <hr />

      <h2>All Events</h2>
      {events.length === 0 ? (
        <p>No events yet.</p>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.eventName}</h3>
              <p>
                <strong>Date:</strong> {event.eventDate}
              </p>
              <p>
                <strong>Time:</strong> {event.eventTime}
              </p>
              <p>
                <strong>Location:</strong> {event.eventLocation}
              </p>
              <p>
                <strong>Description:</strong> {event.eventDescription}
              </p>
              <p>
                <strong>Points:</strong> {event.eventPoints}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
