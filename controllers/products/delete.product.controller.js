// @collapse
const debug = require("debug")(
  "server:controllers:products:delete.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const deleete = async (req, res) => {
  debug("Request DELETE /api/products/delete/:id");
  try {
    // Find product by Id
    const product = await Product.findById(req.params.id);

    if (product) {
      // Remove the product from the database
      await product.deleteOne();
      debug(
        "Request DELETE /api/products/delete/:id: Product deleted successfully"
      );
      return res.status(200).json({
        success: true,
        error: false,
        data: null,
        message: "Product deleted successfully",
      });
    } else {
      debug("Request DELETE /api/products/delete/:id: Product not found");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Product not found",
      });
    }
  } catch (error) {
    debug("Request DELETE /api/products/delete/:id: ", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = deleete;
