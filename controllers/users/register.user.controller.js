const User = require("../../models/user.model.js"); // Import User model

const createJWT = require("../../utils/createJWT.util");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Register a new user
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    user = new User({ name, email, password });
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const [err, token] = await createJWT(payload, 30 * 24 * 60 * 60);
    if (err) throw err;

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = register;
