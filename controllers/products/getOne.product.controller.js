const debug = require("debug")(
  "server:controllers:products:getOne.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const getOne = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      debug("Request GET /api/products/:id");
      return res.status(200).json({
        data: product,
        message: "Product found",
      });
    } else {
      debug("Request GET /api/products/:id: Product not found");
      return res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    debug("Request GET /api/products/:id: ", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getOne;
