const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
require("dotenv").config();

const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

let challengesCollection, eventsCollection, recycleStationsCollection, rewardsCollection, usersCollection;

// Connect to MongoDB
client.connect().then(() => {
  console.log("✅ Connected to MongoDB");
  const db = client.db("EcoCycleEnvironment");

  challengesCollection = db.collection("Challenges");
  eventsCollection = db.collection("Events");
  recycleStationsCollection = db.collection("RecycleStations");
  rewardsCollection = db.collection("Rewards");
  usersCollection = db.collection("Users");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // ✅ HERE: use 'pending' not 'pending_approval'
    const status = role === "community" ? "pending" : "active";

    const newUser = {
      name,
      email,
      passwordHash,
      role,
      status,
      createdAt: new Date()
    };

    await usersCollection.insertOne(newUser);

    res.status(201).json({
      message:
        role === "community"
          ? "Your account is awaiting approval."
          : "Account created successfully.",
      user: newUser,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// LOGIN
app.post('/api/auth/login',
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 1 }).withMessage('Password required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // ✅ Block pending or rejected community users
      if (user.role === "community" && user.status !== "active") {
        return res.status(403).json({
          message:
            user.status === "pending"
              ? "Account pending approval. Please wait."
              : "Your account has been rejected."
        });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// ✅ GET ALL PENDING COMMUNITY USERS
app.get('/api/users/pending', async (req, res) => {
  try {
    const pendingUsers = await usersCollection.find({ role: 'community', status: 'pending' }).toArray();
    res.json(pendingUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ APPROVE COMMUNITY USER
app.patch('/api/users/approve/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId), role: 'community', status: 'pending' },
      { $set: { status: 'active' } }
    );

    if (result.modifiedCount === 1) {
      return res.json({ message: 'User approved successfully' });
    } else {
      return res.status(404).json({ message: 'User not found or already processed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ REJECT COMMUNITY USER
app.patch('/api/users/reject/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId), role: 'community', status: 'pending' },
      { $set: { status: 'rejected' } }
    );

    if (result.modifiedCount === 1) {
      return res.json({ message: 'User rejected successfully' });
    } else {
      return res.status(404).json({ message: 'User not found or already processed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

//create events
app.get('/api/events', async (req, res) => {
  if (!eventsCollection) {
    return res.status(500).json({ error: 'Database not ready' });
  }
  try {
    const events = await eventsCollection.find().toArray();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// POST create event
app.post('/api/events', async (req, res) => {
  if (!eventsCollection) {
    return res.status(500).json({ error: 'Database not ready' });
  }
  try {
    const result = await eventsCollection.insertOne(req.body);
    res.status(201).json({ message: 'Event created', id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
