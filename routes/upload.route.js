require("dotenv").config();

const express = require("express");
const multer = require("multer");
const streamifier = require("streamifier");

const create = require("../controllers/uploads/upload.upload.controller");

// multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/upload", upload.single("image"), create);

module.exports = router;
