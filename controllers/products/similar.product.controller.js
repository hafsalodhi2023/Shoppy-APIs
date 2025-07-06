
const Product = require("../../models/product.model"); // Import Product model

const similar = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product
      gender: product.gender,
      category: product.category,
    }).limit(4);

    return res.status(200).json({
      data: similarProducts,
      message: "Similar products fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = similar;
