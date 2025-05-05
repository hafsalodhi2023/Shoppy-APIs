const express = require("express");

const create = require("../controllers/products/create.product.controller"); // Import create product controller
const update = require("../controllers/products/update.product.controller"); // Import update product controller
const deleete = require("../controllers/products/delete.product.controller"); // Import delete product controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const isAdmin = require("../middlewares/isadmin.middleware"); // Import isAdmin middleware

const router = express.Router(); // Create router

// @route POST /api/products/create
// @desc Create new product
// @access Private/Admin
router.post("/create", auth, isAdmin, create);

// @route PUT /api/products/update/:id
// @desc Update an existing product
// @access Private/Admin
router.put("/update/:id", auth, isAdmin, update);

// @route GET /api/products/delete/:id
// @desc Delete a product
// @access Private/Admin
router.delete("/delete/:id", auth, isAdmin, deleete);

module.exports = router; // Export router
