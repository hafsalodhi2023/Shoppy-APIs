const express = require("express");

const register = require("../controllers/users/user.controller.js");

const router = express.Router();

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register", register);

module.exports = router;
