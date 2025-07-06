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

    return res.status(200).json(similarProducts);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
module.exports = similar;
