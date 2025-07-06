const debug = require("debug")(
  "server:controllers:products:newArrivals.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const newArrivals = async (req, res) => {
  try {
    debug("Request GET /api/products/new-arrivals");

    const newArrival = await Product.find().sort({ createdAt: -1 }).limit(8); // Get the latest 8 products
    if (newArrival) {
      debug(
        "Request GET /api/products/new-arrivals: New arrivals fetched successfully!"
      );
      return res.status(200).json({
        data: newArrival,
        message: "New arrivals fetched successfully",
      });
    } else {
      debug("Request GET /api/products/new-arrivals: No new arrivals found");
      return res.status(404).json({
        message: "No new arrivals found",
      });
    }
  } catch (error) {
    debug("Request GET /api/products/new-arrivals: ", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};
module.exports = newArrivals;
