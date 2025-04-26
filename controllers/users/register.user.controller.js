const debug = require("debug")(
  "server:controllers:users:register.user.controller.js"
);

const User = require("../../models/user.model.js"); // Import User model

const createJWT = require("../../utils/createJWT.util");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  debug("Request POST /api/users/register");

  try {
    // Register a new user
    let user = await User.findOne({ email });

    if (user) {
      debug("Request POST /api/users/register: User already exists!");

      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "User already exists!",
      });
    }

    user = new User({ name, email, password });
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        _id: user._id,
        role: user.role,
      },
    };

    const [err, token] = await createJWT(payload, 30 * 24 * 60 * 60);
    if (err) throw err;

    debug("Request POST /api/users/register: User registered successfully!");

    return res.status(201).json({
      success: true,
      error: false,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      message: "User registered successfully!",
    });
  } catch (error) {
    debug("Request POST /api/users/register: ", error);
    res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = register;
