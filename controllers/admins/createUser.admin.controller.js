const User = require("../../models/user.model");

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
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
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = createUser;
