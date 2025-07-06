const express = require("express");

// Import controllers
const getAll = require("../controllers/orderAdmins/getAll.orderAdmin.controller");
const updateOrderStatus = require("../controllers/orderAdmins/update.orderAdmin.controller");
const deleteOrder = require("../controllers/orderAdmins/delete.orderAdmin.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const admin = require("../middlewares/isadmin.middleware"); // Import admin middleware

const router = express.Router();

// @route GET /api/admin/orders/get-all
// @desc Get all orders for admin
// @access Private (Admin only)
router.get("/get-all", auth, admin, getAll);

// @route PUT /api/admin/orders/update/:id
// @desc Update order status by ID
// @access Private (Admin only)
router.put("/update/:id", auth, admin, updateOrderStatus);

// @route GET /api/admin/orders/delete/:id
// @desc Delete order by ID
// @access Private (Admin only)
router.delete("/delete/:id", auth, admin, deleteOrder);

module.exports = router;
