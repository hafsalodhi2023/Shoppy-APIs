const express = require("express");

const create = require("../controllers/checkouts/create.checkout.controller");
const pay = require("../controllers/checkouts/pay.checkout.controller");
const finalize = require("../controllers/checkouts/finalize.checkout.controller"); // Import finalize checkout controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route POST /api/checkout/create
// @desc Create a new checkout session
// @access Private
router.post("/", auth, create);

// @route PUT /api/checkout/:id
// @desc Update checkout to mark as paid after successful payment
// @access Private
router.put("/:id/pay", auth, pay);

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout after successful payment
// @access Private
router.post("/:id/finalize", auth, finalize);

// Export router
module.exports = router;
