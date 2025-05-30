const express = require("express");

const create = require("../controllers/checkouts/create.checkout.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route POST /api/checkout/create
// @desc Create a new checkout session
// @access Private
router.post("/create", auth, create);

// Export router
module.exports = router;
