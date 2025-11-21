import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserRecyclingMap({ fullPage = false, showViewAll = false }) {
  const [stations, setStations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStations() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("http://localhost:5000/api/recycle-stations");
        if (!res.ok) throw new Error("Failed to load stations");

        const data = await res.json();
        setStations(data);
        if (data.length > 0) setSelected(data[0]);
      } catch (err) {
        console.error(err);
        setError("Could not load recycling locations.");
      } finally {
        setLoading(false);
      }
    }

    loadStations();
  }, []);

  if (loading) {
    return (
      <section className="recycle-section">
        <p>Loading map...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="recycle-section error-text">
        {error}
      </section>
    );
  }

  // Default Google Maps query
  let mapQuery = "recycling stations near Toronto";
  if (selected) {
    mapQuery = selected.address || selected.name || mapQuery;
  }
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&output=embed`;

  return (
    <section className="recycle-section">
      {/* On dashboard we show this small title; on full page we hide it */}
      {!fullPage && (
        <div className="recycle-header-row">
          <div>
            <h2 className="recycle-title">Recycling Map</h2>
            <p className="recycle-subtitle">
              Find nearby recycling stations you can use for drop-offs.
            </p>
          </div>

          {showViewAll && (
            <button
              type="button"
              className="section-link-btn"
              onClick={() => navigate("/recycling-map")}
            >
              Open map page
            </button>
          )}
        </div>
      )}

      <div className={fullPage ? "recycle-map recycle-map-full" : "recycle-map"}>
        <iframe
          title="Recycling station map"
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}

export default UserRecyclingMap;
