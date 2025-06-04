// @collapse
const debug = require("debug")(
  "server:controllers:users:profile.user.controller.js"
);

const profile = async (req, res) => {
  debug("Request GET /api/users/profile");

  if (req.user) {
    debug("Request GET /api/users/profile: User found");
    return res.json({
      success: true,
      error: false,
      data: req.user,
      message: "User profile",
    });
  }
};

module.exports = profile;
