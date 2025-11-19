import React from "react";
import UserHeader from "./UserHeader";
import UserRecyclingMap from "./UserRecyclingMap";

export default function RecyclingMapPage() {
  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Recycling Map</h1>
        <p>Find recycling stations where you can drop off your items.</p>
      </div>

      <main className="home-main">
        <UserRecyclingMap fullPage />
      </main>
    </div>
  );
}
