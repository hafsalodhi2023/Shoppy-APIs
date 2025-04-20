const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model.js"); // Import User model

const { register } = require("../controllers/user.controller.js");

const router = express.Router();

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post("/register", register);

module.exports = router;
