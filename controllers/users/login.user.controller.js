const debug = require("debug")(
  "server:controllers:users:login.user.controller.js"
);

const User = require("../../models/user.model.js"); // Import User model

const login = async (req, res) => {
  const { email, password } = req.body;

  debug("Request POST /api/users/login");

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "Invalid credentials.",
      });
    }
  } catch (error) {
    debug(error);
    res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = login;
