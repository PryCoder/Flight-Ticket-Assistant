import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const mongoURI = process.env.MONGO_URI;

// Debugging: Ensure environment variables are loaded
console.log("✅ MongoDB URI:", mongoURI ? "Loaded" : "Missing");
console.log("✅ JWT Secret:", JWT_SECRET ? "Loaded" : "Missing");

// Ensure MongoDB URI exists
if (!mongoURI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}

// ✅ MongoDB Connection
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully to Flight DB!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ User Schema & Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Adjust origin if needed
app.use(express.json()); // Enables JSON parsing in Express

// **🛠 Middleware to Verify JWT Token**
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded Token:", verified); // Debugging line
    req.user = verified; // Attach user info
    next();
  } catch (err) {
    console.log("❌ Token Verification Failed:", err.message);
    res.status(400).json({ message: "Invalid Token" });
  }
};

// **🔍 Get User API**
app.get("/user", authenticateUser, async (req, res) => {
  try {
    console.log("🔍 Fetching User with ID:", req.user.id); // Debugging line
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ Get User Error:", error);
    res.status(500).json({ message: "Failed to retrieve user", error: error.message });
  }
});

// **📝 Signup API**
app.post("/signup", async (req, res) => {
  console.log("📩 Received Signup Request:", req.body);

  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing username, email, or password" });
    }

    // 🔎 Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      console.log("⚠️ User already exists:", email);
      return res.status(400).json({ message: "Email or Username already exists" });
    }

    // 🔑 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log("✅ User created successfully:", username);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
});

// **🔐 Login API**
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔍 Checking user:", email);
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("🔑 Comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Invalid credentials for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT Token
    console.log("✅ Password matched! Generating token...");
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1h" });

    console.log("🆔 Token Generated:", token);
    res.json({ token, username: user.username, email: user.email });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
