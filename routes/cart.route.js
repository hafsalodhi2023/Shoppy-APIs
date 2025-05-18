const express = require("express");

const create = require("../controllers/carts/create.cart.controller"); // Import create cart controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route POST /api/cart/create
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/create", create);

module.exports = router; // Export the router
