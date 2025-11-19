import React from "react";
import UserHeader from "./UserHeader";
import UserPhotoAI from "./UserPhotoAI";

export default function PhotoAIPage() {
  return (
    <div>
      <UserHeader />

      <div className="home-content">
        <h1>Photo / AI Recognition</h1>
        <p>
          Scan an item and get a suggestion for recycling, compost, or waste.
        </p>
      </div>

      <main className="home-main">
        <UserPhotoAI fullPage />
      </main>
    </div>
  );
}
