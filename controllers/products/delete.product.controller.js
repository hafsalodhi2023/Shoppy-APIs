
const Product = require("../../models/product.model"); // Import Product model

const deleete = async (req, res) => {
  try {
    // Find product by Id
    const product = await Product.findById(req.params.id);

    if (product) {
      // Remove the product from the database
      await product.deleteOne();
  
      return res.status(200).json({
        message: "Product deleted successfully",
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

module.exports = deleete;
