import React from "react";
import UserHeader from "./UserHeader";
import UserRewards from "./UserRewards";

export default function RewardsPage() {
  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Rewards & Points</h1>
        <p>Browse all rewards you can redeem with EcoPoints.</p>
      </div>

      <main className="home-main">
        <UserRewards />
      </main>
    </div>
  );
}
