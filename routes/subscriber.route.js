const express = require("express");

const subscribe = require("../controllers/subscribers/subscribe.subscriber.controller");

const router = express.Router();

// @route POST /api/subscribers/subscribe
// @desc Subscribe to newsletter
// @access Public
router.post("/subscribe", subscribe);

module.exports = router;
