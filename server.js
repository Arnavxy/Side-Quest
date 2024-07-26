const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();
const port = 3001;

const users = [];

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const secretKey = "your_secret_key";

app.post("/register", async (req, res) => {
  const { username, email, password, isCompany } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = {
    username,
    email,
    password: hashedPassword,
    isCompany,
    avatar: "",
    progress: [],
    points: 0,
  };
  users.push(user);
  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { username: user.username, isCompany: user.isCompany },
    secretKey,
    { expiresIn: "1h" }
  );
  res.json({ message: "Login successful", token });
});

app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    const user = users.find((u) => u.username === decoded.username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  });
});

app.post("/update-avatar", (req, res) => {
  const authHeader = req.headers["authorization"];
  const { avatar } = req.body;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token" });
    }
    const user = users.find((u) => u.username === decoded.username);
    user.avatar = avatar;
    res.json({ message: "Avatar updated successfully" });
  });
});

app.get("/leaderboard", (req, res) => {
  const sortedUsers = users.sort((a, b) => b.points - a.points);
  res.json({ leaderboard: sortedUsers });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
