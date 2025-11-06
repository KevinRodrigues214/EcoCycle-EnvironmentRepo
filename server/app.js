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

//REGISTER
app.post('/api/auth/register',
 
  body('name').isLength({ min: 1 }).withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
     
      const existing = await usersCollection.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }

     
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      
      const userDoc = {
        name,
        email,
        passwordHash,
        createdAt: new Date()
      };

      const result = await usersCollection.insertOne(userDoc);

      
      const token = jwt.sign(
        { userId: result.insertedId, email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      return res.status(201).json({ message: 'User created', token });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);


//LOGIN 
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

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );

      return res.json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);



//routes




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
