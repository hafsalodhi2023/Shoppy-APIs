require("dotenv").config();

// Import necessary modules
const express = require("express");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

// Import routes
const userRoutes = require("./routes/user.route.js"); // Import user routes
const productRoutes = require("./routes/product.route.js"); // Import product routes
const cartRoutes = require("./routes/cart.route.js"); // Import cart routes
const checkoutRoutes = require("./routes/checkout.route.js"); // Import checkout routes
const orderRoutes = require("./routes/order.route.js"); // Import order routes
const uploadRoutes = require("./routes/upload.route.js"); // Import upload routes
const subscriberRoutes = require("./routes/subscriber.route.js"); // Import subscriber routes
const adminRoutes = require("./routes/admin.route.js"); // Import admin routes
const adminProductRoutes = require("./routes/productAdmin.route.js"); // Import admin product routes
const orderAdminRoutes = require("./routes/orderAdmin.route.js"); // Import admin order routes

// Import database connection configuration
const connectDB = require("./config/db.config.js");

// Initialize Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
});

// Define port number
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API Routes
app.use("/api/users", userRoutes); // Mount users routes
app.use("/api/products", productRoutes); // Mount products routes
app.use("/api/carts", cartRoutes); // Mount carts routes
app.use("/api/checkouts", checkoutRoutes); // Mount checkouts routes
app.use("/api/orders", orderRoutes); // Mount orders routes
app.use("/api/upload", uploadRoutes); // Mount upload routes
app.use("/api", subscriberRoutes); // Mount subscriber routes

// Admin routes
app.use("/api/admin/users", adminRoutes); // Mount admin routes
app.use("/api/admin/products", adminProductRoutes); // Mount admin product routes
app.use("/api/admin/orders", orderAdminRoutes); // Mount admin order routes

app.get("/", (req, res) => {
  res.send("Welcome to the Shoppy APIs");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
