 = require("debug")(
  "server:controllers:products:create.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const create = async (req, res) => {
  debug("Request POST /api/products/create");
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body; // Get product data from request body

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // Set user ID to current user's ID
    });

    const createdProduct = await product.save(); // Save product to database

    debug("Request POST /api/products/create: Product created successfully!");

    res.status(201).json({
      success: true,
      error: false,
      data: createdProduct,
      message: "Product created successfully.",
    }); // Send response with created product data
  } catch (error) {
    debug("Request POST /api/products/create: ", error);

    res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error.",
    }); // Send error response if an error occurs
  }
};

module.exports = create; // Export create product controller
