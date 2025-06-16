// @collapse
const express = require("express");

const myOrder = require("../controllers/orders/my.order.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route GET /api/orders/my-orders
// @desc Get user's orders
// @access Private
router.get("/my-orders", auth, myOrder);

module.exports = router;
