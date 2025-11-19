import React, { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

export default function PickupRequestsPage() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    address: "",
    preferredDate: "",
    preferredTime: "",
    itemsDescription: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const loadRequests = () => {
    if (!storedUser) {
      setLoadingList(false);
      return;
    }

    const params = new URLSearchParams();
    if (storedUser.id) params.append("userId", storedUser.id);
    else if (storedUser.email) params.append("email", storedUser.email);

    fetch(`http://localhost:5000/api/pickup-requests?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err))
      .finally(() => setLoadingList(false));
  };

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/pickup-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedUser?.id,
          ...form,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setMessage("Pick-up request submitted.");
      setForm((prev) => ({
        ...prev,
        address: "",
        preferredDate: "",
        preferredTime: "",
        itemsDescription: "",
      }));
      loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Pick-up Requests</h1>
        <p>Request a collection for larger amounts of recyclables.</p>
      </div>

      <main className="home-main">
        {/* Form card */}
        <section className="pickup-section">
          <div className="pickup-header-row">
            <div>
              <h2 className="pickup-title">Request a pick-up</h2>
              <p className="pickup-subtitle">
                Fill in your address and preferred time so our team can
                schedule a visit.
              </p>
            </div>
          </div>

          <form className="pickup-form" onSubmit={handleSubmit}>
            <div className="pickup-form-grid">
              <div className="pickup-form-field">
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="pickup-form-field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="pickup-form-field">
              <label>Pick-up address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pickup-form-grid">
              <div className="pickup-form-field">
                <label>Preferred date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                />
              </div>
              <div className="pickup-form-field">
                <label>Preferred time</label>
                <input
                  type="time"
                  name="preferredTime"
                  value={form.preferredTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="pickup-form-field">
              <label>What items should we pick up?</label>
              <textarea
                name="itemsDescription"
                rows="3"
                value={form.itemsDescription}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}
            {message && <p className="success-text">{message}</p>}

            <button
              type="submit"
              className="pickup-main-btn"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Submit request"}
            </button>
          </form>
        </section>

        {/* List card */}
        <section className="pickup-section">
          <div className="pickup-header-row">
            <div>
              <h2 className="pickup-title">Your requests</h2>
            </div>
          </div>

          {loadingList ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p>You don&apos;t have any pick-up requests yet.</p>
          ) : (
            <ul className="pickup-list">
              {requests.map((r) => (
                <li key={r._id} className="pickup-list-item">
                  <div>
                    <div className="pickup-list-line">
                      {(r.preferredDate || "Date TBA") +
                        " • " +
                        (r.preferredTime || "Any time")}
                    </div>
                    <div className="pickup-list-line pickup-status">
                      Status: {r.status || "pending"}
                    </div>
                  </div>
                  <div className="pickup-list-items">
                    {r.itemsDescription}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
