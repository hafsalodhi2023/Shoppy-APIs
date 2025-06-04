// @collapse
const jwt = require("jsonwebtoken");

const createJWT = (payload, expiry = "1h") => {
  return new Promise((resolve) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: expiry },
      (err, token) => {
        if (err) {
          resolve([err, null]);
        } else {
          resolve([null, token]);
        }
      }
    );
  });
};

module.exports = createJWT;
