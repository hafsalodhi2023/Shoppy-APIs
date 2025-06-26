// @collapse
const debug = require("debug")(
  "server:controllers:admins:updateUser.admin.controller.js"
);

const User = require("../../models/user.model");

const updateUser = async (req, res) => {
  try {
    debug("Request PUT /api/admins/users/:id");
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "User not found",
      });
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;
    await user.save();
    debug("Request PUT /api/admins/users/:id - User updated successfully.");
    return res.status(200).json({
      success: true,
      error: false,
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    debug("Request PUT /api/admins/users/:id - Error: " + error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = updateUser;
