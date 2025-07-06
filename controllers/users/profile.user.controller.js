
const profile = async (req, res) => {

  if (req.user) {
    return res.json({
      data: req.user,
      message: "User profile",
    });
  }
};

module.exports = profile;
