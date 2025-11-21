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
        <UserChallenges showViewAll={true} />
        <UserEvents showViewAll={true} />
        <UserRewards showViewAll={true} />
        <UserPhotoAI fullPage={false} />
        <UserPickupRequests showViewAll={true} />
        <UserRecyclingMap showViewAll={true} />
      </main>
    </div>
  );
}
