import React, { useState } from "react";

export default function CreateRewards() {
  const [reward, setReward] = useState({
    name: "",
    description: "",
    pointsRequired: "",
    couponCode: "",
    storeName: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setReward({ ...reward, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/rewards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reward),
      });

      if (response.ok) {
        setMessage("🎉 Reward created successfully!");
        setReward({
          name: "",
          description: "",
          pointsRequired: "",
          couponCode: "",
          storeName: "",
        });
      } else {
        const err = await response.json();
        setMessage(`❌ Error: ${err.message || "Failed to create reward."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Could not connect to the server.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-600">
        Create Reward / Coupon
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Reward or Coupon Name"
          value={reward.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={reward.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="pointsRequired"
          placeholder="Points Required"
          value={reward.pointsRequired}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="couponCode"
          placeholder="Coupon Code (optional)"
          value={reward.couponCode}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="storeName"
          placeholder="Store Name (optional)"
          value={reward.storeName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Create Reward
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
}
