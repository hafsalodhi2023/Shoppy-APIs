// @collapse
/**
 * Debug logger for product update operations
 */
const debug = require("debug")(
  "server:controllers:products:update.product.controller.js"
);

/**
 * Import the Product model for database operations
 */
const Product = require("../../models/product.model");

/**
 * Updates an existing product in the database
 * @param {Object} req - Express request object containing product data in body and product ID in params
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated product or error message
 */
const update = async (req, res) => {
  debug("Request PUT /api/products/update/:id");
  try {
    // Destructure all possible product fields from request body
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
    } = req.body;

    // Attempt to find the product by ID in the database
    const product = await Product.findById(req.params.id);

    if (product) {
      // Update each field if provided in request, otherwise keep existing value
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;

      // Special handling for boolean fields to allow false values
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;

      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;

      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Persist the updated product to database
      const updatedProduct = await product.save();

      debug(
        "Request PUT /api/products/update/:id: Product updated successfully!"
      );
      return res.json({
        success: true,
        error: false,
        data: updatedProduct,
        message: "Product updated successfully.",
      });
    } else {
      // Handle case when product is not found
      debug(
        "Request PUT /api/products/update/:id: Product not found with ID: ",
        req.params.id
      );
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "Product not found with ID: " + req.params.id,
      });
    }
  } catch (error) {
    // Handle any unexpected errors during update operation
    debug("Request PUT /api/products/update/:id: ", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Error updating product.",
    });
  }
};

module.exports = update;
