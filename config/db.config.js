const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    // Exit process with failure code
    process.exit(1);
  }
};

// Export the connectDB function for use in other parts of the application
module.exports = connectDB;
