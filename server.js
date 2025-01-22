// server.js

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS to allow frontend requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory array to store the texts
const texts = [];

// Route to save text
app.post("/save-text", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  texts.push(text);
  res.status(201).json({ message: "Text saved successfully", texts });
});

// Route to get all texts
app.get("/get-texts", (req, res) => {
  res.json({ texts });
});

// Serve static files from the frontend folder (index.html)
app.use(express.static(path.join(__dirname, "frontend")));

// Serve the index.html page at the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
