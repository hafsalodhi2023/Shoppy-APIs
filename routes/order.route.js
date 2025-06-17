// @collapse
const express = require("express");

const myOrder = require("../controllers/orders/my.order.controller");
const detail = require("../controllers/orders/detail.order.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route GET /api/orders/my-orders
// @desc Get user's orders
// @access Private
router.get("/my-orders", auth, myOrder);

// @route GET /api/orders/:id
// @desc Get order by ID
// @access Private
router.get("/:id", auth, detail);

module.exports = router;
