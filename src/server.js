const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Adjust if needed
app.use(bodyParser.json());
app.use(session({ secret: "secret_key", resave: false, saveUninitialized: true }));

// Mock Users (Replace with DB later)
const USERS = [
  { email: "admin@gmail.com", password: "admin123", role: "admin" },
  { email: "student@gmail.com", password: "student123", role: "student" },
];

// Login Endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.user = user; // Save session
  res.json({ message: "Login successful", role: user.role });
});

// Logout Endpoint
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out" });
});

// Protected Dashboard Routes
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  res.json({ message: `Welcome to ${req.session.user.role} dashboard` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
