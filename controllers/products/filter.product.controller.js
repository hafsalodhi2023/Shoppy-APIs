const debug = require("debug")(
  "server:controllers:products:filter.product.controller.js"
);
const Product = require("../../models/product.model");

const filter = async (req, res) => {
  try {
    debug("Request GET /api/products");

    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    if (collection && collection.toLowerCase() !== "all") {
      query.collection = collection; // Corrected field name to 'collection'
    }

    if (category && category.toLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }

    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseInt(minPrice); // Corrected operator to $gte
      }
      if (maxPrice) {
        query.price.$lte = parseInt(maxPrice); // Corrected operator to $lte
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};

    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort.price = 1;
          break;
        case "priceDesc":
          sort.price = -1;
          break;
        case "popularity":
          sort.rating = -1;
          break;
        default:
          break;
      }
    }

    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || undefined); // Handle 'undefined' for limit

    debug("Request GET /api/products: ", products);
    return res.status(200).json({
      success: true,
      error: false,
      data: products,
      message: "Products filtered successfully!",
    });
  } catch (error) {
    debug("Error filtering products:", error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = filter;
