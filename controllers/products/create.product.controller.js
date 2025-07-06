

const Product = require("../../models/product.model"); // Import Product model

const create = async (req, res) => {
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


    res.status(201).json({
      data: createdProduct,
      message: "Product created successfully.",
    }); // Send response with created product data
  } catch (error) {

    res.status(500).json({
      message: "Internal server error.",
    }); // Send error response if an error occurs
  }
};

module.exports = create; // Export create product controller
