require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const debug = require("debug")("server:app.js");

// Import database connection configuration
const connectDB = require("./config/db.config.js");

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

// Define port number
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Define route for root URL
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(PORT, () => {
  debug(`Server is running on http://localhost:${PORT}`);
});
