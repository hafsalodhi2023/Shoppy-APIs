// @collapse
const debug = require("debug")(
  "server:controllers:productAdmins:getAll.productAdmin.controller.js"
);

const Product = require("../../models/product.model");

const getAll = async (req, res) => {
  try {
    debug("Request GET /api/admin/products/get-all");
    const products = await Product.find({});
    debug(
      "Request GET /api/admin/products/get-all - Products fetched successfully"
    );
    return res.status(200).json({
      success: true,
      error: false,
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    debug("Request GET /api/admin/products/get-all - Internal server error");
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = getAll;
