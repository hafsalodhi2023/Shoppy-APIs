const debug = require("debug")(
  "server:controllers:carts:getAll.cart.controller.js"
);

const getCart = require("../../utils/getCart.util"); // Import getCart utility

const getAll = async (req, res) => {
  const { userId, guestId } = req.query;
  debug("Request GET /api/cart/getAll");
  try {
    const cart = await getCart(guestId, userId); // Call getCart utility
    if (cart) {
      debug("Request GET /api/cart/getAll: Cart retrieved successfully");
      return res.status(200).json({
        data: cart,
        message: "Cart retrieved successfully",
      });
    } else {
      debug("Request GET /api/cart/getAll: Cart not found");
      return res.status(404).json({
        message: "Cart not found",
      });
    }
  } catch (error) {
    debug("Request GET /api/cart/getAll: Error", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = getAll;
