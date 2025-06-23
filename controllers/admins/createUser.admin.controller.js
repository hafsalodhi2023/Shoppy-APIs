// @collapse
const debug = require("debug")(
  "server:controllers:admins:createUser.admin.controller.js"
);
const User = require("../../models/user.model");

const createUser = async (req, res) => {
  debug("Request POST /api/admins/users");
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      debug("Request POST /api/admins/users - User already exists");
      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "User already exists",
      });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();
    debug("Request POST /api/admins/users - User created successfully");
    return res.status(200).json({
      success: true,
      error: false,
      data: null,
      message: "User created successfully",
    });
  } catch (error) {
    debug("Request POST /api/admins/users - Error: " + error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = createUser;
