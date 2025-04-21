const debug = require("debug")(
  "server:controllers:users:login.user.controller.js"
);

const User = require("../../models/user.model.js"); // Import User model

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
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
