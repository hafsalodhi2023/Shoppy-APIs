const debug = require("debug")(
  "server:controllers:users:login.user.controller.js"
);

const User = require("../../models/user.model.js"); // Import User model

const createJWT = require("../../utils/createJWT.util");

const login = async (req, res) => {
  const { email, password } = req.body;

  debug("Request POST /api/users/login");

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      debug("Request POST /api/users/login: Invalid credentials.");

      return res.status(400).json({
        data: null,
        message: "Invalid credentials.",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      debug("Request POST /api/users/login: Invalid credentials.");

      return res.status(400).json({
        data: null,
        message: "Invalid credentials.",
      });
    }

    // Create JWT payload
    const payload = {
      user: {
        _id: user._id,
        role: user.role,
      },
    };

    const [err, token] = await createJWT(payload, 30 * 24 * 60 * 60);
    if (err) throw err;

    debug("Request POST /api/users/login: User logged in successfully!");

    return res.status(200).json({
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      message: "User logged in successfully!",
    });
  } catch (error) {
    debug("Request POST /api/users/login:", error);
    res.status(500).json({
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = login;
