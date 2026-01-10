const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // <-- import cors
const User = require("./Model/user");

const app = express();

// Enable CORS for all origins (or you can restrict it to your frontend URL)
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/uj")
  .then(() => console.log("MongoDB connected successfully ✅"))
  .catch((err) => console.error("MongoDB connection error ❌", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend + MongoDB is running 🚀");
});

// SIGNUP ROUTE
app.post("/signup", async (req, res) => {

  try {
    const { name, email, phone, skills, password, confirmPassword } = req.body;

    if (!name || !email || !phone || !skills || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }



    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = new User({ name, email, phone, skills, password });
    await user.save();

    res.status(201).json({ message: "Account created successfully 🎉", userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
});


// Your Mongoose model

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email + " " + password);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password (plain text for now; use bcrypt in production)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Success response
    res.status(200).json({
      message: "Login successful 🎉",
      email: email
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error ❌" });
  }
});


app.get("/profile", async (req, res) => {
  try {
    const email = req.query.email;

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
