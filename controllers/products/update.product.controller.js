const debug = require("debug")(
  "server:controllers:products:update.product.controller.js"
);

const Product = require("../../models/product.model"); // Import Product model

const update = async (req, res) => {
  debug("Request PUT /api/products/update/:id");
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

    // Find product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
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

      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;

      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;

      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;
      // Save updated product to database
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
