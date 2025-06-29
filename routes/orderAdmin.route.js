// @collapse
const express = require("express");

// Import controllers
const getAll = require("../controllers/orderAdmins/getAll.orderAdmin.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const admin = require("../middlewares/isadmin.middleware"); // Import admin middleware

const router = express.Router();

// @route GET /api/admin/orders/get-all
// @desc Get all orders for admin
// @access Private (Admin only)
router.get("/get-all", auth, admin, getAll);

module.exports = router;
