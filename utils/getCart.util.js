const Cart = require("../models/cart.model"); // Import Cart model

let getCart = async (guestId, userId) => {
  if (userId) {
    return await Cart.findOne({ user: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null; // Return null if neither userId nor guestId is provided
};

module.exports = getCart;
