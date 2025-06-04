// @collapse
require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const debug = require("debug")("server:app.js");

// Import routes
const userRoutes = require("./routes/user.route.js"); // Import user routes
const productRoutes = require("./routes/product.route.js"); // Import product routes
const cartRoutes = require("./routes/cart.route.js"); // Import cart routes
const checkoutRoutes = require("./routes/checkout.route.js"); // Import checkout routes

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
app.use("/api/products", productRoutes); // Mount product routes
app.use("/api/carts", cartRoutes); // Mount cart routes
app.use("/api/checkout", checkoutRoutes); // Mount checkout routes

// Start the server
app.listen(PORT, () => {
  debug(`Server is running on http://localhost:${PORT}`);
});
