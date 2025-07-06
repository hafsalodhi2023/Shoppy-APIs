const Product = require("../../models/product.model"); // Import Product model

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = getOne;
