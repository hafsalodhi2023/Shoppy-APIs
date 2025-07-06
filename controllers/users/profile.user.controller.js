const profile = async (req, res) => {
  return res.json(req.user);
};

module.exports = profile;
