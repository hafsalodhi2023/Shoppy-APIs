

const Product = require("../../models/product.model");

const getAll = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      data: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getAll;
