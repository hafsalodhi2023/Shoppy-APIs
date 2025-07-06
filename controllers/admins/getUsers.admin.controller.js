const debug = require("debug")(
  "server:controllers:admins:getUsers.admin.controller.js"
);

const User = require("../../models/user.model");

const getAllUsers = async (req, res) => {
  debug("Request GET /api/admins/users");
  try {
    const users = await User.find();
    debug("Request GET /api/admins/users - Users fetched successfully.");
    return res.status(200).json({
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    debug("Request GET /api/admins/users - Error: " + error);
    return res.status(500).json({
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = getAllUsers;
