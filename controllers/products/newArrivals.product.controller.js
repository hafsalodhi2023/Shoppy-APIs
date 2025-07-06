const Product = require("../../models/product.model"); // Import Product model

const newArrivals = async (req, res) => {
  try {
    const newArrival = await Product.find().sort({ createdAt: -1 }).limit(8); // Get the latest 8 products
    if (newArrival) {
      return res.status(200).json(newArrival);
    } else {
      return res.status(404).json({
        message: "No new arrivals found",
      });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
module.exports = newArrivals;
