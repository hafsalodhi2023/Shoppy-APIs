const express = require("express");

const create = require("../controllers/products/create.product.controller"); // Import create product controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const isAdmin = require("../middlewares/isadmin.middleware"); // Import isAdmin middleware

const router = express.Router(); // Create router

// @route POST /api/products/create
// @desc Create new product
// @access Private/Admin
router.post("/create", auth, isAdmin, create);

module.exports = router; // Export router
