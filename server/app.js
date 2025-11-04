const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let challengesCollection, eventsCollection, recycleStationsCollection, rewardsCollection, usersCollection;

// Connect to MongoDB
client.connect().then(() => {
  console.log("✅ Connected to MongoDB");
  const db = client.db("EcoCycleEnvironment");

  challengesCollection = db.collection("Challenges");
  eventsCollection = db.collection("Events");
  recycleStationsCollection = db.collection("RecycleStations");
  rewardsCollection = db.collection("Rewards");
  usersCollection = db.collection("User");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});



//routes




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
