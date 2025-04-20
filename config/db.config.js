const mongoose = require("mongoose");
const debug = require("debug")("server:config:db.config.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    debug("MongoDB connected successfully.");
  } catch (error) {
    debug(error);
    process.exit(1);
  }
};

module.exports = connectDB;
