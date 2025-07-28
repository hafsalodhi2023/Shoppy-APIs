const User = require("../../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};

module.exports = getAllUsers;
