import { useState } from "react";

function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <button onClick={() => setActiveTab("recycling")} className={activeTab === "recycling" ? "active" : ""}>Add/Edit Recycling</button>
      <button onClick={() => setActiveTab("stations")} className={activeTab === "stations" ? "active" : ""}>Recycling Stations</button>
      <button onClick={() => setActiveTab("events")} className={activeTab === "events" ? "active" : ""}>View Events</button>
      <button onClick={() => setActiveTab("rewards")} className={activeTab === "rewards" ? "active" : ""}>Rewards</button>
      <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Manage Users</button>
      <button onClick={() => setActiveTab("help")} className={activeTab === "help" ? "active" : ""}>Help</button>
    </nav>
  );
}

export default function OperationalHome() {
  const [activeTab, setActiveTab] = useState("recycling");

  const renderContent = () => {
    switch (activeTab) {
      case "recycling":
        return <div>Add/Edit Recycling Form Here</div>;
      case "stations":
        return <div>Recycling Stations Table Here</div>;
      case "events":
        return <div>Events Page Here</div>;
      case "rewards":
        return <div>Rewards Page Here</div>;
      case "users":
        return <div>Manage Users Table Here</div>;
      case "help":
        return <div>Help Page Here</div>;
      default:
        return <div>Add/Edit Recycling Form Here</div>;
    }
  };

  return (
    <div>
      {/* Navbar is inside OperationalHome */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">{renderContent()}</div>
    </div>
  );
}
