const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the user schema with fields and validation
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

// Pre-save hook to hash password before saving user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password not modified
  const salt = await bcrypt.genSalt(10); // Generate salt for hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next(); // Proceed to save
});

// Method to compare provided password with stored hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model("User", userSchema);
