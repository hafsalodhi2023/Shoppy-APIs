const dotenv = require("dotenv");
const mongoose = require("mongoose");

const Product = require("./models/product.model");
const User = require("./models/user.model");
const Cart = require("./models/cart.model");
const products = require("./data/products");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear Existing data
    await Product.deleteMany();
    await User.deleteMany({});
    await Cart.deleteMany({});

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: "123456789",
      role: "admin",
    });

    // Assign the default admin user to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    await Product.insertMany(sampleProducts);
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

seedData();
