const Product = require("../../models/product.model"); // Import Product model

const bestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      return res.status(200).json(bestSeller);
    } else {
      return res.status(404).json({
        message: "No best seller product found.",
      });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};
module.exports = bestSeller;
