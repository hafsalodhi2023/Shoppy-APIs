const debug = require("debug")("server:middlewares:auth.middleware.js");
const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    try {
      token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user._id).select("-password -__v");

      if (!req.user) {
        debug("Get Request /api/user/profile: User not found");

        return res.status(401).json({
          success: false,
          error: true,
          data: null,
          message: "Not authorized, user not found",
        });
      }

      debug("Get Request /api/user/profile: User authenticated");
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      debug("Error in auth middleware: ", error.message);
      return res.status(401).json({
        success: false,
        error: true,
        data: null,
        message: "Not authorized, token failed",
      });
    }
  } else {
    debug("Error in auth middleware: No token found");
    return res.status(401).json({
      success: false,
      error: true,
      data: null,
      message: "Not authorized, no token",
    });
  }
};

module.exports = auth;
