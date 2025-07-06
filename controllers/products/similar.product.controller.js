const debug = require("debug")(
  "server:controllers:products:similar.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const similar = async (req, res) => {
  debug("Request GET /api/products/similar/:id");
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      debug("Request GET /api/products/similar/:id: Product not found");
      return res.status(404).json({
        data: null,
        message: "Product not found",
      });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current product
      gender: product.gender,
      category: product.category,
    }).limit(4);

    debug("Request GET /api/products/similar/:id: Similar products fetched");
    return res.status(200).json({
      data: similarProducts,
      message: "Similar products fetched successfully",
    });
  } catch (error) {
    debug("Request GET /api/products/similar/:id: ", error);
    return res.status(500).json({
      data: null,
      message: "Internal server error",
    });
  }
};
module.exports = similar;
