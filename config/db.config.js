// @collapse
const mongoose = require("mongoose");
const debug = require("debug")("server:config:db.config.js");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    // Log success message if connected
    debug("MongoDB connected successfully.");
  } catch (error) {
    // Log error if connection fails
    debug(error);
    // Exit process with failure code
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
