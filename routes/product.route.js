const express = require("express");

const create = require("../controllers/products/create.product.controller"); // Import create product controller
const update = require("../controllers/products/update.product.controller"); // Import update product controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const isAdmin = require("../middlewares/isadmin.middleware"); // Import isAdmin middleware

const router = express.Router(); // Create router

// @route POST /api/products/create
// @desc Create new product
// @access Private/Admin
router.post("/create", auth, isAdmin, create);

// @route PUT /api/products/:id
// @desc Update product
// @access Private/Admin
router.put("/:id", auth, isAdmin, update);

module.exports = router; // Export router
