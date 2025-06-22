// @collapse
const express = require("express");

// Import controllers
const GetAllUsers = require("../controllers/admins/getUsers.admin.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const admin = require("../middlewares/admin.middleware"); // Import admin middleware

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private (Admin only)
router.get("/users", [auth, admin], GetAllUsers);

module.exports = router;
