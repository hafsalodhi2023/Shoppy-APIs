require("dotenv").config();

const express = require("express");
const multer = require("multer");

const create = require("../controllers/uploads/upload.upload.controller");

// multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

// @route POST /api/uploads/upload
// @desc Upload an image
// @access Private
router.post("/", upload.single("image"), create);

module.exports = router;
