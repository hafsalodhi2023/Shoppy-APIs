const express = require("express");

const create = require("../controllers/carts/create.cart.controller"); // Import create cart controller
const update = require("../controllers/carts/update.cart.controller"); // Import update cart controller
const deleete = require("../controllers/carts/delete.cart.controller"); // Import delete cart controller
const getAll = require("../controllers/carts/getAll.cart.controller"); // Import get cart controller
const merge = require("../controllers/carts/merge.cart.controller"); // Import merge cart controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route POST /api/cart/create
// @desc Add a product to the cart for a guest or logged in user
// @access Public
router.post("/", create);

// @route PUT /api/cart/update
// @desc Update the quantity of a product in the cart for the guest or logged in user
// @access Public
router.put("/", update);

// @route DELETE /api/cart/delete
// @desc Delete a product from the cart for the guest or logged in user
// @access Public
router.delete("/", deleete);

// @route GET /api/cart/get
// @desc Get the cart for the guest or logged in user
// @access Public
router.get("/", getAll);

// @route POST /api/cart/merge
// @desc Merge the cart for the guest with the logged in user's cart
// @access Private
router.post("/merge", auth, merge);

module.exports = router; // Export the router
