const debug = require("debug")(
  "server:controllers:users:register.user.controller.js"
);

const User = require("../../models/user.model.js"); // Import User model

const jwt = require("jsonwebtoken"); // Import JWT library

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    debug("Request POST /api/users/register");
    // Register a new user
    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        success: false,
        error: true,
        data: null,
        message: "User already exists!",
      });

    user = new User({ name, email, password });
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        _id: user._id,
        role: user.role,
      },
    };

    // Sign and return the token along with the user data

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 30 * 24 * 60 * 60 },
      (err, token) => {
        if (err) throw err;
        // send the user token in the response
        return res.status(201).json({
          success: true,
          error: false,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token,
          },
          message: "User registered successfully!",
        });
      }
    );
  } catch (error) {
    debug(error);
    res.status(500).json({
      success: false,
      error: true,
      data: null,
      message: "Internal server error.",
    });
  }
};

module.exports = register;
