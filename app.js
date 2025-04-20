require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const debug = require("debug")("server:app.js");

// Import routes
const userRoutes = require("./routes/user.route.js"); // Import user routes

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

// API Routes
app.use("/api/users", userRoutes); // Mount user routes

// Start the server
app.listen(PORT, () => {
  debug(`Server is running on http://localhost:${PORT}`);
});
