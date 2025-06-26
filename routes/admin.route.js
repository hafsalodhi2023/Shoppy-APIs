// @collapse
const express = require("express");

// Import controllers
const getAllUsers = require("../controllers/admins/getUsers.admin.controller");
const createUser = require("../controllers/admins/createUser.admin.controller");
const updateUser = require("../controllers/admins/updateUser.admin.controller");
const deleteUser = require("../controllers/admins/deleteUser.admin.controller");

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware
const admin = require("../middlewares/isadmin.middleware"); // Import admin middleware

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users
// @access Private (Admin only)
router.get("/users", [auth, admin], getAllUsers);

// @route POST /api/admin/users
// @desc Create a new user
// @access Private (Admin only)
router.post("/users", [auth, admin], createUser);

// @route PUT /api/admin/users/:id
// @desc Update a user
// @access Private (Admin only)
router.put("/users/:id", [auth, admin], updateUser);

// @route DELETE /api/admin/users/:id
// @desc Delete a user
// @access Private (Admin only)
router.delete("/users/:id", [auth, admin], deleteUser);

module.exports = router;
