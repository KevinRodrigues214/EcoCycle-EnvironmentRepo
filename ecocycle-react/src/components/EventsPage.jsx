import React from "react";
import UserHeader from "./UserHeader";
import UserEvents from "./UserEvents";

export default function EventsPage() {
  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Events</h1>
        <p>Join upcoming clean-ups and recycling activities.</p>
      </div>

      <main className="home-main">
        <UserEvents />
      </main>
    </div>
  );
}
