const debug = require("debug")("server:controllers:user.controller.js");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    debug("POST Route /api/users/register");
    res.json({ name, email, password });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register };
