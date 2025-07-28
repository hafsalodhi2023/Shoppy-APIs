const User = require("../../models/user.model");

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
      return res.status(200).json({
        message: "User deleted",
      });
    } else {
      return res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = deleteUser;
