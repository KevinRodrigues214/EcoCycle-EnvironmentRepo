import React from "react";
import UserHeader from "./UserHeader";
import UserChallenges from "./UserChallenges";
import UserEvents from "./UserEvents";
import UserRewards from "./UserRewards";
import UserRecyclingMap from "./UserRecyclingMap";
import UserPhotoAI from "./UserPhotoAI";
import UserPickupRequests from "./UserPickupRequests";

export default function Home() {
  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Welcome to EcoCycle 🌿</h1>
        <p>Clean Future Begins With Us.</p>
      </div>

      {/* Dashboard shows an overview of everything */}
      <main className="home-main">
        <UserChallenges />
        <UserEvents />
        <UserRewards />
        <UserPhotoAI /> 
        <UserPickupRequests />
        {/* dashboard = preview version (no prop) */}
        <UserRecyclingMap />
      </main>
    </div>
  );
}
