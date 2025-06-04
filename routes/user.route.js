// @collapse
const express = require("express");

// Import controllers
const register = require("../controllers/users/register.user.controller"); // Import register controller
const login = require("../controllers/users/login.user.controller"); // Import login controller
const profile = require("../controllers/users/profile.user.controller"); // Import profile controller

// Import middlewares
const auth = require("../middlewares/auth.middleware"); // Import auth middleware

const router = express.Router(); // Create router

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register", register);

// @route POST /api/users/login
// @desc Login user
// @access Public
router.post("/login", login);

// @route GET /api/users/profile
// @desc Get user profile
// @access Private
router.get("/profile", auth, profile);

module.exports = router;
