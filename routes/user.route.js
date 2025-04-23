const express = require("express");

const register = require("../controllers/users/register.user.controller");
const login = require("../controllers/users/login.user.controller");

const router = express.Router();

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register", register);

// @route POST /api/users/login
// @desc Login user
// @access Public
router.post("/login", login);

module.exports = router;
