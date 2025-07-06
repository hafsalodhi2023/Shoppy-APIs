const debug = require("debug")(
  "server:controllers:admins:deleteUser.admin.controller.js"
);
const User = require("../../models/user.model");

const deleteUser = async (req, res) => {
  try {
    debug("Request DELETE /api/admins/users/:id");
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      debug("Request DELETE /api/admins/users/:id - User not found");
      return res.status(404).json({
        success: false,
        error: true,
        data: null,
        message: "User not found",
      });
    }
    await user.deleteOne();
    debug("Request DELETE /api/admins/users/:id - User deleted");
    return res.status(200).json({
      error: false,
      data: null,
      message: "User deleted",
    });
  } catch (error) {
    debug("Request DELETE /api/admins/users/:id - Error: " + error);
    return res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error",
    });
  }
};

module.exports = deleteUser;
