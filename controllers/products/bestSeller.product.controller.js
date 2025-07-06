const debug = require("debug")(
  "server:controllers:products:bestSeller.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const bestSeller = async (req, res) => {
  try {
    debug("Request GET /api/products/best-seller");

    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      debug(
        "Request GET /api/products/best-seller: Best seller product found!"
      );
      return res.status(200).json({
        data: bestSeller,
        message: "Best seller product found.",
      });
    } else {
      debug(
        "Request GET /api/products/best-seller: No best seller product found!"
      );
      return res.status(404).json({
        message: "No best seller product found.",
      });
    }
  } catch (error) {
    debug("Request GET /api/products/best-seller: ", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
module.exports = bestSeller;
