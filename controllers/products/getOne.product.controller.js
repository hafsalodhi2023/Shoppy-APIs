

const Product = require("../../models/product.model"); // Import Product model

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json({
        data: product,
        message: "Product found",
      });
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getOne;
