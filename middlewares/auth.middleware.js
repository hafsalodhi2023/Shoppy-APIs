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
        return res.status(401).json({
          message: "Not authorized, user not found",
        });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, no token",
    });
  }
};

module.exports = auth;
