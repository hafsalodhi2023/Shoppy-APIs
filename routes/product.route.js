const express = require("express");

const create = require("../controllers/products/create.product.controller"); // Import create product controller
const update = require("../controllers/products/update.product.controller"); // Import update product controller
const deleete = require("../controllers/products/delete.product.controller"); // Import delete product controller
const filter = require("../controllers/products/filter.product.controller"); // Import filter product controller
const bestSeller = require("../controllers/products/bestSeller.product.controller"); // Import best seller product controller
const newArrivals = require("../controllers/products/newArrivals.product.controller"); // Import best seller product controller
const getOne = require("../controllers/products/getOne.product.controller"); // Import get one product controller
const similar = require("../controllers/products/similar.product.controller"); // Import similar product controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const isAdmin = require("../middlewares/isadmin.middleware"); // Import isAdmin middleware

const router = express.Router(); // Create router

// @route POST /api/products
// @desc Create new product
// @access Private/Admin
router.post("/", auth, isAdmin, create);

// @route PUT /api/products/:id
// @desc Update an existing product
// @access Private/Admin
router.put("/:id", auth, isAdmin, update);

// @route GET /api/products/:id
// @desc Delete a product
// @access Private/Admin
router.delete("/:id", auth, isAdmin, deleete);

// @route GET /api/products
// @desc Get all products with optional query filters
// @access Public
router.get("/", filter);

// @route GET /api/products/best-seller
// @desc Retrieve the products with the highest ratings
// @access Public
router.get("/best-seller", bestSeller);

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation date
// @access Public
router.get("/new-arrivals", newArrivals);

// @route GET /api/products/:id
// @desc Get a single product by ID
// @access Public
router.get("/:id", getOne);

// @route GET /api/products/similar/:id
// @desc retrieve similar products based on current product' s gender and category
// @access Public
router.get("/similar/:id", similar);

// Export router
module.exports = router;
