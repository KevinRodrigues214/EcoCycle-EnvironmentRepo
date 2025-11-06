import { useState } from "react";

// Dummy components for each tab
function Events() {
  return (
    <div>
      <h3>Events</h3>
      <p>List of upcoming community events will be displayed here.</p>
    </div>
  );
}

function Rewards() {
  return (
    <div>
      <h3>Rewards</h3>
      <p>View your earned points and available rewards here.</p>
    </div>
  );
}

function Help() {
  return (
    <div>
      <h3>Help</h3>
      <p>Find FAQs or contact support here.</p>
    </div>
  );
}

export default function CommunityHome() {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="community-home">
      <h2>Community Dashboard</h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
        <button
          className={activeTab === "rewards" ? "active" : ""}
          onClick={() => setActiveTab("rewards")}
        >
          Rewards
        </button>
        <button
          className={activeTab === "help" ? "active" : ""}
          onClick={() => setActiveTab("help")}
        >
          Help
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === "events" && <Events />}
        {activeTab === "rewards" && <Rewards />}
        {activeTab === "help" && <Help />}
      </div>

      {/* Optional: simple styling */}
      <style jsx>{`
        .tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          background: #eee;
          cursor: pointer;
          border-radius: 5px;
        }
        button.active {
          background: #4caf50;
          color: white;
        }
        .tab-content {
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          background: #f9f9f9;
        }
      `}</style>
    </div>
  );
}
