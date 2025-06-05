// @collapse
const express = require("express");

const create = require("../controllers/checkouts/create.checkout.controller");
const update = require("../controllers/checkouts/update.checkout.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route POST /api/checkout/create
// @desc Create a new checkout session
// @access Private
router.post("/create", auth, create);

// @route PUT /api/checkout/:id
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", auth, update);

// Export router
module.exports = router;
