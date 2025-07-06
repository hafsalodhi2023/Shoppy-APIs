const Product = require("../../models/product.model"); // Import Product model

const bestSeller = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      return res.status(200).json({
        data: bestSeller,
        message: "Best seller product found.",
      });
    } else {
      return res.status(404).json({
        message: "No best seller product found.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
module.exports = bestSeller;
