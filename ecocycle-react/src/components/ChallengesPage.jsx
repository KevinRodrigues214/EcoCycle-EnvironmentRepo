import React from "react";
import UserHeader from "./UserHeader";
import UserChallenges from "./UserChallenges";

export default function ChallengesPage() {
  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Weekly Challenges</h1>
        <p>All available challenges you can join.</p>
      </div>

      <main className="home-main">
        <UserChallenges />
      </main>
    </div>
  );
}
